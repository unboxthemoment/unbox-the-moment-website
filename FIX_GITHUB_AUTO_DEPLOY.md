# Fix GitHub Auto-Deployment in Vercel

## Method 1: Fix GitHub App Permissions (Try This First)

### Step 1: Disconnect GitHub from Vercel Completely

1. Go to: https://vercel.com/account/integrations
2. Find **GitHub** integration
3. Click **"Disconnect"** or **"Remove"**
4. Confirm disconnection

### Step 2: Re-authorize GitHub in Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. You'll be prompted to authorize GitHub
4. Click **"Authorize Vercel"**
5. **IMPORTANT:** When authorizing, make sure to:
   - Grant access to **"All repositories"** OR select `unboxthemoment/unbox-the-moment-website`
   - If `unboxthemoment` is an organization, authorize access to that organization
   - Check the box for organization access if prompted

### Step 3: Grant Organization Access (If Repo is Under Org)

If `unboxthemoment` is a GitHub organization:

1. Go to: https://github.com/organizations/unboxthemoment/settings/applications
2. Under **"Third-party access"**, find **Vercel**
3. Click **"Grant"** or **"Configure"**
4. Ensure **"All repositories"** or the specific repo is selected
5. Click **"Save"**

### Step 4: Try Import Again

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Search for: `unboxthemoment/unbox-the-moment-website`
4. Click **Import**

---

## Method 2: Deploy First, Then Connect Git

If Method 1 doesn't work, deploy first then connect Git:

### Step 1: Deploy Without Git

```bash
# Login to YOUR account
vercel login

# Deploy (skip Git connection)
vercel --prod
# When asked about Git, say NO or skip it
```

### Step 2: Connect Git After Deployment

1. Go to: https://vercel.com/dashboard
2. Click on your project: `unbox-the-moment`
3. Go to **Settings** → **Git**
4. Click **"Connect Git Repository"**
5. Search for: `unboxthemoment/unbox-the-moment-website`
6. Click **Connect**

**If it still says "Could not access":**

- Click **"Adjust GitHub App Permissions"**
- This will take you to GitHub to authorize
- Grant access to the repository/organization
- Come back and try again

---

## Method 3: Use GitHub App Installation (Most Reliable)

### Step 1: Install Vercel GitHub App

1. Go to: https://github.com/apps/vercel
2. Click **"Configure"**
3. Select **"Only select repositories"**
4. Choose: `unboxthemoment/unbox-the-moment-website`
5. Click **"Install"**

### Step 2: Authorize Organization (If Needed)

If the repo is under an organization:

1. Go to: https://github.com/organizations/unboxthemoment/settings/installations
2. Find **Vercel** installation
3. Click **"Configure"**
4. Under **"Repository access"**, ensure your repo is selected
5. Click **"Save"**

### Step 3: Import in Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. The repo should now appear
4. Click **Import**

---

## Method 4: Manual Git Connection via CLI

If dashboard doesn't work, try CLI:

```bash
# Deploy first (without Git)
vercel --prod

# Then link Git repository
vercel git connect

# Follow prompts to connect to GitHub
# It will ask for the repo URL: unboxthemoment/unbox-the-moment-website
```

---

## Troubleshooting: "Save" Button Does Nothing

If clicking "Save" in GitHub settings does nothing:

1. **Try a different browser** (Chrome, Firefox, Safari)
2. **Clear browser cache** and try again
3. **Disable browser extensions** (ad blockers, privacy tools)
4. **Try incognito/private mode**
5. **Check browser console** (F12) for JavaScript errors

### Alternative: Use GitHub CLI

```bash
# Install GitHub CLI if not installed
brew install gh

# Login to GitHub
gh auth login

# Check repo access
gh repo view unboxthemoment/unbox-the-moment-website

# If you can see it, Vercel should be able to too
```

---

## Verify Auto-Deployment Works

After connecting:

1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Go to: https://vercel.com/dashboard → Your Project → **Deployments**
4. You should see a new deployment automatically triggered

---

## Still Not Working?

If nothing works, you can manually trigger deployments:

```bash
# After each git push, run:
vercel --prod
```

Or set up a GitHub Action to auto-deploy (more complex but reliable).

Let me know which method works for you!
