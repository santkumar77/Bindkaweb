# Garena Account Security Tool — Web Edition
**Credits: @sulav_codex_ff & @agajayofficial**

## Project Structure
```
garena-web/
├── public/
│   └── index.html       ← Frontend UI
├── api/
│   ├── send-otp.js
│   ├── verify-otp.js
│   ├── create-bind.js
│   ├── bind-info.js
│   ├── platform-info.js
│   ├── cancel-request.js
│   ├── revoke-token.js
│   ├── verify-identity.js
│   ├── unbind.js
│   └── change-email.js
├── vercel.json
└── package.json
```

## Deploy on Vercel (Step by Step)

### Method 1 — Vercel CLI (Recommended)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Go to project folder
cd garena-web

# 4. Deploy
vercel --prod
```

### Method 2 — GitHub + Vercel Dashboard
1. Upload this folder to a **GitHub repository**
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Click **Deploy** — done!

## Features
- ✅ Add Recovery Email (OTP flow)
- ✅ Check Recovery Email status
- ✅ Check Linked Platforms
- ✅ Cancel Recovery Email request
- ✅ Unbind Email (OTP or Secondary Password)
- ✅ Change Bind Email
- ✅ Revoke Access Token
