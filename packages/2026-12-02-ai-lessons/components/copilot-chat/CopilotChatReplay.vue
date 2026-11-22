<script setup lang="ts">
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { useDocumentVisibility, usePreferredReducedMotion } from '@vueuse/core'
import { computed, useTemplateRef, watch } from 'vue'
import ChatMessage from './ChatMessage.vue'
import { parseSession } from './schema.ts'
import { useChatReplay } from './useChatReplay'

const props = withDefaults(defineProps<{
  sessions: readonly unknown[]
  speed?: number
  static?: boolean
  theme?: 'dark' | 'light'
}>(), { speed: 1, static: false, theme: 'dark' })

const active = useIsSlideActive()
const { $renderContext } = useSlideContext()
const { isPrintMode } = useNav()
const visibility = useDocumentVisibility()
const reducedMotion = usePreferredReducedMotion()
const validation = computed(() => {
  try {
    if (!Array.isArray(props.sessions) || !props.sessions.length)
      throw new Error('Provide at least one reviewed replay session.')
    if (!Number.isFinite(props.speed) || props.speed <= 0)
      throw new Error('Playback speed must be a positive finite number.')
    if (props.theme !== 'dark' && props.theme !== 'light')
      throw new Error('Chat theme must be dark or light.')
    return { sessions: props.sessions.map(parseSession), error: '' }
  }
  catch (error) {
    return { sessions: [], error: error instanceof Error ? error.message : 'Invalid replay data.' }
  }
})
const sessions = computed(() => validation.value.sessions)
const staticMode = computed(() => props.static || isPrintMode.value || reducedMotion.value === 'reduce')
const enabled = computed(() => active.value && $renderContext.value === 'slide'
  && visibility.value === 'visible' && !validation.value.error)
const speed = computed(() => props.speed)
const { display, paused, running, restart, togglePause } = useChatReplay({ sessions, speed, enabled, staticMode })
const visibleEntries = computed(() => isPrintMode.value ? display.value.entries.slice(0, 2) : display.value.entries)
const transcript = useTemplateRef<HTMLElement>('transcript')
watch(display, () => {
  transcript.value?.scrollTo({ top: transcript.value.scrollHeight, behavior: staticMode.value || !running.value ? 'instant' : 'smooth' })
}, { flush: 'post' })
</script>

<template>
  <section class="copilot-chat" :class="[`theme-${theme}`, { 'print-chat': isPrintMode }]" :data-static="staticMode" aria-label="Copilot session replay" @click.stop @keydown.stop>
    <header class="chat-header">
      <span class="header-title">CHAT</span>
      <span class="replay-label">{{ isPrintMode ? 'Opening excerpt' : 'Session replay' }}</span>
      <div v-if="!isPrintMode" class="header-actions">
        <button class="chat-button" type="button" :disabled="staticMode || !!validation.error" :aria-label="paused ? 'Resume replay' : 'Pause replay'" @click="togglePause">
          {{ paused ? '▶' : 'Ⅱ' }}
        </button>
        <button class="chat-button" type="button" :disabled="staticMode || !!validation.error" aria-label="Restart replay" @click="restart">
          ↻
        </button>
      </div>
    </header>
    <div v-if="validation.error" class="chat-error" role="alert">
      {{ validation.error }}
    </div>
    <template v-else>
      <div class="session-title">
        {{ display.title || sessions[0]?.title }}
      </div>
      <div ref="transcript" class="transcript" :class="{ 'static-transcript': staticMode }">
        <ChatMessage v-for="(entry, index) in visibleEntries" :key="index" :entry="entry" />
        <div v-if="display.thinking" class="thinking">
          <span class="i-ri:copilot-line" aria-hidden="true" />
          <span class="working-dot" :class="{ animated: running }" />
          Working…
        </div>
      </div>
      <footer v-if="!isPrintMode" class="composer-area">
        <div class="composer">
          <div class="composer-text">
            <span v-if="!display.composer" class="placeholder">Ask Copilot</span><span v-else>{{ display.composer }}</span><span v-if="running && display.composer" class="cursor" aria-hidden="true" />
          </div>
          <div class="composer-toolbar">
            <span>Agent ▾</span><span>Session model ▾</span><span class="send-icon" aria-hidden="true">↑</span>
          </div>
        </div>
        <div class="composer-caption">
          {{ staticMode ? 'Completed excerpt' : paused ? 'Replay paused' : 'Simulated typing · No live AI connection' }}
        </div>
      </footer>
      <div v-else class="print-caption">
        First two entries · Static PDF excerpt
      </div>
    </template>
  </section>
