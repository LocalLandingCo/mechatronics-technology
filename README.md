<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======
# Mechatronics Technology — Website

Marketing site for **Mechatronics Technology**, a Kolhapur-based wholesale distributor and trader of industrial sensors (torque sensors, load cells, inclinometers) and protective packaging labels, serving India since 2018.

Live site: **https://www.mechtec.in**

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) (client-side routing)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Web3Forms](https://web3forms.com/) for the contact form (no backend needed)
- Hosted on **GitHub Pages**, deployed via **GitHub Actions**

## Local development

Requires Node.js 18+.

```sh
npm install
npm run dev
```

The site runs at `http://localhost:8080`.

Other scripts:

```sh
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint        # ESLint
npm test            # Vitest
```

## Contact form setup (Web3Forms)

The contact form (`src/components/Contact.tsx`) posts to [Web3Forms](https://web3forms.com), a free form-to-email service with no backend required — it works fine on static hosting like GitHub Pages.

1. Get a free access key at **https://web3forms.com** (enter your email, no account needed — the key arrives by email).
2. For local development, copy `.env.example` to `.env.local` and paste the key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-key-here
   ```
3. For production, add the key as a **GitHub Actions secret** named `VITE_WEB3FORMS_ACCESS_KEY` (Settings → Secrets and variables → Actions → New repository secret). The deploy workflow injects it at build time.

Until this secret is set, the form shows a friendly "form not configured" message instead of submitting, so the page never fails silently.

## Deploying to GitHub Pages

Deployment is automated via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): every push to `main` builds the site and publishes it with GitHub's official Pages actions.

One-time setup:

1. **Add the Web3Forms secret** — see above.
2. **Enable Pages via Actions**: repo Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch").
3. **Custom domain DNS** — the repo is configured for `www.mechtec.in` (see `public/CNAME`). At your DNS provider for `mechtec.in`, add:
   - A `CNAME` record: `www` → `locallandingco.github.io`
   - (Optional, for the bare `mechtec.in` apex to redirect to `www`) `A` records for `@` pointing to GitHub Pages' IPs (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), or an `ALIAS`/`ANAME` record if your DNS provider supports one.
4. In repo Settings → Pages, set the custom domain to `www.mechtec.in` and enable **Enforce HTTPS** once the certificate provisions (can take a few minutes to hours after DNS propagates).

After that, every push to `main` redeploys automatically — no further action needed. You can also trigger a deploy manually from the **Actions** tab (`Deploy to GitHub Pages` → `Run workflow`).

> If you'd rather use the default `*.github.io` URL instead of a custom domain, delete `public/CNAME` and remove the custom domain from the Pages settings — everything else works unchanged.

## Content & data notes

Product specifications, market sectors, and company details come from the owner-supplied company brief. A few facts the brief flagged as **not yet available** are intentionally omitted rather than invented: GST/legal registration details, a street address, ISO/quality certifications, named manufacturing principals, and client testimonials. Add these in `index.html` (JSON-LD), `src/components/About.tsx`, and `src/components/Contact.tsx` once the owner supplies them.

Product data lives in one place: [`src/data/products.ts`](src/data/products.ts). Add a new product by adding an entry there (with a unique `slug`) — it automatically appears on the homepage, the `/products` catalogue, and gets its own `/products/:slug` detail page. Remember to also add it to [`public/sitemap.xml`](public/sitemap.xml) and the Product `ItemList` JSON-LD in `index.html`.

## Project structure

```
src/
  components/       Shared UI + homepage sections (Hero, About, Products, Markets, Contact, Footer, Navbar)
  components/ui/    shadcn/ui primitives
  data/products.ts  Single source of truth for the product catalogue
  hooks/useSEO.ts   Per-page <title>/meta/canonical updates (client-side routed SPA)
  pages/            Routed pages: Index, AboutPage, ProductsPage, ProductDetail, MarketsPage, ContactPage, Careers, NotFound
```
>>>>>>> claude/mechatronics-tech-website-3a370a
