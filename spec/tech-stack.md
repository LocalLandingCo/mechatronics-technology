# Tech Stack

> Status: read from `package.json`, the four tsconfigs, `vite.config.ts`, `vitest.config.ts`,
> `tailwind.config.ts`, `eslint.config.js`, `components.json` and `postcss.config.js` on
> 2026-10-11. Versions below are the declared semver ranges, not resolved lockfile versions.

## 1. Summary

| Layer | Choice |
| --- | --- |
| Package name | `vite_react_shadcn_ts` (private, `version: 0.0.0`, `type: module`) |
| Language | TypeScript `^5.8.3` |
| UI runtime | React `^18.3.1` + React DOM `^18.3.1` |
| Build tool | Vite `^5.4.19` |
| JSX/TS transform | `@vitejs/plugin-react-swc` `^3.11.0` (SWC, not Babel) |
| Styling | Tailwind CSS `^3.4.17` + PostCSS `^8.5.6` + Autoprefixer `^10.4.21` |
| Component layer | shadcn/ui (vendored source) over Radix UI primitives |
| Routing | `react-router-dom` `^6.30.1` |
| Icons | `lucide-react` `^0.462.0` |
| Test runner | Vitest `^3.2.4` + jsdom `^20.0.3` + Testing Library |
| Linter | ESLint `^9.32.0` (flat config) + `typescript-eslint` `^8.38.0` |
| Backend | None — static SPA + third-party form API |
| Scaffold origin | Lovable (`lovable-tagger` dev plugin, untouched template README) |

There is **no server-side runtime**: the deliverable is a static bundle. The only
owned-code boundary to the network is a `fetch` to Web3Forms.

## 2. Build & tooling configuration

### `vite.config.ts`
- Dev server: `host: "::"` (IPv6 any-address, so LAN-reachable), `port: 8080`,
  `hmr.overlay: false` (runtime errors do **not** show the red overlay — check the console).
- Plugins: `react()` always; `componentTagger()` from `lovable-tagger` **only** when
  `mode === "development"`, filtered out otherwise.
- Alias: `@` → `./src`.
- No `base`, no `build` overrides → default output `dist/`, default chunking.

### `vitest.config.ts` (separate from the Vite config)
- `environment: "jsdom"`, `globals: true`.
- `setupFiles: ["./src/test/setup.ts"]` — stubs `window.matchMedia` and imports
  `@testing-library/jest-dom`.
- `include: ["src/**/*.{test,spec}.{ts,tsx}"]`.
- Duplicates the `@` alias and the React plugin; the two configs must be kept in sync.

### TypeScript — three-file project references
| File | Role | Notable settings |
| --- | --- | --- |
| `tsconfig.json` | Solution root | References `tsconfig.app.json` + `tsconfig.node.json` |
| `tsconfig.app.json` | Application | `strict: false`, `noImplicitAny: false`, `noUnusedLocals: false`, `noUnusedParameters: false`, `noEmit`, `moduleResolution: "bundler"`, `target/lib: ES2020`, `jsx: "react-jsx"`, `types: ["vitest/globals"]`, `paths: { "@/*": ["./src/*"] }` |
| `tsconfig.node.json` | Config files | Node-targeted settings for `vite.config.ts` etc. |

**Strict mode is off and unused-symbol checks are disabled.** There is no `typecheck` script
either, so `tsc` never runs in the declared workflow — type errors surface only in the editor.

### ESLint — `eslint.config.js` (flat config)
- Extends `@eslint/js` recommended + `typescript-eslint` recommended.
- Plugins: `react-hooks` (recommended rules on), `react-refresh`
  (`only-export-components: warn`, `allowConstantExport: true`).
- `ignores: ["dist"]`, `ecmaVersion: 2020`, `globals.browser`.
- `@typescript-eslint/no-unused-vars` is explicitly **`"off"`** — this is why the dead
  imports listed in `spec.md` §9 pass lint.
