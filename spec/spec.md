# Product Specification

> Status: reverse-engineered from the codebase on 2026-10-11 (branch `main`, HEAD `e3c4d3e`).
> Describes what the application **does today**, not a wishlist. See `tech-stack.md` for the
> runtime and `mission.md` for intent.

## 1. Scope at a glance

| Data point | Value |
| --- | --- |
| Application type | Client-rendered single-page marketing site (SPA) |
| Routes | 3 — `/`, `/careers`, `*` (404) |
| Page sections on `/` | 6 — Hero, About, Products, Markets, Contact, Footer |
| Feature components | 9 (`src/components/*.tsx`) |
| shadcn/ui primitives vendored | 49 (`src/components/ui/`) |
| shadcn primitives actually imported by app code | 6 — `dialog`, `input`, `textarea`, `toaster`, `sonner`, `tooltip` |
| Custom hooks | 3 — `useScrollReveal`, `use-toast`, `use-mobile` |
| Source LOC (`src/**`, ts/tsx/css) | ~5,698 total; ~1,195 in feature components & pages |
| Product images | 10 JPEGs, 476 KB total (`public/images/products/`) |
| Backend services | 0 owned — one third-party form API, one WhatsApp deep link |
| Tests | 1 placeholder test (`src/test/example.test.ts`) |

## 2. Routing

Defined in `src/App.tsx` with `react-router-dom` v6 `BrowserRouter`:

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `src/pages/Index.tsx` | Composes all six sections + `WhatsAppButton` |
| `/careers` | `src/pages/Careers.tsx` | Own `Navbar`/`Footer`, breadcrumb back to `/` |
| `*` | `src/pages/NotFound.tsx` | Logs `console.error` with the attempted path, offers a home link |

Provider stack wrapping the router: `QueryClientProvider` → `TooltipProvider` →
`Toaster` + `Sonner` → `BrowserRouter`.

**Note:** `BrowserRouter` requires a host-side SPA rewrite (all paths → `index.html`), or
`/careers` 404s on direct load / refresh. No `vercel.json`, `netlify.toml`, `_redirects`, or
`404.html` exists in the repo — this is an unmet deployment requirement.

## 3. Section-by-section behaviour

### 3.1 Navbar — `src/components/Navbar.tsx`
- Fixed, full-width, `z-50`. Transparent until `window.scrollY > 50`, then
  `bg-background/90` + `backdrop-blur-xl` + bottom border + shadow.
- 6 nav entries: Home, About, Products, Markets, Contact (hash links) + Careers (route link).
- Hash links are **route-aware**: on `/` they render `#about`; off `/` they render `/#about`
  (`isHome` check), so cross-page anchors work.
- `Get a Quote` CTA (amber/secondary, `amber-glow`) points at `#contact` / `/#contact`.
- Mobile: hamburger below `md`, toggles an inline blurred panel; every item closes the menu
  on click. Button carries `aria-label="Toggle menu"`.
- Brand lock-up hides the word "TECHNOLOGY" below the `sm` breakpoint.

### 3.2 Hero — `src/components/Hero.tsx`
- Full-viewport (`min-h-screen`), layered `noise-bg` + `dot-grid` + `gradient-mesh`.
- Eyebrow pill: "Industrial Sensing Solutions".
- H1 scales 4xl → 7xl across `md/lg/xl`.
- Two CTAs: `Explore Products` → `#products` (primary, cyan glow), `Contact Us` → `#contact`.
- Decorative three-ring orbital diagram: 20 s forward orbit, 15 s reverse orbit, pulsing
  nodes with staggered delays, glowing centre core. Purely CSS, no JS animation loop.
- Three stat cards: `7+` market sectors, `10+` global principals, `Kolhapur` location — each
  with a lucide icon and a 3 s float animation.

### 3.3 About — `src/components/About.tsx`
- Two-column: rotated circuit-style diagram with `MT` / `SINCE 2018` monogram on the left,
  narrative + differentiator checklist on the right.
- Two paragraphs of positioning copy; 4 checkmarked differentiators in a 2-column grid.
- Reveal-on-scroll with a 200 ms stagger on the text column.

### 3.4 Products — `src/components/Products.tsx` (478 LOC — the core feature)

Three-level data model, all typed locally:

```
MainCategory  { id, icon, title, tagline, description, products[] }
  └ ProductCategory { title, image, description, specs?, subProducts? }
      └ SubProduct    { title, image, description, specs? }
```

Catalogue contents (2 categories → 7 products → 4 variants):

