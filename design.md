# StudioMistri × Neobrutalism Design System

> **"Raw, Bold, Tactile, and Unapologetically Functional."**
> A design system and visual philosophy for **StudioMistri (স্টুডিও মিস্ত্রি)** built on authentic **Neobrutalism** aesthetics.

---

## 1. Core Neobrutalism Philosophy

Neobrutalism merges the raw, honest, anti-decorative spirit of classic architectural brutalism with modern web accessibility, playful retro pop colors, high contrast, and tactile micro-interactions.

1. **High Contrast & Hard Solid Shadows**: Zero blurry drop shadows or feathered glows. Everything uses crisp, high-impact solid offset shadows (`box-shadow: 4px 4px 0px #000000`) that physically compress on click (`transform: translate(2px, 2px); box-shadow: 2px 2px 0px #000000`).
2. **Thick Black Ink Outlines**: Every card, button, input, badge, table cell, and modal is bounded by a heavy `2px` or `3px` solid black border (`#000000`).
3. **Playful Pop Colors & Editorial Surfaces**: Crisp paper base (`#F8F6F0`) contrasted against hyper-saturated signal tones (Studio Orange, Cyber Yellow, Neo Mint, Electric Blue, and Hot Pink).
4. **Data Honesty & Mechanical Clarity**: Big bold typography, chunky monospace numbers, and physical sticker badges (`[★ 3D PRINT LAB]`, `[⚡ FAST DISPATCH]`, `[৳ 3/G COMPANY SPLIT]`).

---

## 2. Color Palette & Neobrutalist Tokens

| Token | Hex | Role | Neobrutalist Application |
|---|---|---|---|
| `--nb-bg` | `#F5F3ED` | Canvas Background | Warm archival newsprint / drafting paper |
| `--nb-surface` | `#FFFFFF` | Card & Panel Fill | High-contrast stark white surface |
| `--nb-black` | `#000000` | Borders, Text & Shadows | High-density 100% black ink |
| `--nb-orange` | `#FF5500` | Primary Studio Accent | StudioMistri iconic flame orange |
| `--nb-yellow` | `#FFE600` | Highlight / Caution | High-visibility warning sticker yellow |
| `--nb-mint` | `#22C55E` | System OK / Profit / Success | Neo Mint green badge & profit metric |
| `--nb-cyan` | `#00D2FF` | Company Account / Tech | High-frequency electric cyan |
| `--nb-pink` | `#FF69B4` | Special Feature / Accent | Playful accent & SLA resin tag |
| `--nb-purple` | `#A855F7` | Specialty Material Tag | Carbon fiber & engineering filament tag |

---

## 3. Typographic System

- **Display & Headings**: `Plus Jakarta Sans` / `Inter` (Font weight: `800` & `900`, uppercase headers, tight tracking `-0.03em`).
- **Data, Pricing & Technical Readouts**: `JetBrains Mono` (Font weight: `600` & `700`, monospace data alignment, clean currency formatting `৳`).

### Typographic Hierarchy
```
[MAIN HERO]        THINK • DESIGN • MAKE          (Black, 900 weight, 3.2rem)
[SECTION LABEL]    ★ 01. INVENTORY MATRIX ★       (Black on Yellow pill, 800 weight)
[METRIC VALUE]     ৳ 14,250.00                    (JetBrains Mono, 900 weight, 2.2rem)
[STICKER BADGE]    [ 3 TK/G CO. POOL ]            (JetBrains Mono, 700 weight, 2px border)
```

---

## 4. Tactile UI Components

### 4.1. Neobrutalist Buttons
```css
.nb-btn {
  background: var(--nb-orange);
  color: #000;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  font-weight: 800;
  border-radius: 6px;
  transition: all 0.1s ease;
}
.nb-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000;
}
.nb-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000;
}
```

### 4.2. Neobrutalist Cards & Panels
- White or pastel card bodies with `3px solid #000`.
- Solid `5px 5px 0px #000` drop shadow.
- Contrasting header stripe (Yellow, Orange, or Cyan).

### 4.3. Filament Cartridge Cards
- Visual color swatch badge with `2px solid #000`.
- Chunky progress bar with solid black border and vivid fill.
- Tactile stepped quick buttons: `[-50g]`, `[+50g]`, `[+500g]` with instant click feedback.

### 4.4. Swiss / Neobrutalist Tax Invoices
- Crisp, heavy border framing with an official stamp style header.
- High-contrast black-and-white table grid with bold highlighted totals in Studio Orange.

---

## 5. Accounting & Business Logic Rules

The system strictly executes StudioMistri's financial distribution rules:

$$\text{Company Account Share} = \text{Model Weight (g)} \times 3.00\text{ ৳}$$

$$\text{Salary Account Share} = (\text{Total Order Price} - \text{Company Share})$$

$$\text{Gross Profit} = \text{Total Revenue} - \text{Raw Filament Material Cost}$$
