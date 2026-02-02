# Deployment Guide - Connecting GitHub Repo to Vercel

## Option 1: Connect via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard:**

   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project: `unbox-the-moment`

2. **Connect GitHub Repository:**

   - Go to **Settings** → **Git**
   - Click **Connect Git Repository**
   - Select **GitHub**
   - Authorize Vercel to access your GitHub account (if not already done)
   - Search for: `unboxthemoment/unbox-the-moment-website`
   - Click **Connect**

3. **Verify Connection:**
   - You should see the repo connected
   - Future pushes to `main` branch will auto-deploy

## Option 2: Skip Git Connection (Manual Deploy)

If you don't want to connect Git right now, you can deploy manually:

```bash
# Deploy to production
vercel --prod

# This will deploy without Git integration
# You can connect Git later via the dashboard
```

## Option 3: Fix via CLI

If the repo name is wrong or you want to reconnect:

```bash
# Remove the .vercel directory
rm -rf .vercel

# Redeploy and skip Git connection
vercel --prod

# Then connect via dashboard (Option 1)
```

## Troubleshooting

### "Failed to connect repository" Error

**Possible causes:**

1. **Repo doesn't exist** - Check the repo URL is correct
2. **Vercel doesn't have access** - Authorize Vercel in GitHub settings
3. **Repo is private** - Make sure Vercel has access to private repos
4. **Wrong repo name** - Verify the exact repo name matches

**Fix:**

1. Go to GitHub → Settings → Applications → Authorized OAuth Apps
2. Find Vercel and ensure it has access to your repos
3. Or go to Vercel Dashboard → Settings → Git → Reconnect

### Check Your Repo Name

Your current repo is:

```
https://github.com/unboxthemoment/unbox-the-moment-website.git
```

Make sure Vercel is looking for:

- Owner: `unboxthemoment`
- Repo: `unbox-the-moment-website`

## After Connecting

Once connected, Vercel will:

- ✅ Auto-deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Show deployment status in GitHub

## Next Steps

After connecting:

1. Push your code: `git push origin main`
2. Vercel will automatically deploy
3. Add your domain in Vercel Dashboard → Settings → Domains
4. Configure environment variables in Vercel Dashboard → Settings → Environment Variables
