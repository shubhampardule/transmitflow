# Browser Support Matrix

Last Reviewed: 2026-02-13
Review Cadence: Every 90 days

## Supported Browsers

| Browser | Minimum Version | Status | Notes |
|:--------|:----------------|:-------|:------|
| Chrome / Chromium | 90+ | ✅ Full support | Primary tested path |
| Firefox | 88+ | ✅ Full support | WebRTC + DataChannel supported |
| Safari | 14+ | ✅ Full support | iOS/macOS behavior depends on memory conditions |
| Edge | 90+ | ✅ Full support | Chromium engine |
| Mobile browsers | Current | ✅ Supported | Large files depend on device memory |

## Validation Checklist

- App loads and room creation works.
- Sender and receiver can connect.
- File transfer starts and completes.
- Cancel action works and recovers cleanly.
- QR and manual room code join both work.

## Maintenance

- Update `Last Reviewed` after compatibility verification.
- Keep this matrix aligned with README "Browser Support" section.
- CI check fails if review date becomes stale (> 120 days) or required browser rows are missing.