- No `eslint-plugin-jsx-a11y`, no Prettier, no `.editorconfig`, no formatter config at all.
- `npm run lint` previously failed with 3 errors (an `@typescript-eslint/no-require-imports`
  violation from `require("tailwindcss-animate")` in `tailwind.config.ts`, plus two
  `@typescript-eslint/no-empty-object-type` violations in the vendored `ui/command.tsx` and
  `ui/textarea.tsx`). These are fixed — the `require` became an ESM `import`, and the two
  empty `interface X extends Y {}` declarations became `type X = Y` aliases — because the
  new CI workflow (`.github/workflows/deploy.yml`) runs `npm run lint` as a deploy gate, and
  a 3-error pre-existing lint failure would have blocked the very first Pages deployment.
  7 pre-existing `react-refresh/only-export-components` warnings remain (vendored `ui/`
  files that export a constant alongside a component) — warnings don't fail the `eslint`
  exit code, so they don't block CI.

### Tailwind — `tailwind.config.ts`
- `darkMode: ["class"]`, no class prefix.
- `content` globs include `./pages`, `./components`, `./app` and `./src` — the first three
  do not exist at the repo root (harmless Next.js-era leftovers from the shadcn template).
- `container`: centred, `2rem` padding, max `2xl: 1400px`.
- Fonts extended: `font-rajdhani`, `font-barlow` (loaded from Google Fonts in `index.html`).
- Colours are all `hsl(var(--token))` indirections, including shadcn's set plus custom
  `surface`, `cyan-glow`, `amber-glow`.
- Keyframes/animations in config: only `accordion-down` / `accordion-up`. **All the signature
  motion (`orbit`, `pulse-glow`, `float`, `fade-up`, `delay-*`) is hand-written CSS in
  `src/index.css`, not Tailwind config** — so those utilities are invisible to Tailwind's
  content scanner and safe from purging, but also unavailable to variant modifiers.
- Plugins: `tailwindcss-animate`. `@tailwindcss/typography` is installed as a devDependency
  but **not registered**, so `prose` classes do nothing.

### `components.json` (shadcn CLI)
`style: "default"`, `rsc: false`, `tsx: true`, `baseColor: "slate"`, `cssVariables: true`,
aliases `@/components`, `@/components/ui`, `@/lib/utils`, `@/lib`, `@/hooks`. New primitives
added via the CLI will land correctly without further configuration.

## 3. Dependency inventory

Totals: **44 runtime dependencies, 20 devDependencies.**

### Actively used at runtime (9)
`react`, `react-dom`, `react-router-dom`, `lucide-react`, `clsx`, `tailwind-merge`,
`class-variance-authority`, `@radix-ui/react-dialog`, `@radix-ui/react-tooltip`
(plus `@radix-ui/react-toast` and `sonner` behind the two toasters, and
`@radix-ui/react-slot` / `@radix-ui/react-label` pulled by the primitives in use).

### Mounted but unexercised (1)
`@tanstack/react-query` `^5.83.0` — `QueryClientProvider` wraps the tree in `App.tsx`, but
no `useQuery`/`useMutation` call exists anywhere. The provider is pure overhead today and a
ready-made seam if the catalogue ever moves to an API.

### Installed, unused (notable)
`react-hook-form` + `@hookform/resolvers` + `zod` (the contact form uses native validation),
`next-themes` (theming is hand-rolled in `ThemeToggle.tsx`), `recharts`,
`embla-carousel-react`, `date-fns`, `cmdk`, `input-otp`, `vaul`, `react-day-picker`,
`react-resizable-panels`, and ~23 of the 26 `@radix-ui/*` packages. These are transitively
required by the 43 unused files in `src/components/ui/` — the shadcn bundle was installed
wholesale rather than per-component. Pruning dependencies therefore requires deleting the
matching `ui/` files first.

### Dev / build (20)
Vite, SWC React plugin, Vitest, jsdom, `@testing-library/react` `^16.0.0`,
`@testing-library/jest-dom` `^6.6.0`, ESLint stack, Tailwind/PostCSS/Autoprefixer,
TypeScript, `@types/{node,react,react-dom}`, `globals`, and `lovable-tagger` `^1.1.13`.

## 4. Lockfile — npm, enforced by CI

