import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
// eslint-disable-next-line test/no-import-node-test -- Use the built-in runner without adding a test dependency.
import { test } from 'node:test'

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'presentation index '))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'scripts'))
  mkdirSync(join(root, 'packages'))
  mkdirSync(join(root, 'dist'))
  const script = join(root, 'scripts/generate-index.mjs')
  copyFileSync(new URL('./generate-index.mjs', import.meta.url), script)
  return {
    root,
    run: () => spawnSync(process.execPath, [script], { encoding: 'utf-8' }),
    deck(slug, title) {
      const source = join(root, 'packages', slug)
      const output = join(root, 'dist', slug)
      mkdirSync(source)
      mkdirSync(output)
      writeFileSync(join(source, 'package.json'), JSON.stringify({ name: slug, scripts: { 'build-base': 'slidev build' } }))
      writeFileSync(join(source, 'slides.md'), `---\ntitle: ${title}\n---\n`)
      writeFileSync(join(output, 'index.html'), '<html>Slides</html>')
      writeFileSync(join(output, `${slug}.pdf`), '%PDF-1.7\n')
      return output
    },
  }
}

test('generates sorted, escaped web and PDF links, excluding non-deck packages', (t) => {
  const { root, run, deck } = fixture(t)
  deck('2026-07-22-first', 'First & <deck>')
  deck('2026-12-02-second', '"Second: A deck"')
  mkdirSync(join(root, 'packages/talks'))
  writeFileSync(join(root, 'packages/talks/package.json'), '{"name":"talks"}')
  const result = run()
  assert.equal(result.status, 0, result.stderr)
  const html = readFileSync(join(root, 'dist/index.html'), 'utf-8')
  assert.ok(html.indexOf('Second') < html.indexOf('First'))
  assert.ok(html.includes('First &amp; &lt;deck&gt;'))
  assert.ok(html.includes('>Second: A deck</span>'))
  for (const slug of ['2026-07-22-first', '2026-12-02-second']) {
    assert.ok(html.includes(`href="/presentations/${slug}/"`))
    assert.ok(html.includes(`href="/presentations/${slug}/${slug}.pdf"`))
  }
  assert.ok(!html.includes('/talks/'))
})

test('rejects incomplete or invalid builds before writing the landing page', async (t) => {
  for (const failure of ['missing web', 'empty web', 'missing PDF', 'invalid PDF']) {
    await t.test(failure, (t) => {
      const { root, run, deck } = fixture(t)
      const output = deck('2026-07-22-first', 'First')
      if (failure === 'missing web')
        rmSync(join(output, 'index.html'))
      else if (failure === 'empty web')
        writeFileSync(join(output, 'index.html'), '')
      else if (failure === 'missing PDF')
        rmSync(join(output, '2026-07-22-first.pdf'))
      else
        writeFileSync(join(output, '2026-07-22-first.pdf'), '<html>Export failed</html>')
      const result = run()
      assert.notEqual(result.status, 0)
      assert.match(result.stderr, /2026-07-22-first/)
      assert.ok(!existsSync(join(root, 'dist/index.html')))
    })
  }
})

test('rejects an empty deck list', (t) => {
  const { run } = fixture(t)
  const result = run()
  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /No presentation decks found/)
})
