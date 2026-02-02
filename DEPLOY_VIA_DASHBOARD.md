# Deploy via Vercel Dashboard (No Team Required)

Since team collaboration requires Pro plan, deploy directly via the dashboard:

## Step 1: Go to Vercel Dashboard

1. Visit: [vercel.com/new](https://vercel.com/new)
2. Sign in with your account

## Step 2: Import Your GitHub Repository

1. Click **"Import Git Repository"**
2. If you see your repo `unboxthemoment/unbox-the-moment-website`, click **Import**
3. If not listed:
   - Click **"Adjust GitHub App Permissions"**
   - Authorize Vercel to access your repositories
   - Refresh and try again

## Step 3: Configure Project

**Project Settings:**

- **Project Name:** `unbox-the-moment` (or your choice)
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (default)
- **Build Command:** `npm run build` (default)
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install` (default)

**Environment Variables:**
Click **"Environment Variables"** and add these (from your `.env.local`):

```
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Important:**

- Set these for **Production** environment (not Preview/Development)
- For production, you'll need to add LIVE Stripe keys later

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://unbox-the-moment-[random].vercel.app`

## Step 5: Add Custom Domain

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `unboxthemoment.com`
4. Follow DNS setup instructions
5. Wait for SSL certificate (automatic, ~5 minutes)

## Step 6: Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Endpoint URL: `https://unboxthemoment.com/api/webhook/stripe`
4. Select events: `checkout.session.completed`, `checkout.session.expired`
5. Copy the webhook secret
6. Add it to Vercel → Settings → Environment Variables as `STRIPE_WEBHOOK_SECRET`

---

## Alternative: Deploy Without GitHub (Manual Upload)

If GitHub import doesn't work:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Deploy"** tab (not Import)
3. Drag and drop your project folder
4. Configure environment variables
5. Deploy

---

**Note:** This creates a project under YOUR account, not the team account. You'll have full control and can deploy without team permissions.
