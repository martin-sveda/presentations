<script setup lang="ts">
import type { ReplayEntry } from './schema.ts'

defineProps<{ entry: ReplayEntry }>()
</script>

<template>
  <div v-if="entry.role === 'tool'" class="tool-row" :data-status="entry.status">
    <span class="tool-icon" aria-hidden="true">{{ entry.status === 'success' ? '✓' : entry.status === 'failure' ? '×' : '…' }}</span>
    <span>{{ entry.text }}</span>
    <span class="tool-status">{{ entry.status === 'pending' ? 'Incomplete' : entry.status }}</span>
  </div>
  <article v-else class="message" :class="{ 'user-message': entry.role === 'user' }" :data-role="entry.role">
    <div class="message-heading">
      <span v-if="entry.role === 'assistant'" class="i-ri:copilot-line" aria-hidden="true" />
      <span v-else class="i-carbon:user-avatar-filled-alt" aria-hidden="true" />
      {{ entry.role === 'user' ? 'You' : 'GitHub Copilot' }}
    </div>
    <div v-if="entry.role === 'user'" class="message-text">
      {{ entry.text }}
    </div>
    <template v-else>
      <div v-for="(block, index) in entry.blocks" :key="index" class="response-block">
        <div v-if="block.type === 'text'" class="message-text">
          {{ block.text }}
        </div>
        <div v-else class="code-block">
          <div class="code-language">
            {{ block.language || 'code' }}
          </div>
          <pre class="code-content"><code>{{ block.text }}</code></pre>
        </div>
      </div>
    </template>
  </article>
</template>

<style scoped>
.message { padding: 12px 14px; font-size: 13px; line-height: 1.5; }
.user-message { background: var(--chat-user); border: 1px solid var(--chat-border); border-radius: 6px; }
.message-heading { display: flex; align-items: center; gap: 8px; font-weight: 600; margin-bottom: 8px; }
.message-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.response-block + .response-block { margin-top: 10px; }
.code-block { background: var(--chat-code); border: 1px solid var(--chat-border); border-radius: 5px; overflow: hidden; }
.code-language { padding: 4px 10px; color: var(--chat-muted); font-size: 11px; border-bottom: 1px solid var(--chat-border); }
.code-content { margin: 0; padding: 10px; white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--chat-text); background: transparent; }
.tool-row { display: flex; gap: 8px; align-items: center; margin: 0 14px; padding: 7px 0; font-size: 12px; color: var(--chat-muted); }
.tool-icon { color: var(--chat-accent); }
.tool-row[data-status="failure"] .tool-icon { color: var(--chat-error); }
.tool-status { margin-left: auto; font-size: 10px; text-transform: uppercase; }
</style>
