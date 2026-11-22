/* eslint test/no-import-node-test: off */
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { extractSession, importOptions, parseEvents } from './import-session.mjs'

const event = (type, data) => ({ type, data })
const prompt = event('user.message', { content: 'Investigate the failure.' })
const answer = event('assistant.message', { content: 'Check the assertion.' })

it('extracts visible content and code without copying private fields or runtime wrappers', () => {
  const { session, warnings } = extractSession([
    event('system.message', { content: 'PRIVATE_SYSTEM' }),
    event('user.message', {
      content: '<system_reminder>PRIVATE_CONTEXT</system_reminder>\nExplain this.',
      attachments: [{ text: 'PRIVATE_ATTACHMENT' }],
    }),
    event('assistant.message', { phase: 'analysis', content: 'PRIVATE_REASONING' }),
    event('assistant.message', { toolRequests: [{}], content: '', encryptedContent: 'PRIVATE_OPAQUE_REASONING' }),
    event('assistant.message', {
      phase: 'final_answer',
      content: 'Try this:\n```cpp\nreturn result;\n```\nThen run the test.',
      reasoningText: 'PRIVATE_REASONING',
    }),
  ], 'Review')
  assert.equal(session.entries[0].text, 'Explain this.')
  assert.deepEqual(session.entries[1].blocks.map(block => block.type), ['text', 'code', 'text'])
  assert.ok(!JSON.stringify(session).includes('PRIVATE'))
  assert.ok(warnings.some(warning => warning.includes('wrapper')))
})

it('pairs tool outcomes without importing arguments or results; unfinished tools remain pending', () => {
  const { session, warnings } = extractSession([
    prompt,
    event('tool.execution_start', { toolCallId: 'a', toolName: 'read_file', arguments: { secret: 'PRIVATE' } }),
    event('tool.execution_start', { toolCallId: 'b', toolName: 'bash' }),
    event('tool.execution_complete', { toolCallId: 'a', success: false, result: 'PRIVATE' }),
    answer,
  ], 'Tools')
  assert.equal(session.entries[1].status, 'failure')
  assert.equal(session.entries[2].status, 'pending')
  assert.ok(!JSON.stringify(session).includes('PRIVATE'))
  assert.ok(warnings.some(warning => warning.includes('unfinished')))
})

it('rejects malformed logs, unsupported content, encryption and ambiguous wrappers', () => {
  assert.throws(() => [...parseEvents('{"type":\n')], /line 1/)
  assert.throws(() => extractSession([prompt, event('assistant.message', { content: [] })], 'Bad'), /Unreadable/)
  assert.throws(() => extractSession([prompt, event('assistant.message', { content: '', encryptedContent: 'opaque' })], 'Bad'), /encrypted-only/)
  assert.throws(() => extractSession([event('user.message', { content: '<system_reminder>oops' }), answer], 'Bad'), /wrapper/)
  assert.throws(() => extractSession([prompt], 'Bad'), /assistant answer/)
})

it('validates session IDs, slugs and exclusive source selection', () => {
  assert.throws(() => importOptions(['--session-id', '../secret', '--name', 'test']), /UUID/)
  assert.throws(() => importOptions(['--source', 'log', '--name', '../test']), /slug/)
  assert.throws(() => importOptions(['--name', 'test']), /exactly one/)
  assert.throws(() => importOptions(['--source', 'log', '--session-id', '00000000-0000-0000-0000-000000000000', '--name', 'test']), /exactly one/)
})

it('cli writes a private ignored draft, refuses overwrite, and reports missing logs', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'chat-import-'))
  const script = fileURLToPath(new URL('./import-session.mjs', import.meta.url))
  const name = `import-test-${process.pid}`
  const destination = resolve(dirname(script), '../drafts', `${name}.json`)
  try {
    const source = join(directory, 'events.jsonl')
    await writeFile(source, [prompt, answer].map(value => JSON.stringify(value)).join('\n'))
    const args = [script, '--source', source, '--name', name]
    const first = spawnSync(process.execPath, args, { encoding: 'utf8' })
    assert.equal(first.status, 0, first.stderr)
    assert.equal(JSON.parse(await readFile(destination, 'utf8')).entries.length, 2)
    assert.equal(spawnSync(process.execPath, args, { encoding: 'utf8' }).status, 1)
    const missing = spawnSync(process.execPath, [script, '--source', join(directory, 'missing'), '--name', name], { encoding: 'utf8' })
    assert.equal(missing.status, 1)
    assert.match(missing.stderr, /Cannot read/)
  }
  finally {
    await rm(destination, { force: true })
    await rm(directory, { recursive: true, force: true })
  }
})
