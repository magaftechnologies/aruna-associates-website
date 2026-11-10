# Aruna Associates — Website

Premium frontend site for Aruna Associates (Loans first, then Construction and Interiors). Built with React, TypeScript, TanStack Start and Tailwind CSS v4. No backend.

## Development
```bash
bun install
bun run dev
bun run build
bun run preview
```

## Environment variables / Web3Forms
| Variable | Purpose |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | Public access key from https://web3forms.com (free). Enquiries are emailed to the address you registered. |
| `VITE_SITE_URL` | Confirmed production origin for canonical URLs, absolute social-preview metadata, and the sitemap. Leave unset until the production domain is known. |

Without the key the form still renders, validates, and tells visitors to call/WhatsApp instead. It never pretends a submission succeeded.
Set the recipient email address in the Web3Forms account associated with this access key. No client email address is configured in the website source.

Copy `.env.example` to `.env.local` and add the Web3Forms access key before enabling live enquiry submissions. Environment files are ignored by Git.

## Where to edit things
| What | File |
|---|---|
| Logo | `src/assets/brand/aruna-associates-logo.webp` (rendered by `Logo` in `src/components/site/layout.tsx`); lion-only mark `aruna-associates-mark.webp`. Favicon: `public/favicon.png`, `public/apple-touch-icon.png` |
| Company name, address, phone, WhatsApp number, Google Maps link, metrics, disclaimer | `src/data/business.ts` |
| WhatsApp pre-filled messages | `whatsappMessages` in `src/data/business.ts` |
| Hero slides, loan services, journey steps, interiors, "Why us", testimonials (DEMO), FAQs, form dropdown | `src/data/content.ts` |
| Projects (DEMO) | `src/data/projects.ts` |
| Colours & fonts | `src/styles.css` (tokens), fonts loaded in `src/routes/__root.tsx` |
| Page titles / descriptions | `head()` in each file under `src/routes/` |

Everything marked DEMO (metrics, projects, testimonials, photos) must be replaced with client-confirmed content before launch.
When `VITE_SITE_URL` is unset, canonical and Open Graph URL metadata are omitted rather than pointing to a guessed domain; `robots.txt` and the sitemap use the request's current origin. Set this variable to the confirmed production origin before launch.

## Pages
`/`, `/loans`, `/construction`, `/interiors`, `/work`, `/about`, `/contact`, plus `/sitemap.xml`.

## SEO checklist
- [x] Unique title + description + Open Graph per page
- [x] One H1 per page, semantic sections
- [x] `robots.txt` and `/sitemap.xml`
- [x] FinancialService structured data on home (address/phone from `business.ts`)
- [x] Descriptive alt text, lazy-loaded WebP images
- [ ] Replace demo images/projects with real ones
- [x] Official logo + favicon
- [ ] After connecting the domain, submit the sitemap in Google Search Console
