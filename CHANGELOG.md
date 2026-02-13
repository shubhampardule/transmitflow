# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Browser support matrix documentation (`docs/browser-support.md`).
- Automated browser-support freshness validator script (`scripts/check-browser-support.mjs`).
- Monthly CI workflow for browser-support verification (`.github/workflows/browser-support-check.yml`).
- Privacy page at `/privacy` (`src/app/privacy/page.tsx`).
- Landing section component split under `src/components/landing/`.
- Transfer controller hook (`src/components/hooks/useP2PTransferController.ts`) for centralized transfer orchestration.
- Transfer summary metrics card in terminal states (duration, average speed, size, file count).
- Native share support (Web Share API with clipboard fallback) in sender and progress flows.
- File-type aware icon mapping utility for transfer lists (`src/lib/file-icons.ts`).

### Changed
- Main transfer container (`P2PFileTransfer`) simplified into a composition shell with hook-driven state.
- README structure and architecture docs refreshed to match the refactored component/hook architecture.
- CI pipeline now includes browser support matrix validation.
- Drag-and-drop zone now shows clear active-state feedback during file hover.
- File entries render type-specific icons (image, video, audio, archive, code, spreadsheet, generic fallback).

### Fixed
- Room-code receive input clipping and readability issues on small screens.
- Removed obsolete floating scroll button mount and stale UI helper components.

## [0.2.0] - 2026-02-12

### Added
- Clear sender/receiver recovery actions for timeout, disconnect, and failure states.
- One-click share actions across flows (copy code, copy link, QR toggle).
- Role-aware reassurance copy during connecting/transferring states.
- Sender retry behavior that creates a fresh room code after terminal errors.

### Changed
- Room code UX standardized around 4-character codes.
- Mobile transfer layout improved to keep primary actions and file context visible.
- Selected-files flow now supports appending files with a dedicated "Select more files" action.
- Transfer progress readability improved (`<1%` for early progress, delayed ETA until stable).
- Accessibility and motion handling improved (focus visibility, ARIA labels, reduced-motion support).

### Fixed
- QR scan fallback and CSP/WASM production compatibility issues.
- Input composition handling for room code entry on mobile keyboards.
- Sender/receiver action visibility mismatches in transfer screens.
- Mobile status card alignment and spacing issues for long messages.

### Security
- Completed the remaining hardening (readiness UX, safer recovery, accessibility, reassurance messaging).
- Added room leave handling for cleaner session teardown before rejoin/retry.

### Added
- Binary-first transfer path with automatic compatibility fallback
- IndexedDB chunk storage support
- PWA offline shell and install prompt
- QR code connection stabilization
- Integrity verification with SHA-256 for finished transfers

### Changed
- Major UI refresh for better mobile responsiveness
- Improved socket event authorization and payload validation
- Hardened room code generation with `crypto.getRandomValues`
- Updated cancel behavior for smoother UX

### Fixed
- Fixed race conditions in signaling server
- Resolved CORS issues with strict allowlist
- Patched vulnerable dependencies

### Security
- Added rate limiting and abuse protection
- Enforced strict CSP and security headers
- Sanitized production logs
- Removed sensitive data from health endpoints

## [0.1.0] - 2025-12-15

### Added
- Initial release of TransmitFlow
- Basic WebRTC file transfer capability
- Signaling server implementation
- React frontend with Tailwind CSS
