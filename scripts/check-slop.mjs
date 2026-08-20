#!/usr/bin/env node
/**
 * Mechanical checks for the things that make a site read as machine-made.
 *
 * These are the rules from the brief that a human reviewer would otherwise have
 * to remember on every edit. A script remembers them for free.
 *
 * Comment lines are stripped before scanning, so a rule that names a banned
 * pattern in prose does not trip itself.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const KORIJEN = 'src'
const EKSTENZIJE = new Set(['.ts', '.tsx', '.css'])

function datoteke(dir) {
  return readdirSync(dir).flatMap((ime) => {
    const put = join(dir, ime)
    return statSync(put).isDirectory() ? datoteke(put) : EKSTENZIJE.has(extname(ime)) ? [put] : []
  })
}

const jeKomentar = (redak) => /^\s*(\/\/|\/\*|\*)/.test(redak)

const svi = datoteke(KORIJEN).map((put) => ({
  put,
  redci: readFileSync(put, 'utf8').split('\n'),
}))

const nalazi = []
const prijavi = (put, redak, poruka) => nalazi.push(`${put}:${redak}  ${poruka}`)

const PRAVILA = [
  // Zero tolerance: the single most reliable tell that a machine wrote the copy.
  [/—/, 'em-dash u izvoru'],
  [/–/, 'en-dash u izvoru'],

  // The icon set is lucide. Emoji are not icons.
  [/\p{Extended_Pictographic}/u, 'emoji u izvoru'],

  // Global layers come from the --z-* scale. z-0 and z-10 stay allowed for
  // local stacking inside one component; z-20 and up is a global claim.
  [/\bz-(\[\s*\d+\s*\]|[2-9]\d\d*)\b/, 'proizvoljan z-index umjesto --z- ljestvice'],

  // h-screen breaks when the iOS address bar moves. dvh does not.
  [/\bh-screen\b/, 'h-screen umjesto min-h-[100dvh]'],

  // Scroll listeners run every frame and cannot be batched.
  [/addEventListener\(\s*['"]scroll['"]/, 'scroll listener umjesto IntersectionObserver-a'],

  // transition-all animates properties nobody chose, including layout ones.
  [/\btransition-all\b/, 'transition-all umjesto imenovanih svojstava'],

  // Pure black kills depth and is not the page colour.
  [/#000000\b|#000\b/, 'čista crna umjesto ink-000'],

  // ease-in delays the exact moment the eye is watching hardest.
  [/\bease-in\b(?!-out)/, 'ease-in na UI prijelazu'],

  // Banned by the brief: no purple, no blue, no rainbow gradients.
  [/\b(?:bg|text|border|from|via|to)-(?:purple|violet|indigo|fuchsia|blue|sky|cyan)-\d/, 'zabranjena boja iz palete'],

  // Decorative gradient text.
  [/\bbg-clip-text\b/, 'gradijent u tekstu'],
]

for (const { put, redci } of svi) {
  redci.forEach((redak, i) => {
    if (jeKomentar(redak)) return
    for (const [uzorak, poruka] of PRAVILA) {
      if (uzorak.test(redak)) prijavi(put, i + 1, poruka)
    }
  })
}

const tsx = svi.filter((f) => f.put.endsWith('.tsx'))

/**
 * The eyebrow budget.
 *
 * An eyebrow is a small tracked caps label sitting directly above a section
 * heading. `u-label` is also used for functional labels (spec names, the credit
 * unit, the balance), so proximity to a heading is what separates the two.
 */
let eyebrow = 0
for (const { put, redci } of tsx) {
  redci.forEach((redak, i) => {
    if (jeKomentar(redak) || !redak.includes('u-label')) return
    const naredne = redci.slice(i + 1, i + 7).join('\n')
    if (/<h[123]\b|u-d[123]\b/.test(naredne)) {
      eyebrow += 1
      prijavi(put, i + 1, 'eyebrow iznad naslova sekcije')
    }
  })
}

const sekcija = tsx.reduce((n, f) => n + (f.redci.join('\n').match(/<section/g)?.length ?? 0), 0)
const dopusteno = Math.ceil(sekcija / 3)

// One marquee per page. Counted in markup only; the CSS defines it once and
// mentions the class in the hover and reduced-motion rules.
const trake = tsx.reduce((n, f) => n + (f.redci.join('\n').match(/u-marquee-track/g)?.length ?? 0), 0)

console.log('\nProvjera zanata\n')
console.log(`  sekcija u markupu:        ${sekcija}`)
console.log(`  eyebrow iznad naslova:    ${eyebrow} (dopušteno ${dopusteno})`)
console.log(`  marquee traka u markupu:  ${trake} (jedan marquee, druga traka je kopija za petlju)`)

if (trake > 2) prijavi('src', 0, 'više od jednog marquee-a')

if (nalazi.length > 0) {
  console.log(`\n${nalazi.length} nalaza:\n`)
  for (const n of nalazi) console.log(`  ${n}`)
  console.log()
  process.exit(1)
}

console.log('\nNema nalaza.\n')
