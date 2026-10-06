# Mandate audit and remediation status

Audit date: 6 October 2026. **Production readiness and full 1:1 feature/component parity are not certified.** Significant authorization, validation, data-integrity and fabricated-data issues have been fixed. The remaining release requirements are listed below. Provider credentials will be supplied later, as requested by the project owner.

This document preserves development gaps and database recovery notes from the audit before repository cleanup. GitHub Actions, root audit/profiling/font maintenance scripts, backend tests and their dependencies were subsequently removed at the owner's request. Generated JSON reports and the historical performance report were also removed. Dependency counts and verification outcomes described here are historical.

## Review scope

The audit covered backend, frontend, mobile, shared source, configuration and assets. Dependencies, generated bundles, private environment files and credential files were excluded. Syntax, relative imports and JSON parsing were checked at the time; the generated inventory has been removed.

Manual review and remediation focused on authentication, tenant authorization, input handling, CRUD controllers, models, sockets, provider integrations, scheduled jobs, client caches, page data sources and web/mobile feature mappings. [PARITY.md](PARITY.md) describes all 153 catalog entries and their implementation limits; the live catalog remains in [shared/featureCatalog.json](../shared/featureCatalog.json).

Local builds and code checks passed during the audit, but physical device interactions, SecureStore persistence, push delivery and authenticated end-to-end behavior remain unverified. The Cloudinary live check returned HTTP 401; Stripe and Gemini live checks were not run because required credentials were missing. These outcomes must be rechecked against the release configuration.

## Security and integrity fixes

| Finding | Remediation |
| --- | --- |
| Direct CRUD access bypassed workspace permissions | Shared membership checks now cover task/project/goal/document/event/automation reads and writes. Viewer writes are rejected; administrative operations require the appropriate role. Membership is read from Workspace records. |
| Cross-tenant references and mass assignment | Writable fields are explicitly selected; related projects, tasks, documents, members and uploaded assets must belong to the authorized workspace. Protected identity, workspace and billing fields cannot be changed through ordinary task/profile edits. |
| Injection and abusive input | MongoDB operators, dotted/prototype keys, duplicate query values, oversized/nested bodies and unbounded pagination are rejected. Search regex input is escaped. IDs, primitive types, nested task fields, numeric bounds, enums and dates are validated. |
| Unsafe bulk operations and deletion | Bulk authorization/validation precedes transactional writes. Task deletion cleans dependent comments, goals, daily plans and task references. Project/document cleanup and daily-plan locking are transactional. |
| Anonymous/revoked socket access and private notification leakage | Sockets require verified Firebase identity and a valid API session. Joining workspace rooms checks current membership. Private notifications use user rooms; sockets disconnect at token expiry and on session revocation. |
| Weak identity binding | Firebase UID is authoritative, verified email is required, revoked Firebase tokens are rejected, and legacy binding checks identity conflicts. New user/workspace creation is transactional. |
| Provider simulations | Billing uses signed Stripe webhooks and current subscription state; AI requires configured Gemini access. Missing configuration returns unavailable responses. No simulated upgrades, fabricated AI responses or demo upload credentials remain. |
| Public file exposure | JPEG/PNG/PDF uploads require authorization, bounded size and matching file signatures. Assets are stored with authenticated delivery, tenant-owned metadata and expiring private downloads. Failed metadata writes attempt provider cleanup. Provider verification is still required. |
| Client token leakage and stale data | Both apps use dedicated API clients with relative-path restrictions. Firebase supplies request tokens. Workspace/user changes clear scoped stores; stale reads and reference lookups are guarded or aborted. Native Firebase persistence uses Keychain/Keystore through SecureStore. |
| False metrics and fake state | Removed injected Kanban tasks, fixed metrics, fabricated users/projects/activity, fake uptime/security claims and simulated completion/effort. Today schedules use real due dates in the user's timezone; completed/archived tasks are excluded from active focus. |
| False automation execution history | Task automation changes and execution logs commit together. A failed automation restores the persisted task state for the response. Focus completion measures server elapsed time and is transactional/idempotent; a unique partial index prevents multiple unfinished sessions per user/workspace. |

