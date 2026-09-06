# StudioMistri — Demo Landing Page

A single-page marketing site for **StudioMistri**, a 3D-printing studio in Bashundhara R/A, built to showcase two entry points for visitors: browsing finished printed objects, or starting a custom print from their own idea. Live at [studiomistri-demo.vercel.app](https://studiomistri-demo.vercel.app).

## What's in this project

| File | Purpose |
|---|---|
| `index.html` | The entire page markup — header, hero with photo slideshow, "Two ways to make it yours" section, process steps, FAQ + closing CTA, and footer |
| `styles.css` | All styling: layout, typography, color palette, responsive breakpoints, and the slideshow's cursor-tilt/glare and depth-of-field effects |
| `app.js` | Interactivity — the slideshow's autoplay/navigation logic and the cursor/touch-driven tilt effect |
| `assets/logo.jpeg` | Studio logo, used in the header, footer, and favicon |
| `assets/gallery/*.webp` | 17 real photos of studio prints, used by the hero slideshow |
| `vercel.json` | Deployment config for Vercel (static site, no build step) |
| `.vercelignore` / `.gitignore` | Files excluded from Vercel deploys and Git tracking |

## Page sections

1. **Header** — logo/wordmark and nav links (`Printed objects`, `Custom printing`, `FAQ`, and a CTA).
2. **Hero** — headline ("Good ideas. Made real."), intro copy, two CTAs, and the project photo slideshow.
3. **Statement strip** — a scrolling marquee of "THINK · DESIGN · MAKE · REPEAT".
4. **Two paths section** (`#objects`) — two cards: browse *The Object Edit* (finished pieces, linking to Facebook and Instagram) or start *Your Idea, in 3D* (custom print, linking to a Google Form, Facebook, and WhatsApp).
5. **Process** — a 3-step "Show us your idea → Find the right fit → Make it happen" explainer.
6. **FAQ** (`#faq`) — an intro blurb, six accordion questions, and a "Talk to Studio Mistri" closing banner. On desktop the intro and questions sit side by side with the banner spanning full width below; on mobile they stack as intro → banner → questions.
7. **Footer** — logo, address, phone number, and Facebook/Instagram icon links.

## The hero slideshow (`app.js`)

- **17 real studio photos** cycle automatically every **3 seconds**, with a depth-of-field-style crossfade (blur + scale) between slides.
- **Manual controls**: previous/next arrows, clickable dot navigation (one dot per photo), a play/pause toggle, and left/right arrow-key support.
- On mobile, the dot strip stays a single row and clips/fades at the edge instead of wrapping to new rows as photos are added — it scrolls horizontally so every dot stays reachable.
- **Cursor-tilt + glare effect**: the photo tilts subtly in 3D following the cursor (or a dragging finger on touch devices), with a warm orange/yellow glare that tracks the pointer position — built with CSS `perspective`/`transform` and a radial-gradient overlay, no WebGL.
- Autoplay pauses on real mouse hover (gated behind `matchMedia('(hover: hover) and (pointer: fine)')` so it isn't accidentally and permanently frozen by the synthetic `mouseenter` mobile browsers fire on tap), and pauses after any manual interaction (clicking an arrow, a dot, or the pause button).
- Fully respects `prefers-reduced-motion`: disables the autoplay, crossfade, and tilt effect for users who've requested reduced motion.
- Accessible as a carousel: `aria-roledescription`, per-slide `aria-label`s, and a live region that announces the current photo on manual navigation.

## Getting in touch

The site has no backend — all inquiries route to external channels the studio already checks:

- **Google Form** ("Share your idea") for structured custom-print requests
- **Facebook** for browsing finished prints and general discussion
- **Instagram** for browsing finished prints
- **WhatsApp** for direct messaging (including sending reference photos, since the Google Form doesn't accept file uploads)
- **Phone** (`tel:` link) for calling directly

## Design system

- **Colors**: paper/off-white background, black borders/text, an orange (`#FF5500`) accent, plus yellow, mint, cyan, pink, and purple used for chips and highlights.
- **Type**: "Plus Jakarta Sans" for headings/body, "JetBrains Mono" for labels/eyebrows — a bold, neo-brutalist look with hard borders and offset drop shadows on buttons and cards.
- **Responsive**: breakpoints at 1500px, 1100px, and 760px adjust spacing and type scale, collapse the two-column hero and card grids, and change the FAQ section's layout as described above.
- **Accessibility**: skip-to-content link, visible focus states, `aria-label`/`aria-pressed` attributes on interactive controls, and reduced-motion support throughout.

## Deployment

This is a static site with no build step (`vercel.json` sets `outputDirectory` to `.`), deployed on Vercel with auto-deploy on push to `main`. It can also be opened directly via `index.html` or served with any static file server.

## Status

This is a **real front-end marketing site** for an active small business: the photos are genuine studio work, and every contact path (Google Form, Facebook, Instagram, WhatsApp, phone) leads to a channel the studio actually monitors. There is no backend of its own — no server, database, or form processing — by design.
