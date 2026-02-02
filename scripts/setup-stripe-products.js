#!/usr/bin/env node

/**
 * Script to automatically create Stripe products and prices from config.js
 * and update the config file with actual Stripe price IDs.
 *
 * Usage:
 *   node scripts/setup-stripe-products.js [--mode=test|live]
 *
 * Default: test mode
 */

const Stripe = require("stripe");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

// Load environment variables from .env.local
const envPath = join(__dirname, "..", ".env.local");
try {
  const envFile = readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match && !match[1].startsWith("#")) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
} catch (error) {
  console.error("Warning: Could not load .env.local file");
}

const rootDir = join(__dirname, "..");

// Get mode from command line args (default: test)
const mode = process.argv.find((arg) => arg.startsWith("--mode="))?.split("=")[1] || "test";
const isTestMode = mode === "test";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Error: STRIPE_SECRET_KEY not found in .env.local");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

// Read config.js and parse it
const configPath = join(rootDir, "config.js");
let configContent = readFileSync(configPath, "utf-8");

// Create a modified version that exports as CommonJS
const tempConfigPath = join(rootDir, ".temp-config.js");
// Replace export default with module.exports
const modifiedConfig = configContent
  .replace(/export default config;/, "module.exports = config;")
  .replace(/export const getProductsByCategory/g, "const getProductsByCategory")
  .replace(/export const getProductById/g, "const getProductById")
  .replace(/export const getCategoryBySlug/g, "const getCategoryBySlug")
  .replace(/export const getFeaturedProductByCategory/g, "const getFeaturedProductByCategory");

writeFileSync(tempConfigPath, modifiedConfig, "utf-8");

// Load the config
let config;
try {
  // Clear require cache
  const resolvedPath = require.resolve(tempConfigPath);
  delete require.cache[resolvedPath];
  config = require(tempConfigPath);
} catch (error) {
  console.error("❌ Error loading config:", error.message);
  console.error(error.stack);
  // Clean up temp file
  try {
    require("fs").unlinkSync(tempConfigPath);
  } catch {}
  process.exit(1);
}

// Extract products
const products = (config.products || []).map((product) => {
  // Extract the base key from priceId placeholder by parsing the config source
  // priceId is a ternary: process.env.NODE_ENV === "development" ? "price_xxx_dev" : "price_xxx_prod"
  // Find the product block and extract the priceId pattern
  const escapedId = product.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match with a reasonable limit to avoid matching too far
  const productBlockRegex = new RegExp(
    `id:\\s*"${escapedId}"[\\s\\S]{0,1000}?priceId:[\\s\\S]*?\\?\\s*"([^"]+)_dev"`,
    "m"
  );
  const priceIdMatch = configContent.match(productBlockRegex);
  const baseKey = priceIdMatch ? priceIdMatch[1] : null;

  if (!baseKey) {
    console.error(`❌ Error: Could not extract priceId placeholder for product ${product.id}`);
    // Try a simpler approach - just look for the priceId line near the product
    const simpleMatch = configContent.match(new RegExp(`"${escapedId}"[\\s\\S]{0,500}?"([^"]+)_dev"`, "m"));
    if (simpleMatch) {
      console.log(`   Found alternative match: ${simpleMatch[1]}`);
      return {
        id: product.id,
        category: product.category,
        categoryName: product.categoryName,
        name: product.name,
        price: product.price,
        priceIdPlaceholder: simpleMatch[1],
        tier: product.tier,
        tierName: product.tierName,
        description: product.description,
        shortDescription: product.shortDescription,
      };
    }
    process.exit(1);
  }

  return {
    id: product.id,
    category: product.category,
    categoryName: product.categoryName,
    name: product.name,
    price: product.price,
    priceIdPlaceholder: baseKey,
    tier: product.tier,
    tierName: product.tierName,
    description: product.description,
    shortDescription: product.shortDescription,
  };
});

// Clean up temp file
try {
  require("fs").unlinkSync(tempConfigPath);
} catch {}

if (products.length === 0) {
  console.error("❌ Error: No products found in config.js");
  process.exit(1);
}

console.log(`\n🚀 Setting up Stripe products in ${isTestMode ? "TEST" : "LIVE"} mode...\n`);
console.log(`Found ${products.length} products to create\n`);

