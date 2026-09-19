# Mayur Fashion — Production Deployment Guide

A complete, step-by-step manual for deploying the **Mayur Fashion** official web portal, admin dashboard, and backend services to production environments like **Vercel**, **Netlify**, **Render**, or **Cloudflare Pages**.

---

## 📑 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Environment Variables Reference](#3-environment-variables-reference)
4. [Deployment to Vercel (Recommended)](#4-deployment-to-vercel-recommended)
5. [Backend API Deployment (Render / Railway / VPS)](#5-backend-api-deployment-render--railway--vps)
6. [Alternative Frontend Hosting (Netlify & Cloudflare)](#6-alternative-frontend-hosting-netlify--cloudflare)
7. [Custom Domain & DNS Setup](#7-custom-domain--dns-setup)
8. [Local Build Verification](#8-local-build-verification)
9. [Troubleshooting & Common Issues](#9-troubleshooting--common-issues)

---

## 1. Architecture Overview

The repository is structured as a high-performance monorepo/multi-app project:

```
Mayur-Fashion/
├── src/                    # Main luxury catalog frontend (React 19 + Vite)
├── public/                 # Static brand assets, lookbook PDFs, logos
├── Mayur-Fashion/          # Subfolder build root for Vite/Vercel
│   ├── src/                # Synchronized frontend code
│   └── package.json        # Frontend dependencies
├── admin-panel/            # Administrative dashboard (React + Vite)
│   ├── src/
│   └── package.json
├── api/                    # Express.js backend & AI chatbot service
│   ├── index.js            # Express entry point
│   ├── db.js               # MongoDB connection
│   └── vercel.json         # Vercel Serverless Function config
├── build.sh                # Unified multi-app build script
└── vercel.json             # Root Vercel deployment configuration
```

### Build Pipeline:
When `build.sh` executes:
1. `Mayur-Fashion` is built into `Mayur-Fashion/dist/` (serves the main website at `/`).
2. `admin-panel` is built into `admin-panel/dist/`.
3. The admin bundle is copied into `Mayur-Fashion/dist/admin/` (serves the admin portal at `/admin`).

---

## 2. Prerequisites

Ensure you have the following ready before deploying:
* **GitHub Repository**: Pushed and up-to-date (`main` branch).
* **Vercel Account**: [vercel.com](https://vercel.com) (free tier is sufficient).
* **MongoDB Atlas Cluster**: Free or Dedicated MongoDB connection string (for backend API).
* **Cloudinary Account**: For cloud image storage (Admin product upload).
* **Google Gemini API Key**: For the AI Fashion Assistant (`@google/genai`).
* **Node.js**: `v18.x` or `v20.x` LTS.

---

## 3. Environment Variables Reference

### Frontend (`Mayur-Fashion` & `admin-panel`)
Create a `.env.production` file or add these in your hosting dashboard:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | URL to the deployed backend API | `https://api.mayurfashion.co.in/api` or `/api` |
| `VITE_WHATSAPP_NUMBER` | Primary WhatsApp contact number | `919978831115` |

### Backend API (`api/`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mayur` |
| `JWT_SECRET` | Secret for signing admin authentication tokens | `your_super_secret_key_32_chars` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `mayur-fashion` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `abcdefghijklmnopqrstuvwx` |
| `GEMINI_API_KEY` | Google Gemini API key for AI assistant | `AIzaSy...` |
| `FRONTEND_URL` | Allowed CORS origin for production | `https://www.mayurfashion.co.in` |

---

## 4. Deployment to Vercel (Recommended)

Vercel is pre-configured via the root `vercel.json` and `build.sh`.

### Step-by-Step Vercel Setup:

1. **Log in to Vercel**: Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. **Import Repository**: Select your GitHub repository (`Mayur-Fashion`).
3. **Configure Project Settings**:
   * **Framework Preset**: `Vite` (or `Other`).
   * **Root Directory**: `./` (leave as root).
   * **Build Command**: `bash build.sh` (already defined in `vercel.json`).
   * **Output Directory**: `Mayur-Fashion/dist` (already defined in `vercel.json`).
   * **Install Command**: `npm install` (or leave default).
4. **Add Environment Variables**: Under the *Environment Variables* section, add any required frontend variables (e.g. `VITE_API_BASE_URL`).
5. **Deploy**: Click **"Deploy"**. Vercel will run `build.sh`, compile both the client website and the admin panel, and deploy globally across Edge CDN.

---

## 5. Backend API Deployment (Render / Railway / VPS)

If you wish to host the Express + MongoDB backend separately from the static site:

### Option A: Deploy on Render.com (Web Service)
1. Log in to [render.com](https://render.com) and select **"New Web Service"**.
2. Connect your GitHub repository.
3. Set the following parameters:
   * **Root Directory**: `api`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node index.js`
4. Add all Backend Environment Variables (MongoDB, Cloudinary, JWT, Gemini API key).
5. Click **"Create Web Service"**.

### Option B: Deploy on Railway.app
1. Go to [railway.app](https://railway.app) and create a **New Project**.
2. Select **"Deploy from GitHub repo"**.
3. In settings, set **Root Directory** to `/api`.
4. Add environment variables in Railway's variables tab.

---

## 6. Alternative Frontend Hosting (Netlify & Cloudflare)

### Netlify Deployment:
1. Link your repository on [netlify.com](https://netlify.com).
2. Set **Base directory**: `Mayur-Fashion`
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `Mayur-Fashion/dist`
5. To enable client-side routing on Netlify, ensure `public/_redirects` exists with:
   ```
   /*    /index.html   200
   ```

### Cloudflare Pages:
1. Log in to the Cloudflare dashboard -> **Workers & Pages** -> **Create application**.
2. Connect your Git repository.
3. Build configuration:
   * **Framework preset**: `Vite`
   * **Root directory**: `Mayur-Fashion`
   * **Build command**: `npm run build`
   * **Build output directory**: `dist`

---

## 7. Custom Domain & DNS Setup

To link your official domain (e.g. `www.mayurfashion.co.in`):

### DNS Records Configuration:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `cname.vercel-dns.com` (or your host's CNAME) | `Automatic` / `3600` |
| **A** | `@` (apex) | `76.76.21.21` (Vercel IP) | `Automatic` / `3600` |

* SSL certificates (HTTPS) are automatically provisioned via Let's Encrypt once DNS propagation completes (typically 5–30 minutes).

---

## 8. Local Build Verification

Before committing or pushing updates to production, test the full production build locally:

```bash
# 1. Build the main frontend
cd Mayur-Fashion
npm run build

# 2. Preview the production output locally
npm run preview
```

Preview URL will open at `http://localhost:4173/`. Verify:
- [x] All high-resolution images & lookbook PDF load correctly.
- [x] Mobile responsive drawer, 2-column catalog grid, and quick view modal operate cleanly.
- [x] WhatsApp buttons launch chats with pre-filled inquiries.
- [x] Sizing range (M to 6XL) and contact numbers (+91 99788 31115 / +91 98253 43225) are accurate.

---

## 9. Troubleshooting & Common Issues

### 1. `build.sh: permission denied` on Linux/Vercel
Run the following git command locally to ensure the build script is executable:
```bash
git update-index --chmod=+x build.sh
git commit -m "chmod +x build.sh"
git push
```

### 2. 404 on Page Refresh in Admin Panel (`/admin`)
Make sure your Vite server or hosting provider redirects SPA routes to `index.html`. For Vercel, this is handled automatically via `vercel.json` rewrites:
```json
{
  "rewrites": [
    { "source": "/admin/(.*)", "destination": "/admin/index.html" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3. WhatsApp Links Not Opening App on Mobile
All WhatsApp triggers use the universal HTTPS scheme:
```
https://wa.me/919978831115?text=<url_encoded_text>
```
Ensure phone numbers contain **country code without plus sign or hyphens** (`919978831115`).

---

### Need Assistance?
For technical inquiries or deployment updates, reach out to the development team or contact:
* **Showroom**: Manohar Dresses, Safal 3 Market & VIP Market, Sarangpur, Ahmedabad
* **Phone / WhatsApp**: +91 99788 31115 / +91 98253 43225
* **Email**: mayurfashion1991@gmail.com
