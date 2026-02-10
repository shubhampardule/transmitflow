# Browser & Device Compatibility

TransmitFlow uses WebRTC for peer-to-peer file transfer. While WebRTC is widely supported, implementation details can vary between browsers and OS versions.

## Supported Browsers

| Browser | Desktop (Windows/macOS/Linux) | iOS (15+) | Android (10+) | status |
| :--- | :---: | :---: | :---: | :--- |
| **Chrome** | 90+ | N/A (WebKit) | 90+ | ✅ Fully Supported |
| **Firefox** | 88+ | N/A (WebKit) | 88+ | ✅ Fully Supported |
| **Safari** | 15+ | 15+ | N/A | ✅ Fully Supported |
| **Edge** | 90+ | 15+ | 90+ | ✅ Fully Supported |

## Known Limitations

### Memory Restrictions (Large Files)
WebRTC transfers store data in memory or Blob storage depending on implementation.
- **Mobile Devices (iOS/Android):** Recommended file limit is **< 1GB**. Transfers larger than 1-2GB may crash the browser tab due to OS memory pressure.
- **Desktop:** Can handle significantly larger files (tested up to **10GB+**), but depends on available system RAM.
- **Workaround:** TransmitFlow uses chunking (16KB) to stream data, but receiver reassembly may still hit limits.

### Network Conditions
- **Symmetric NATs / Corporate Firewalls:** Direct connection may fail if STUN cannot traverse the NAT.
- **Mobile Data:** Carrier-grade NAT (CGNAT) is usually supported, but some carriers block WebRTC UDP ports.
- **VPNs:** Some VPNs block local IP discovery or UDP traffic.

### iOS Specifics
- Must use Safari (or browsers using WebKit engine).
- Background transfers are **not supported**. If you minimize Safari, the connection will pause or close.
- Screen must remain on for large transfers.

### Android Specifics
- Chrome is the recommended browser.
- Battery saver modes may throttle network performance.

## Troubleshoot Connection Issues
If you cannot connect:
1. Ensure both devices are on the same Wi-Fi (for best speed, though not required).
2. Refresh the room code on the sender and try again.
3. Turn off VPNs or proxies.
4. Try a different browser (Chrome usually has the most robust WebRTC implementation).
