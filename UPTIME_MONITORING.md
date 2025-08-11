# Keep Your Signaling Server Awake with UptimeRobot

## 🚨 The Problem
Render's free web services automatically sleep after 15 minutes of inactivity, causing:
- 30-60 second cold start delays
- Poor user experience for P2P connections
- Dropped WebRTC signaling sessions

## ✅ The Solution: UptimeRobot
Free uptime monitoring that pings your server every 5 minutes to keep it awake.

## Step-by-Step Setup

### 1. Create UptimeRobot Account
1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Click "Sign Up Free"
3. Use your email to register (no credit card required)
4. Verify your email and log in

### 2. Add New Monitor
1. Click "Add New Monitor" button
2. Configure the monitor:

**Monitor Settings:**
```
Monitor Type: HTTP(s)
Friendly Name: Sendify Signaling Server
URL (or IP): https://sendify-signaling-server.onrender.com/health
Monitoring Interval: 5 minutes
Monitor Timeout: 30 seconds
```

**Alert Contacts:**
- Add your email for downtime notifications (optional)

### 3. Advanced Configuration (Optional)
For better monitoring, you can also add a second monitor for the main endpoint:

```
Monitor Type: HTTP(s)
Friendly Name: Sendify Main Endpoint
URL: https://sendify-signaling-server.onrender.com/
Monitoring Interval: 5 minutes
```

### 4. Verify Setup
After Render redeploys (2-3 minutes), test the endpoints:

**Health Check:** `https://sendify-signaling-server.onrender.com/health`
Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-08-11T...",
  "uptime": 123.45,
  "rooms": 0,
  "environment": "production"
}
```

**Main Endpoint:** `https://sendify-signaling-server.onrender.com/`
Should return:
```json
{
  "message": "Sendify P2P Signaling Server",
  "status": "Running",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "websocket": "Socket.IO enabled"
  }
}
```

## 🎯 Benefits
- **Always Responsive**: No more 30-60 second delays
- **Better UX**: Instant P2P connections
- **Free Forever**: UptimeRobot free plan includes 50 monitors
- **Notifications**: Get alerted if your server goes down
- **Analytics**: Track uptime statistics

## Alternative Free Monitoring Services
- **Freshping** by Freshworks
- **StatusCake** (free tier)
- **Better Uptime** (free tier)
- **Pingdom** (free trial)

## ⚡ Pro Tips
1. **Monitor Frequency**: 5 minutes is optimal (keeps server awake without overloading)
2. **Multiple Monitors**: Monitor both `/health` and main endpoints
3. **Slack Integration**: Connect UptimeRobot to Slack for team notifications
4. **Status Page**: Create a public status page for your service

Your signaling server will now stay awake 24/7 and provide instant P2P connections! 🚀
