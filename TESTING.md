# Testing Stripe Checkout

## Test Card Numbers

Use these test card numbers in Stripe test mode to simulate different scenarios:

### ✅ Successful Payments

**Generic Success Card:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Visa (Success):**
- Card Number: `4242 4242 4242 4242`
- Expiry: `12/34`
- CVC: `123`

**Mastercard (Success):**
- Card Number: `5555 5555 5555 4444`
- Expiry: `12/34`
- CVC: `123`

**American Express (Success):**
- Card Number: `3782 822463 10005`
- Expiry: `12/34`
- CVC: `1234`

### ❌ Failed Payments (for testing error handling)

**Card Declined:**
- Card Number: `4000 0000 0000 0002`
- This card will always be declined

**Insufficient Funds:**
- Card Number: `4000 0000 0000 9995`
- Simulates insufficient funds

**Expired Card:**
- Card Number: `4000 0000 0000 0069`
- Simulates expired card

**Processing Error:**
- Card Number: `4000 0000 0000 0119`
- Simulates a processing error

### 🔄 3D Secure Authentication

**Requires Authentication:**
- Card Number: `4000 0027 6000 3184`
- Will trigger 3D Secure authentication flow

**Authentication Fails:**
- Card Number: `4000 0000 0000 3055`
- 3D Secure authentication will fail

## Testing Steps

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to a product page** (e.g., `/products/couples-45`)

3. **Click "Buy Now"** or the checkout button

4. **Fill in the Stripe Checkout form:**
   - Use one of the test card numbers above
   - Use any email address (e.g., `test@example.com`)
   - Fill in shipping address (use any valid US/CA address)
   - Fill in billing address

5. **Complete the purchase** - Stripe will process it as a test transaction

## Verifying Test Purchases

### In Stripe Dashboard:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/payments)
2. You should see the test payment appear
3. Click on it to see full details

### In Your App:
- Check your webhook handler (`/app/api/webhook/stripe/route.js`)
- Check your orders table in Supabase
- The order should be created automatically via webhook

## Testing Webhooks Locally

To test webhooks locally, you'll need to use Stripe CLI:

1. **Install Stripe CLI:**
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. **Login to Stripe:**
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

4. **Copy the webhook signing secret** and add it to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

5. **Trigger test events:**
   ```bash
   stripe trigger payment_intent.succeeded
   ```

## Common Test Scenarios

### Test Successful Purchase:
- Use card: `4242 4242 4242 4242`
- Complete checkout normally
- Verify order appears in admin dashboard

### Test Failed Payment:
- Use card: `4000 0000 0000 0002`
- Should show error message
- Verify no order is created

### Test Guest Checkout:
- Don't sign in
- Complete purchase as guest
- Verify order is created with email

### Test Authenticated User:
- Sign in first
- Complete purchase
- Verify order is linked to user account

## Notes

- All test transactions are free - no real money is charged
- Test cards only work in test mode (when using test API keys)
- You can use any email address for testing
- Shipping addresses can be fake but should be valid format
- Test payments appear immediately in Stripe Dashboard
