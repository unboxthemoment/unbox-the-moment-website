# Domain Setup Guide for unboxthemoment.com

This guide will walk you through setting up your domain for production deployment.

## Prerequisites

- Domain: `unboxthemoment.com` (purchased from a domain registrar)
- Next.js app ready for deployment
- Vercel account (recommended for Next.js) or another hosting provider

---

## Step 1: Purchase Domain (if not already owned)

If you don't own `unboxthemoment.com` yet:

1. **Choose a domain registrar:**

   - [Namecheap](https://www.namecheap.com/) - Popular and affordable
   - [Google Domains](https://domains.google/) - Simple interface
   - [Cloudflare](https://www.cloudflare.com/products/registrar/) - Great DNS management
   - [GoDaddy](https://www.godaddy.com/) - Widely used

2. **Purchase the domain:**
   - Search for `unboxthemoment.com`
   - Complete the purchase
   - Note: Domain registration typically takes a few minutes to hours to propagate

---

## Step 2: Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps with automatic SSL and domain management.

### 2.1 Install Vercel CLI (if not already installed)

```bash
npm i -g vercel
```

### 2.2 Deploy Your App

```bash
# From your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? unbox-the-moment (or your choice)
# - Directory? ./
# - Override settings? No
```

### 2.3 Production Deployment

```bash
vercel --prod
```

This will give you a URL like: `https://unbox-the-moment.vercel.app`

---

## Step 3: Connect Domain to Vercel

### 3.1 Add Domain in Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`unbox-the-moment`)
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `unboxthemoment.com`
6. Click **Add**

### 3.2 Configure DNS Records

Vercel will show you DNS records to add. You have two options:

#### Option A: Use Vercel Nameservers (Easiest)

1. Copy the nameservers Vercel provides (e.g., `ns1.vercel-dns.com`)
2. Go to your domain registrar's DNS settings
3. Replace your current nameservers with Vercel's nameservers
4. Wait for DNS propagation (5 minutes to 48 hours)

#### Option B: Add DNS Records Manually (More Control)

Add these DNS records in your domain registrar's DNS settings:

**For Root Domain (unboxthemoment.com):**

- Type: `A`
- Name: `@` or blank
- Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current IP)

**For WWW Subdomain (www.unboxthemoment.com):**

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or what Vercel shows)

**Alternative: Use CNAME for root domain (if your registrar supports it):**

- Some registrars (like Cloudflare) support CNAME flattening
- Type: `CNAME`
- Name: `@`
- Value: `cname.vercel-dns.com`

### 3.3 Verify Domain

1. Wait for DNS propagation (check with: `dig unboxthemoment.com` or use [whatsmydns.net](https://www.whatsmydns.net))
2. Vercel will automatically verify and provision SSL certificate
3. Your site should be live at `https://unboxthemoment.com`

---

## Step 4: Update Environment Variables

### 4.1 Add Environment Variables in Vercel

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add all variables from your `.env.local`:

```
RESEND_API_KEY=re_FMz5xe5F_GtvdNVwkcpA1VFoipzZuU2kW
NEXT_PUBLIC_SUPABASE_URL=https://rhetbnjvozgvjtlnjfoc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_PUBLIC_KEY=pk_live_... (Use LIVE keys for production!)
STRIPE_SECRET_KEY=sk_live_... (Use LIVE keys for production!)
STRIPE_WEBHOOK_SECRET=whsec_... (Get from Stripe Dashboard)
```

**Important:**

- Use **LIVE** Stripe keys for production (not test keys)
- Get webhook secret from Stripe Dashboard → Webhooks → Your endpoint

### 4.2 Set Production Environment

Make sure to set these for **Production** environment (not Preview or Development).

---

## Step 5: Set Up Stripe Webhooks for Production

### 5.1 Create Webhook Endpoint in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Endpoint URL: `https://unboxthemoment.com/api/webhook/stripe`
4. Select events to listen to:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - (Add others as needed)
5. Click **Add endpoint**

### 5.2 Get Webhook Secret

1. After creating the endpoint, click on it
2. Copy the **Signing secret** (starts with `whsec_`)
3. Add it to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

### 5.3 Test Webhook

1. Make a test purchase on your live site
2. Check Stripe Dashboard → Webhooks → Your endpoint → **Recent events**
3. Verify events are being received successfully

---

## Step 6: Verify Resend Domain (for Email)

To send real order confirmation emails, verify your domain in Resend:

### 6.1 Add Domain in Resend

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **Add Domain**
3. Enter: `unboxthemoment.com`
4. Click **Add Domain**

### 6.2 Add DNS Records

Resend will provide DNS records to add. Add these to your domain's DNS:

**SPF Record:**

- Type: `TXT`
- Name: `@` or blank
- Value: `v=spf1 include:resend.com ~all`

**DKIM Record:**

- Type: `TXT`
- Name: `resend._domainkey` (or what Resend provides)
- Value: (Provided by Resend)

**DMARC Record (Optional but recommended):**

- Type: `TXT`
- Name: `_dmarc`
- Value: `v=DMARC1; p=none; rua=mailto:dmarc@unboxthemoment.com`

### 6.3 Verify Domain

1. Wait for DNS propagation (5-15 minutes)
2. Go back to Resend Domains
3. Click **Verify** next to your domain
4. Once verified, add to Vercel environment variables:
   ```
   RESEND_DOMAIN_VERIFIED=true
   ```

---

## Step 7: Update Config for Production

Your `config.js` already has the domain set correctly:

```javascript
domainName: "unboxthemoment.com",
```

Make sure your `resend.fromAdmin` email matches your verified domain:

```javascript
fromAdmin: `Unbox The Moment <hello@unboxthemoment.com>`,
```

---

## Step 8: Create Stripe Products in Live Mode

Before going live, create your products in Stripe's **Live Mode**:

```bash
# Run the setup script with live mode
node scripts/setup-stripe-products.js --mode=live
```

This will:

- Create products in Stripe Live mode
- Update your config with production price IDs
- Make sure to commit these changes

---

## Step 9: Test Everything

### Checklist:

- [ ] Domain resolves: `https://unboxthemoment.com` loads your site
- [ ] SSL certificate is active (green lock in browser)
- [ ] Test purchase works end-to-end
- [ ] Order confirmation email is received
- [ ] Webhook events are processed in Stripe Dashboard
- [ ] Orders appear in your admin dashboard
- [ ] Thank you page displays after purchase

---

## Troubleshooting

### Domain Not Resolving

1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
2. Verify DNS records are correct
3. Wait up to 48 hours for full propagation
4. Clear DNS cache: `sudo dscacheutil -flushcache` (Mac) or restart router

### SSL Certificate Issues

- Vercel automatically provisions SSL certificates
- Wait 5-15 minutes after domain verification
- Check Vercel Dashboard → Domains → SSL status

### Emails Not Sending

- Verify domain in Resend Dashboard
- Check DNS records (SPF, DKIM) are correct
- Verify `RESEND_DOMAIN_VERIFIED=true` is set in Vercel
- Check Resend Dashboard → Emails for delivery status

### Webhooks Not Working

- Verify webhook URL is correct: `https://unboxthemoment.com/api/webhook/stripe`
- Check webhook secret matches in Vercel environment variables
- Test webhook in Stripe Dashboard → Webhooks → Send test webhook

---

## Additional Resources

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Resend Domain Verification](https://resend.com/docs/dashboard/domains/introduction)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## Quick Reference: DNS Records Summary

**For Vercel:**

- A Record: `@` → `76.76.21.21` (or CNAME to `cname.vercel-dns.com`)
- CNAME: `www` → `cname.vercel-dns.com`

**For Resend:**

- TXT: `@` → `v=spf1 include:resend.com ~all`
- TXT: `resend._domainkey` → (value from Resend)
- TXT: `_dmarc` → `v=DMARC1; p=none; rua=mailto:dmarc@unboxthemoment.com`

---

**Need Help?** Check the troubleshooting section or refer to the official documentation links above.