Backend API errors avoid returning internal server details; production adds security headers and explicit CORS settings. Public content requires a Firebase publisher custom claim and actual published database records. Rate limiting currently uses an in-memory store.

## Database changes already applied

The connected database was changed as part of this request. Eight complete records were copied to `_mandate_quarantine` before removal from active collections: two workspaces whose owners no longer existed, one activity whose user no longer existed, one task whose creator no longer existed, and four unchanged tasks matching the retired demonstration seeder's exact signatures. The repair also supports preserving User snapshots before cleaning stale workspace references. No user record was deleted.

The remaining active dataset includes two users, two workspaces, three tasks and two activities. Other model collections are currently empty. The final audit found no invalid documents or missing/cross-workspace references. Old activities without workspace scope are preserved but do not appear in scoped activity feeds.

All 19 collections now have strict MongoDB BSON validators and expected indexes. Validators cover allowed fields, BSON types, required fields, enums and representable length/array/numeric bounds. Application validation and the database audit enforce additional semantics such as ownership, membership, foreign references, hierarchy cycles, valid calendar dates and URL rules; MongoDB does not provide cross-collection foreign-key enforcement. Direct database credentials must remain restricted to trusted services/operators.

DailyMandate uniqueness includes user, workspace and date. The old user/date-only unique index was removed after the replacement index existed. Each migration stores the previous collection validator options in `_mandate_schema_backups`. Production startup disables automatic index creation; run the migration before starting the new version.

`db:audit` and `db:repair` are read-only by default. `db:migrate` installs validators/indexes after a clean data audit; `db:repair -- --apply` explicitly performs the quarantine transaction. The retired starter-task seeder is disabled.

Recovery: inspect `_mandate_quarantine` for source collection, original document, reason and timestamp. Restore only after repairing missing ownership/references and checking for ID/unique-key collisions. Quarantined invalid records will be rejected by the new validators until repaired. Restoring original validator options from `_mandate_schema_backups` is an operator rollback procedure and does not restore collection data or removed indexes. These local snapshots are not an independently verified disaster-recovery backup. Validate Atlas backup retention, restore drills and least-privilege database access before release.

## Real data and parity

Business records and metrics come from backend endpoints and database records. The shared feature catalog, client helper and paired web/native renderers establish matching field definitions, CRUD operations and API selection. Backend collections were added for feature records, saved views, reviews, focus sessions, API sessions, uploaded assets and published content. Loading, error, empty and unavailable states replace fabricated fallback results.

The former specialized mock screens were largely replaced with common real-data interfaces. **Shared generic CRUD is not a complete implementation of every advertised advanced feature.** Finance/forecasting/invoice/procurement/compliance/partner/customer-journey screens currently store actual records but do not implement their full domain engines. Dependency maps, timelines, capacity/workload analysis and custom analytics still need specialized behavior and acceptance tests. Offline pages report connectivity; an offline mutation queue, conflict handling and recovery are not implemented. Integration OAuth adapters are not implemented. These gaps are explicit in the parity matrix.

Presentation text, navigation definitions, colors, icons, empty-state instructions and form defaults remain static. Reusable presentation components receive real data from their page/hooks rather than each issuing duplicate database requests. The isolated backend tests and their synthetic fixtures have been removed; the legacy seeder signatures exist only in the database repair tool.

## Dependency status

Safe package updates and targeted overrides removed reported production advisories from backend and frontend dependency trees. The frontend was migrated to Tailwind 4 with its existing theme configuration, removing the vulnerable build dependency; all frontend advisories are now cleared. Backend development uses Node's built-in watcher instead of Nodemon, removing its high-severity dependency chain. Cloudinary was upgraded and its unused Multer adapter removed. Firebase's gRPC dependency, selector-parser and the native Xcode UUID chain were updated. Expo packages were kept compatible with the installed SDK.

