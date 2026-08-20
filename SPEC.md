# Axis RolePlay - Specification (Paket L, demo)

Status: DEMO. No backend, no accounts, no payments. All state is in-browser and resets on refresh.

## 1. Goals

1. Convince a Croatian FiveM player, in under ten seconds, that this server is run by adults.
2. Make the store the centre of the site. Everything routes toward `Trgovina`.
3. Demonstrate the credits loop end to end (browse, cart, buy, balance drops) without any payment code.
4. Ship a codebase where products, copy and categories are one file edit away from changing.

Non-goals: login, real payments, Tebex integration, Google Maps, booking. Tebex is named as the
future and only payment method; it is not wired up.

## 2. Design read

Reading this as: a storefront-led brand site for a Croatian FiveM roleplay server, for players aged
roughly 16-30 who judge a server by whether its site looks amateur, with a black-and-red
night-dispatch language, leaning toward Tailwind v4 + Archivo Expanded + real dark photography +
restrained CSS motion.

Dials: `DESIGN_VARIANCE 8` / `MOTION_INTENSITY 5` / `VISUAL_DENSITY 5`.

Variance is high because the brief explicitly rejects symmetrical sameness. Motion is capped at 5,
not 8, because the brief asks for clean and premium rather than a busy mod site. Density sits mid
because a storefront carries prices and specs.

### Aesthetic lane (named, so it can be checked)

The lane is a **vehicle impound and dispatch board**: stamped plate typography, hairlines that
organise real data, tabular numerals, red reserved for the things the system wants you to look at.

Two lanes were considered and rejected:

- **Retro-futurism, synthwave, neon, CRT scanlines.** This is what the `ui-ux-pro-max` design system
  database actually returned for the query "gaming esports roleplay". It is also the first-order
  category reflex: if you can guess the palette from the word "gaming", it is training data, not
  design. Rejected, and it contradicts the brief's "clean, premium, uncluttered".
- **Editorial-typographic** (display serif, mono labels, ruled columns). The second-order reflex, and
  currently on the `impeccable` reflex-reject lane list. Rejected.

## 3. Design system

### Colour (committed dark, one accent)

One theme for the whole site: dark. Locked, no section inverts. Measured WCAG values against the
page background `#07080A`:

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--ink-000` | `#07080A` | page | near-black, not `#000` |
| `--ink-010` | `#0C0E11` | surface | |
| `--ink-020` | `#121519` | raised surface | |
| `--line` | `#232830` | decorative hairline | |
| `--line-strong` | `#39414C` | functional border (inputs, focusable edges) | |
| `--text` | `#E8EAED` | body and headings | 16.62:1 |
| `--text-dim` | `#9BA2AC` | secondary | 7.78:1 |
| `--text-muted` | `#7C838D` | metadata, the quietest text used | 5.24:1 |
| `--red` | `#FF2D3F` | accent: text, hairlines, icons, focus ring | 5.44:1 |
| `--red-deep` | `#B00C19` | hover and pressed state of the red fill | |

Rules:

- The primary button is a `--red` fill with `--ink-000` text: **5.44:1**. White on `--red` measures
  3.68:1 and is therefore never used.
- `--text-muted` is the floor. Nothing quieter than `#7C838D` ships as text.
- Red is an accent, not a surface. Budget: under 10 percent of any viewport.

`npm run check:contrast` recomputes every pair above and exits non-zero on a regression.

### Typography

Three roles, one voice, paired on a real contrast axis (industrial grotesque against industrial
mono) rather than two lookalike sans faces.

- **Display**: Archivo, width axis 125 (Expanded), weight 700-800, uppercase, tracking `-0.02em`.
  Wide and heavy reads as stamped signage, not as an esports template.
- **Body**: Archivo, width 100, weight 400-500. Same superfamily, committed width and weight
  contrast against the display.
- **Numerals and labels**: Martian Mono. Carries every credit amount, price, product code and HUD
  label. Justified functionally, not as "technical" costume.

Rejected on reflex-check: Inter, Space Grotesk, DM Sans, IBM Plex, Outfit, Orbitron, Rajdhani,
Russo One, Bebas Neue.

Self-hosted through `@fontsource`. No `<link>` to Google Fonts.

Scale: fluid `clamp()`, ratio at or above 1.25. Display ceiling `6rem`. Tracking floor `-0.04em`.

### Shape and material

- One radius system: `2px` on everything interactive, `0` on full-bleed surfaces. Sharp, not soft.
- No glassmorphism, no glow, no gradient text, no side-stripe borders.
- Depth comes from the ink ladder and hairlines, not from shadows.
- Film grain: a single `fixed`, `pointer-events-none` overlay. Never on a scrolling container.

### Motion

