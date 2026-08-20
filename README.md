# Axis RolePlay

Demo storefront for a Croatian FiveM roleplay server. All site copy is in Croatian.

The store is the centre of the site: players browse vehicles, organisations, property and equipment
priced in **credits**, add them to a cart and spend a mock balance. There is no backend, no account
system and no payment integration. Credit top-ups will run through **Tebex** and only Tebex, which
the site states in several places, but nothing is wired up.

Everything invented for the demo is listed in [PLACEHOLDERS.md](PLACEHOLDERS.md). The design
reasoning and acceptance criteria are in [SPEC.md](SPEC.md).

## Running it

```bash
npm install
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Type check, then production build |
| `npm run preview` | Serve the production build |
| `npm run check:contrast` | Recompute every colour pair against its WCAG target |
| `npm run check:slop` | Mechanical craft checks (see below) |
| `npm run lint` | oxlint |
| `npm run check` | All of the above |

## Stack

Vite, React 19, TypeScript, Tailwind v4, React Router 7. State is a single React context
(`src/context/StoreContext.tsx`) with no persistence.

No animation library. Every transition is CSS, which keeps them interruptible, off the main thread,
and free of a runtime dependency. Icons are `lucide-react`. Fonts are self-hosted through
`@fontsource`, with no `<link>` to Google Fonts.

## Layout

```
src/
  data/          proizvodi.ts is the catalogue; sadrzaj.ts is everything else
  context/       credits and cart
  hooks/         useDialog (focus trap), useReveal (scroll reveal), useSeo
  lib/           Croatian number and plural formatting, image URLs
  components/
    layout/      header, footer, grain, Discord button, route shell
    ui/          button, media, price, logo, accordion, reveal
    store/       product card, product dialog, cart drawer, add button
    home/        one file per home section
  pages/         one file per route
scripts/         check-contrast.mjs, check-slop.mjs
```

To change what the store sells, edit `src/data/proizvodi.ts`. Nothing else needs to be touched.

## Design system

Dark, locked at the page level, no section inverts. Near-black ink ladder plus one crimson accent,
kept under roughly a tenth of any viewport.

Typography is three roles from a real contrast axis rather than two lookalike sans faces: **Archivo
Expanded** (width axis 125) for display, **Archivo** for body, **Martian Mono** for every credit
amount, price and product code. Note that the default `@fontsource-variable/archivo` entry point
ships a weight-only font, so `src/index.css` imports `archivo/wdth.css` specifically. Without it the
display silently renders at normal width and the whole premise disappears.

Motion is deliberately restrained: 140ms press feedback, a 280ms cart drawer that exits in 200ms,
and scroll reveals that are **visible by default** and only hidden by JS once an observer attaches,
so a no-JS or headless render never ships a blank section. `prefers-reduced-motion` removes movement
throughout.

## Verification

The design claims are checked rather than asserted.

`npm run check:contrast` recomputes all thirteen colour pairs. It also pins one pair that must
**stay** failing: white on the red fill measures 3.68:1, which is why every primary button carries a
near-black label at 5.44:1 instead.

`npm run check:slop` scans the source for em-dashes and en-dashes, emoji, arbitrary z-index values,
`h-screen`, scroll listeners, `transition-all`, pure black, `ease-in` on UI, banned palette colours,
gradient text, more than one marquee, and eyebrow labels sitting above section headings. Comment
lines are stripped first so a rule that names a banned pattern in prose does not trip itself.

Measured with Playwright against the production build, throttled to 4x CPU and 10 Mbit:

| Route | LCP | CLS |
|---|---|---|
| `/` | 1.69s | 0.009 |
| `/trgovina` | 2.34s | 0.001 |
| `/o-serveru` | 2.00s | 0.004 |

`axe-core` reports **0 violations** across all eight routes plus the cart drawer and the product
dialog, at WCAG 2.1 A and AA.

## Accessibility

Skip link, visible focus ring on everything interactive, and a single `useDialog` hook shared by the
cart, the mobile menu, the product dialog and the gallery viewer so all four trap focus, close on
Escape and restore focus to their trigger identically.

The balance is announced through `aria-live`. Form errors sit below their field, validate on blur
rather than on keystroke, and submitting with errors moves focus to the first invalid field. Every
image carries descriptive Croatian alt text.

The "Nadoplati credite" placeholder is a real button with `aria-disabled` rather than a dead link,
so keyboard and screen reader users get the same "not yet, and it will be Tebex" explanation that
mouse users get from the tooltip.

## Known gaps

- `/og.jpg` is referenced but not present. Add it or remove the `og:image` tags.
- Social and canonical URLs are guesses. See PLACEHOLDERS.md.
- Both legal pages are drafting templates and need a lawyer.
- Deployment needs an SPA rewrite rule (all paths to `index.html`), otherwise deep links 404 on a
  static host.
