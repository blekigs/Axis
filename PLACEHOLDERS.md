# Placeholders and assumptions

Everything on this site that is not real, in one place, so nothing invented for the demo gets
mistaken for a fact later.

## The server itself

Axis RolePlay is a **fictional server invented for this demo**. There is no live FiveM server behind
it. The founding year (2023), the whitelist process, the admin shift policy and the "economy has
never been reset" claim are all written as plausible brand copy, not as reported fact. Replace every
one of them with what is actually true before this goes live.

## Products

`src/data/proizvodi.ts` is the only file to edit. It holds the real category and item list (six
categories: automobili, custom organizacije, organizacije, dodaci za organizaciju, biznis, ostalo).
What is still a placeholder:

- **Every `cijena` is `null`.** No item has a credit price yet. The UI shows "Cijena uskoro" and the
  add-to-cart button is disabled until a number is set. Fill in `cijena` in `proizvodi.ts` per item
  as prices are decided — nothing else needs to change.
- **`organizacije` is the one category with a real price**, but it's fixed in euros, not credits:
  `cijenaEur: 10` for any donatorska mafija, `cijenaEur: 25` for any državna organizacija (the rule
  is also shown as a badge on that category tab). Its `cijena` in credits is still `null` — once a
  credit price is set for it too, `CijenaProizvoda` (`src/components/ui/Cijena.tsx`) will show the
  euro figure alone until then, and should be revisited once both exist.
- Product codes (e.g. `AX-D-401`) follow a made-up scheme: category letter plus a number.
- Specification values on each card (capacities, slot counts, access rules) are short plausible
  labels, not sourced from an actual server config.
- Descriptive copy (`opis`, `detalj`) is written for the demo and should read true to how the item
  actually works in-game before this goes live.

## Money

- `2 500 kn` in the starter pack description is in-world game currency, not euros, and not a real
  amount.
- The 2500 starting credit balance is a demo value, set in `POCETNI_CREDITI` in
  `src/data/sadrzaj.ts`.
- The seven credit top-up packs in `src/data/paketi.ts` (5 €→500 C ... 100 €→17000 C) are the real
  bundle figures. They're shown on the Trgovina page but not wired to Tebex — the CTA on every pack
  is the same "Uskoro, putem Tebex-a" placeholder used elsewhere.

## Testimonials

The three reviews in `src/data/sadrzaj.ts` are written for the demo. The names (Marin Kovačević,
Petra Novosel, Dino Šarić) are realistic Croatian names, not real people. The tenure figures
("7 mjeseci u gradu") are invented.

## The dispatch ticker

The scrolling log on the home page is invented in-world content. The timestamps and incidents are
written to show what a night on the server looks like. It is not a live feed and is not wired to
anything.

## Links

`DISCORD_URL`, `TIKTOK_URL` and `INSTAGRAM_URL` in `src/data/sadrzaj.ts` point at
`discord.gg/axisroleplay` and matching handles. **These are guesses and almost certainly do not
exist.** Replace them before publishing.

The domain is no longer a placeholder: the site is live on `axis-roleplay.store`, and the canonical,
Open Graph and JSON-LD URLs in `index.html` point there. `og.jpg` is still missing, so link previews
render without an image until a 1200x630 file is added to `public/`.

## Images

Every photograph is a stock image from Unsplash standing in for a future in-game screenshot.

Each id was fetched, rendered and **looked at** before it was assigned, so the Croatian alt text
describes the photograph that actually loads. Two candidate sets were rejected during that pass: a
first batch of interiors that turned out to be bright daylight shots, and a neon set that was almost
entirely purple and magenta, which the brief rules out.

Images are requested with `crop=entropy` so the tall and square crops land on the subject rather
than on empty night sky.

The catalogue now has ~29 items and draws from the same reviewed set of ~28 photo ids, so a handful
of ids are reused across unrelated products (e.g. the same phone close-up stands in for both
"Custom biznis" and "Custom broj telefona"). Each reuse keeps its accurate alt text for that photo.

When real screenshots exist, swap the `slika` ids in `proizvodi.ts` and `sadrzaj.ts` and rewrite the
`alt` text to match. Nothing else needs to change.

## The Open Graph image

`index.html` references `/og.jpg` at 1200x630. **That file does not exist yet.** Either add it to
`public/` or drop the `og:image` tags, otherwise link previews will show a broken image.

## Legal pages

`Uvjeti korištenja` and `Pravila privatnosti` are drafting templates, and each page says so in a
framed notice at the top. They name the right obligations for a Croatian FiveM server that sells
through Tebex, but the operator identity, contact address and retention periods are blank or
invented. **A lawyer has to review both before publication.**

## What is deliberately not built

- No accounts and no login. Planned for a later version.
- No payments. Tebex is named throughout as the only future payment method and is not integrated.
- No backend. The contact form validates and shows a success state without sending anything, and it
  says so.
- No persistence. Credits, cart and purchase history live in memory and reset on refresh.
- No Google Maps, and no booking or reservation flow. The store replaces the booking feature from
  the package specification.