`MOTION_INTENSITY 5`. CSS transitions only, no animation library. Every animation is interruptible
and runs off the main thread.

- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and
  `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`. `ease-in` is never used on UI.
- Press feedback `scale(0.97)` at 140ms on every pressable element.
- Cart drawer 280ms in, 200ms out. Exit is faster than enter.
- Add to cart: the button label crossfades behind a 2px blur, and the header balance flashes.
- Scroll reveals: `IntersectionObserver`, `once`, stagger 40ms. Content is visible by default and the
  hidden state is applied only by JS, so a headless or no-JS render is never blank.
- `prefers-reduced-motion: reduce` collapses every transform to an opacity change or to nothing.
- No `window.addEventListener('scroll')` anywhere.

## 4. Sitemap

| Route | Page | Job |
|---|---|---|
| `/` | Početna | Identity, then push to the store |
| `/trgovina` | Trgovina | The product: browse, filter, cart, buy |
| `/kako-funkcionira` | Kako funkcionira | Credits in, items out, Tebex named |
| `/o-serveru` | O serveru | Story plus the large gallery |
| `/podrska` | Podrška | Contact form plus FAQ accordion |
| `/uvjeti-koristenja` | Uvjeti korištenja | Legal placeholder |
| `/pravila-privatnosti` | Pravila privatnosti | Legal placeholder |
| `*` | 404 | Route back to the store |

### Home section rhythm

Six sections, six different layout families, zero eyebrows, one marquee.

1. Asymmetric split hero (photo bleeds off the right edge, type left)
2. Full-bleed dispatch marquee
3. Bento of featured products (three items, exactly three cells)
4. Image band with an offset overlaid content block
5. Staggered quotes at varying width and vertical offset
6. Single-purpose Discord call to action

## 5. Data model

`src/data/proizvodi.ts` is the single edit point for the catalogue.

```ts
type Kategorija = 'vozila' | 'organizacije' | 'nekretnine' | 'ostalo'

interface Proizvod {
  id: string                 // stable, shown as a product code in mono
  naziv: string
  kategorija: Kategorija
  opis: string               // one line, used on the card
  detalj: string             // paragraph, used in the detail dialog
  cijena: number             // credits, integer
  slika: string              // Unsplash photo id, all verified HTTP 200
  alt: string                // Croatian, descriptive
  oznaka?: 'novo' | 'ograniceno' | 'popularno'
  specifikacije: { labela: string; vrijednost: string }[]
}
```

Placeholders and assumptions are listed in `PLACEHOLDERS.md`.

## 6. Credits demo

- Starting balance 2500, held in `StoreContext`, shown in the sticky header in tabular mono.
- Add to cart increments the cart badge. The drawer opens from the cart button.
- "Kupi za credite" deducts the total, empties the cart, and records the purchase for the session.
- When the balance is short, the buy control is `disabled`, is styled as disabled rather than merely
  greyed out, and states how many credits are missing.
- "Nadoplati credite" is a deliberate non-functional placeholder with the tooltip
  "Uskoro, putem Tebex-a". It is a `<button>` with `aria-disabled`, never a dead link.
- Everything resets on refresh, and the site says so.

## 7. Acceptance criteria

Functional

- [ ] Every route renders, deep-links, and sets its own Croatian title and meta description.
- [ ] The category filter narrows the grid and has a real empty state.
- [ ] The cart adds, increments, removes and totals correctly.
- [ ] Buying deducts the exact total and the header balance updates.
- [ ] An insufficient balance disables the buy control and names the shortfall.
- [ ] The contact form validates on blur, shows errors below the field, and has a success state.
- [ ] The FAQ accordion is keyboard operable and reports `aria-expanded`.

Craft

- [ ] Zero em-dash and en-dash characters in visible copy. Checked mechanically.
- [ ] Zero emoji used as an icon.
- [ ] No two home sections share a layout family.
- [ ] At most one marquee per page.
- [ ] No section-number eyebrows, no scroll cues, no version stamps, no decorative status dots.

Accessibility

- [ ] Body text at or above 4.5:1, verified by `npm run check:contrast`.
- [ ] Skip link, and a visible `:focus-visible` ring on every interactive element.
- [ ] The cart drawer and mobile menu trap focus, close on `Escape`, and restore focus to the trigger.
- [ ] Balance changes are announced through `aria-live="polite"`.
- [ ] Every image has descriptive Croatian alt text.
- [ ] `prefers-reduced-motion` is honoured throughout.

Performance

- [ ] `min-h-[100dvh]`, never `h-screen`.
- [ ] Every image has `width`, `height` and an explicit aspect ratio. Below-fold images are `lazy`.
- [ ] Only `transform`, `opacity` and `filter` are animated.
- [ ] Route-level code splitting.
