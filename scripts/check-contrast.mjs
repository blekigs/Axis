#!/usr/bin/env node
/**
 * Recomputes every colour pair the design system relies on and fails if one
 * drops below its WCAG target.
 *
 * The point is that "AA contrast" stops being a claim in a README and becomes
 * something the build can check. Red on black is the pair most likely to drift,
 * which is exactly why it is pinned here.
 */

const TOKENI = {
  'ink-000': '#07080A',
  'ink-010': '#0C0E11',
  'ink-020': '#121519',
  line: '#232830',
  'line-strong': '#39414C',
  text: '#E8EAED',
  dim: '#9BA2AC',
  muted: '#7C838D',
  red: '#FF2D3F',
  'red-deep': '#B00C19',
}

/** [foreground, background, minimum, description] */
const PAROVI = [
  ['text', 'ink-000', 4.5, 'body text on the page'],
  ['text', 'ink-010', 4.5, 'body text on a surface'],
  ['text', 'ink-020', 4.5, 'body text on a raised surface'],
  ['dim', 'ink-000', 4.5, 'secondary text on the page'],
  ['dim', 'ink-010', 4.5, 'secondary text on a surface'],
  ['muted', 'ink-000', 4.5, 'metadata, the quietest text used'],
  ['muted', 'ink-020', 4.5, 'metadata on a raised surface'],
  ['red', 'ink-000', 4.5, 'accent as text on the page'],
  ['red', 'ink-020', 4.5, 'accent as text on a raised surface'],
  ['ink-000', 'red', 4.5, 'primary button label on the red fill'],
  ['red', 'ink-000', 3.0, 'focus ring against the page'],
  ['line-strong', 'ink-000', 1.5, 'functional border against the page'],
]

/**
 * A pair that must NOT be used. White on the red fill measures 3.68:1, which is
 * why every primary button carries a near-black label instead. Pinned so nobody
 * "fixes" the button by making the text white.
 */
const ZABRANJENO = [['#FFFFFF', 'red', 4.5, 'white text on the red fill']]

function kanali(hex) {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
}

function linearno(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

function luminancija(hex) {
  const [r, g, b] = kanali(hex).map(linearno)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function omjer(a, b) {
  const l1 = luminancija(a)
  const l2 = luminancija(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

function boja(naziv) {
  return TOKENI[naziv] ?? naziv
}

let pao = false

console.log('\nKontrast tokena\n')

for (const [fg, bg, min, opis] of PAROVI) {
  const r = omjer(boja(fg), boja(bg))
  const ok = r >= min
  if (!ok) pao = true
  console.log(
    `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}:1  (min ${min.toFixed(1)})  ${opis}`
  )
}

console.log('\nParovi koji se ne smiju koristiti\n')

for (const [fg, bg, min, opis] of ZABRANJENO) {
  const r = omjer(boja(fg), boja(bg))
  const jos = r < min
  if (!jos) pao = true
  console.log(
    `  ${jos ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(6)}:1  still below ${min.toFixed(1)}, so still banned  ${opis}`
  )
}

console.log()

if (pao) {
  console.error('Kontrast je pao ispod dopuštenog. Popravi tokene prije objave.\n')
  process.exit(1)
}

console.log('Svi parovi prolaze.\n')
