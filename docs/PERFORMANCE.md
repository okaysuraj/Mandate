# Performance audit and implementation

6 October 2026. Performance fixes and the native sidebar redesign are implemented. Local builds, automated checks and browser measurements passed. Native frame rate, native memory use and deployed performance are not certified.

## Measured results

| Measurement | Before | After | Scope |
| --- | ---: | ---: | --- |
| Login JavaScript, uncompressed | 1,009,625 B | 516,793 B | 48.8% reduction; includes module preloads |
| Login JavaScript, calculated gzip | 274,961 B | 147,661 B | 46.3% reduction; not measured network transfer |
| Login JavaScript heap after garbage collection | 2,815,844 B | 2,325,312 B | 17.4% reduction; excludes DOM/native/process memory |
| Login first contentful paint | 448 ms | 292 ms | Median of three local Chromium samples with 4x CPU throttling |
| Android Hermes bundle | 3,297,851 B | 2,990,072 B | 9.3% reduction; exported bytecode, not native memory |
| Android assets | 7,346,429 B | 1,315,281 B | 82.1% reduction; unnecessary font families removed |
| iOS Hermes bundle | 3,292,300 B | 2,986,730 B | 9.3% reduction; exported bytecode |
| iOS assets | 7,347,434 B | 1,316,286 B | 82.1% reduction |
| Task requests, 20 simultaneous readers / 5,000 records | 500 | 25 | Isolated injected API benchmark; 95% reduction |
| Serialized task state, 5,000 records | 14,307,781 B | 2,412,781 B | 83.1% reduction; serialized size, not heap or RSS |
| Today scheduling, 5,000 records | 314.12 ms | 10.79 ms | Median of five synthetic Node/V8 runs |

Web samples use fresh headless Chromium contexts, a 390x844 viewport and a local production preview. They do not include mobile hardware, cellular latency, production compression or authenticated data. First-paint timings vary; these samples establish a local improvement rather than a device speed guarantee. Baselines represent the project after the preceding security work, before this performance pass.

Evidence: [web before](performance-web-before.json), [web after](performance-web-after.json), [native before](performance-mobile-before.json), [native after](performance-mobile-after.json), [core benchmark](performance-core.json), [component interactions](performance-ui.json), [public smoke](performance-public-smoke.json).

## Changes

- Web pages load through React lazy routes. Manual chunk boundaries keep drag-and-drop, icons, date helpers and feature pages out of public entry routes. Socket.IO loads after sign-in. Fonts are self-hosted; the Material Symbols subset contains the 88 used symbols. Offline build checks catch missing font assets or new symbols.
- Native navigation evaluates screen modules on demand. Today, Calendar, Kanban, feature records, feature index and reference pickers use bounded FlatList rendering. Decorative animations use the native driver and stop on screen blur, backgrounding or reduced motion.
- Both clients share deduplicated task loading, a 30-second freshness window, forced refresh, cancellation and workspace guards. Summaries omit attachments and subtasks. Task caches release 15 seconds after the last consumer leaves. Socket handlers are shared; dashboard refresh bursts are coalesced. Reconnects refresh previously loaded tasks. Timezone formatters are cached.
- Feature screens fetch 50 records per page with Previous/Next navigation on both clients. Related-record metadata loads only while a form needs it. Web pickers render at most 20 search matches; native pickers virtualize choices. The web board renders at most 30 cards per column with pagination-aware reordering. Notification caches are bounded.
- Analytics and workload counts use MongoDB aggregation instead of loading entire documents into the backend process. List queries use lean results and metadata projections. Five pagination/filter indexes were installed in the connected database; its read-only audit found zero invalid records or missing indexes across 19 collections. Active record counts were unchanged. No benchmark fixtures were inserted there.

## Native sidebar

The left hamburger opens a rounded panel inset below the status bar and above the bottom safe area. Width is capped at 360 points. It includes a scrim, new-task pill, navigation search, selected-page highlight, expandable tools and real workspace/account details. Navigation scrolls above the account footer. Close button, outside tap, Android Back, accessibility escape and a left swipe dismiss it. Native transform animations respect reduced motion; opening it does not rerender the navigator.

The layout adopts familiar Gemini/ChatGPT navigation patterns while using Mandate destinations and the requested top/bottom gaps. It is not a pixel-identical replica of two different apps. Native exports compile; physical-device visual and gesture review remains required.

## Verification and remaining limits

Source inventory: 441 files, no syntax/import issues. Backend/shared tests: 38 passed across two suites, including real MongoDB aggregation, projection, tenant checks and pagination query-plan checks. Frontend lint: no errors or warnings. Web production build and Android/iOS production exports passed. Seven public routes rendered without JavaScript errors or external Google-font requests. Real-component tests with 5,000 fixtures verified bounded rendering, searchable/keyboard reference selection and second-page keyboard dragging without corrupting off-page order. Fixtures appear only in tests/profiling scripts and ignored output.

Core Today/Calendar/board views still retain all lightweight task summaries while active to preserve complete schedules and counts. Related-record forms can retain all ID/title metadata; saved-view results and exports can load complete results. These paths use memory proportional to record count. Very large workspaces need server-side schedule/board queries, searchable reference endpoints and streaming exports before claiming constant-memory behavior. Native navigation stacks can retain visited screen instances even with deferred module evaluation and cleared feature caches.

Before release, profile release builds on representative low/mid-range Android and iOS devices: cold/warm start, JS/UI frame times during scrolling and sidebar gestures, peak native/JS memory, memory after repeated navigation/workspace switches, and background/foreground behavior. Exercise authenticated web routes with realistic workspaces, degraded networks and reconnects; run backend concurrency/latency tests with production-like data. No Android SDK/emulator, connected device or authenticated acceptance account was available for this pass. Provider credentials and prior dependency/parity requirements remain tracked in [AUDIT.md](AUDIT.md).

## Reproduce

Run `npm run verify` and `npm run verify:mobile`. Run `node scripts/verify-performance-ui.cjs` for isolated browser component checks. Start the built web preview at port 4173, then run `node scripts/profile-web.cjs current` to create a new report. Run `node scripts/profile-core.cjs` for the isolated data/scheduling benchmark. Font updates use `npm run fonts:update --prefix frontend`; normal builds verify local assets without fetching providers.