`package-lock.json` is the single lockfile. The README instructs `npm i`, and the CI
workflow (`.github/workflows/deploy.yml`) runs `npm ci` against it — **npm is the
CI-enforced manager.** The repo previously also carried `bun.lock` (147 KB) and
`bun.lockb` (245 KB, Bun's legacy binary format); both were removed as part of wiring up
the GitHub Pages pipeline, since a stale second lockfile only invites a contributor to
install with Bun locally and drift from what CI builds.

`package-lock.json` was also out of sync with `package.json` at analysis time — `npm ci`
failed, listing ~35 missing transitive packages (`vitest`, `jsdom`,
`@testing-library/react`, etc.) that `npm install` had never been re-run to capture. It has
been regenerated via `npm install` and verified with a clean `npm ci`. `node_modules/` is
still absent from the working tree (correctly gitignored) — a fresh install is required
before any script runs.

## 5. Scripts

| Script | Command | Notes |
| --- | --- | --- |
| `dev` | `vite` | Serves on `http://localhost:8080`, HMR overlay disabled |
| `build` | `vite build` | → `dist/` |
| `build:dev` | `vite build --mode development` | Keeps the `lovable-tagger` plugin active |
| `preview` | `vite preview` | Serves the built `dist/` |
| `lint` | `eslint .` | Flat config |
| `test` | `vitest run` | Single pass |
| `test:watch` | `vitest` | Watch mode |

Missing by convention: `typecheck` (`tsc -b`), `format`, and any coverage script.

## 6. Source layout

```
index.html                 15 KB — all SEO metadata + 5 JSON-LD graphs; mounts #root
src/
  main.tsx                 createRoot(#root).render(<App/>) — no StrictMode
  App.tsx                  Providers + 3 routes
  index.css                Design tokens (both themes) + custom animations/textures
  App.css                  42 lines, never imported (dead)
  vite-env.d.ts
  components/              9 feature components + NavLink.tsx (unused)
    ui/                    49 vendored shadcn primitives (6 used)
  pages/                   Index.tsx, Careers.tsx, NotFound.tsx
  hooks/                   useScrollReveal.ts, use-toast.ts, use-mobile.tsx
  lib/utils.ts             cn() = clsx + tailwind-merge
  test/                    setup.ts + example.test.ts (placeholder)
public/
  images/products/         10 JPEGs (476 KB) — tilt-indicator-plus.jpg unreferenced
  favicon.ico, robots.txt, placeholder.svg (unreferenced)
```

Conventions in force:
- Imports use the `@/` alias, not relative traversal, outside of sibling files.
- Feature components are default exports; `ui/` primitives are named exports.
- Data lives as typed module-level constants inside the component that renders it
  (`catalogue`, `sectors`, `stats`, `differentiators`, `navLinks`) — there is no `src/data/`.
- Class composition goes through `cn()` from `src/lib/utils.ts`.
- `createRoot` is called without `<StrictMode>`, so double-invoked effects are not surfaced
  in development.

## 7. Testing posture

- Infrastructure is fully wired (Vitest + jsdom + Testing Library + `jest-dom` matchers +
  a `matchMedia` stub) but **coverage is zero**: the only test asserts `true === true`.
- `window.matchMedia` is stubbed to always return `matches: false`, which is what
  `use-mobile.tsx` would need — evidence the setup was prepared for component tests that
  were never written.
- No E2E tooling (no Playwright/Cypress), no visual regression, no CI workflow
  (`.github/` is absent).

## 8. Deployment

**Decision (2026-10-11): host on GitHub Actions + GitHub Pages, deliberately to keep the
site's hosting, deployment, and ongoing management at zero cost.** The repo is public
(`LocalLandingCo/mechatronix-crafted`, confirmed via the GitHub API), so both Actions
minutes and Pages hosting are unmetered/free — no Vercel/Netlify account, no credit card,
no paid GitHub plan required. This supersedes the "Documented target: Lovable" line that
was previously here; Lovable's own "Share → Publish" flow is no longer the deployment path.

| Aspect | State |
| --- | --- |
| Output | Static `dist/` from `vite build` |
| Pipeline | `.github/workflows/deploy.yml` — build (checkout → `npm ci` → lint → test → build) then `actions/deploy-pages` on every push to `main`, plus manual `workflow_dispatch` |
| Trigger scope | `main` only. Other branches do not deploy and do not get their own Pages URL — GitHub Pages serves exactly one live site per repo, so a feature branch would have to be merged (or pushed to `main`) to go live |
| SPA routing fix | Build step copies `dist/index.html` → `dist/404.html`, so GitHub Pages (which has no server-side rewrites) still serves the app on a hard refresh of `/careers`; React Router then resolves the real path client-side |
| Custom domain | `public/CNAME` → `www.mechtec.in`, matching the canonical URL already declared in `index.html`'s `<link rel="canonical">` and JSON-LD. Vite copies `public/` verbatim into `dist/`, so the artifact always carries the domain claim. **This makes the domain claim in Pages settings; it does not configure DNS** — the registrar for `mechtec.in` still needs, at minimum, a `CNAME` record for `www` pointing at `<owner>.github.io`, or `ALIAS`/`ANAME`/`A` records for the apex if the apex should also resolve. Until that DNS exists, GitHub's Pages settings will show "DNS check unsuccessful" but the `*.github.io` URL keeps working |
| "Branch → domain → redirect" behaviour | This is GitHub Pages' built-in behavior for a domain declared via `CNAME`, not custom logic: once the custom domain is verified, visits to the default `<owner>.github.io/<repo>` URL automatically redirect to `https://www.mechtec.in` |
| `vite.config.ts` `base` | Left at the default (`/`) on purpose — correct because the site is served from the custom domain's root, not from a `<owner>.github.io/<repo>/` subpath. If the CNAME is ever removed, asset paths break and `base` would need to become `/mechatronix-crafted/` |
| Env vars | **None used** — the Web3Forms key is still a hard-coded placeholder string (see `spec.md` §10, item 1) |
| Secrets required for the workflow | None — `actions/deploy-pages` authenticates via the OIDC token (`id-token: write` permission), not a PAT |
| `.gitignore` coverage | `node_modules`, `dist`, `dist-ssr`, `*.local`, logs, editor dirs |

One remaining manual step outside this repo: GitHub Pages must be switched to source
"GitHub Actions" under *Settings → Pages* (it is not auto-enabled by adding the workflow
file alone).

**Update (2026-10-11 roadmap):** a phased plan received the same day confirms this hosting
direction (its Phase 1.1/1.7/1.8 — see `spec.md` §12) but adds one correction: the
`404.html`-copy SPA fix above still returns an **HTTP 404 status** for a hard-refreshed
`/careers`, which is fine for a visitor but bad for a crawler. The roadmap's Phase 1.2 calls
for real per-route prerendering (`vite-react-ssg` or similar) to replace it — see §11 below.

Because no `import.meta.env` reference exists anywhere in `src/`, introducing the Web3Forms
key as `VITE_WEB3FORMS_ACCESS_KEY` would be the first env-var usage in the project. Note
that a Vite `VITE_*` value is embedded in the client bundle — acceptable for a Web3Forms
public access key, not for anything secret. If it's added as a GitHub Actions secret, the
build step in `deploy.yml` would need `env: { VITE_WEB3FORMS_ACCESS_KEY: ${{ secrets.WEB3FORMS_ACCESS_KEY }} }`.

## 9. Version-control facts

| Data point | Value |
| --- | --- |
| Branch | `main` (also the PR base) |
| Commits | 38 |
| HEAD | `e3c4d3e` "Switch contact to Web3Forms" |
| Working tree | Clean at analysis time |
| History shape | Heavily repeated messages ("Switch contact to Web3Forms" ×3, "Preceding changes" ×5, "Add product catalogue structure" ×2) — typical of a Lovable-synced repo; commit messages are weak as a change log |

## 10. Stack-level recommendations

1. ~~Delete `bun.lock` and `bun.lockb`~~ — done; npm is now the sole, CI-enforced manager
   (§4). Run `npm audit fix` next — the regenerated lockfile reports 37 vulnerabilities (2
   critical, 28 high) in transitive dev/build dependencies.
2. Add a `typecheck` script and turn on `strict` — do it file-by-file if a full flip is noisy.
3. Re-enable `@typescript-eslint/no-unused-vars` and add `eslint-plugin-jsx-a11y`; both would
   have caught items in `spec.md` §6 and §9.
4. Prune `src/components/ui/` to the 6 primitives in use, then drop the dependencies that
   become orphaned — the biggest single bundle/`node_modules` win available.
5. Either use `@tanstack/react-query` and `next-themes` or remove them; a mounted provider
   with no consumers is misleading to the next reader.
6. Register `@tailwindcss/typography` or uninstall it; trim the non-existent `content` globs.
7. Move the signature animations into `tailwind.config.ts` `keyframes`/`animation` so they
   gain variant support and stop relying on hand-written `delay-*` classes.
8. ~~Add the SPA rewrite file for the chosen host~~ — done via `.github/workflows/deploy.yml`
   (GitHub Pages + the `404.html` fallback, §8). Still open: a `VITE_`-prefixed env var for
   the Web3Forms key, wired as a GitHub Actions secret.
9. Point DNS for `mechtec.in` at GitHub Pages (§8) so the `CNAME` claim resolves instead of
   showing "DNS check unsuccessful" in Settings → Pages.
10. Replace the placeholder test with real coverage of the catalogue accordion, the contact
    submit paths (mock `fetch`), and theme persistence — `deploy.yml` now runs `npm run
    test` on every deploy, so this test suite gates production.
11. Rewrite `README.md` — it still describes the Lovable template with
    `REPLACE_WITH_PROJECT_ID` placeholders and `npm run dev` instructions that predate the
    GitHub Pages pipeline.

## 11. Planned stack additions (from the 2026-10-11 roadmap — not yet installed)

> Tracks the new tools/services the phased plan in `spec.md` §12 calls for, so a future
> install matches what's already decided. **Nothing in this section has been added to the
> codebase** — this is a plan, not a change log.

| Phase item | Tool / service | License / cost | Note |
| --- | --- | --- | --- |
| 1.2 Prerendering | `vite-react-ssg` (or equivalent SSG-on-Vite plugin) | OSS, free | Build-time only — no hosting-cost impact, consistent with §8's zero-cost mandate |
| 1.4 Per-route meta | `react-helmet-async` | OSS, free | Not currently a dependency; would sit alongside the existing `react-router-dom` routes |
| 1.5 Sitemap | A build-time generator (hand-rolled script or a Vite sitemap plugin) | OSS, free | No existing candidate chosen yet |
| 1.9 Analytics | Cloudflare Web Analytics **or** Plausible | Cloudflare: free. Plausible hosted: paid SaaS (no perpetual free tier). Plausible self-hosted: free licence, but needs a server | **Flagged inconsistency**: only the Cloudflare option is free without caveats. Picking Plausible's hosted product would be the first recurring cost introduced since the zero-cost hosting decision in §8 — worth a deliberate call, not a default |
| 1.10 Search Console / Bing Webmaster Tools | Google / Microsoft | Free | No install — account-level setup only |
| 3.2 Lead logging | Web3Forms → Google Sheets webhook | Depends on Web3Forms plan tier | Confirm the webhook/Sheets integration is on Web3Forms' free tier before committing; otherwise this is a second recurring-cost risk alongside 1.9 |
| 2.5 Datasheet gating | Reuse Web3Forms (if gating is chosen) | Free (same service as the contact form) | Avoids standing up a separate lead-capture tool |
| 4.1 Marketplace listings | IndiaMART, TradeIndia | Free basic tier, paid premium tiers | Off-repo; confirm the free tier is sufficient if the zero-cost mandate is meant to extend past hosting |
| 4.3 Hindi/Marathi toggle | Not yet chosen (likely `i18next`/`react-i18next` if built) | OSS, free | Deferred/demand-gated per the roadmap — no implementation decision needed yet |

**Net effect on `package.json` if Phase 1 ships as scoped:** two new runtime-adjacent
dependencies (`vite-react-ssg`, `react-helmet-async`), zero new paid services if Cloudflare
Web Analytics is the 1.9 choice. The existing `@tanstack/react-query` (currently unexercised,
§3) becomes a more natural fit once `/products/:slug` (Phase 1.3) needs route-level data
fetching, even though the catalogue stays a static constant for now.
