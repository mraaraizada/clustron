# Deployment Guide

## Frontend Deployment (Vercel)

### 1. Push your code to GitHub
Make sure `.npmrc` file is included in your repository.

### 2. Connect to Vercel
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Framework Preset: **Vite**
- Root Directory: `./` (leave as default)

### 3. Environment Variables
Add the following environment variable in Vercel dashboard:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### 4. Build Settings
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Note**: The `.npmrc` file handles peer dependency conflicts automatically.

### 5. Deploy
Click "Deploy" and wait for the build to complete.

---

## Backend Deployment (Render)

### 1. Push your code to GitHub

### 2. Create New Web Service on Render
- Go to [render.com](https://render.com)
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Root Directory: `backend`

### 3. Configure Service
- **Name**: clustron-api (or your preferred name)
- **Environment**: Python 3
- **Region**: Choose closest to your users
- **Branch**: main (or your default branch)
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python api.py`

**Note**: The `runtime.txt` file specifies Python 3.11.9 for compatibility with all dependencies.

### 4. Environment Variables
Add the following environment variables in Render dashboard:

```
FLASK_ENV=production
PORT=5001
HOST=0.0.0.0
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

**Important**: Replace `your-frontend-domain.vercel.app` with your actual Vercel domain.

### 5. Instance Type
- Select **Free** or **Starter** plan based on your needs

### 6. Deploy
Click "Create Web Service" and wait for deployment.

---

## Post-Deployment Steps

### 1. Update Frontend Environment Variable
After backend is deployed on Render:
- Copy your Render backend URL (e.g., `https://clustron-api.onrender.com`)
- Go to Vercel dashboard → Your Project → Settings → Environment Variables
- Update `VITE_API_BASE_URL` with your Render URL
- Redeploy the frontend

### 2. Update Backend CORS
After frontend is deployed on Vercel:
- Copy your Vercel frontend URL (e.g., `https://clustron.vercel.app`)
- Go to Render dashboard → Your Service → Environment
- Update `CORS_ORIGINS` with your Vercel URL
- Service will automatically redeploy

### 3. Test Your Deployment
- Visit your Vercel URL
- Check if the homepage loads correctly
- Navigate to Dashboard and test API connectivity
- Verify clustering operations work

---

## Troubleshooting

### Vercel Build Errors

**Peer Dependency Issues:**
- Ensure `.npmrc` file is in your repository
- The file should contain: `legacy-peer-deps=true`
- This resolves conflicts between Vite 7 and @tailwindcss/vite

**Build Command Fails:**
```bash
# Try these in Vercel settings:
npm install --legacy-peer-deps && npm run build
```

### Backend Issues
- **CORS errors**: Verify `CORS_ORIGINS` includes your frontend URL
- **Port issues**: Render automatically assigns PORT, ensure you're using `os.getenv('PORT')`
- **Module not found**: Check all dependencies are in `requirements.txt`

### Common Issues
- **Mixed content**: Ensure both frontend and backend use HTTPS in production
- **Cold starts**: Free tier on Render may have cold starts (15-30 seconds)
- **Environment variables**: Remember to redeploy after changing env vars

---

## Local Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python api.py
```

---

## Files Required for Deployment

### Root Directory
- `.npmrc` - Handles npm peer dependency conflicts
- `.env.example` - Template for environment variables
- `package.json` - Frontend dependencies
- `vite.config.js` - Vite configuration

### Backend Directory
- `backend/.env.example` - Template for backend environment variables
- `backend/requirements.txt` - Python dependencies
- `backend/api.py` - Flask application
- `backend/realistic_customers.csv` - Customer data

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Flask Deployment](https://flask.palletsprojects.com/en/2.3.x/deploying/)
