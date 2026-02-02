const config = {
  // REQUIRED
  appName: "Unbox The Moment",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "It's hard to plan fun things with friends. We help you build connections and rediscover the purpose of seeing people.",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "unboxthemoment.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (resend.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Legacy plans array for backwards compatibility - will be deprecated
    plans: [],
  },
  // Product categories for the surprise box platform
  categories: [
    {
      id: "couples",
      name: "Couple's Edition",
      slug: "couples",
      description: "Rekindle your connection with curated surprises designed for two.",
      image: "/images/categories/romatic-hero.jpeg",
      heroImage: "/images/categories/romatic-hero.jpeg",
    },
    {
      id: "family",
      name: "Family Edition",
      slug: "family",
      description: "Create unforgettable moments with activities for 2-5 people.",
      image: "/images/categories/family-hero.jpeg",
      heroImage: "/images/categories/family-hero.jpeg",
      peopleCount: "2-5 people",
    },
    {
      id: "girls-night",
      name: "Girls Night Edition",
      slug: "girls-night",
      description: "Everything you need for an unforgettable night with your favorite people.",
      image: "/images/categories/girls-hero.jpeg",
      heroImage: "/images/categories/girls-hero.jpeg",
      peopleCount: "2-5 people",
    },
    {
      id: "self-care",
      name: "Self Care Edition",
      slug: "self-care",
      description: "Treat yourself to a curated experience of relaxation and rejuvenation.",
      image: "/images/categories/selfcare-hero.jpeg",
      heroImage: "/images/categories/selfcare-hero.jpeg",
    },
  ],
  // 12 box products across 4 categories
  products: [
    // Couple's Edition - $35, $45, $60
    {
      id: "couples-35",
      category: "couples",
      categoryName: "Couple's Edition",
      name: "Couple's Edition",
      price: 35,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDMDmT1D25TGdgoa4pLiY" : "price_couples_35_prod",
      tier: "essential",
      tierName: "Essential",
      description:
        "Everything you need for a cozy date night at home. Skip the planning and focus on each other with conversation cards designed to spark meaningful dialogue, a fun activity you can enjoy together, and artisan treats to share. Perfect for busy couples who want to reconnect without the hassle.",
      shortDescription: "A thoughtfully curated date night experience to spark connection.",
      features: [
        "Conversation starter deck (50+ prompts)",
        "Couple's activity for two",
        "Artisan sweet treat to share",
        "Beautiful packaging for gifting",
      ],
      bestFor: "Weekly date nights, busy schedules, trying us out",
      image: "/images/boxes/couple-edition.png",
    },
    {
      id: "couples-45",
      category: "couples",
      categoryName: "Couple's Edition",
      name: "Couple's Edition",
      price: 45,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDMDmT1D25TGdzFeElOvG" : "price_couples_45_prod",
      tier: "premium",
      tierName: "Premium",
      description:
        "Take your date night to the next level with our most popular tier. Includes everything in Essential plus upgraded activities, gourmet treats from local artisans, and a surprise bonus item that adds an extra element of delight. The perfect balance of value and experience for couples who want something special.",
      shortDescription: "An elevated date experience with premium surprises.",
      features: [
        "Premium conversation deck (100+ prompts)",
        "Upgraded couple's activity",
        "Gourmet artisan treats (2-3 items)",
        "Surprise bonus item",
        "Elegant gift-ready packaging",
      ],
      bestFor: "Monthly date nights, anniversaries, thoughtful gifts",
      isFeatured: true,
      image: "/images/boxes/couple-edition.png",
    },
    {
      id: "couples-60",
      category: "couples",
      categoryName: "Couple's Edition",
      name: "Couple's Edition",
      price: 60,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDNDmT1D25TGdSUINwspY" : "price_couples_60_prod",
      tier: "luxury",
      tierName: "Luxury",
      description:
        "Our most indulgent romantic experience. Features our signature premium conversation deck, a luxury activity experience, hand-selected artisan treats, a beautiful keepsake item you'll treasure, and an exclusive surprise you won't find anywhere else. Designed for special occasions and couples who appreciate the finer things.",
      shortDescription: "The ultimate romantic experience with luxury curations.",
      features: [
        "Signature conversation deck (150+ prompts)",
        "Luxury activity experience",
        "Curated artisan treats (4-5 items)",
        "Keepsake item to treasure",
        "Exclusive subscriber-only surprise",
        "Luxury presentation box",
      ],
      bestFor: "Special occasions, Valentine's Day, milestone celebrations",
      image: "/images/boxes/couple-edition.png",
    },
    // Family Edition - $35, $45, $60
    {
      id: "family-35",
      category: "family",
      categoryName: "Family Edition",
      name: "Family Edition",
      price: 35,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDNDmT1D25TGd3eNFM70H" : "price_family_35_prod",
      tier: "essential",
      tierName: "Essential",
      description:
        "Create lasting family memories without the screen time. This box includes an engaging family game everyone can play, a hands-on group activity, and plenty of shareable snacks to fuel the fun. Perfect for 2-5 family members of all ages. Everything arrives ready to play – no prep required.",
      shortDescription: "Quality time activities for the whole family (2-5 people).",
      features: [
        "Family-friendly game (all ages)",
        "Group activity for 2-5 players",
        "Shareable snacks for everyone",
        "Activity instructions included",
      ],
      bestFor: "Family game nights, rainy days, weekend fun",
      image: "/images/boxes/family-edition.png",
    },
    {
      id: "family-45",
      category: "family",
      categoryName: "Family Edition",
      name: "Family Edition",
      price: 45,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDODmT1D25TGd5GeCmgxP" : "price_family_45_prod",
      tier: "premium",
      tierName: "Premium",
      description:
        "Our best-selling family box takes togetherness to the next level. Includes a premium family game with replayability, a creative group activity everyone can contribute to, gourmet snacks the whole family will love, and a bonus surprise that adds extra excitement. Perfect for making ordinary days extraordinary.",
      shortDescription: "Enhanced family bonding with premium activities (2-5 people).",
      features: [
        "Premium family game (high replay value)",
        "Creative group activity",
        "Gourmet family-friendly snacks",
        "Bonus surprise item",
        "Beautiful keepsake packaging",
      ],
      bestFor: "Monthly family nights, birthdays, holiday gatherings",
      isFeatured: true,
      image: "/images/boxes/family-edition.png",
    },
    {
      id: "family-60",
      category: "family",
      categoryName: "Family Edition",
      name: "Family Edition",
      price: 60,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDODmT1D25TGdL0i99WtE" : "price_family_60_prod",
      tier: "luxury",
      tierName: "Luxury",
      description:
        "The ultimate family experience box. Features a luxury game set you'll play for years, a premium group activity with professional-quality materials, artisan treats for the whole family, a keepsake item to remember the experience, and an exclusive surprise. Perfect for special family occasions and creating traditions.",
      shortDescription: "The ultimate family experience with luxury items (2-5 people).",
      features: [
        "Luxury game set (heirloom quality)",
        "Premium group activity with pro materials",
        "Artisan treats for all ages",
        "Family keepsake item",
        "Exclusive surprise",
        "Premium presentation",
      ],
      bestFor: "Special occasions, starting traditions, milestone celebrations",
      image: "/images/boxes/family-edition.png",
    },
    // Girls Night Edition - $45, $55, $65
    {
      id: "girls-night-45",
      category: "girls-night",
      categoryName: "Girls Night Edition",
      name: "Girls Night Edition",
      price: 45,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDPDmT1D25TGdv930yyDC" : "price_girls_night_45_prod",
      tier: "essential",
      tierName: "Essential",
      description:
        "Everything you need for an unforgettable night with your favorite people. Includes hilarious party games that get everyone laughing, pampering items to feel fabulous, and delicious sweet treats to share. Perfect for 2-5 friends who want a ready-made girls night without the planning stress.",
      shortDescription: "Everything you need for a memorable night in (2-5 people).",
      features: [
        "Party games (2-5 players)",
        "Pampering items for each guest",
        "Sweet treats to share",
        "Party playlist suggestions",
      ],
      bestFor: "Casual catch-ups, birthday celebrations, wine nights",
      image: "/images/boxes/girls-night.jpg",
    },
    {
      id: "girls-night-55",
      category: "girls-night",
      categoryName: "Girls Night Edition",
      name: "Girls Night Edition",
      price: 55,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDQDmT1D25TGdpWDiNHo4" : "price_girls_night_55_prod",
      tier: "premium",
      tierName: "Premium",
      description:
        "Elevate your girls night with spa-quality pampering, premium party games, and gourmet treats. This fan-favorite includes upgraded beauty items, games designed for deep conversations and big laughs, artisan snacks, and a bonus surprise. The perfect excuse to gather your people for a night of self-care and connection.",
      shortDescription: "Elevated girls night with premium pampering (2-5 people).",
      features: [
        "Premium party games with conversation cards",
        "Spa-quality pampering items",
        "Gourmet treats & snacks",
        "Bonus surprise item",
        "Themed party guide",
      ],
      bestFor: "Bachelorette parties, milestone birthdays, monthly gatherings",
      isFeatured: true,
      image: "/images/boxes/girls-night.jpg",
    },
    {
      id: "girls-night-65",
      category: "girls-night",
      categoryName: "Girls Night Edition",
      name: "Girls Night Edition",
      price: 65,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDQDmT1D25TGdP6OhceE1" : "price_girls_night_65_prod",
      tier: "luxury",
      tierName: "Luxury",
      description:
        "The ultimate girls night experience. Features luxury party games for unforgettable moments, premium spa items from top beauty brands, artisan treats sourced from local makers, a keepsake item for each guest, and exclusive surprises. Perfect for bridal showers, significant birthdays, or any occasion that calls for something extraordinary.",
      shortDescription: "The ultimate girls night experience (2-5 people).",
      features: [
        "Luxury party games & activities",
        "Premium spa items (top brands)",
        "Artisan treats & beverages",
        "Keepsake for each guest",
        "Exclusive surprises",
        "Luxury presentation",
      ],
      bestFor: "Bridal showers, milestone birthdays, special celebrations",
      image: "/images/boxes/girls-night.jpg",
    },
    // Self Care Edition - $29, $39, $49
    {
      id: "self-care-29",
      category: "self-care",
      categoryName: "Self Care Edition",
      name: "Self Care Edition",
      price: 29,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDRDmT1D25TGdHo3gX3Vw" : "price_self_care_29_prod",
      tier: "essential",
      tierName: "Essential",
      description:
        "Your personal retreat in a box. Includes a carefully selected relaxation item, a mindful self-care activity to help you unwind, and a comforting treat to enjoy. Everything you need to carve out time for yourself and recharge. Because you deserve a moment of peace.",
      shortDescription: "A curated moment of peace and self-love.",
      features: [
        "Relaxation item (candle or bath)",
        "Self-care activity guide",
        "Comfort treat",
        "Mindfulness prompts",
      ],
      bestFor: "Weekly self-care, stress relief, trying us out",
      image: "/images/boxes/self-care.png",
    },
    {
      id: "self-care-39",
      category: "self-care",
      categoryName: "Self Care Edition",
      name: "Self Care Edition",
      price: 39,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDRDmT1D25TGdc9n52z2b" : "price_self_care_39_prod",
      tier: "premium",
      tierName: "Premium",
      description:
        "Our most popular self-care experience. Features premium relaxation items from curated wellness brands, a thoughtful mindfulness activity, gourmet treats to indulge in, and a bonus surprise. Designed to help you create a sanctuary wherever you are and make self-care a consistent practice.",
      shortDescription: "Elevated self-care with premium relaxation items.",
      features: [
        "Premium relaxation items (2-3)",
        "Guided mindfulness activity",
        "Gourmet comfort treats",
        "Bonus surprise item",
        "Self-care ritual guide",
      ],
      bestFor: "Monthly reset, birthday gift, wellness routine",
      isFeatured: true,
      image: "/images/boxes/self-care.png",
    },
    {
      id: "self-care-49",
      category: "self-care",
      categoryName: "Self Care Edition",
      name: "Self Care Edition",
      price: 49,
      priceId: process.env.NODE_ENV === "development" ? "price_1SvrDSDmT1D25TGdyUeo62iN" : "price_self_care_49_prod",
      tier: "luxury",
      tierName: "Luxury",
      description:
        "The ultimate in self-indulgence. Features luxury spa items from premium wellness brands, a comprehensive wellness activity experience, artisan treats for guilt-free indulgence, a beautiful keepsake to remember the experience, and exclusive surprises. Transform any space into your personal spa retreat.",
      shortDescription: "The ultimate in self-indulgence and relaxation.",
      features: [
        "Luxury spa items (premium brands)",
        "Premium wellness experience",
        "Artisan treats (4-5 items)",
        "Keepsake item",
        "Exclusive surprises",
        "Luxury presentation box",
      ],
      bestFor: "Special occasions, major milestones, luxury gifts",
      image: "/images/boxes/self-care.png",
    },
  ],
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  resend: {
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Unbox The Moment <noreply@unboxthemoment.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Unbox The Moment <hello@unboxthemoment.com>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@unboxthemoment.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode).
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..).
    // Gold - the primary accent color for Unbox The Moment
    main: "#D4AF37",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
  // Shipping information
  shipping: {
    estimatedDays: "3-5 business days",
    message: "Surprise box arrives in 3-5 business days",
  },
  // Image paths for products by category
  productImages: {
    couples: "/images/boxes/couple-edition.png",
    family: "/images/boxes/family-edition.png",
    "girls-night": "/images/boxes/girls-night.jpg",
    "self-care": "/images/boxes/self-care.png",
  },
  // Image paths for tiers
  tierImages: {
    essential: "/images/tiers/essential.jpeg",
    premium: "/images/tiers/premium.jpeg",
    luxury: "/images/tiers/premium.jpeg", // Using premium as fallback until luxury image is added
  },
  // Unboxing experience images
  unboxingImages: ["/images/unboxing-experiences/unboxing1.jpeg", "/images/unboxing-experiences/unboxing2.jpeg"],
};

// Helper function to get products by category
const getProductsByCategory = (categorySlug) => {
  return config.products.filter((product) => product.category === categorySlug);
};

// Helper function to get a single product by ID
const getProductById = (productId) => {
  return config.products.find((product) => product.id === productId);
};

// Helper function to get category info by slug
const getCategoryBySlug = (slug) => {
  return config.categories.find((category) => category.slug === slug);
};

// Helper function to get featured product for a category
const getFeaturedProductByCategory = (categorySlug) => {
  return config.products.find((product) => product.category === categorySlug && product.isFeatured);
};

module.exports = config;
