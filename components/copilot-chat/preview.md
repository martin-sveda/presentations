---
theme: default
title: Copilot chat replay preview
colorSchema: dark
routerMode: hash
---

<script setup lang="ts">
import CopilotChatReplay from './CopilotChatReplay.vue'
import examples from './sessions/examples.json'
</script>

# Copilot chat replay

Synthetic examples, not imported personal sessions.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 340px">
  <CopilotChatReplay :sessions="examples" :speed="2" theme="dark" style="height: 340px" />
  <CopilotChatReplay :sessions="examples" :speed="2" theme="light" style="height: 340px" />
</div>

---

<script setup lang="ts">
import CopilotChatReplay from './CopilotChatReplay.vue'
import examples from './sessions/examples.json'
</script>

# Static excerpt

<CopilotChatReplay :sessions="examples" static theme="light" style="height: 350px" />

---

<script setup lang="ts">
import CopilotChatReplay from './CopilotChatReplay.vue'
</script>

# Invalid input

<CopilotChatReplay :sessions="[]" />