| Category | Product | Variants | Headline specs |
| --- | --- | --- | --- |
| Transducers & Sensors | Torque Sensors | Dynamic/Rotary, Reaction/Non-Rotary | 1 Nm–5000 Nm; ±0.25%/±0.5%; mV, 5–15 kHz, 4–20 mA, 0–10 V; ≤10,000 RPM |
| Transducers & Sensors | Load Cells | S-Type, Single Point | 1–2 mV/V ±0.5%; nonlinearity 0.01% R.O; 10 V excitation |
| Transducers & Sensors | Inclinometer Sensors | — | 0°–360°; single/dual axis; 0.001°–0.2° resolution; IP67 |
| Protective Packaging Labels | Tilt Indicator | — | 75×60×5 mm; activates ≥80°; 180°/360°; 2-yr shelf life |
| Protective Packaging Labels | Impact Indicator | — | 25G/37G/50G/75G/100G; instant, non-reversible |
| Protective Packaging Labels | Clip Label | — | 47×29 mm; 25G/50G; ±15% tolerance; 2-yr shelf life |
| Protective Packaging Labels | Pallet Cushion | — | 9.6–56.7 kg/unit; 5 colours; reusable |

Variant-level specs: S-Type 50 kgf–10 tf; Single Point 10–2000 kgf; both torque variants
1 Nm–5000 Nm at ±15 V DC / 24 V DC.

Interaction state (four `useState` values): `activeCategory` (defaults `'transducers'`),
`expandedProduct`, `activeSubProduct`, `modalProduct`.

Behaviour rules:
1. Switching category resets both expansion states.
2. Product rows are accordion-style — expanding one collapses the previous and clears the
   active variant.
3. A product **with** variants shows an "Available Variants" grid; each variant expands
   in place to a 2-column spec grid plus its own `View Details` / `Request Quote` buttons.
4. A product **without** variants shows `View Details` / `Request Quote` directly.
5. `View Details` opens a `Dialog` (`max-w-2xl`, `max-h-[90vh]`, scrollable) with a 16:10
   contained image, description, spec grid, a WhatsApp quote button, and a `Contact Us`
   link that closes the modal.
6. `requestQuote(title)` opens `wa.me/918237813940` in a new tab with a prefilled,
   product-named message.
7. Variant buttons call `e.stopPropagation()` so they don't toggle the parent row.
8. All list images use `loading="lazy"`; the modal image does not.
9. Section CTA at the bottom: `Request Product Specifications` → `#contact`.

### 3.5 Markets — `src/components/Markets.tsx`
- Heading: "Trusted Across **6+ Sectors**"; 6 cards, responsive 1 → 2 → 3 → 4 columns.
- Sectors: Defense, Automotive, Research & Development, Industrial Automation, Consumer
  Electronics, Engineering — each with icon, title, one-line application description.
- Stagger uses interpolated class names `delay-${(i+1)*100}`; `delay-100`…`delay-700` are
  hand-written in `src/index.css`, so indices 0–5 resolve. Adding a 7th+ card silently
  loses its delay unless a matching class is added.

### 3.6 Contact — `src/components/Contact.tsx`
- Fields: `name` (required), `email` (required, `type=email`), `phone` (optional,
  `type=tel`), `message` (required, 5 rows, non-resizable).
- Submits JSON to `https://api.web3forms.com/submit`; empty phone is sent as
  `"Not provided"`.
- Success = HTTP 200 → success toast ("Message Sent!") + `form.reset()`. Any other status
  or a thrown error → destructive toast. Submit button is disabled and shows a spinner
  while in flight.
- **Blocking gap:** `WEB3FORMS_ACCESS_KEY` is the literal placeholder
  `'YOUR_WEB3FORMS_ACCESS_KEY'`. Every submission fails until a real key is supplied.
- Contact panel: `tel:+918237813940` (clickable), Kolhapur/Maharashtra, `info@mechtec.in`
  (plain text — not a `mailto:` link, unlike the Careers page).
- Validation is browser-native only; `zod` and `react-hook-form` are installed but unused.

### 3.7 Footer — `src/components/Footer.tsx`
- Three columns: brand blurb, Quick Links (5 hash links generated by lowercasing the label,
  plus a Careers route link), contact details.
- Copyright year is computed at render (`new Date().getFullYear()`).

### 3.8 WhatsApp button — `src/components/WhatsAppButton.tsx`
- Fixed bottom-right, `z-50`, 56 px circle, brand green `#25D366`, hover scale + glow.
- Rendered only on `/` (it is mounted in `Index.tsx`, not `Careers.tsx`).
- `target="_blank" rel="noopener noreferrer"`, `aria-label="Chat on WhatsApp"`.

