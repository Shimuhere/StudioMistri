# StudioMistri — Demo Landing Page

A single-page marketing site for **StudioMistri**, a 3D-printing studio, built to showcase two entry points for visitors: browsing finished printed objects, or starting a custom print from their own idea.

## What's in this project

| File | Purpose |
|---|---|
| `index.html` | The entire page markup — header, hero, "Two ways to make it yours" section, process steps, closing CTA, footer, and two `<dialog>` modals |
| `styles.css` | All styling: layout, typography, color palette, responsive breakpoints, and the pointer-driven motion effects |
| `app.js` | Interactivity — hero artwork motion, modal open/close logic, and the custom-print brief form |
| `assets/studio-objects.png` | Hero illustration (vase, planter, and loop objects) |
| `logo.jpeg` | Studio logo image |
| `vercel.json` | Deployment config for Vercel (static site, no build step) |
| `.vercelignore` / `.gitignore` | Files excluded from Vercel deploys and Git tracking |

## Page sections

1. **Header** — logo/wordmark and nav links (`Printed objects`, `Custom printing`, and a CTA).
2. **Hero** — headline ("Good ideas. Made real."), intro copy, two CTAs, and an interactive artwork panel.
3. **Statement strip** — a scrolling marquee of "THINK · DESIGN · MAKE · REPEAT".
4. **Two paths section** (`#objects`) — two cards: browse *The Object Edit* (finished pieces) or start *Your Idea, in 3D* (custom print).
5. **Process** — a 3-step "Show us your idea → Find the right fit → Make it happen" explainer.
6. **Closing CTA** — final call to action repeating the custom-print entry point.
7. **Footer** — brand mark and tagline.
8. **Modals** — an "Object Edit" preview dialog and a "Custom print brief" form dialog.

## Interactive features (`app.js`)

- **Hero artwork motion**: the illustration tilts and drifts as the pointer moves over it (using CSS custom properties `--look-x` / `--look-y`), with a floating idle animation. Includes a **Pause/Play motion** toggle and respects `prefers-reduced-motion`.
- **Tap-to-play pose**: clicking or pressing Enter on the artwork cycles through preset "look" poses.
- **Object Edit modal**: opens a preview dialog explaining the object catalog is illustrative in this demo.
- **Custom print brief form**: lets a visitor describe their idea and starting point (idea/sketch/3D model), then **downloads a `.txt` brief file** to their device via a Blob URL — no data is sent to a server, since this is a front-end-only demo.
- **Accessible dialogs**: click-outside-to-close, a close button, and keyboard support.

## Design system

- **Colors**: paper/off-white background, black borders/text, an orange (`#FF5500`) accent, plus yellow, mint, cyan, pink, and purple used for chips and highlights.
- **Type**: "Plus Jakarta Sans" for headings/body, "JetBrains Mono" for labels/eyebrows — a bold, neo-brutalist look with hard borders and offset drop shadows on buttons and cards.
- **Responsive**: breakpoints at 1500px, 1100px, and 760px collapse the two-column hero and card grid into single columns and adjust type scale on smaller screens.
- **Accessibility**: skip-to-content link, visible focus states, `aria-label`/`aria-pressed` attributes on interactive controls, and reduced-motion support throughout.

## Deployment

This is a static site with no build step (`vercel.json` sets `outputDirectory` to `.`), so it can be deployed as-is to Vercel or any static host, or opened directly via `index.html`.

## Status

This is a **front-end demo/prototype**: the object catalog is illustrative only (no real product data), and the custom-print form saves a brief locally rather than submitting an inquiry to the studio.
