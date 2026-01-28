# Implementation Prompt: Ecommerce Website Enhancements

## Overview
Implement the following features to improve conversion rates, user trust, and overall user experience for the Unbox The Moment ecommerce website.

## Features to Implement

### 1. Testimonials Section on Homepage
- Import and use the existing `Testimonials3.js` component
- Add to homepage after the "How It Works" section or before the FAQ
- Ensure testimonials are relevant to surprise boxes/connection experiences
- Style to match the existing gold/black/white theme

### 2. Subscription Savings Display
- Calculate and display savings percentage for subscription vs one-time purchases
- Show savings badge or text on product detail pages when subscription is selected
- Example: "Save 10% with monthly subscription" or "$X savings per month"
- Update the PurchaseTypeSelector component to show savings
- Add visual indicator (badge, highlight) for subscription option

### 3. Shipping Cost Information
- Add shipping information prominently:
  - Free shipping threshold (if applicable)
  - Shipping costs for different regions
  - Estimated delivery times (already have "2-3 business days")
- Create a TrustBar component or add to footer/header
- Display shipping info on product pages and checkout flow

### 4. Trust Badges
- Add trust badges component showing:
  - Secure checkout (SSL/Stripe)
  - Money-back guarantee
  - Free shipping (if applicable)
  - Customer satisfaction guarantee
- Place in footer, product pages, or checkout area
- Use icons and concise text
- Match gold/black/white brand colors

### 5. Email Capture Popup with Discount
- Create email capture modal/popup component
- Trigger on:
  - Exit intent (mouse leaving viewport)
  - After X seconds on page
  - Before checkout
- Offer discount (e.g., "10% off your first order")
- Integrate with Resend API for email collection
- Store emails in Supabase or send to Resend
- Show success message after submission
- Respect user preferences (don't show again if dismissed)

### 6. Improved Product Descriptions
- Expand product descriptions with:
  - More detailed value propositions
  - What's actually inside (sample items without spoiling surprise)
  - Size/weight information
  - Unboxing experience description
  - Why this tier is perfect for X occasion
- Update config.js product descriptions
- Add rich formatting options if needed
- Make descriptions more compelling and specific

### 7. Gift Message Option
- Add gift message field to PreferencesForm component
- Include:
  - Recipient name
  - Gift message textarea
  - Optional: delivery date selection
- Pass gift message data to Stripe checkout metadata
- Store in order records
- Show in order confirmation

### 8. Product Comparison Table
- Add comparison table on category pages (`/boxes/[category]`)
- Show all three tiers side-by-side:
  - Essential vs Premium vs Luxury
- Compare:
  - Price
  - Features
  - What's included
  - Best for (use case)
- Make it easy to see differences
- Add "Select" buttons linking to product pages
- Style as a clean, scannable table

### 10. Related Products Section
- Add "You might also like" section on product detail pages
- Show products from:
  - Same category but different tier
  - Different categories (cross-sell)
- Use ProductCard component
- Limit to 3-4 products
- Place after product details, before unboxing gallery

### 11. Skeleton Loaders
- Add skeleton loading states for:
  - Product cards (CategoryCard, TierCard, ProductCard)
  - Product detail page images
  - Category pages
- Use shimmer effect matching brand colors
- Show during data fetching/loading
- Improve perceived performance

### 12. Enhanced Error Handling
- Improve error messages in checkout flow:
  - Specific error messages for different failure types
  - User-friendly language (not technical)
  - Retry buttons/actions
  - Clear next steps
- Add error boundaries for React errors
- Handle network errors gracefully
- Show helpful error messages in:
  - Stripe checkout creation
  - Form submissions
  - API calls

### 13. Loading States
- Add loading indicators for:
  - Checkout button (already have spinner, ensure it's visible)
  - Form submissions
  - Image loading (skeleton loaders)
  - Page transitions
- Use consistent loading UI across the site
- Match brand colors (gold accents)

## Technical Requirements

### Components to Create/Update
1. `components/TrustBar.js` - Trust badges component
2. `components/EmailCapture.js` - Email capture modal
3. `components/ProductComparison.js` - Comparison table
4. `components/RelatedProducts.js` - Related products section
5. `components/SkeletonLoader.js` - Reusable skeleton loader
6. Update `components/PreferencesForm.js` - Add gift message
7. Update `app/products/[productId]/page.js` - Add savings display, related products
8. Update `app/boxes/[category]/page.js` - Add comparison table
9. Update `app/page.js` - Add testimonials
10. Update `config.js` - Enhanced product descriptions

### API Routes to Create/Update
1. `app/api/email-capture/route.js` - Handle email submissions
2. Update `app/api/stripe/create-checkout/route.js` - Include gift message in metadata

### Database/Supabase
- Create `email_subscribers` table (if storing emails in Supabase)
- Fields: email, created_at, source, discount_code_used

## Design Guidelines
- Maintain gold (#D4AF37), black, and white color scheme
- Use existing button styles (btn-gold, btn-gold-outline)
- Match typography and spacing from existing components
- Ensure mobile responsiveness
- Follow Next.js 15 and React 19 best practices
- Use Tailwind CSS v4 syntax
- Follow DaisyUI v5 patterns

## Implementation Order
1. Trust badges and shipping info (quick wins)
2. Testimonials (builds trust)
3. Subscription savings (conversion)
4. Product descriptions (SEO & conversion)
5. Gift message (feature completeness)
6. Comparison table (helps decision making)
7. Email capture (lead generation)
8. Related products (cross-sell)
9. Loading states (UX polish)
10. Error handling (reliability)

## Testing Checklist
- [ ] All features work on mobile and desktop
- [ ] Email capture integrates with Resend/Supabase
- [ ] Gift messages appear in Stripe metadata
- [ ] Subscription savings calculate correctly
- [ ] Trust badges display properly
- [ ] Comparison table is responsive
- [ ] Loading states show appropriately
- [ ] Error messages are user-friendly
- [ ] All images load correctly
- [ ] No console errors

## Notes
- Use existing components where possible (Testimonials3, etc.)
- Maintain consistency with current codebase style
- Follow Next.js 15 async patterns (await headers, await createClient)
- Ensure all user-facing text is clear and helpful
- Test with real Stripe test mode
- Consider accessibility (ARIA labels, keyboard navigation)
