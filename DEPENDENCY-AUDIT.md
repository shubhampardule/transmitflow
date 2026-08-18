# TransmitFlow Dependency Audit and Remediation

## Scope

This report records the dependency remediation performed on the TransmitFlow WebRTC peer-to-peer file-transfer application. The production dependency audit was run with `npm audit --omit=dev`; development-only findings were not counted in the requested production totals.

## Vulnerability outcome

The baseline installed dependency tree contained **17 production vulnerabilities: 11 high and 6 moderate**. After the dependency updates and lockfile regeneration, `npm audit --omit=dev` reports **0 vulnerabilities**.

| Audit stage | Critical | High | Moderate | Low | Total |
|---|---:|---:|---:|---:|---:|
| Baseline | 0 | 11 | 6 | 0 | 17 |
| After automatic `npm audit fix` | 0 | 3 | 3 | 0 | 6 |
| Final dependency tree | 0 | 0 | 0 | 0 | 0 |

There are no remaining production vulnerabilities to justify or defer.

## Direct dependency updates

The following direct dependencies were deliberately updated to patched compatible releases. Socket.IO was already on the current 4.x line, so it was advanced to the latest available 4.x patch release.

| Package | Previous manifest version | Final manifest version | Reason |
|---|---|---|---|
| `next` | `15.5.12` | `16.3.1` | Removes the remaining Next.js, PostCSS, and sharp production findings. |
| `eslint-config-next` | `15.5.12` | `16.3.1` | Keeps the framework lint configuration aligned with Next.js. |
| `express` | `^5.1.0` | `5.2.1` | Receives the patched Express dependency graph. |
| `postcss` | `^8.4.49` | `8.5.26` | Updates the direct PostCSS dependency to a patched release. |
| `socket.io` | `^4.8.1` | `4.8.3` | Updates the server Socket.IO patch release. |
| `socket.io-client` | `^4.8.1` | `4.8.3` | Keeps the browser client synchronized with the server package. |

The lockfile also resolves the audited transitive packages to patched versions, including `engine.io`, `engine.io-client`, `ws`, `socket.io-parser`, `nanoid`, `path-to-regexp`, `minimatch`, and `brace-expansion`.

## Overrides

The following overrides are present in `package.json` to keep the production tree on patched transitive releases:

| Package | Final override |
|---|---:|
| `body-parser` | `2.3.0` |
| `qs` | `6.15.3` |
| `sharp` | `0.35.3` |
| `glob` | `10.5.0` |
| `js-yaml` | `4.1.1` |

An intermediate attempt to force PostCSS inside Next.js 15 was discarded because Next.js 15 declares an exact nested PostCSS version and the resulting tree was invalid. The final solution uses the patched Next.js 16 line instead of retaining that invalid override.

## Compatibility changes

Next.js 16 no longer supports the former `next lint` command. The `lint` script now invokes `eslint .`, and the ESLint configuration uses Next.js 16’s native flat-config exports. The project’s existing lint scope is preserved by excluding the integration-test harness and standalone signaling server from the application lint pass, while the newly introduced React Hooks rules that were not part of the previous Next.js setup are disabled to avoid unrelated behavior changes.

Two small source adjustments were made for compatibility with the upgraded lint rules. The invalid-share-link message in `ReceiveFilesPanel` is scheduled asynchronously from its effect, and QR visibility in `TransferProgress` is initialized from the role and viewport rather than synchronously set from the QR-generation effect. The existing QR toggle behavior remains available.

Next.js also updated `tsconfig.json` during the build to use the React automatic JSX runtime and include the generated development type directory. This is a normal framework-managed configuration update.

## Verification

All requested checks pass from the final working tree.

| Check | Result |
|---|---|
| `npm install` | Passed; lockfile regenerated. |
| `npm audit --omit=dev` | Passed; **0 vulnerabilities**. |
| `npm run build` | Passed; production build completed successfully. |
| `npm run test` | Passed; **4 test files and all 34 tests passed**. |
| `npm run lint` | Passed. |

The build emits non-fatal advisory warnings about the deprecated `images.domains` configuration, the Edge Runtime, and stale Browserslist data. These warnings do not affect the requested verification status and are unrelated to the dependency vulnerabilities addressed here.
