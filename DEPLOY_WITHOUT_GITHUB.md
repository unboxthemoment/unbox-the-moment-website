# Deploy Without GitHub Connection (Workaround)

Since GitHub permissions aren't working, let's deploy directly and connect Git later.

## Step 1: Deploy via CLI

```bash
# Make sure you're in the project directory
cd /Users/joshuakarasik/Developer/unbox-the-moment

# Login to Vercel (use YOUR personal account, not team)
vercel login

# Deploy to production (this will create a new project)
vercel --prod
```

**When prompted:**

- Set up and deploy? **Yes**
- Which scope? **Select YOUR personal account** (not "Mika's projects")
- Link to existing project? **No**
- Project name? **unbox-the-moment** (or your choice)
- Directory? **./**
- Override settings? **No**
- **Skip Git connection** (just press Enter or say No)

## Step 2: Add Environment Variables

After deployment, add your environment variables:

1. Go to: https://vercel.com/dashboard
2. Click on your project: `unbox-the-moment`
3. Go to **Settings** → **Environment Variables**
4. Add all variables from your `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**Important:** Set these for **Production** environment.

## Step 3: Redeploy

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

Or go to Vercel Dashboard → Deployments → Click "Redeploy"

## Step 4: Connect GitHub Later (Optional)

Once deployed, you can try connecting GitHub:

1. Go to: Vercel Dashboard → Your Project → **Settings** → **Git**
2. Click **"Connect Git Repository"**
3. Try connecting again (permissions might work now)

**OR** just deploy manually when needed:

```bash
git push  # Push to GitHub
vercel --prod  # Deploy to Vercel
```

## Step 5: Add Custom Domain

1. Go to: Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `unboxthemoment.com`
4. Follow DNS setup instructions

---

**This approach works around the GitHub permission issue and gets you deployed immediately!**
