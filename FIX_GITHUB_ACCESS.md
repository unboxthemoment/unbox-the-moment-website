# Fix GitHub Repository Access in Vercel

## Step 1: Check Repository Visibility

First, verify the repo exists and is accessible:

- Go to: https://github.com/unboxthemoment/unbox-the-moment-website
- Make sure you can access it (it might be private)

## Step 2: Update Vercel GitHub App Permissions

1. **Go to GitHub Settings:**

   - Visit: https://github.com/settings/applications
   - Or: GitHub → Your Profile → Settings → Applications → Authorized OAuth Apps

2. **Find Vercel:**

   - Look for "Vercel" in the list
   - Click on it

3. **Grant Repository Access:**

   - Under "Repository access", select:
     - **"All repositories"** (easiest)
     - OR **"Only select repositories"** → Add `unboxthemoment/unbox-the-moment-website`
   - Click **"Save"**

4. **Grant Organization Access (if repo is under org):**
   - If `unboxthemoment` is an organization, grant Vercel access to that org
   - Go to: https://github.com/organizations/unboxthemoment/settings/applications
   - Authorize Vercel for the organization

## Step 3: Re-authorize Vercel in Vercel Dashboard

1. Go to: https://vercel.com/account/integrations
2. Find **GitHub** integration
3. Click **"Configure"** or **"Reconnect"**
4. Authorize access to repositories
5. Make sure to grant access to `unboxthemoment` organization if needed

## Step 4: Try Import Again

1. Go back to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. You should now see: `unboxthemoment/unbox-the-moment-website`
4. Click **Import**

## Alternative: Manual Deploy (If GitHub Still Doesn't Work)

If GitHub access still doesn't work, you can deploy manually:

### Option A: Deploy via CLI with Personal Account

```bash
# Logout and login with your personal account
vercel logout
vercel login

# Deploy (this will create a new project under your account)
vercel --prod
```

### Option B: Deploy via Dashboard (Drag & Drop)

1. Go to: https://vercel.com/new
2. Click **"Deploy"** tab (not Import)
3. Install Vercel CLI: `npm i -g vercel`
4. Run: `vercel --prod` (this will give you a deploy URL)
5. Or drag your project folder directly

### Option C: Use GitHub CLI to Make Repo Public (Temporary)

If the repo is private and you want to test:

```bash
# Make repo public temporarily (you can make it private again later)
gh repo edit unboxthemoment/unbox-the-moment-website --visibility public

# Then try importing in Vercel again
# After deployment, you can make it private again:
gh repo edit unboxthemoment/unbox-the-moment-website --visibility private
```

## Troubleshooting

### "Could not access the repository" Error

**Common causes:**

1. **Repo is private** → Grant Vercel access in GitHub settings
2. **Vercel doesn't have org access** → Authorize Vercel for the organization
3. **GitHub app permissions outdated** → Re-authorize in GitHub settings
4. **Wrong GitHub account** → Make sure you're logged into the right GitHub account

### Check GitHub App Permissions

Go to: https://github.com/settings/installations

1. Find **Vercel** installation
2. Click **"Configure"**
3. Under **"Repository access"**, ensure:
   - `unboxthemoment/unbox-the-moment-website` is selected
   - OR "All repositories" is selected
4. Under **"Organization access"**, ensure:
   - `unboxthemoment` organization is authorized

### Still Not Working?

Try this:

1. **Disconnect and reconnect GitHub:**

   - Vercel Dashboard → Settings → Git → Disconnect
   - Then reconnect and authorize

2. **Use a different method:**

   - Deploy via CLI: `vercel --prod` (creates project without Git)
   - Then connect Git later via dashboard

3. **Check repo URL:**
   - Make sure the exact URL is: `https://github.com/unboxthemoment/unbox-the-moment-website`
   - No typos in the organization or repo name
