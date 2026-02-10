# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
