# Frontend Deployment Guide - New Vercel Account

This guide explains how to deploy the Mayur Fashion frontend on a **different Vercel account** while using the **existing backend**.

---

## ✅ Quick Answer: YES, It Will Work!

Your backend is deployed at: `https://mayurfashionapi.vercel.app`

You can deploy the frontend on any new Vercel account, and it will communicate with your existing backend successfully.

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your New Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in to your **NEW Vercel account** (different from the backend account)
3. Click **"Add New Project"**

### Step 2: Import Your GitHub Repository

1. Click **"Import Git Repository"**
2. Connect your GitHub account if not already connected
3. Select your `Mayur Fashion` repository
4. Click **"Import"**

### Step 3: Configure Build Settings

In the project configuration screen, set the following:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Vite` (or select `Other`) |
| **Root Directory** | `./` (leave at root) |
| **Build Command** | `bash build.sh` |
| **Output Directory** | `Mayur-Fashion/dist` |
| **Install Command** | `npm install` (default) |

### Step 4: Add Environment Variables ⚠️ IMPORTANT

In the **Environment Variables** section, add:

```
Name:  VITE_API_URL
Value: https://mayurfashionapi.vercel.app
```

**Apply to:** Check all three boxes:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-5 minutes)
3. Once deployed, you'll get a URL like: `https://your-project-name.vercel.app`

---

## 🔧 Backend CORS Configuration (IMPORTANT!)

After your frontend is deployed, you need to update your backend to allow requests from the new frontend URL.

### Option A: Quick Update (Hardcode the URL)

1. Go to your **backend repository** code
2. Open `api/index.js`
3. Find the `allowedOrigins` array (around line 14-18)
4. Add your new frontend URL:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mayurfashion.vercel.app',
  'https://your-new-frontend-url.vercel.app',  // 👈 Add this
];
```

5. Commit and push the changes
6. Your backend will automatically redeploy on Vercel

### Option B: Use Environment Variables (Recommended)

This method is better because you won't need to modify code every time:

1. Go to your **backend's Vercel project dashboard**
2. Click on **Settings** → **Environment Variables**
3. Add a new environment variable:

```
Name:  FRONTEND_URL
Value: https://your-new-frontend-url.vercel.app
```

4. The backend code (already updated) will automatically include this URL in allowed origins
5. Click **"Save"**
6. Redeploy your backend (Vercel → Deployments → click the three dots → Redeploy)

**For multiple frontend URLs**, use comma-separated values:
```
FRONTEND_URL=https://frontend1.vercel.app,https://frontend2.vercel.app
```

---

## 🧪 Testing Your Deployment

After deployment, verify everything works:

### 1. Check Main Website
- Visit your new frontend URL
- Products should load from the backend
- Check the catalog pages
- Test the WhatsApp contact buttons

### 2. Check Admin Panel
- Go to: `https://your-new-frontend-url.vercel.app/admin`
- Try logging in
- Test uploading a product
- Verify category management

### 3. Check API Connection
Open browser console (F12) and look for:
- ✅ No CORS errors
- ✅ API requests going to `https://mayurfashionapi.vercel.app`
- ✅ Data loading successfully

---

## 🐛 Troubleshooting

### Problem 1: CORS Error

**Error Message:**
```
Access to fetch at 'https://mayurfashionapi.vercel.app/api/...' 
from origin 'https://your-new-url.vercel.app' has been blocked by CORS policy
```

**Solution:**
- Add your new frontend URL to the backend's `allowedOrigins` (see Backend CORS Configuration above)
- Make sure you redeploy the backend after adding the URL

### Problem 2: Products Not Loading

**Symptoms:**
- Homepage is blank
- No products showing
- Console shows 404 errors

**Solution:**
1. Check that `VITE_API_URL` environment variable is set correctly
2. Verify the backend is responding: visit `https://mayurfashionapi.vercel.app/api` in browser
3. Check browser console for specific error messages

### Problem 3: Admin Panel Login Fails

**Symptoms:**
- Login button does nothing
- "Network Error" in console

**Solution:**
1. Verify `VITE_API_URL` is set in Vercel environment variables
2. Check that backend CORS includes your new frontend URL
3. Clear browser cache and try again

### Problem 4: Build Fails on Vercel

**Error Message:**
```
bash: build.sh: Permission denied
```

**Solution:**
Run this in your local repository:
```bash
git update-index --chmod=+x build.sh
git commit -m "Make build.sh executable"
git push
```

---

## 📊 Environment Variables Summary

### Frontend (New Vercel Account)
```env
VITE_API_URL=https://mayurfashionapi.vercel.app
```

### Backend (Existing Vercel Account)
```env
# Existing variables (don't change these)
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=mayur-fashion
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
GEMINI_API_KEY=...

# NEW: Add your new frontend URL
FRONTEND_URL=https://your-new-frontend-url.vercel.app
```

---

## ✨ Benefits of This Setup

1. **Unlimited Builds**: New Vercel account = new build limit quota
2. **Same Backend**: No need to migrate database or API
3. **Easy Rollback**: Keep old frontend running while testing new one
4. **A/B Testing**: Run multiple frontends with same backend
5. **Team Separation**: Different teams can manage frontend vs backend

---

## 🔐 Security Note

Make sure to:
- ✅ Only add trusted frontend URLs to backend CORS
- ✅ Keep your `JWT_SECRET` and API keys secure
- ✅ Don't commit `.env` files to git
- ✅ Use Vercel's environment variables feature for all secrets

---

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console (F12) for error messages
2. Check Vercel deployment logs for build errors
3. Verify all environment variables are set correctly
4. Make sure backend CORS includes your new URL

**Contact:**
- Phone: +91 99788 31115 / +91 98253 43225
- Email: mayurfashion1991@gmail.com

---

## 🎯 Quick Checklist

Before going live, verify:

- [ ] Frontend deployed on new Vercel account
- [ ] `VITE_API_URL` environment variable set
- [ ] Backend CORS updated with new frontend URL
- [ ] Products loading on homepage
- [ ] Admin panel login works
- [ ] Image uploads work in admin
- [ ] WhatsApp buttons work
- [ ] All pages load without errors
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)

---

**Deployment Date:** ___________  
**Frontend URL:** _________________________  
**Backend URL:** https://mayurfashionapi.vercel.app  
**Deployed By:** ___________
