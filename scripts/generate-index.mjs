// Generates a landing page (dist/index.html) listing all built presentation decks.
// Run after `packages:build-base` has populated `dist/<deck-slug>/` for each deck.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PACKAGES_DIR = join(ROOT, 'packages')
const DIST_DIR = join(ROOT, 'dist')
// Must match the `--base` prefix used in each deck's `build-base` script.
const BASE_PATH = '/presentations/'

function readSlideTitle(deckDir) {
  const slidesPath = join(deckDir, 'slides.md')
  if (!existsSync(slidesPath))
    return undefined
  const slidesMd = readFileSync(slidesPath, 'utf-8')
  const frontmatter = slidesMd.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  return frontmatter.match(/^title:([^\r\n]*)/m)?.[1]?.trim().replace(/^(['"])(.*)\1$/, '$2') || undefined
}

function discoverDecks() {
  return readdirSync(PACKAGES_DIR)
    .filter(name => statSync(join(PACKAGES_DIR, name)).isDirectory())
    .map((slug) => {
      const packagePath = join(PACKAGES_DIR, slug, 'package.json')
      return {
        slug,
        pkg: existsSync(packagePath) ? JSON.parse(readFileSync(packagePath, 'utf-8')) : undefined,
      }
    })
    .filter(({ pkg }) => pkg?.scripts?.['build-base'])
    .map(({ slug, pkg }) => {
      const deckDir = join(PACKAGES_DIR, slug)
      const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/)
      if (statSync(join(DIST_DIR, slug, 'index.html')).size === 0)
        throw new Error(`Empty web build for ${slug}`)
      const pdfPath = join(DIST_DIR, slug, `${slug}.pdf`)
      if (readFileSync(pdfPath).subarray(0, 5).toString() !== '%PDF-')
        throw new Error(`Invalid PDF export for ${slug}: ${pdfPath}`)
      return {
        slug,
        title: readSlideTitle(deckDir) ?? pkg.name ?? slug,
        date: dateMatch?.[1],
      }
    })
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[char])
}

function renderHtml(decks) {
  const items = decks.map(({ slug, title, date }) => `
    <li class="deck">
      <a class="deck-link" href="${BASE_PATH}${slug}/">
        <span class="deck-title">${escapeHtml(title)}</span>
        ${date ? `<span class="deck-date">${date}</span>` : ''}
      </a>
      <a class="deck-pdf" href="${BASE_PATH}${slug}/${slug}.pdf" title="Download PDF">PDF</a>
    </li>`).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Presentations</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111317;
    color: #e5e7eb;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  main { width: min(720px, 90vw); padding: 2rem 0; }
  h1 { font-size: 1.75rem; margin-bottom: 1.5rem; }
  ul.deck-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
  li.deck { display: flex; gap: 0.5rem; }
  li.deck a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-radius: 0.75rem;
    background: #1a1d23;
    color: inherit;
    text-decoration: none;
    border: 1px solid #2a2e37;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  li.deck a.deck-link { flex: 1; min-width: 0; }
  li.deck a.deck-pdf { flex: none; font-size: 0.85rem; font-weight: 600; }
  li.deck a:hover { border-color: #6366f1; background: #20242c; }
  .deck-title { font-size: 1.05rem; }
  .deck-date { font-size: 0.85rem; opacity: 0.55; white-space: nowrap; }
</style>
</head>
<body>
<main>
  <h1>Presentations</h1>
  <ul class="deck-list">
    ${items}
  </ul>
</main>
</body>
</html>
`
}

const decks = discoverDecks()
if (decks.length === 0)
  throw new Error('No presentation decks found; refusing to generate an empty landing page')
writeFileSync(join(DIST_DIR, 'index.html'), renderHtml(decks))
console.warn(`Generated dist/index.html listing ${decks.length} deck(s).`)