const priceIdMap = {};

async function createStripeProduct(product) {
  try {
    // Create product name with tier
    const productName = `${product.categoryName} - ${product.tierName}`;

    console.log(`📦 Creating product: ${productName} ($${product.price})...`);

    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: productName,
      description: product.description,
      metadata: {
        product_id: product.id,
        category: product.category,
        tier: product.tier,
      },
    });

    console.log(`   ✅ Product created: ${stripeProduct.id}`);

    // Create price for the product
    const price = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price * 100, // Convert to cents
      currency: "usd",
      metadata: {
        product_id: product.id,
        category: product.category,
        tier: product.tier,
      },
    });

    console.log(`   ✅ Price created: ${price.id} ($${product.price})\n`);

    // Store the price ID mapping
    const priceIdKey = product.priceIdPlaceholder.replace("_dev", "").replace("_prod", "");
    priceIdMap[priceIdKey] = price.id;

    return { product: stripeProduct, price };
  } catch (error) {
    console.error(`   ❌ Error creating product ${product.name}:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    // Create all products
    for (const product of products) {
      await createStripeProduct(product);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log("\n📝 Updating config.js with Stripe price IDs...\n");

    // Re-read config.js to get fresh content (in case it was modified)
    configContent = readFileSync(configPath, "utf-8");

    // Update config.js with actual price IDs
    for (const product of products) {
      const key = product.priceIdPlaceholder;
      const priceId = priceIdMap[key];

      if (!priceId) {
        console.warn(`⚠️  Warning: No price ID found for ${key}`);
        continue;
      }

      console.log(`   Updating ${product.id}: ${key} -> ${priceId}`);

      // Simple string replacement approach - find the exact pattern and replace
      const oldDevPattern = `"${key}_dev"`;
      const oldProdPattern = `"${key}_prod"`;
      const newDevValue = `"${priceId}"`;
      const newProdValue = isTestMode ? `"${key}_prod"` : `"${priceId}"`;

      // Find the line containing this product's priceId
      const productIdPattern = new RegExp(`id:\\s*"${product.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "m");
      const productStartIndex = configContent.search(productIdPattern);

      if (productStartIndex === -1) {
        console.warn(`   ⚠️  Could not find product ${product.id}`);
        continue;
      }

      // Find the next product or end of products array
      const nextProductMatch = configContent.substring(productStartIndex + 1).match(/id:\s*"[^"]+"/);
      const productEndIndex = nextProductMatch ? productStartIndex + 1 + nextProductMatch.index : configContent.length;

      // Extract this product's block
      const productBlock = configContent.substring(productStartIndex, productEndIndex);

      // Replace within this block
      let updatedBlock = productBlock;
      if (productBlock.includes(oldDevPattern) && productBlock.includes(oldProdPattern)) {
        // Replace the dev value
        updatedBlock = updatedBlock.replace(
          new RegExp(`"${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_dev"`),
          newDevValue
        );
        // Replace the prod value if in live mode
        if (!isTestMode) {
          updatedBlock = updatedBlock.replace(
            new RegExp(`"${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}_prod"`),
            newProdValue
          );
        }

        // Replace the block in the full content
        configContent =
          configContent.substring(0, productStartIndex) + updatedBlock + configContent.substring(productEndIndex);
        console.log(`   ✅ Updated successfully`);
      } else {
        console.warn(`   ⚠️  Could not find priceId patterns for ${key}`);
      }
    }

    // Write updated config
    writeFileSync(configPath, configContent, "utf-8");

    console.log("✅ Successfully updated config.js!\n");
    console.log("📋 Summary:");
    console.log(`   Mode: ${isTestMode ? "TEST" : "LIVE"}`);
    console.log(`   Products created: ${products.length}`);
    console.log(`   Prices created: ${products.length}\n`);

    if (isTestMode) {
      console.log("💡 Note: Test mode price IDs have been updated.");
      console.log("   To create production products, run:");
      console.log("   node scripts/setup-stripe-products.js --mode=live\n");
    } else {
      console.log("✅ Production price IDs have been updated!\n");
    }

    console.log("🎉 Setup complete!\n");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