| Project | Production dependency advisories | Including development dependencies |
| --- | --- | --- |
| Backend | 0 | 19 moderate |
| Frontend | 0 | 0 |
| Mobile | 16 high | 16 high |

Counts include affected transitive packages, not necessarily distinct vulnerabilities. Remaining root advisories concern `braces`, `node-forge` and `sprintf-js`, with propagated tooling chains. The mobile npm production tree includes Expo/Metro build tooling; these counts do not establish which vulnerable modules execute inside the shipped Hermes bundle. They still require resolution and review. npm's proposed automatic fixes include disruptive downgrades of Expo/React Native/Jest or unsupported dependency changes; those were not forced. Full-tree remediation remains open.

The `.github` directory and all GitHub Actions workflows have been removed, as requested by the owner. The root verification commands have also been removed. Local frontend lint/build, mobile export and database audit commands remain available. Passing builds do not resolve dependency advisories.

## Remaining release requirements

1. Configure valid Cloudinary credentials, Stripe secret/webhook/price IDs, and Gemini key/model in `backend/.env` or the deployment secret store. Verify private JPEG/PNG/PDF upload/download, Stripe checkout/renewal/cancellation/webhook retries, and AI generation against real providers. The owner will supply credentials later; secrets must not be pasted into reports or committed.
2. Recheck dependency advisories after the removal of test-only tooling and resolve or apply reviewed fixes for remaining advisories, including the mobile dependencies.
3. Complete the advanced domain workflows and specialized views in [PARITY.md](PARITY.md), then run feature-by-feature authenticated web and native acceptance tests. Full feature/component parity remains an open objective.
4. Verify Firebase registration, email verification, password recovery, native SecureStore persistence, workspace switching, permissions, uploads, push delivery and reconnects on actual Android/iOS builds. Authenticated browser/device end-to-end testing was not possible without test-account access.
5. Publish approved privacy/terms/legal/security content through the protected publisher API. No production public policy records were seeded. Review deletion/export/retention requirements; account deletion, member removal and workspace deletion workflows are not implemented.
6. Implement provider integration adapters where required. Add billing management/portal workflows and verify entitlement enforcement and subscription history against the intended product rules.
7. Validate production infrastructure: TLS, proxy-hop configuration, Firebase allowed domains, Netlify CSP, secret rotation, least-privilege Atlas access, backups, restore drills, monitoring and alerting. Local readiness checks verify database connection, not every infrastructure control.
8. Run load/concurrency/recovery tests and native device profiling. Feature screens now fetch 50 records per page and analytics use MongoDB aggregation. Core schedules/boards still load all lightweight task summaries; reference metadata, saved-view results and exports need scale testing. Native frame rate, memory use and deployed performance still require measurement. Multiple instances require a shared rate-limit store and Socket.IO adapter, plus a coordinated scheduler. Recurrence/reminder downtime recovery and missed executions need operational verification.

## Reproduce the checks

Install each package with `npm ci --prefix backend`, `npm ci --prefix frontend` and `npm ci --prefix mobile`. Configure each project's private `.env` using the variables documented in the [root README](../README.md) and [backend setup](../backend/README.md).

Run `npm run lint --prefix frontend` and `npm run build --prefix frontend` for local web checks. Tailwind 4 requires modern browsers (Safari 16.4+, Chrome 111+, Firefox 128+); verify the intended browser support matrix against the [official upgrade guide](https://tailwindcss.com/docs/upgrade-guide). Run `npm run export:audit --prefix mobile` for native exports and `npx expo install --check` from `mobile` for SDK compatibility. Run `npm run db:audit --prefix backend` for the connected database. Run `npm audit --omit=dev --prefix <package>` and full `npm audit --prefix <package>` separately to review dependency risks. `db:migrate` and `db:repair -- --apply` change the database and should run only as deliberate operator actions.

This document does not certify a deployed release or app-store build.