### 3.9 Careers — `src/pages/Careers.tsx`
- Hero banner with text breadcrumb (Home / Careers) and a `CAREERS` title.
- Single centred panel: briefcase icon, "Join Our Team", one paragraph,
  `mailto:info@mechtec.in`, phone and location footnote. No listings, no upload, no form.

## 4. Theming

- Two themes driven by a `.light` class on `<html>`; dark is the `:root` default in CSS but
  **light is the shipped default** — `index.html` hard-codes `class="light"` and
  `ThemeToggle` adds `.light` whenever `localStorage.theme !== 'dark'`.
- `ThemeToggle` (`src/components/ThemeToggle.tsx`) persists the choice under the
  `theme` key and swaps a Sun/Moon icon; `aria-label="Toggle theme"`.
- Palette (HSL custom properties, `src/index.css`): dark `--background: 216 39% 7%`,
  `--primary: 195 100% 50%` (cyan), `--secondary: 33 100% 50%` (amber); light
  `--background: 210 20% 96%`, `--primary: 200 85% 40%`, `--secondary: 33 90% 50%`.
- Non-standard tokens beyond shadcn's set: `--surface`, `--cyan-glow`, `--amber-glow`.
- `next-themes` is a dependency but is **not** used — theming is hand-rolled.
- The toggle writes to the DOM inside `useEffect`, so there is a one-frame flash risk; it is
  mitigated by the hard-coded `class="light"` in `index.html`.

## 5. Motion system

| Utility | Definition |
| --- | --- |
| `animate-orbit` / `animate-orbit-reverse` | 20 s / 15 s linear infinite rotation |
| `animate-pulse-glow` | 2 s ease-in-out opacity 0.4→1 + scale 1→1.3 |
| `animate-float` | 3 s ease-in-out ±10 px translateY |
| `animate-fade-up` | 0.6 s ease-out, 30 px rise, `forwards`, starts at `opacity: 0` |
| `delay-100` … `delay-700` | Manual `animation-delay` steps of 100 ms |
| Texture utilities | `noise-bg` (inline SVG fractal noise at 3% opacity), `dot-grid` (30 px), `grid-lines` (60 px) |
| Glow utilities | `cyan-glow`, `amber-glow` (box-shadow), `text-glow-cyan` (text-shadow) |

`useScrollReveal(threshold = 0.15)` wraps `IntersectionObserver`, sets `isVisible` once and
unobserves — reveals never replay. Hero passes `0.1`. There is **no
`prefers-reduced-motion` guard anywhere**; the orbit/pulse/float loops run indefinitely.

## 6. Accessibility findings

| Item | State |
| --- | --- |
| `aria-label` on icon-only controls | Present — menu toggle, theme toggle, WhatsApp button |
| Dialog semantics | Inherited from Radix (`@radix-ui/react-dialog`) — focus trap, Esc, labelled title |
| Heading order | `h1` per page → `h2` per section → `h3`/`h4`/`h5` within cards; no skips observed |
| Image `alt` text | Present on all product images (set to the product title) |
| Reduced-motion support | **Missing** |
| Accordion/variant rows | Variant row is a `div` with `onClick` — not keyboard-operable; product rows correctly use `<button>` |
| Form errors | Native browser validation only; no `aria-live` error text beyond the toast |
| Light-theme contrast | Not verified in this analysis |

## 7. SEO / AEO specification

`index.html` ships five JSON-LD graphs and a full social/local metadata block (enumerated in
`mission.md` §8). Specification-level consequences:

- The `ItemList` graph hard-codes **8 products**; `Products.tsx` renders **7 products + 4
  variants**. The two lists are maintained independently and already name different things
  (e.g. JSON-LD lists "Rotary Torque Sensor" and "Reaction Torque Sensor" as top-level
  items; the UI nests them under "Torque Sensors"). Any catalogue change requires a matching
  edit in `index.html`.
- `FAQPage` holds 8 Q&A pairs that are **not rendered anywhere in the UI** — they exist for
  answer engines only. One of them lists a sector set that contradicts `Markets.tsx` (see
  `mission.md` §10).
- Referenced-but-absent assets: `https://www.mechtec.in/images/og-image.jpg`
  (`public/images/og-image.jpg` does not exist) — OG and Twitter cards will fail to render.
- No `public/sitemap.xml`, and `robots.txt` declares no `Sitemap:` line.
- Because the app is client-rendered with no prerendering, all body copy depends on JS
  execution by the crawler; only the `<head>` metadata is static.
- The `LocalBusiness` graph carries `"servesCuisine": null` — a restaurant-schema property
  with no relevance to a sensor distributor, almost certainly copied in from a template.
  Harmless to a parser (`null` is dropped) but a clear sign the schema was never reviewed
  line-by-line.
- Every entry in the `ItemList` graph sets `Product.brand` to
  `{"@type": "Brand", "name": "Mechatronics Technology"}`. Per Google's structured-data
  guidance for resellers, `brand` should name the actual manufacturer (or be omitted); the
  reseller role belongs in `Offer.seller`, which is already set correctly. As written, the
  schema asserts Mechatronics Technology manufactures these products under its own brand —
  contradicting the "distributor and trader" positioning everywhere else (`mission.md` §1).
- No `Offer` node has a `price` field, only `priceCurrency: "INR"`. Google's `Product`/`Offer`
  rich-result validation generally expects a `price` (or an explicit `priceSpecification`);
  its absence risks the rich result being rejected outright.

## 8. External dependencies at runtime

| Service | Purpose | Coupling |
| --- | --- | --- |
| `api.web3forms.com` | Contact form delivery → email | Hard-coded URL + placeholder access key in `Contact.tsx` |
| `wa.me/918237813940` | WhatsApp quote enquiries | Number duplicated in `Products.tsx` and `WhatsAppButton.tsx` |
| `fonts.googleapis.com` / `fonts.gstatic.com` | Rajdhani + Barlow webfonts | `<link>` in `index.html`, preconnected |

Contact constants are duplicated across files rather than centralised: the phone number
`918237813940` appears in 2 components plus `index.html`; `info@mechtec.in` appears in
`Contact.tsx`, `Footer.tsx`, `Careers.tsx` and `index.html`.

## 8a. Hosting constraint

Hosting is a stated requirement, not just an implementation detail: the site must run on
**GitHub Actions + GitHub Pages with no hosting, deployment, or management cost**. The repo
is public, so this holds under GitHub's free tier indefinitely (no trial period, no seat
limit tied to the hosting itself). See `tech-stack.md` §8 for the pipeline
(`.github/workflows/deploy.yml`), the `public/CNAME` → `www.mechtec.in` custom-domain wiring,
and the one manual step (switching Pages' source to "GitHub Actions" in repo Settings) that
has to happen outside this repo.

## 9. Dead or unwired code

| Item | Finding |
| --- | --- |
| `src/App.css` | 42 lines, never imported |
| `src/components/NavLink.tsx` | Exported, never imported |
| `src/components/ui/*` | 43 of 49 primitives unused by app code (`sidebar`, `chart`, `carousel`, `calendar`, `table`, …) |
| `src/hooks/use-mobile.tsx` | Used only by the unused `ui/sidebar.tsx` |
| `@tanstack/react-query` | `QueryClientProvider` is mounted but no `useQuery`/`useMutation` exists |
| `react-hook-form`, `@hookform/resolvers`, `zod` | Installed; no form uses them |
| `next-themes` | Installed; theming is hand-rolled |
| `recharts`, `embla-carousel-react`, `date-fns`, `cmdk`, `input-otp`, `vaul`, `react-resizable-panels`, `react-day-picker` | Pulled in only by unused `ui/` primitives |
| `public/images/products/tilt-indicator-plus.jpg` | 105 KB, referenced nowhere |
| `public/placeholder.svg` | Referenced nowhere |
| Unused lucide imports | `Weight`, `RotateCcw`, `Shield`, `Tag`, `Boxes`, `X` in `Products.tsx` |

## 10. Known gaps / backlog candidates

Ordered by impact, each traceable to a file above:

1. **Contact form is non-functional** — replace the `WEB3FORMS_ACCESS_KEY` placeholder
   (`src/components/Contact.tsx:9`) and move it to a `VITE_`-prefixed env var.
2. **SPA deploy config — interim fix shipped, real fix still open.**
   `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to
   `main`, and copies `dist/index.html` to `dist/404.html` so `/careers` survives a hard
   refresh. That keeps a human's browser working, but GitHub Pages still serves it with an
   **HTTP 404 status** — fine for a visitor, bad for a crawler deciding whether the page
   exists. The real fix is per-route prerendering (roadmap §12, Phase 1.2), which replaces
   this workaround rather than sitting alongside it. See `tech-stack.md` §8 for the pipeline,
   the `public/CNAME` custom-domain setup, and the DNS step still needed at the registrar.
3. **`og-image.jpg` missing** — social cards are broken.
4. **Catalogue is duplicated** between `Products.tsx` and the `index.html` JSON-LD; extract a
   single data module and generate the structured data from it.
5. **Sector count conflict** — `7+` (Hero) vs `6+` (Markets) vs 6 rendered cards vs a
   different 6-name list in the FAQ graph.
6. **No `prefers-reduced-motion` handling** for the continuous orbit/pulse/float animations.
7. **Variant rows are not keyboard-accessible** (`div` + `onClick` in `Products.tsx`).
8. **No per-product routes** — product detail is modal-only, so nothing is deep-linkable or
   independently indexable despite the heavy `Product` structured data.
9. **Test suite is a placeholder** — one `expect(true).toBe(true)`; `@testing-library/react`
   is installed but unused. No test covers the catalogue, form, or theme toggle.
10. **TypeScript strictness is off** (`strict: false`, `noImplicitAny: false`) and
    `@typescript-eslint/no-unused-vars` is disabled, which is why §9 went unnoticed.
11. **No sitemap.xml** and no `Sitemap:` directive in `robots.txt`.
12. **Product images are unoptimised JPEGs** with no responsive `srcset` or modern format.
13. **`src/hooks/use-toast.ts` and `src/components/ui/use-toast.ts` coexist** — two paths to
    the same concept.
14. **README is still the unedited Lovable template**, with `REPLACE_WITH_PROJECT_ID`
    placeholders.

## 11. Acceptance criteria for "the site works"

A change set is acceptable when:

- `npm run build` and `npm run lint` pass, and `npm run test` is green.
- `/` renders all six sections, and anchors from `/careers` land on the right section.
- `/careers` loads on a hard refresh in the deployed environment.
- The theme toggle persists across reloads with no flash of the wrong theme.
- A contact-form submission with a valid access key yields the success toast and a received
  email; a forced failure yields the destructive toast.
- Both WhatsApp paths open with the correct prefilled text, including the product name.
- Every catalogue entry rendered in the UI has a matching entry in the `index.html`
  structured data.
- Layout holds from 320 px to 1400 px (`container` caps at `2xl: 1400px`) with no horizontal
  scroll.

## 12. Roadmap (received 2026-10-11 — not yet executed)

> This is the authoritative, prioritized plan going forward. It supersedes §10's flat list
> as the execution order; §10 stays as the defect catalog each phase item traces back to.
> Checkboxes are reproduced as given. `→` lines are this analysis's additions — cross-checks
> against the current code, dependency notes between items, and cost flags — not part of the
> original plan text. **No code was changed for this section; it is documentation only.**

### Phase 0 — Blockers (~half a day)

- [ ] 0.1 Create a Web3Forms key for `info@mechtec.in`, replace `YOUR_WEB3FORMS_ACCESS_KEY`
  in `Contact.tsx`. Add a hidden honeypot field against spam.
  → Blocked on the user creating the Web3Forms account/key — nothing to build until it's
  supplied.
- [ ] 0.2 Send a test submission from the live site, confirm the email arrives.
- [ ] 0.3 Create `public/images/og-image.jpg` (1200×630). Test the share preview on
  WhatsApp and LinkedIn.
  → Matches the gap already on record at §10 item 3.
- [ ] 0.4 Fix the schema in `index.html`: remove `servesCuisine`, add `price`/`priceRange`
  handling to the product `Offer` entries, describe the company as an authorised
  distributor instead of the brand. Validate with Google's Rich Results Test.
  → Confirmed independently in §7: `servesCuisine: null` is present, every `Product.brand`
  names Mechatronics Technology itself (should name the manufacturer or be omitted), and no
  `Offer` has a `price`. This item is well-targeted at real, verified defects.
- [ ] 0.5 Confirm the repo `LocalLandingCo/mechatronix-crafted` is public — Pages on a
  private repo needs a paid GitHub plan.
  → **Already confirmed, this blocker is cleared.** `GET api.github.com/repos/LocalLandingCo/mechatronix-crafted`
  returned `"private": false, "visibility": "public"` in the session that set up the
  deploy pipeline (see §8a, `tech-stack.md` §8).

### Phase 1 — Foundation (critical for search, ~4–5 days, strictly ordered)

- [ ] 1.1 Choose the host: GitHub Pages with Actions, or Lovable's publish.
  → Already decided and partially built: GitHub Pages + Actions, specifically because it's
  free on a public repo (§8a). Treat this as settled, not open — reopening it would also
  undo 1.7/1.8 below.
- [ ] 1.2 Add prerendering (`vite-react-ssg` or similar) so each route builds to its own
  `index.html` with the page text in it. Without this, Pages can't serve deep links like
  `/careers` correctly — the `404.html` workaround returns a 404 status, which is bad for
  search.
  → **This is the item that changes this repo's current state, not just extends it.** §10
  item 2 already flags that the shipped `404.html`-copy workaround returns HTTP 404 for a
  real route. 1.2 is the proper fix and should replace that workaround, not run alongside it.
- [ ] 1.3 Create the real routes: `/`, `/products`, `/products/:slug` (8 products), `/about`,
  `/contact`, `/markets`, `/careers`. Keep the old `#` links working as redirects.
  → Catalogue count mismatch to resolve first: `Products.tsx` currently renders **7**
  top-level products (not 8) plus 4 variants nested under 2 of them (§3.4); "8" matches the
  `index.html` `ItemList` count instead. Building `/products/:slug` against the current
  catalogue will encode whichever count is used into real, indexable URLs — the
  catalogue-vs-JSON-LD mismatch (§9 item 4) should be settled before, not after, this lands.
- [ ] 1.4 Add per-route titles, descriptions and canonical tags with `react-helmet-async`.
- [ ] 1.5 Generate `sitemap.xml` at build time, add its `Sitemap:` line to `robots.txt`.
- [ ] 1.6 Move Product schema onto each product page, fix the breadcrumbs to use real URLs.
  → `index.html`'s `BreadcrumbList` currently points at hash URLs
  (`.../#products`, `.../#contact`), consistent with there being no real routes yet. This
  item depends on 1.3 landing first — there's nothing for the breadcrumbs to point at before
  real product URLs exist.
- [ ] 1.7 Add the GitHub Actions deploy workflow (`.github/workflows/deploy.yml`): `npm ci`,
  `npm run build`, publish `dist` with the official Pages actions. Set Pages to deploy from
  "GitHub Actions".
  → **Mostly already shipped** (staged, not yet committed, from the previous session): the
  workflow exists and additionally runs `npm run lint` and `npm run test` as gates before
  building, which this item doesn't ask for but doesn't conflict with either. Switching
  Pages' source to "GitHub Actions" in repo Settings remains a manual step outside this repo
  regardless of who writes the workflow file.
- [ ] 1.8 Add `CNAME` for `www.mechtec.in`, set Vite `base: '/'`, set the DNS records.
  Replace the Lovable README with real build and deploy notes.
  → `public/CNAME` and the default (already `/`) Vite `base` are **already shipped**
  (staged, not committed). Still open from this item: the DNS records at the registrar
  (outside this repo's reach) and the README rewrite (not started).
- [ ] 1.9 Add privacy-friendly analytics (Cloudflare Web Analytics or Plausible) with events
  for WhatsApp quote clicks and form submits.
  → **Cost flag**: Cloudflare Web Analytics is free with no paid tier gate. Plausible's
  hosted service is a paid SaaS product with no perpetual free tier; self-hosting Plausible
  is free in licence terms but needs a server, which reintroduces the hosting cost this whole
  pipeline exists to avoid (§8a). Cloudflare Web Analytics is the only one of the two
  consistent with the standing zero-cost mandate.
- [ ] 1.10 Submit the site to Google Search Console and Bing Webmaster Tools.
- [ ] 1.11 Run Lighthouse on mobile, record the baseline. Self-host the fonts if scores are
  low.
  → Worth checking rather than assuming: `index.html` loads Rajdhani/Barlow from
  `fonts.googleapis.com` with `preconnect` but no visible `font-display` hint in the `<link>`
  tag itself (Google's served CSS defaults to `swap`, which is probably fine, but the
  Lighthouse run should confirm it rather than take it on faith).

### Phase 2 — High-value content and trust (~1–2 weeks, depends on cousin's input)

- [ ] 2.1 Application pages, two or three to start (e.g. torque testing for motors, shock
  and tilt labels for export shipping) — these match what buyers actually search for.
- [ ] 2.2 Trust section: client/sector names (with permission), certificates, principal
  authorisations, GST number, years in business. Add a "Why Mechatronics" strip and a logo
  row. **Verify the "10+ Global Principals" claim before it stays.**
  → Directly answers open question 1 in `mission.md` §10: naming principals is intended,
  conditional on verifying the claim and getting authorisation proof first.
- [ ] 2.3 Testimonials: 3–5 real quotes with name, company, city. `Review` schema only for
  real reviews.
- [ ] 2.4 Google Business Profile: claim/fix the Kolhapur listing, add the profile link to
  `sameAs`, embed the map on Contact (lazy-loaded).
  → `index.html`'s `Organization.sameAs` is currently an empty array — this is the first
  thing that would populate it.
- [ ] 2.5 Datasheet downloads, one PDF per product. Decide whether to gate behind a
  name/email.
  → If gated, reusing Web3Forms (once 0.1 lands) avoids standing up a second lead-capture
  service just for this.
- [ ] 2.6 Visible opening hours matching the schema (Mon–Sat 9:00–18:00), plus a "call now"
  button on mobile.
  → The value to match against already exists: `LocalBusiness.openingHoursSpecification`
  in `index.html`.
- [ ] 2.7 Photo gallery of premises, stock and shipments, compressed to WebP, lazy-loaded.

### Phase 3 — Conversion and buyer features (~1–2 weeks)

- [ ] 3.1 Multi-product enquiry list — add several products, send one quote request to email
  and WhatsApp.
- [ ] 3.2 Quote follow-up: auto-reply on the form, every enquiry logged to a Google Sheet via
  a Web3Forms webhook.
  → Verify this is actually on Web3Forms' free tier before committing to it — some
  form-backend providers gate Sheets/webhook integrations behind a paid plan, which would
  conflict with the zero-cost mandate if it applies beyond hosting specifically (see
  `tech-stack.md` §11).
- [ ] 3.3 Product search and filters by type, capacity, accuracy, IP rating, output signal.
- [ ] 3.4 Specification comparison table for two or three products side by side.
- [ ] 3.5 Selection guide — a short "what are you measuring?" wizard linking to the right
  product's quote button.
- [ ] 3.6 Principals/brands page with authorisation proof where available.
- [ ] 3.7 Legal basics: privacy policy, terms of sale, a cookie notice for analytics, GST and
  address footer.
  → Minor inconsistency to resolve when this is scheduled: if 1.9 ships with Cloudflare Web
  Analytics or Plausible — both cookieless, no personal data collected — a cookie *notice*
  specifically for analytics shouldn't be necessary under either choice. Keep that line only
  if a cookie-based tool gets added later; drop it otherwise.

### Phase 4 — Off-site and optional (ongoing)

- [ ] 4.1 Marketplace listings: IndiaMART, TradeIndia — create/tidy, link from the site, keep
  company details identical everywhere.
  → Both platforms upsell a free listing into paid tiers; confirm whichever plan gets picked
  matches the zero-cost mandate if that mandate extends to non-hosting tooling.
- [ ] 4.2 Links from principals/customers: ask the manufacturers represented to link to the
  distributor page.
- [ ] 4.3 Hindi and Marathi toggle, if local buyers ask for it.
  → Addresses the tension already flagged in `mission.md` §9 (non-goals): JSON-LD claims
  `availableLanguage: ["English", "Hindi", "Marathi"]` while the UI is English-only. This
  item keeps that gap deliberately deferred and demand-gated rather than committing to it now.
- [ ] 4.4 Calibration and service request page, if the company offers those services.
- [ ] 4.5 Company profile / catalogue PDF for procurement teams who forward documents.
- [ ] 4.6 Updates section driven by markdown files in the repo — only once someone commits to
  roughly one post a month. A stale one looks worse than none.

### Suggested sequence (as given)

1. Phase 0 in one sitting.
2. Phase 1 in the order shown — the tasks depend on each other.
3. Start Phase 2 content requests (2.2, 2.3) in parallel with Phase 1, since collecting
   quotes and certificates takes time.
4. Phase 3 and 4 after the site has been live and measured for a few weeks.

### Status check against this repo right now

| Item | Status |
| --- | --- |
| 0.5 — repo is public | **Cleared** — confirmed via the GitHub API in the session that set up hosting |
| 0.1 — Web3Forms key | **Blocked on the user** — nothing to build until a key is supplied |
| 1.1 — choose host | **Settled** — GitHub Pages + Actions, already the direction taken |
| 1.7 — deploy workflow | **Mostly shipped** — staged, not committed; goes slightly further than asked (adds lint/test gates) |
| 1.8 — CNAME + `base` | **Partly shipped** — `CNAME` and default `base` staged, not committed; DNS and README rewrite still open |
| 1.2 — real prerendering | **Not done** — current state is the `404.html`-copy workaround that 1.2 itself flags as insufficient; this is the one item that replaces existing work rather than building on it |

The two inputs needed before Phase 0 can actually start: the Web3Forms access key (0.1), and
confirmation that DNS for the custom domain should target `www.mechtec.in` as already set up
in `public/CNAME` (ties into 1.8).

### Conflicts between the current design and this roadmap

> Raised 2026-10-11 in review of the roadmap above. Six conflicts were identified between
> the shipped single-page design and what Phases 1–3 need; two have an agreed resolution
> (below), the other four are still open and tracked here so Phase 1 work doesn't start
> without a decision on them.

1. **Routing model** — `Navbar.tsx` and `Footer.tsx` only know how to link to hash
   fragments (`#about` on `/`, `/#about` elsewhere) and there's no shared `Layout`
   component, so every new route in Phase 1.3 would duplicate `Careers.tsx`'s hand-wired
   `Navbar`+`Footer`+`WhatsAppButton`. **Resolved — see below.**
2. **Duplicate content risk** — `/` rendering full sections *and* `/about`, `/products`,
   `/markets`, `/contact` also rendering full content would read as duplicate content to
   search engines, undermining the exact goal Phase 1 exists to serve. **Resolved — see
   below.**
3. **Modal + accordion UX vs. indexable pages** — `Products.tsx`'s product detail is a
   collapsed-by-default accordion plus a `Dialog` modal with no URL of its own; prerendering
   a page in that default collapsed state would ship near-empty HTML. **Still open** —
   unaffected by the resolution below; `/products/:slug` pages need their specs visible
   without a click, independent of how `/about`/`/markets`/`/contact` are resolved.
4. **No slugs in the data model** — `catalogue` in `Products.tsx` has titles only, no
   `id`/`slug`, and the UI's 7 top-level products don't match the JSON-LD `ItemList`'s 8.
   **Still open** — needed before `/products/:slug` or `sitemap.xml` can be generated.
5. **SSG entry point isn't SSG-shaped** — `vite-react-ssg` drives an exported route table;
   `App.tsx` currently renders `<BrowserRouter><Routes>...</Routes></BrowserRouter>` inline.
   **Still open**, but the resolution below produces exactly the route list `vite-react-ssg`
   needs, so it doesn't add further rework on top.
6. **Single-product WhatsApp message vs. a multi-product cart** — `requestQuote(title:
   string)` builds a message for one product; Phase 3.1 wants several products in one
   request. **Still open**, unrelated to the other five.

#### Resolution for conflicts #1 and #2 — one page, dual presentation

**Decision:** the home page keeps showing About/Products/Markets/Contact inline, in full, on
one continuous scroll — nothing about that experience changes. Separately, each section also
gets its own real route (`/about`, `/products`, `/markets`, `/contact`), which exists so that
a nav click gives a human (and a crawler following that link) somewhere real to land, and so
`vite-react-ssg` (Phase 1.2) has a route to prerender into its own standalone static HTML.
The two are not in tension because they serve different purposes: `/` is the pitch, the
dedicated routes are what the sitemap lists.

Key clarification baked into this decision: **the nav click itself creates nothing.** It is
not an API call and it does not generate the page. What makes `/about` real to a search
crawler is that `vite-react-ssg` prerenders it to its own `index.html` at build time,
independent of whether any human ever clicks the nav link. The click only does two things:
lets a person navigate there, and gives Googlebot an `<a href="/about">` to discover and
follow on its own.

Mechanics (description only — not built in this pass):

- `About.tsx`, `Products.tsx`, `Markets.tsx`, `Contact.tsx` are reused unchanged in two
  places: inline, stacked, inside `Index.tsx` (`/`) exactly as today; and standalone, one
  each, inside new thin page components (`AboutPage`, `ProductsPage`, `MarketsPage`,
  `ContactPage`).
- A new shared `Layout` component (`Navbar` + `Footer` + `WhatsAppButton`) wraps both `/`
  and the four new standalone pages, resolving the duplication `Careers.tsx` currently
  hand-rolls on its own.
- `Navbar`'s current `isHome ? '#about' : '/#about'` branch is deleted and replaced with a
  plain `<Link to="/about">` (etc.) that always points at the real route, regardless of
  which page the user is currently on. This is a simplification of what's there today, not
  an addition.
- Plain scrolling needs no change at all: the current `Navbar` only ever touches the URL on
  a click (native hash-anchor jump); there is no scroll-spy writing to `location`, so
  scrolling the homepage already leaves the URL untouched. The requirement "scroll shows
  sections as-is, no slug in the URL" is already true of the shipped code.
- Old `/#about`-style links get a small on-mount check (in `Index.tsx` or `App.tsx`) that
  redirects a matching hash to its new real route — this is what satisfies the roadmap's
  Phase 1.3 line "keep the old `#` links working as redirects."
- Each standalone page gets its own `<title>`/description/canonical via `react-helmet-async`
  (Phase 1.4), distinct from the homepage's — this is the condition under which conflict #2
  actually resolves: `/` (the full composite) and `/about` (just that one section) read to
  Google as different pages the same way a blog's homepage and an individual post page do,
  *provided* their metadata isn't identical copy-paste.
- `/products` as a standalone route can stay a light summary, same as the homepage's
  Products section today — it does not need to solve conflict #3 (that's `/products/:slug`'s
  job alone, and remains open per above).

This resolution also happens to produce the exact route list `vite-react-ssg` (conflict #5)
needs to prerender, so adopting it doesn't add work on top of that item — it removes a
decision that item would otherwise have been blocked on.
