# Security Hardening Plan

## Goal
Harden TransmitFlow for production internet usage by implementing security controls in a strict order, with clear completion criteria.

## How We Will Execute
- We implement one item at a time in order.
- We do not start the next item until the current item is verified.
- After each item, we run tests/lint/build and a focused security check for that scope.

## Status
- Overall: `Completed`
- Current step: `Completed`

## Step-by-Step Plan

### 1. Enforce signaling event authorization and payload validation (P0)
Status: `Completed`

Scope:
- Validate all socket event payloads (`join-room`, `webrtc-offer`, `webrtc-answer`, `webrtc-ice-candidate`, `transfer-*`).
- Reject malformed payloads and unknown fields.
- Ensure sender socket is actually in `roomId` before relaying.
- Ensure room membership/role checks are enforced server-side for every relay event.

Done when:
- Invalid payloads are rejected with safe errors.
- Cross-room spoofing attempts are blocked.
- Only room participants can emit/relay signaling and transfer events.

### 2. Add abuse protection: rate limits + room code input hardening (P0)
Status: `Completed`

Scope:
- Per-IP and per-socket event rate limits on signaling server.
- Enforce strict room format (length + charset) server-side.
- Add message size limits for signaling payloads where applicable.

Done when:
- Flood attempts are throttled.
- Invalid room codes never create/join rooms.
- Server remains stable under burst traffic tests.

### 3. Tighten CORS allowlist (P0)
Status: `Completed`

Scope:
- Replace wildcard-style production origin matching with explicit trusted domains.
- Keep local development origins isolated to non-production only.
- Apply same strict policy to Express and Socket.IO CORS config.

Done when:
- Requests from non-allowlisted origins are blocked in production.
- No regression for official frontend domains.

### 4. Patch vulnerable dependencies and align lockfile (P0)
Status: `Completed`

Scope:
- Upgrade vulnerable packages (especially `next`) to patched versions.
- Regenerate lockfile to remove version drift.
- Re-run `npm audit` and document remaining risk (if any).

Done when:
- High severity vulns are removed or explicitly justified.
- `package.json` and installed versions are consistent.

### 5. Add security headers and baseline CSP (P1)
Status: `Completed`

Scope:
- Add headers in Next config:
  - `Content-Security-Policy`
  - `X-Content-Type-Options`
  - `X-Frame-Options` or `frame-ancestors` in CSP
  - `Referrer-Policy`
  - `Permissions-Policy`
- Ensure WebRTC/signaling/QR/PWA still function under CSP.

Done when:
- Headers are present on responses.
- No functional break in transfer flow.

### 6. Restrict health endpoint exposure (P1)
Status: `Completed`

Scope:
- Remove sensitive runtime details from public health response.
- Optionally split into:
  - public liveness endpoint
  - protected diagnostics endpoint

Done when:
- Public endpoint does not expose memory/runtime internals.
- Diagnostics are protected.

### 7. Improve TURN credential security model (P1)
Status: `Completed`

Scope:
- Remove static public fallback TURN credentials from production path.
- Move to controlled TURN credentials strategy (time-limited where possible).
- Ensure no sensitive TURN secrets are exposed in unsafe channels/logs.

Done when:
- Production no longer relies on known shared TURN credentials.
- TURN setup remains reliable for real users.

### 8. Use cryptographically secure room code generation (P2)
Status: `Completed`

Scope:
- Replace `Math.random()` room generation with `crypto.getRandomValues`.
- Keep UX-friendly code format while increasing unpredictability.

Done when:
- Room codes are generated via CSPRNG.
- Existing join flow remains unchanged for users.

### 9. Sanitize and reduce production logging (P2)
Status: `Completed`

Scope:
- Remove or gate verbose logs containing room IDs, file names, device/network details.
- Keep only actionable operational logs with low sensitivity.

Done when:
- No sensitive transfer context is logged in production by default.

### 10. Service worker cache hardening (P2)
Status: `Completed`

Scope:
- Avoid caching navigation responses containing sensitive query params (e.g. `?receive=`).
- Normalize/strip query strings for cache keys where appropriate.

Done when:
- Room invite query parameters are not persisted in cache artifacts.

---

## OSS Program Readiness Plan

### Goal
Prepare TransmitFlow for Vercel OSS Program acceptance by adding governance, CI/CD, testing, and release maturity signals.

### References
- https://vercel.com/oss
- https://vercel.com/docs/accounts/plans/open-source

---

### 11. Add OSS governance and community files (P0)
Status: `Completed`

Scope:
- Add `CODE_OF_CONDUCT.md` (Contributor Covenant or equivalent).
- Add `CONTRIBUTING.md` with setup instructions, PR guidelines, and coding standards.
- Add `SECURITY.md` with responsible disclosure policy.
- Add `CHANGELOG.md` to track versioned changes.

Done when:
- All four files exist at repo root with meaningful content.
- README links to CONTRIBUTING and CODE_OF_CONDUCT.

### 12. Add GitHub issue and PR templates (P0)
Status: `Completed`

Scope:
- Create `.github/ISSUE_TEMPLATE/bug_report.md` with structured bug report fields.
- Create `.github/ISSUE_TEMPLATE/feature_request.md` with structured feature request fields.
- Create `.github/PULL_REQUEST_TEMPLATE.md` with checklist (description, testing, screenshots).

