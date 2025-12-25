# 🚀 Deploy to Netlify - Instructions

## ✅ Pre-Deploy Checklist

Your project is **ready to deploy**! These changes were made:

1. ✅ Installed `@astrojs/netlify` adapter
2. ✅ Updated `astro.config.mjs` to use Netlify adapter
3. ✅ Created `netlify.toml` configuration file
4. ✅ Added `.nvmrc` for Node version (20.x)
5. ✅ Created `public/_headers` for security headers
6. ✅ Build tested successfully

---

## 📦 Option 1: Drag & Drop (Easiest)

### Step 1: Create a ZIP file
```bash
# Delete dist and node_modules first (optional but recommended)
rm -rf dist node_modules

# Or just make sure .gitignore is working
```

### Step 2: Drag & Drop
1. Go to https://app.netlify.com/drop
2. Drag the **entire project folder** `ClimaWiki` to the drop zone
3. Wait for the build (1-2 minutes)
4. Done! ✨

**Note:** Netlify will automatically:
- Run `npm install`
- Run `npm run build`
- Deploy the `dist` folder
- Configure SSR functions

---

## 🖥️ Option 2: Netlify CLI (Professional)

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Login to Netlify
```bash
netlify login
```

### Deploy
```bash
# Test deployment
netlify deploy

# Production deployment
netlify deploy --prod
```

---

## 🔧 Build Settings (if needed)

If you connect via Git (GitHub/GitLab), use these settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 20.x (auto-detected from `.nvmrc`)

---

## ⚠️ Important Notes

### Environment Variables
The OpenWeatherMap API key is stored in `.env.local` (not committed to git).

**For Netlify deployment:**

**Option A - Commit `.env` file (easiest):**
1. Rename `.env.local` to `.env`
2. Commit the `.env` file
3. Deploy - Netlify will use it automatically ✅

**Option B - Use Netlify UI (more secure):**
1. Go to Netlify Dashboard → Site Settings → Environment variables
2. Click "Add a variable"
3. Key: `PUBLIC_OPENWEATHER_API_KEY`
4. Value: `a0fe474adcc7851cca4f026287333a5d`
5. Save and redeploy

**Note:** Since this is a free tier API key with rate limits, Option A is fine for this project.

### Functions
Your app uses **Netlify Functions** for SSR. This is automatically configured.

---

## 🐛 Troubleshooting

### Build fails with "Module not found"
- Make sure `package.json` has all dependencies
- Check that `netlify.toml` exists
- Run `npm run build` locally to test

### 404 errors on routes
- Check that `netlify.toml` has the redirect rule
- Make sure `output: 'server'` is set in `astro.config.mjs`

### GPS detection doesn't work
- GPS only works on HTTPS (Netlify provides this automatically)
- Users need to allow location permissions

---

## 📊 Expected Deploy Size

- **Total:** ~20-30 MB (with node_modules)
- **Build output:** ~2-3 MB
- **Function size:** ~1-2 MB

---

## ✅ Post-Deploy Checklist

After deploying, test:

1. ✅ Homepage loads (`/` redirects to `/welcome`)
2. ✅ GPS detection works (HTTPS required)
3. ✅ Search works (type "madrid", "lima", etc.)
4. ✅ Weather page displays data
5. ✅ Forecast page works
6. ✅ All navigation links work
7. ✅ Settings page loads

---

## 🎉 You're Ready!

Just drag the folder to Netlify and it should work out of the box.

**Estimated deploy time:** 1-2 minutes

Good luck! 🚀
