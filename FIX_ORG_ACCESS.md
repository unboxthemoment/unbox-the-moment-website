# Fix GitHub Organization Access for Vercel

The error means Vercel doesn't have access to the `unboxthemoment` GitHub organization.

## Step 1: Authorize Vercel for the Organization

### Option A: Via GitHub Organization Settings (Recommended)

1. **Go to your GitHub organization settings:**

   - Visit: https://github.com/organizations/unboxthemoment/settings/applications
   - Or: GitHub → `unboxthemoment` organization → Settings → Third-party access

2. **Find Vercel:**

   - Look for "Vercel" in the list
   - If you see it, click **"Configure"** or **"Grant"**
   - If you don't see it, go to Step 2

3. **Grant Access:**
   - Under "Repository access", select:
     - **"All repositories"** OR
     - **"Only select repositories"** → Add `unbox-the-moment-website`
   - Click **"Save"** or **"Grant access"**

### Option B: Install Vercel GitHub App for Organization

1. **Go to Vercel GitHub App:**

   - Visit: https://github.com/apps/vercel
   - Click **"Configure"**

2. **Select Organization:**

   - You'll see a list of organizations
   - Click **"Configure"** next to `unboxthemoment`

3. **Grant Repository Access:**
   - Select **"Only select repositories"**
   - Choose: `unbox-the-moment-website`
   - Click **"Install"**

### Option C: Via Vercel Dashboard

1. **Go to Vercel Integrations:**

   - Visit: https://vercel.com/account/integrations
   - Find **GitHub** integration
   - Click **"Configure"**

2. **Authorize Organization:**

   - You'll see a list of organizations
   - Make sure `unboxthemoment` is authorized
   - Grant access to repositories

3. **Try Connecting Again:**
   ```bash
   vercel git connect
   ```

---

## Step 2: Check Repository Visibility

Make sure the repository exists and is accessible:

1. **Check if repo is private:**

   - Go to: https://github.com/unboxthemoment/unbox-the-moment-website
   - If it's private, Vercel needs explicit access
   - If it's public, Vercel should be able to access it

2. **If repo is private:**
   - You MUST grant Vercel access via organization settings
   - Go to: https://github.com/organizations/unboxthemoment/settings/applications
   - Authorize Vercel for the organization

---

## Step 3: Verify Access

After granting access, verify it worked:

1. **Check GitHub App Installation:**

   - Go to: https://github.com/organizations/unboxthemoment/settings/installations
   - Find **Vercel**
   - Click **"Configure"**
   - Verify `unbox-the-moment-website` is listed under "Repository access"

2. **Try Connecting Again:**
   ```bash
   vercel git connect
   ```

---

## Step 4: Alternative - Make Repo Public Temporarily

If organization permissions are stuck, you can temporarily make the repo public:

1. **Go to repo settings:**

   - https://github.com/unboxthemoment/unbox-the-moment-website/settings
   - Scroll to bottom → "Danger Zone"
   - Click **"Change visibility"** → **"Make public"**

2. **Connect in Vercel:**

   ```bash
   vercel git connect
   ```

3. **Make it private again** (after connecting):
   - Go back to settings
   - Change visibility back to private
   - Vercel will still have access if permissions were granted

---

## Troubleshooting

### "Failed to connect" Error Still Appears

**Try this:**

1. **Disconnect and reconnect GitHub in Vercel:**

   - Go to: https://vercel.com/account/integrations
   - Disconnect GitHub
   - Reconnect and authorize organization access

2. **Check if you're an organization owner/admin:**

   - Only org owners/admins can grant third-party app access
   - If you're not, ask an org admin to grant Vercel access

3. **Use a different approach:**
   - Deploy without Git connection first
   - Then connect Git via Vercel Dashboard (Settings → Git)
   - Sometimes this works better than CLI

### Still Not Working?

**Manual deployment with auto-deploy via GitHub Actions:**

If Vercel Git connection keeps failing, you can set up GitHub Actions to auto-deploy:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

2. Get Vercel tokens from: https://vercel.com/account/tokens
3. Add them as GitHub secrets

---

**Try Step 1 (Option B) first - installing the Vercel GitHub App for the organization. That's usually the most reliable way.**
