# Thehealingdesk — Website Demo

A 4-page static website for Ananyaa Mishra (Counselling Psychologist / Thehealingdesk).
Pure HTML/CSS/JS — no build step, no dependencies. Open `index.html` in any browser,
or upload the folder as-is to any static host (Netlify, Vercel, GitHub Pages, or a
shared hosting `public_html` folder).

## Files

```
index.html      → Home
about.html      → About
services.html   → Services
contact.html    → Contact (booking form)
css/style.css   → All styling & design tokens
js/main.js      → Navbar, mobile menu, accordion, scroll reveal, form handling
```

## Latest round of changes

- **Home hero visual** — no longer shows the logo floating small inside empty space.
  It's now a proper hero visual: a softly blurred, atmospheric version of the same
  logo photo fills the whole frame as a background, with the crisp, fully-visible
  logo (including the "Heal · Talk · Grow" tagline — nothing cropped) layered on top.
- **"Who I Am" photo** — re-cropped with more headroom and distance (less tightly
  zoomed than before), and the unrelated clinic badge visible on the coat in the
  original photo has been cleanly removed. Same treatment applied to the About
  page hero photo for consistency. File: `images/ananyaa-portrait-wide.jpg`.
- **Logo placements** — navbar and footer show the real logo icon next to the
  wordmark; the Home hero shows the complete logo art with its tagline fully intact
  and uncropped.
- **Instagram section** — the 4 tiles now link out to the 4 real post URLs provided
  (opens each post on Instagram in a new tab on click/tap). Instagram blocks
  automated fetching of post thumbnails (no public API access without login), so
  the tiles use original brand-matched artwork rather than scraped images —
  swap in real screenshots of those posts any time by replacing
  `images/insta-1.jpg` through `insta-4.jpg` (same filenames, any image works).

## Real assets already in use

- **Logo** — `images/logo-full.png` (full lockup, used in the Home hero) and
  `images/logo-icon.png` (cropped emblem, used in the navbar and footer) were
  cropped from the client-supplied wall-sign photo. If a clean vector/PNG logo
  becomes available later, swap these two files directly — no HTML changes needed.
- **Photo of Ananyaa** — `images/ananyaa-portrait.jpg` was cropped from the
  client-supplied photo and is used on the Home "Who I Am" section and the
  About page hero ("Meet Ananyaa"). Swap this file for a higher-resolution
  professional portrait when available.

## What's still placeholder and needs attention before launch

1. **About page "About Me" secondary image** — still uses a soft original
   illustration (`images/portrait-intro.svg`) rather than a photo, to avoid
   repeating the same headshot twice on one page. Replace with a second photo
   of Ananyaa (e.g. a candid/office shot) whenever one is available.
2. **Fees** — the Fees section has been removed from the Home page per request.
   `services.html` still includes a Fees section with "Price on request" —
   remove or update it the same way once pricing is finalised.
3. **Bio, qualifications, experience, approach** — `about.html` has clearly marked
   placeholder copy ("[Client-provided ... to go here]"). Replace with Ananyaa's
   real biography, degrees, institutions and certifications — nothing was invented.
4. **Contact details** — WhatsApp number, phone number and email currently use
   placeholders (`910000000000`, `hello@thehealingdesk.com`). Update in
   `contact.html` and in the footer of all four pages.
5. **Exact addresses** — once available, add real addresses under each location
   and optionally embed a Google Map iframe in the Locations blocks.
6. **Instagram feed** — currently a static, elegant placeholder grid linking out
   to the real profile. Can be upgraded later to a live embed if desired.
7. **Privacy Policy / Disclaimer** — footer links are placeholders (`#`); add real
   pages/content when legal copy is ready.

## Design system

- **Palette**: warm ivory background, soft cream sections, deep charcoal text,
  muted sage as the calming primary accent, subtle terracotta as the warm highlight.
  All tokens are defined as CSS variables at the top of `css/style.css`.
- **Type**: Cormorant Garamond (headings) + Manrope (body/UI), loaded from Google Fonts.
- **Signature element**: an organic, softly-animated "blob" frame used for portraits
  across the site — a recurring visual metaphor for a calm, non-clinical space.
- Fully responsive (mobile-first), keyboard accessible, respects
  `prefers-reduced-motion`, and includes a sticky mobile "Book a Session" CTA.

## Booking form

The form on `contact.html` is front-end only (per project scope — no backend,
no dashboards, no payment gateway). On submit it shows an in-page confirmation
message and a "Chat on WhatsApp" fallback. To make it functional, connect the
`#booking-form` element to a form backend of your choice (e.g. Formspree,
a simple serverless function, or email API) inside `js/main.js`.