</template>

<style scoped>
.copilot-chat { --chat-text: #cccccc; --chat-muted: #9d9d9d; --chat-bg: #181818; --chat-user: #222222; --chat-code: #1f1f1f; --chat-border: #333333; --chat-accent: #75beff; --chat-error: #f48771; --chat-input: #1f1f1f; box-sizing: border-box; width: 100%; height: 410px; min-height: 240px; max-height: 100%; display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--chat-border); border-radius: 7px; background: var(--chat-bg); color: var(--chat-text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; text-align: left; box-shadow: 0 8px 24px #0002; }
.theme-light { --chat-text: #333333; --chat-muted: #616161; --chat-bg: #f8f8f8; --chat-user: #ffffff; --chat-code: #ffffff; --chat-border: #d4d4d4; --chat-accent: #005fb8; --chat-error: #b5200d; --chat-input: #ffffff; }
.chat-header { display: flex; align-items: center; gap: 12px; padding: 8px 14px; border-bottom: 1px solid var(--chat-border); flex-shrink: 0; }
.header-title { font-size: 11px; font-weight: 600; }
.replay-label { font-size: 10px; color: var(--chat-muted); border: 1px solid var(--chat-border); border-radius: 4px; padding: 1px 5px; }
.header-actions { display: flex; gap: 3px; margin-left: auto; }
.chat-button { color: var(--chat-text); background: transparent; border: 0; border-radius: 4px; width: 26px; height: 24px; cursor: pointer; font: inherit; }
.chat-button:hover { background: var(--chat-user); }
.chat-button:focus-visible { outline: 2px solid var(--chat-accent); }
.chat-button:disabled { opacity: 0.4; cursor: default; }
.session-title { padding: 9px 14px 0; color: var(--chat-muted); font-size: 11px; flex-shrink: 0; }
.transcript { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: thin; padding: 10px; }
.static-transcript { overflow: hidden; }
.print-chat .transcript { flex: none; overflow: visible; }
.print-chat :deep(.message) { padding: 8px 10px; font-size: 11px; line-height: 1.35; }
.print-caption { margin-top: auto; padding: 5px 10px; font-size: 9px; color: var(--chat-muted); text-align: center; }
.thinking { display: flex; gap: 8px; align-items: center; padding: 12px 14px; font-size: 12px; color: var(--chat-muted); }
.working-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--chat-accent); }
.animated { animation: pulse 1s ease-in-out infinite; }
.composer-area { padding: 10px 12px 8px; flex-shrink: 0; }
.composer { border: 1px solid var(--chat-border); border-radius: 6px; background: var(--chat-input); padding: 9px 10px; }
.composer-text { min-height: 30px; max-height: 65px; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; line-height: 1.5; }
.placeholder { color: var(--chat-muted); }
.cursor { border-left: 1px solid var(--chat-text); margin-left: 1px; animation: pulse 0.8s step-end infinite; }
.composer-toolbar { display: flex; align-items: center; gap: 12px; color: var(--chat-muted); font-size: 10px; margin-top: 8px; }
.send-icon { margin-left: auto; color: var(--chat-accent); font-size: 18px; line-height: 1; }
.composer-caption { margin-top: 5px; font-size: 9px; color: var(--chat-muted); text-align: center; }
.chat-error { padding: 20px; color: var(--chat-error); font-size: 13px; }
@keyframes pulse { 50% { opacity: 0.3; } }
@media (prefers-reduced-motion: reduce) { .animated, .cursor { animation: none; } }
</style>