Done when:
- New issues and PRs on GitHub auto-populate with the templates.
- Templates cover bug reports, feature requests, and PR checklists.

### 13. Add CI/CD pipeline with GitHub Actions (P0)
Status: `Completed`

Scope:
- Create `.github/workflows/ci.yml` to run on every PR and push to main.
- CI steps: install dependencies, lint (`eslint`), typecheck (`tsc --noEmit`), build (`next build`), run tests.
- Add branch protection rules requiring green CI checks before merge.

Done when:
- Every PR triggers automated lint/build/typecheck/test.
- Failing checks block merge.

### 14. Add unit tests for core utilities (P0)
Status: `Completed`

Scope:
- Set up test framework (Vitest or Jest) with TypeScript support.
- Add unit tests for `src/lib/file-utils.ts` (chunking, size formatting, MIME helpers).
- Add unit tests for `src/lib/utils.ts` (utility functions).
- Add unit tests for transfer state logic and room code generation.

Done when:
- Test suite runs via `npm test` and passes.
- Core utility functions have >80% coverage.
- Tests are integrated into CI pipeline (step 13).

### 15. Add E2E smoke tests for transfer flow (P1)
Status: `Completed`

Scope:
- Set up E2E framework (Playwright or Cypress).
- Add smoke test: app loads, room creation works, room code is displayed.
- Add smoke test: sender/receiver connect, file transfer initiates, cancel works.
- Add smoke test: offline page renders correctly.

Done when:
- E2E suite runs and passes in CI.
- Core connect/send/receive/cancel flow is covered.

### 16. Add semantic versioning and release process (P1)
Status: `Completed`

Scope:
- Adopt semantic versioning (`MAJOR.MINOR.PATCH`).
- Document release process in `CONTRIBUTING.md`.
- Create first tagged release with release notes.
- Keep `CHANGELOG.md` updated with each release.

Done when:
- Repo has at least one tagged release with notes.
- CHANGELOG reflects current version history.
- Release process is documented and repeatable.

### 17. Add reliability and compatibility documentation (P2)
Status: `Completed`

Scope:
- Document supported browser/device matrix (Chrome, Firefox, Safari, Edge; desktop + mobile).
- Document known limits (max file size, concurrent transfers, network conditions).
- Add architecture overview diagram or doc.
- Expand security documentation based on completed hardening steps.

Done when:
- README or dedicated docs cover browser support, limits, and architecture.
- Security hardening outcomes are documented publicly.

### 18. Add connection readiness UX and non-blocking states (P2)
Status: `Completed`

Scope:
- Add a small, always-visible status indicator for signaling readiness (e.g., Connecting / Ready / Offline).
- Ensure the app UI renders immediately without blocking on signaling, and actions are clearly disabled with an explanation.
- Keep retry behavior safe and avoid user confusion when the receiver opens late.

Done when:
- Users can open the site instantly and understand current readiness at a glance.
- The send/receive primary actions communicate why they are disabled (when not connected).
- No regressions in connect/join/transfer flow.

### 19. Reduce friction in share flow (copy code/link + QR) (P2)
Status: `Completed`

Scope:
- Provide one-click actions for sharing: copy code, copy full link, and show QR.
- Use clear success feedback (toast) for clipboard actions.
- Ensure QR scanning failures have a clear fallback path (manual code entry).

Done when:
- Sender can share via code/link/QR with one click and clear confirmation.
- Receiver can always proceed even if QR is unavailable.

### 20. Add safe error recovery actions (P2)
Status: `Completed`

Scope:
- On common connection/session errors, offer explicit next actions (Retry connect / Create new room / Switch to Receive).
- Avoid "dead-end" error states that force full refresh.

Done when:
- All terminal connection errors provide at least one safe recovery action.
- Recovery actions are verified not to leak state between rooms/sessions.

### 21. Mobile-first flow polish for primary actions (P3)
Status: `Completed`

Scope:
- Tighten spacing and keep the primary action visible on mobile where possible.
- Reduce scroll friction in the "selected files" state (without adding new screens).

Done when:
- On small screens, users can start sharing/connecting without hunting for the primary button.

### 22. Accessibility + reduced-motion audit for the new UI (P2)
Status: `Completed`

Scope:
- Ensure keyboard navigation order is correct for tabs, buttons, inputs.
- Ensure focus styles are visible and consistent.
- Respect `prefers-reduced-motion` for decorative animations (blobs/glow) where applicable.

Done when:
- Keyboard-only flow works for Send and Receive.
- Reduced-motion users get a calmer experience without losing functionality.

### 23. Improve transfer reassurance messaging (P3)
Status: `Completed`

Scope:
- Add a concise "what's happening" line during Connecting/Transferring states (e.g., signaling, negotiating, transferring).
- Keep wording user-friendly and avoid overly technical errors.

Done when:
- Users report less confusion during connecting/transferring.
- Messaging remains accurate across sender/receiver roles.

---

## Verification Template (Use After Each Step)
- Implemented changes:
- Files touched:
- Security tests performed:
- Functional tests performed:
- Result:
- Follow-up risk:
