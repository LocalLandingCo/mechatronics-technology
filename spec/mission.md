# Mission

> Status: derived from repository analysis on 2026-10-11. Source of truth is the code in
> `src/`, `index.html`, and the product data embedded in `src/components/Products.tsx`.

## 1. The business behind the product

| Data point | Value | Evidence |
| --- | --- | --- |
| Company | Mechatronics Technology | `index.html` JSON-LD `Organization.name` |
| Brand mark in UI | `MECHATRONICS TECHNOLOGY` (cyan "MECHATRONICS" + plain "TECHNOLOGY") | `src/components/Navbar.tsx`, `src/components/Footer.tsx` |
| Business model | B2B wholesale distributor / trader (not a manufacturer) | `src/components/About.tsx`, `index.html` meta description |
| Founded | 2018 (`SINCE 2018` badge in the About diagram) | `src/components/About.tsx`, JSON-LD `foundingDate` |
| Base of operations | Kolhapur, Maharashtra, India — PIN 416001, geo 16.7050, 74.2433 | JSON-LD `LocalBusiness`, geo meta tags |
| Primary market | India (`areaServed: IN`, `og:locale: en_IN`) | `index.html` |
| Languages claimed | English, Hindi, Marathi | JSON-LD `contactPoint.availableLanguage` |
| Stated business hours | Mon–Sat, 09:00–18:00 | JSON-LD `openingHoursSpecification` |
| Intended domain | `https://www.mechtec.in/` (canonical) | `index.html` `<link rel="canonical">` |

## 2. Mission statement (as expressed by the site copy)

Be **India's trusted distributor for industrial sensors, load cells, and measurement
instruments**, representing global principals so Indian industry can buy world-class
precision sensing locally, with technical guidance attached.

Verbatim positioning lines currently shipped:

- Hero H1: *"Precision Sensing & **Measurement** Solutions"* (`src/components/Hero.tsx`)
- Hero subcopy: *"India's trusted distributor for industrial sensors, load cells, and
  measurement instruments — serving defense, automotive, R&D, and automation sectors."*
- About H2: *"Engineering Trust Through **Precision**"*
- Footer: *"Precision Sensing & Measurement Solutions — India's trusted industrial sensor
  distributor."*

## 3. What this repository actually is

A **single-page marketing and lead-capture site** (plus one secondary Careers page). It is
a top-of-funnel instrument, not a storefront:

- No cart, no checkout, no prices anywhere in the UI — `priceCurrency: INR` appears only in
  JSON-LD `Offer` nodes for search engines (`index.html`).
- No backend, no database, no auth. Product data is a hand-maintained TypeScript constant
  (`catalogue` in `src/components/Products.tsx`).
- Every conversion path terminates in a human conversation: WhatsApp deep link, `tel:`,
  `mailto:`, or a Web3Forms email submission.

## 4. Primary objective and conversion funnel

Goal: turn an industrial buyer or engineer searching for a sensor spec into a **quote
enquiry**. Four parallel paths exist in the code:

| Path | Mechanism | Location |
| --- | --- | --- |
| WhatsApp — floating | `wa.me/918237813940` with prefilled "Hello, I would like to know more about your products." | `src/components/WhatsAppButton.tsx` |
| WhatsApp — per product | `wa.me` with prefilled `Hi, I'm interested in *<product>*. Please share pricing and availability details.` | `requestQuote()` in `src/components/Products.tsx` |
| Contact form | `POST https://api.web3forms.com/submit` → email | `src/components/Contact.tsx` |
| Direct dial / email | `tel:+918237813940`, `info@mechtec.in` | `Contact.tsx`, `Footer.tsx`, `Careers.tsx` |

The secondary objective is **recruitment**: `/careers` is a single "Join Our Team" panel
that routes applicants to `info@mechtec.in` — no job listings, no application form.

## 5. Audience

| Segment | Evidence in code |
| --- | --- |
| Defense / military procurement & R&D | `Markets.tsx` sector 1; inclinometer copy cites "military" |
| Automotive & EV test engineering | `Markets.tsx` sector 2 — "engine testing, chassis R&D, production QA" |
| Research & development labs (academic + industrial) | `Markets.tsx` sector 3 |
| Industrial automation / robotics / process control | `Markets.tsx` sector 4 |
| Consumer electronics QC | `Markets.tsx` sector 5 |
| Mechanical / civil / structural engineering | `Markets.tsx` sector 6 |
| Logistics & packaging QA (insurance evidence) | Protective-packaging category copy in `Products.tsx` |

## 6. Differentiators the site commits to

From `differentiators` in `src/components/About.tsx`:

1. Uncompromising quality standards
2. Customer-centric service
3. Timely delivery assurance
4. Custom solutions & technical support

## 7. Quantified claims currently on the page

| Claim | Where | Note |
| --- | --- | --- |
| `7+` Market Sectors Served | Hero stat card | **Conflicts** with the Markets heading |
| `Trusted Across 6+ Sectors` | Markets heading | Only 6 sector cards are rendered |
| `10+` Global Principals | Hero stat card | No principals are named anywhere in the repo |
| `Kolhapur / Maharashtra, India` | Hero stat card | Consistent with JSON-LD |

Any future edit to these numbers must be made in both `Hero.tsx` and `Markets.tsx` — they
are independent literals.

## 8. Discoverability is a first-class goal

The project treats SEO/AEO as a feature, not an afterthought — `index.html` is 15 KB of
which the bulk is metadata:

- Primary SEO: title, description, 14-term keyword list, robots directives, canonical.
- Social: full Open Graph + Twitter `summary_large_image` cards.
- Local SEO: `geo.region=IN-MH`, `geo.placename`, `geo.position`, `ICBM`.
- Five JSON-LD graphs: `Organization`, `LocalBusiness`, `ItemList` (8 products),
  `FAQPage` (8 Q&A pairs, explicitly labelled "AEO — Answer Engine Optimisation"),
  `BreadcrumbList`.
- `public/robots.txt` explicitly allows Googlebot, Bingbot, Twitterbot and
  `facebookexternalhit` before the `*` rule.

## 9. Non-goals (inferred from consistent absence)

- E-commerce, pricing display, stock levels, or online ordering.
- User accounts, dashboards, or any authenticated surface.
- A CMS — copy and product data ship as code and require a redeploy to change.
- Multi-language UI, despite the trilingual claim in JSON-LD — tracked but deliberately
  deferred: the 2026-10-11 roadmap (`spec.md` §12, Phase 4.3) keeps a Hindi/Marathi toggle
  demand-gated ("if local buyers ask for it") rather than committing to it.
- Per-product URLs — product detail lives in a modal, so deep links to a single SKU do not
  exist (a real tension with the SEO ambition in §8).

## 10. Open mission-level questions

1. ~~"10+ Global Principals" is asserted but no principal/brand is named — is naming them
   intended, and is it contractually allowed?~~ **Answered by the 2026-10-11 roadmap**
   (`spec.md` §12, Phase 2.2): yes, intended, conditional on first verifying the claim and
   collecting principal-authorisation proof. Until that happens, the claim stays unverified
   on the live page.
2. `index.html` FAQ names a different sector set (Defense & Aerospace, Automotive & EV,
   Industrial Manufacturing, R&D, Energy & Power, Agricultural Equipment) than the rendered
   `Markets.tsx` cards. Which list is canonical? — **Still open**; the roadmap's Phase 1
   (per-route SEO, sitemap, schema cleanup) doesn't mention this specific mismatch.
3. Is `/careers` meant to grow into real listings, or stay an email funnel? — **Still open**;
   not mentioned anywhere in the roadmap.
4. `src/components/ui/` ships 49 shadcn primitives while the site uses 6 — is the surplus
   kept deliberately for future pages, or should it be pruned? — **Still open**, though
   Phase 1.3's new routes (`/products`, `/about`, etc.) may end up exercising more of them
   than the current single-page layout does.

## 11. The 2026-10-11 roadmap and what it reveals about the project

A phased build plan (Phase 0 blockers → Phase 4 off-site/optional) was supplied on
2026-10-11, covering the contact form fix, hosting, SEO foundations, trust content, buyer
features, and off-site growth. The full plan with technical analysis lives in `spec.md`
§12; the stack implications are in `tech-stack.md` §11. It surfaces project facts not
derivable from the code:

- **A second contributor is named**: the roadmap refers to "your cousin" as the source for
  Phase 2 trust content (client names, certificates, testimonials, GST number) — someone
  outside this repo who needs to be approached for that material before Phase 2 can
  complete, independent of any engineering work.
- **A named competitive benchmark**: Phase 2's intro frames the content work as closing gaps
  "against Grexa-style sites" — the first explicit reference to a competitor or competitor
  category anywhere in this project's documentation.
- **The zero-cost mandate's scope is being tested.** `tech-stack.md` §8 established
  zero-cost *hosting* as a hard requirement. The roadmap introduces tools beyond hosting
  (Phase 1.9 analytics, Phase 3.2 a Web3Forms-to-Sheets webhook, Phase 4.1 marketplace
  listings) where a paid tier is one easy wrong click away — e.g. Plausible's hosted
  analytics product has no perpetual free tier, unlike the Cloudflare Web Analytics
  alternative named in the same roadmap line. Whether "no cost" extends past hosting to the
  whole toolchain is itself an open question worth a direct answer before Phase 1.9 ships.
- **Sequencing is explicit and front-loaded on search infrastructure**: Phase 1 (routes,
  prerendering, sitemap, per-page schema) is scoped as a strict, dependency-ordered block
  before any new content goes up, i.e. the mission's discoverability ambition (§8 above) is
  being treated as infrastructure work, not a content task.
