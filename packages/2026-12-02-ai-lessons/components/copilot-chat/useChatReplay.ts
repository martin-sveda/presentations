import type { Ref } from 'vue'
import type { ReplayEntry, ReplaySession } from './schema.ts'
import { computed, onScopeDispose, readonly, shallowRef, watch } from 'vue'

interface Frame {
  title: string
  entries: ReplayEntry[]
  composer: string
  thinking: boolean
  delay: number
}

function* conversation(session: ReplaySession): Generator<Frame> {
  let history: ReplayEntry[] = []
  const frame = (composer = '', thinking = false, delay = 500, partial?: ReplayEntry): Frame => ({
    title: session.title,
    entries: (partial ? [...history, partial] : history).slice(-8),
    composer,
    thinking,
    delay,
  })
  yield frame('', false, 600)
  for (const entry of session.entries) {
    if (entry.role === 'user') {
      let prompt = ''
      for (const character of entry.text) {
        prompt += character
        yield frame(prompt, false, 25)
      }
      yield frame(prompt, false, 600)
    }
    else if (entry.role === 'assistant') {
      yield frame('', true, 850)
      const blocks: typeof entry.blocks = []
      for (const block of entry.blocks) {
        let content = ''
        const characters = Array.from(block.text)
        for (let offset = 0; offset < characters.length; offset += 8) {
          content += characters.slice(offset, offset + 8).join('')
          yield frame('', false, 45, {
            role: 'assistant',
            blocks: [...blocks, { ...block, text: content }],
          })
        }
        blocks.push(block)
      }
    }
    else {
      yield frame('', true, 450)
    }
    history = [...history, entry].slice(-8)
    yield frame('', false, entry.role === 'assistant' ? 1800 : 450)
  }
  yield frame('', false, 2800)
}

export function useChatReplay(options: {
  sessions: Ref<ReplaySession[]>
  speed: Ref<number>
  enabled: Ref<boolean>
  staticMode: Ref<boolean>
}) {
  const paused = shallowRef(false)
  const current = shallowRef<Frame>({ title: '', entries: [], composer: '', thinking: false, delay: 0 })
  let iterator: Generator<Frame> | undefined
  let sessionIndex = 0
  let timer: ReturnType<typeof setTimeout> | undefined
  let dueAt = 0
  let remaining = 0
  const disposed = shallowRef(false)
  const running = computed(() => !disposed.value && options.enabled.value && !options.staticMode.value
    && !paused.value && options.sessions.value.length > 0)
  const display = computed<Frame>(() => {
    if (!options.staticMode.value)
      return current.value
    const first = options.sessions.value[0]
    return { title: first?.title ?? '', entries: first?.entries.slice(0, 8) ?? [], composer: '', thinking: false, delay: 0 }
  })

  function cancel() {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
      remaining = Math.max(0, dueAt - Date.now())
    }
  }

  function advance() {
    const sessions = options.sessions.value
    if (!sessions.length)
      return
    iterator ??= conversation(sessions[sessionIndex]!)
    let next = iterator.next()
    if (next.done) {
      if (sessions.length > 1)
        sessionIndex = (sessionIndex + 1 + Math.floor(Math.random() * (sessions.length - 1))) % sessions.length
      iterator = conversation(sessions[sessionIndex]!)
      next = iterator.next()
    }
    if (!next.done) {
      current.value = next.value
      remaining = next.value.delay * (0.9 + Math.random() * 0.2) / options.speed.value
    }
  }

  function schedule() {
    if (!running.value || timer !== undefined)
      return
    if (!iterator)
      advance()
    dueAt = Date.now() + remaining
    timer = setTimeout(() => {
      timer = undefined
      if (!running.value)
        return
      advance()
      schedule()
    }, remaining)
  }

  function reset() {
    cancel()
    iterator = undefined
    sessionIndex = 0
    remaining = 0
    current.value = { title: '', entries: [], composer: '', thinking: false, delay: 0 }
  }

  function restart() {
    reset()
    paused.value = false
    schedule()
  }

  watch(running, active => active ? schedule() : cancel(), { immediate: true, flush: 'sync' })
  watch(options.sessions, () => {
    reset()
    schedule()
  }, { flush: 'sync' })
  watch(options.speed, (speed, previous) => {
    cancel()
    if (Number.isFinite(speed) && speed > 0) {
      remaining = remaining * previous / speed
      schedule()
    }
  }, { flush: 'sync' })
  onScopeDispose(() => {
    disposed.value = true
    cancel()
    iterator = undefined
  })
  function togglePause() {
    paused.value = !paused.value
  }
  return { display, paused: readonly(paused), running, restart, togglePause }
}
