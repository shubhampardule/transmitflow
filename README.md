# <img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/favicon.svg" alt="TransmitFlow Logo" width="32" height="32" style="vertical-align:middle;"> TransmitFlow

<div align="center">

![TransmitFlow](https://img.shields.io/badge/TransmitFlow-Seamless%20Transmission-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript)

**Send files instantly between devices without any servers storing your data - Seamless file transfer made simple.**
> **⚠️ Note:** Large file transfers (e.g., 1GB+) may use significant memory on your device. On mobile or low-RAM devices, very large transfers can cause performance issues or browser crashes. For best results, use chunked transfers and avoid sending extremely large files on mobile.

> **🔄 Updated: September 30, 2025 - Latest version with enhanced UI and performance optimizations**

[🚀 Live Demo](https://transmitflow.vercel.app) • [📖 Documentation](https://github.com/shubhampardule/transmitflow/wiki) • [🐛 Report Bug](https://github.com/shubhampardule/transmitflow/issues) • [✨ Request Feature](https://github.com/shubhampardule/transmitflow/issues)

> **Deployed on Vercel for fast, global delivery.**
</div>

---

## 🎯 Why TransmitFlow?

<table>
<tr>
<td width="50%">

### 🔒 **Complete Privacy**
- **Zero Server Storage** - Files never touch our servers
- **Direct P2P Connection** - Your data stays between your devices
- **End-to-End Transfer** - No intermediaries, no data mining

</td>
<td width="50%">

### ⚡ **Lightning Fast**
- **Direct Device Connection** - No upload/download bottlenecks
- **Real-time Progress** - Live transfer speeds and status
- **Smart Chunking** - Optimized for maximum throughput

</td>
</tr>
<tr>
<td width="50%">

### 🌐 **Universal Access**
- **No App Required** - Works in any modern browser
- **Cross-Platform** - Windows, Mac, Linux, iOS, Android
- **QR Code Magic** - Instant device pairing

</td>
<td width="50%">

### 🛠️ **Developer Friendly**
- **Modern Tech Stack** - Next.js 15, React 19, TypeScript
- **Clean Architecture** - Well-documented, maintainable code
- **Open Source** - CC BY-NC 4.0 licensed, community-driven

</td>
</tr>
</table>

## ✨ Features & Screenshots

<div align="center">

### 📱 **App in Action - Dark & Light Themes**

<table>
<tr>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-1.png" alt="TransmitFlow - Send & Receive Interface" width="100%"/>
<br/>
<em>🌙 Dark Mode: Send & Receive Interface</em>
</td>
<td width="50%" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-3.png" alt="TransmitFlow - File Selection & Features" width="100%"/>
<br/>
<em>☀️ Light Mode: File Selection & App Features</em>
</td>
</tr>
<tr>
<td colspan="2" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-2.png" alt="TransmitFlow - Transfer Progress" width="70%"/>
<br/>
<em>� Real-time Transfer Progress with File Management</em>
</td>
</tr>
</table>

*Share files instantly with beautiful, responsive interface on any device!*

</div>

### 🔄 **Peer-to-Peer Transfer**
- 🎯 **Direct Device Communication**: Files transfer directly between devices using WebRTC
- 🔐 **No Server Storage**: Your files never touch our servers - complete privacy guaranteed
- 📊 **Real-time Progress**: Live transfer progress with speed monitoring and ETA
- 📁 **Multi-file Support**: Send multiple files in a single session with batch operations
- 🚀 **Optimized Performance**: Smart chunking for maximum transfer speeds

### 📱 **QR Code Sharing**
- ⚡ **Instant Connection**: Generate QR codes for easy device pairing in seconds
- 🌍 **Cross-Platform**: Works seamlessly between desktop, mobile, and tablets
- 📋 **One-Click Sharing**: Share connection links via clipboard or QR scan
- 🔗 **Smart URLs**: Direct links for easy sharing across messaging apps

### 🌟 **Current Version Highlights (v0.1.0)**

**✅ Enhanced User Experience**
- 🚀 **Next.js 15.4.6 + React 19**: Latest performance optimizations
- 🎨 **shadcn/ui Components**: Modern, accessible design system
- 📱 **Advanced QR Scanning**: `@yudiel/react-qr-scanner` for reliable scanning
- ⚡ **Turbopack Integration**: Lightning-fast development builds
- 📊 **Analytics Integration**: Vercel Analytics & Speed Insights

**✅ Technical Improvements**
- 🔄 **Enhanced WebRTC**: Multi-TURN server failover support
- 🌐 **Production-Ready Signaling**: Hosted signaling server with global reach
- 🛡️ **TypeScript 5+**: Advanced type safety and developer experience
- 📱 **Mobile Optimization**: Touch-friendly interface with responsive design
- 🔧 **Environment Configuration**: Flexible TURN/STUN server setup

### 🛡️ **Security & Privacy**
- 🔒 **End-to-End Transfer**: Direct peer-to-peer connection with no middleman
- 🚫 **No Data Storage**: Files are never stored on servers - ever
- 🔐 **Secure Signaling**: Encrypted WebRTC signaling server for safe connections
- 🏠 **Room-based Sessions**: Temporary, secure transfer rooms that auto-expire

### 🎯 **Smart Features**
- 🔍 **Auto-Discovery**: Automatic device detection and connection establishment
- ⏸️ **Transfer Management**: Cancel individual files or entire transfers mid-stream
- 🔄 **Connection Recovery**: Automatic reconnection on network issues
- ⬅️ **Smart Navigation**: Intelligent browser back button handling
- 📱 **Responsive Design**: Perfect experience on any device size

### 💻 **Universal Compatibility**
- 🖥️ **All Platforms**: Windows, macOS, Linux, iOS, Android - everywhere
- 🌐 **Browser-Based**: No app installation required, works in any modern browser
- 📱 **Mobile Optimized**: Touch-friendly interface with gesture support
- 🔧 **Modern Standards**: Supports all major browsers with WebRTC capability

## 🚀 Quick Start

> **Get up and running in under 2 minutes!** 

### 📋 Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- npm, yarn, or pnpm
- Modern browser with WebRTC support (Chrome, Firefox, Safari, Edge)

### ⚡ Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhampardule/transmitflow.git
cd transmitflow

# 2️⃣ Install dependencies
npm install

# 3️⃣ Set up environment variables
# Copy .env.example to .env and configure your signaling server
cp .env.example .env

# 4️⃣ Start development server with Turbopack (faster builds)
npm run dev

# 🎉 Open http://localhost:3000 and start sharing!
```

> **Note**: The signaling server is already hosted for you. The app will work immediately for development and production.

### 🏗️ Production Deployment

<details>
<summary><strong>📦 Build & Deploy Options</strong></summary>

#### **Vercel (Recommended)**
```bash
# Deploy to Vercel with one command
npx vercel --prod
```

#### **Self-Hosting**
```bash
# Build for production
npm run build

# Start production server
npm start
```

#### **Docker**
```bash
# Build Docker image
docker build -t p2p-file-transfer .

# Run container
docker run -p 3000:3000 p2p-file-transfer
```

</details>

## 🔧 How It Works

<div align="center">

```mermaid
graph LR
    A[📱 Sender Device] -->|1. Generate Room| B[🔗 QR Code/Link]
    B -->|2. Share| C[📱 Receiver Device]
    C -->|3. Scan/Click| D[🌐 Signaling Server]
    D -->|4. WebRTC Setup| A
    A -.->|5. Direct P2P Transfer| C
    
    style A fill:#e1f5fe
    style C fill:#e8f5e8
    style D fill:#fff3e0
```

</div>

### 🎬 **Step-by-Step Process**

<table>
<tr>
<td width="20%" align="center">

**1️⃣ Select Files**
<br/>
📁 Drag & drop or click to select files

</td>
<td width="20%" align="center">

**2️⃣ Generate QR Code**
<br/>
🔗 Create unique room & QR code

</td>
<td width="20%" align="center">

**3️⃣ Share Code**
<br/>
📱 Share QR code or link

</td>
<td width="20%" align="center">

**4️⃣ Connect**
<br/>
🤝 Automatic P2P connection

</td>
<td width="20%" align="center">

**5️⃣ Transfer**
<br/>
🚀 Direct file transfer

</td>
</tr>
</table>

### 🏗️ **Technical Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   📱 Sender     │◄──►│ 🌐 Signaling    │◄──►│   📱 Receiver   │
│   Device        │    │   Server        │    │   Device        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              │
         └──────────── 🔗 Direct WebRTC P2P ──────────┘
                        (Encrypted File Transfer)
```

### ⚡ **Why This Approach?**

| Traditional Cloud | 🆚 | Our P2P Solution |
|:-----------------:|:--:|:----------------:|
| Upload → Server → Download | | Direct Device-to-Device |
| 📈 Server costs & storage | | 💰 Zero infrastructure costs |
| 🐌 Limited by server bandwidth | | ⚡ Full network speed |
| 🔓 Files stored on servers | | 🔒 Complete privacy |
| 📊 Data harvesting possible | | 🚫 No data collection |

## 📸 User Journey Screenshots

<div align="center">

### **🎯 Complete File Transfer Experience**

<table>
<tr>
<td width="33%" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-3.png" alt="Step 1: File Selection" width="100%"/>
<br/>
<strong>1️⃣ Select Files</strong>
<br/>
<em>Choose files with drag & drop interface</em>
</td>
<td width="33%" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-1.png" alt="Step 2: Connection Setup" width="100%"/>
<br/>
<strong>2️⃣ Generate QR & Connect</strong>
<br/>
<em>Share QR code or room link</em>
</td>
<td width="33%" align="center">
<img src="https://raw.githubusercontent.com/shubhampardule/transmitflow/main/public/mockup-2.png" alt="Step 3: Transfer Progress" width="100%"/>
<br/>
<strong>3️⃣ Monitor Progress</strong>
<br/>
<em>Real-time transfer with file management</em>
</td>
</tr>
</table>

**🌓 Seamless Dark/Light Theme Support** • **📱 Responsive on All Devices** • **🚀 Lightning Fast Transfers**

</div>

## 🛠️ Tech Stack & Architecture

<div align="center">

### **🚀 Modern Tech Stack**

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| 🎨 **Frontend** | Next.js 15.4.6 + React 19 | Latest web framework with React 19 concurrent features |
| 📱 **UI/UX** | Tailwind CSS + shadcn/ui | Modern design system with accessible components |
| 🔗 **P2P Engine** | WebRTC Data Channels | Direct peer-to-peer file transfer |
| 🌐 **Signaling** | Socket.IO 4.8.1 + Express 5.1.0 | Real-time connection coordination |
| 🛡️ **Type Safety** | TypeScript 5+ | Rock-solid code with compile-time checks |
| 🎯 **State Management** | React 19 Hooks | Efficient state handling with latest React features |
| 📊 **Analytics** | Vercel Analytics & Speed Insights | Performance monitoring and user analytics |
| 🔍 **QR Scanning** | @yudiel/react-qr-scanner | Modern QR code scanning capabilities |

</div>

<details>
<summary><strong>📂 Detailed Project Structure</strong></summary>

```
p2p-react/
├── 🎯 src/
│   ├── 📱 app/                    # Next.js 15 App Router
│   │   ├── layout.tsx             # Root layout with providers
│   │   ├── page.tsx               # Main application page
│   │   ├── globals.css            # Global styles & Tailwind
│   │   └── *.ico, *.svg          # App icons and assets
│   │
│   ├── 🧩 components/             # React components
│   │   ├── 🎨 ui/                 # shadcn/ui components
│   │   │   ├── button.tsx         # Button component
│   │   │   ├── card.tsx           # Card layouts
│   │   │   ├── tabs.tsx           # Tab navigation
│   │   │   ├── progress.tsx       # Progress bars
│   │   │   ├── badge.tsx          # Status badges
│   │   │   ├── input.tsx          # Input fields
│   │   │   ├── DelayedLoader.tsx  # Loading states
│   │   │   ├── LoadingSpinner.tsx # Spinner component
│   │   │   ├── ThemeToggle.tsx    # Theme switching
│   │   │   ├── TransmitFlowLogo.tsx # Main logo
│   │   │   └── TransmitFlowLogoOnly.tsx # Icon-only logo
│   │   │
│   │   ├── P2PFileTransfer.tsx    # 🔥 Main app logic & orchestration
│   │   ├── SendFilesPanel.tsx     # 📤 File upload interface with QR generation
│   │   ├── ReceiveFilesPanel.tsx  # 📥 File receive interface with QR scanning
│   │   ├── TransferProgress.tsx   # 📊 Real-time progress tracking
│   │   └── FloatingScrollButton.tsx # Smooth navigation helper
│   │
│   ├── 🔧 lib/                    # Core business logic
│   │   ├── webrtc.ts              # 🌐 WebRTC P2P engine with connection optimization
│   │   ├── signaling.ts           # 📡 Socket.IO client with enhanced error handling
│   │   ├── file-utils.ts          # 📁 File handling, chunking & validation
│   │   └── utils.ts               # 🛠️ Helper functions & utilities
│   │
│   └── 📝 types/                  # TypeScript definitions
│       └── index.ts               # Global type definitions & interfaces
│
├── 🌍 public/                     # Static assets
│   ├── *.svg                      # App icons (favicon, logos, etc.)
│   └── *.ico                      # Favicons
│
├── � signaling-server.js          # Production signaling server with multi-TURN support
├── � package.json                # Dependencies and scripts
├── 🏗️ next.config.js              # Next.js configuration with image optimization
├── 🎨 tailwind.config.js          # Tailwind CSS configuration
├── � components.json             # shadcn/ui configuration
├── 🚀 vercel.json                 # Vercel deployment configuration
├── ⚙️ Procfile                    # Server deployment configuration
└── 🌐 .env                        # Environment variables (signaling server, TURN/STUN)
```

</details>

### 🔥 **Key Technical Components**

<table>
<tr>
<td width="50%">

#### **🌐 WebRTC Service** (`webrtc.ts`)
- 🔗 Manages peer-to-peer connections
- 📡 Handles data channel communication  
- 📦 Implements smart file chunking
- 📊 Real-time progress tracking
- 🔄 Automatic reconnection logic

</td>
<td width="50%">

#### **📡 Signaling Service** (`signaling.ts`)
- 🌐 WebSocket-based peer discovery
- 🏠 Secure room management
- 🤝 WebRTC offer/answer exchange
- 🧊 ICE candidate coordination
- ⏱️ Connection timeout handling

</td>
</tr>
<tr>
<td width="50%">

#### **📱 Enhanced UI Components**
- **SendFilesPanel**: Drag & drop with live preview and QR generation
- **ReceiveFilesPanel**: Advanced QR scanner with auto-connect
- **TransferProgress**: Real-time progress with individual file management
- **DelayedLoader**: Smooth loading states with optimized UX
- **FloatingScrollButton**: Smart navigation with scroll detection
- **ThemeToggle**: Dark/light mode switching (if implemented)
- **TransmitFlowLogo**: Branded logo components for consistent UI

</td>
<td width="50%">

#### **🛠️ Enhanced Utilities**
- **File Processing**: Advanced chunking, validation & metadata extraction
- **QR Code Generation**: Dynamic QR codes with error correction
- **Error Handling**: Comprehensive error management & recovery
- **Performance**: Optimized for large files with memory management
- **Analytics Integration**: Vercel Analytics & Speed Insights
- **Environment Configuration**: Multi-environment support with TURN/STUN servers

</td>
</tr>
</table>

## 📱 Usage Guide

### 🚀 **Sending Files** (Super Easy!)

<details>
<summary><strong>👆 Click to see step-by-step guide</strong></summary>

1. **🌐 Open the App**: Visit the website in any browser
2. **📁 Select Files**: 
   - Drag & drop files into the upload area, OR
   - Click "Select Files" to browse your device
3. **🚀 Start Sharing**: Click the "Start Sharing" button
4. **📱 Share Connection**: 
   - Show the QR code to the receiver, OR
   - Copy and share the link via message/email
5. **⏳ Wait for Connection**: Receiver will connect automatically
6. **📊 Monitor Progress**: Watch real-time transfer progress

</details>

### 📥 **Receiving Files** (Even Easier!)

<details>
<summary><strong>👆 Click to see step-by-step guide</strong></summary>

1. **📱 Get the Code**: Receive QR code or link from sender
2. **🔗 Connect**: 
   - Scan QR code with your camera, OR
   - Click the shared link, OR
   - Enter room code manually in "Receive" tab
3. **⚡ Auto-Connect**: Connection happens automatically
4. **📥 Receive Files**: Files transfer directly to your device
5. **💾 Download**: Download files individually or all at once

</details>

### 💡 **Pro Tips**

<div align="center">

| 💡 **Tip** | 📝 **Description** |
|:-----------|:-------------------|
| 🔗 **Share Links** | Copy the URL after starting sharing - works like QR codes! |
| 📱 **Mobile First** | Use your phone's camera to scan QR codes instantly |
| 🚀 **Speed Boost** | Connect devices to same WiFi network for maximum speed |
| 🔄 **Multi-Send** | Select multiple files at once for batch transfers |
| ⏸️ **Pause Control** | Cancel individual files without stopping entire transfer |
| 🔒 **Privacy Mode** | Use in incognito/private browsing for extra privacy |

</div>

## 🔒 Security & Privacy Features

<div align="center">

### 🛡️ **Your Privacy is Our Priority**

![Security Features](https://img.shields.io/badge/Privacy-First-green?style=for-the-badge)
![No Tracking](https://img.shields.io/badge/No-Tracking-blue?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open-Source-orange?style=for-the-badge)

</div>

| 🔐 **Security Feature** | 📝 **How It Works** | 🎯 **Benefit** |
|:------------------------|:---------------------|:----------------|
| **🚫 Zero Server Storage** | Files never touch our servers | Complete data ownership |
| **🔗 Direct P2P Transfer** | WebRTC creates direct device connection | No intermediary access |
| **⏱️ Temporary Sessions** | Rooms auto-expire after transfers | No persistent data |
| **🔐 Encrypted Signaling** | WebSocket connections are secured | Safe connection setup |
| **🏠 Isolated Rooms** | Each transfer gets unique room code | No cross-session access |
| **🌐 Browser Sandbox** | Runs in secure browser environment | OS-level protection |
| **🔍 No Analytics** | Zero tracking or data collection | Complete anonymity |
| **📖 Open Source** | Full code transparency | Community-verified security |

### 🚨 **What We DON'T Do**

<div align="center">

| ❌ **Never** | ✅ **Always** |
|:-------------|:--------------|
| Store your files on servers | Direct device-to-device transfer |
| Track your usage or data | Respect your complete privacy |
| Require account registration | Work anonymously |
| Collect personal information | Zero data collection |
| Share data with third parties | Local-only processing |
| Keep transfer histories | Clean slate every time |

</div>

### 🔧 **Development Environment**

**🛠️ Setup Details**
- **Package Manager**: npm (with lockfile for reproducible builds)
- **Bundler**: Next.js with Turbopack for development
- **Code Quality**: ESLint 9 with Next.js configuration
- **Styling**: Tailwind CSS 3.4.17 with PostCSS 8.4.49
- **Type Checking**: TypeScript 5+ with strict mode
- **UI Components**: shadcn/ui with "new-york" style preset

**🚀 Key Dependencies**
- `next`: 15.4.6 (App Router + Turbopack)
- `react`: 19.1.0 (Latest with concurrent features)
- `typescript`: 5+ (Advanced type safety)
- `socket.io-client`: 4.8.1 (Real-time communication)
- `@yudiel/react-qr-scanner`: 2.3.1 (QR scanning)
- `@vercel/analytics`: 1.5.0 (Performance monitoring)

## � Troubleshooting

### **Common Issues & Solutions**

| 🚨 **Issue** | 🔧 **Solution** |
|:-------------|:----------------|
| **Files won't transfer** | Check if both devices are on the same network or if firewall is blocking WebRTC |
| **QR code won't scan** | Ensure camera permissions are granted and try manual room code entry |
| **Large files fail** | Use smaller file sizes on mobile devices due to memory limitations |
| **Connection timeout** | Try refreshing both devices and ensure stable internet connection |
| **Slow transfer speeds** | Connect devices to same WiFi network for optimal performance |

### **Browser Compatibility**
- ✅ **Chrome/Chromium 90+**: Full support
- ✅ **Firefox 88+**: Full support  
- ✅ **Safari 14+**: Full support
- ✅ **Edge 90+**: Full support
- ❓ **Mobile browsers**: Generally supported, may have memory limitations

### **Performance Tips**
- Use WiFi instead of mobile data for faster transfers
- Keep file sizes reasonable on mobile devices (under 100MB recommended)
- Close other tabs/apps during large transfers
- Ensure both devices have sufficient battery

## 🚀 Deployment

### **Development**
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Preview production build locally
npm start
```

### **Production (Vercel - Recommended)**
```bash
# Deploy to Vercel with one command
vercel --prod

# Or deploy via GitHub integration
# Just push to main branch and Vercel auto-deploys
```

### **Environment Variables**
Create a `.env` file with your configuration:
```env
NEXT_PUBLIC_SIGNALING_SERVER_URL=https://your-signaling-server.com
NEXT_PUBLIC_TURN_URL=turn:your-turn-server.com:3478
NEXT_PUBLIC_TURN_USER=your-username
NEXT_PUBLIC_TURN_PASS=your-password
NEXT_PUBLIC_STUN_URL=stun:your-stun-server.com:3478
NODE_ENV=production
```

### **Self-Hosting**
```bash
# Clone and setup
git clone https://github.com/shubhampardule/transmitflow.git
cd transmitflow
npm install

# Build and start
npm run build
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start npm --name "transmitflow" -- start
```

## 🤝 Contributing

<div align="center">

**We ❤️ contributions! Join our community of developers making file sharing better for everyone.**

[![Contributors](https://img.shields.io/github/contributors/shubhampardule/transmitflow?style=for-the-badge)](https://github.com/shubhampardule/transmitflow/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/shubhampardule/transmitflow?style=for-the-badge)](https://github.com/shubhampardule/transmitflow/network/members)
[![Stars](https://img.shields.io/github/stars/shubhampardule/transmitflow?style=for-the-badge)](https://github.com/shubhampardule/transmitflow/stargazers)

</div>

### 🚀 **Quick Contribution Setup**

```bash
# 1️⃣ Fork the repository on GitHub

# 2️⃣ Clone your fork
git clone https://github.com/YOUR-USERNAME/transmitflow.git
cd transmitflow

# 3️⃣ Create a feature branch
git checkout -b feature/amazing-new-feature

# 4️⃣ Make your changes and commit
git commit -m "✨ Add amazing new feature"

# 5️⃣ Push to your fork and create a Pull Request
git push origin feature/amazing-new-feature
```

### 🎯 **How You Can Help**

<table>
<tr>
<td width="33%">

#### 🐛 **Bug Reports**
Found a bug? Help us fix it!
- Use our bug report template
- Include steps to reproduce
- Add screenshots if applicable

</td>
<td width="33%">

#### ✨ **Feature Requests**
Have a cool idea? We'd love to hear it!
- Check existing feature requests
- Describe your use case
- Explain the benefits

</td>
<td width="33%">

#### 📝 **Documentation**
Help others understand the project!
- Fix typos and grammar
- Add examples and tutorials
- Improve API documentation

</td>
</tr>
</table>

### 🏆 **Recognition**

All contributors get:
- 🎉 Listed in our contributors section
- 🏷️ Credit in release notes for their contributions
- 🌟 Special recognition for significant contributions
- 📫 Priority support for their issues

<details>
<summary><strong>📋 Contribution Guidelines</strong></summary>

#### **Code Style**
- Use TypeScript for type safety
- Follow existing code formatting
- Add tests for new features
- Update documentation

#### **Commit Messages**
- Use conventional commits format
- Start with emoji for visual clarity
- Be descriptive but concise

#### **Pull Request Process**
1. Update the README.md with details of changes
2. Increase version numbers if applicable
3. Get approval from maintainers
4. Merge will be handled by maintainers

</details>

## � Support & Community

<div align="center">

### 🤗 **Get Help & Connect**

[![Discord](https://img.shields.io/badge/Discord-Join%20Chat-7289da?style=for-the-badge&logo=discord)](https://discord.gg/your-discord)
[![GitHub Discussions](https://img.shields.io/badge/GitHub-Discussions-green?style=for-the-badge&logo=github)](https://github.com/shubhampardule/transmitflow/discussions)
[![Documentation](https://img.shields.io/badge/Docs-Read-blue?style=for-the-badge&logo=gitbook)](https://github.com/shubhampardule/transmitflow/wiki)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Development-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shubhampardule)

</div>

### 🆘 **Need Help?**

| 💭 **Type** | 🔗 **Where to Go** | ⏱️ **Response Time** |
|:------------|:-------------------|:---------------------|
| 🐛 **Bug Reports** | [GitHub Issues](https://github.com/shubhampardule/transmitflow/issues) | Usually within 24 hours |
| 💡 **Feature Requests** | [GitHub Issues](https://github.com/shubhampardule/transmitflow/issues) | Weekly review cycle |
| ❓ **Questions** | [GitHub Discussions](https://github.com/shubhampardule/transmitflow/discussions) | Community-powered |
| 💬 **Chat** | [Discord Server](https://discord.gg/your-discord) | Real-time |
| 📖 **Documentation** | [Project Wiki](https://github.com/shubhampardule/transmitflow/wiki) | Always available |

### 🌟 **Show Your Support**

<div align="center">

**If this project helped you, consider:**

[![Star on GitHub](https://img.shields.io/badge/⭐-Star%20on%20GitHub-yellow?style=for-the-badge)](https://github.com/shubhampardule/transmitflow)
[![Buy Me A Coffee](https://img.shields.io/badge/☕-Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shubhampardule)
[![Share on Twitter](https://img.shields.io/badge/🐦-Share%20on%20Twitter-1da1f2?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20P2P%20file%20transfer%20app!&url=https://github.com/shubhampardule/transmitflow&via=ShubhamPardule)

</div>

---

## �📄 License

<div align="center">

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You can use, share, and modify this project for **non-commercial purposes only**, as long as you provide attribution to the original author.

**✅ Allowed:**
- Personal use
- Educational use
- Sharing and redistribution
- Modifications and adaptations

**❌ Not Allowed:**
- Commercial use
- Selling or monetizing the software

</div>

---

## 🙏 Acknowledgments

<div align="center">

**Built with ❤️ using amazing open-source technologies:**

</div>

- 🌐 **[WebRTC](https://webrtc.org/)** - For enabling peer-to-peer magic
- ⚛️ **[Next.js 15](https://nextjs.org/)** - The React framework with App Router and Turbopack
- 🎨 **[Tailwind CSS](https://tailwindcss.com/)** - For beautiful, responsive styling
- 🧩 **[shadcn/ui](https://ui.shadcn.com/)** - For modern, accessible component library
- 📡 **[Socket.IO](https://socket.io/)** - For real-time signaling communication
- 📱 **[@yudiel/react-qr-scanner](https://github.com/yudielcurbelo/react-qr-scanner)** - For advanced QR code scanning
- 🔍 **[QRCode](https://github.com/soldair/node-qrcode)** - For QR code generation
- 📊 **[Vercel Analytics](https://vercel.com/analytics)** - For performance monitoring
- 🔔 **[Sonner](https://sonner.emilkowal.ski/)** - For beautiful toast notifications
- ⚡ **[Lucide React](https://lucide.dev/)** - For consistent, beautiful icons

### 💝 **Special Thanks**

- All our amazing [contributors](https://github.com/shubhampardule/transmitflow/graphs/contributors)
- The open-source community for continuous inspiration
- Everyone who provided feedback and suggestions

---

<div align="center">

**[⭐ Star this repo](https://github.com/shubhampardule/transmitflow)** if you find it useful!

**Made with ❤️ by [shubhampardule](https://github.com/shubhampardule)**

### 🚀 *Share files freely, privately, and instantly!*

</div>
