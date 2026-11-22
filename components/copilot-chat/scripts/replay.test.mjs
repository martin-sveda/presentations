/* eslint test/no-import-node-test: off */
import assert from 'node:assert/strict'
import { it } from 'node:test'
import { effectScope, shallowRef } from 'vue'
import { parseSession } from '../schema.ts'
import { useChatReplay } from '../useChatReplay.ts'

function setup(t, entries) {
  t.mock.timers.enable({ apis: ['setTimeout', 'Date'] })
  const scope = effectScope()
  const sessions = shallowRef([
    parseSession({ version: 1, title: 'One', entries }),
    parseSession({ version: 1, title: 'Two', entries }),
  ])
  const enabled = shallowRef(true)
  const staticMode = shallowRef(false)
  const speed = shallowRef(100)
  const replay = scope.run(() => useChatReplay({ sessions, enabled, staticMode, speed }))
  t.after(() => scope.stop())
  return { replay, enabled, staticMode, sessions, scope }
}

const exchange = [
  { role: 'user', text: 'Hi' },
  { role: 'assistant', blocks: [{ type: 'text', text: 'Hello 👋' }] },
]

it('types, submits and streams in order; pause and inactive slides freeze playback', (t) => {
  const { replay, enabled, scope } = setup(t, exchange)
  t.mock.timers.tick(7)
  assert.equal(replay.display.value.composer, 'H')
  replay.togglePause()
  const paused = replay.display.value
  t.mock.timers.tick(1000)
  assert.equal(replay.display.value, paused)
  replay.togglePause()
  t.mock.timers.tick(1)
  assert.equal(replay.display.value.composer, 'Hi')
  enabled.value = false
  const inactive = replay.display.value
  t.mock.timers.tick(1000)
  assert.equal(replay.display.value, inactive)
  enabled.value = true
  for (let index = 0; index < 50 && replay.display.value.entries.length < 2; index++)
    t.mock.timers.tick(1)
  assert.deepEqual(replay.display.value.entries.map(entry => entry.role), ['user', 'assistant'])
  scope.stop()
  const stopped = replay.display.value
  t.mock.timers.tick(1000)
  assert.equal(replay.display.value, stopped)
})

it('repeated loops keep eight entries, do not immediately repeat sessions, and restart cleanly', (t) => {
  const entries = Array.from({ length: 12 }, (_, index) => exchange[index % 2])
  const { replay } = setup(t, entries)
  let previousTitle = ''
  let transitions = 0
  for (let tick = 0; tick < 4000; tick++) {
    t.mock.timers.tick(1)
    assert.ok(replay.display.value.entries.length <= 8)
    const title = replay.display.value.title
    if (title !== previousTitle) {
      if (previousTitle)
        transitions++
      previousTitle = title
    }
  }
  assert.ok(transitions > 2)
  replay.togglePause()
  replay.restart()
  assert.equal(replay.paused.value, false)
  assert.equal(replay.display.value.title, 'One')
  assert.deepEqual(replay.display.value.entries, [])
})

it('static mode is deterministic, disables playback and responds to new data', (t) => {
  const { replay, staticMode, sessions } = setup(t, exchange)
  staticMode.value = true
  const snapshot = replay.display.value
  t.mock.timers.tick(1000)
  assert.equal(replay.display.value, snapshot)
  assert.deepEqual(snapshot.entries, exchange)
  assert.equal(replay.running.value, false)
  sessions.value = []
  assert.deepEqual(replay.display.value.entries, [])
})
