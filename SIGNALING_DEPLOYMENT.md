# Sendify Signaling Server Deployment Guide

This guide explains how to deploy the signaling server for your Sendify P2P file transfer application.

## Quick Deploy Options

### Option 1: Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `sendify` repository
5. Choose "Deploy from repo"
6. Set the following environment variables:
   - `NODE_ENV=production`
   - `PORT=3003` (Railway will override this)
7. In the Settings tab, set the root directory to `/` and the start command to `node signaling-server.js`
8. Your server will be deployed at `https://your-app-name.up.railway.app`

### Option 2: Render
1. Go to [Render.com](https://render.com)
2. Connect your GitHub account
3. Click "New" → "Web Service"
4. Select your repository
5. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node signaling-server.js`
   - **Environment Variables**:
     - `NODE_ENV=production`

### Option 3: Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-signaling-server-name`
4. Set environment: `heroku config:set NODE_ENV=production`
5. Deploy: `git push heroku main`

## Configure Your Vercel App

After deploying your signaling server, you need to configure your Vercel app to use it:

### Method 1: Environment Variables (Recommended)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - **Key**: `NEXT_PUBLIC_SIGNALING_SERVER_URL`
   - **Value**: `wss://your-deployed-signaling-server-url.com` (or `https://` for HTTP)
   - **Environment**: Production, Preview, Development

### Method 2: Update the Code Directly
Replace `your-signaling-server.onrender.com` in `src/lib/signaling.ts` with your actual deployed URL.

## Testing the Connection

1. Deploy both your Vercel app and signaling server
2. Open your Vercel app
3. Check the browser console for "Connected to signaling server" message
4. Test file transfer functionality

## Troubleshooting

### CORS Issues
Make sure your signaling server's CORS configuration includes your Vercel app domain:
```javascript
origin: [
  'https://your-app-name.vercel.app',
  'https://your-custom-domain.com'
]
```

### WebSocket Connection Issues
- Ensure your signaling server supports WebSocket connections
- Check if your hosting provider supports WebSocket (most do)
- Verify the URL protocol (ws:// for HTTP, wss:// for HTTPS)

### Port Issues
- Most cloud providers automatically assign ports
- Don't hardcode port 3003 in production
- Use `process.env.PORT || 3003` in your server

## URLs to Update

After deployment, update these URLs in your code:

1. **signaling-server.js**: Update CORS origins with your Vercel app URL
2. **src/lib/signaling.ts**: Update the fallback signaling server URL
3. **Vercel Environment Variables**: Set `NEXT_PUBLIC_SIGNALING_SERVER_URL`

## Example Environment Variables

For your Vercel app:
```
NEXT_PUBLIC_SIGNALING_SERVER_URL=wss://sendify-signaling.up.railway.app
```

For your signaling server:
```
NODE_ENV=production
PORT=3003
```
