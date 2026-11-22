<script setup lang="ts">
withDefaults(defineProps<{ label?: string, color?: 'sky' | 'violet' }>(), {
  label: 'Prompt',
  color: 'sky',
})
</script>

<template>
  <div class="flex items-start gap-3 my-2" :class="color === 'violet' ? 'is-violet' : 'is-sky'">
    <div class="avatar shrink-0 mt-1 flex items-center justify-center w-8 h-8 rounded-full">
      <div class="i-carbon:user-avatar-filled-alt text-lg" />
    </div>
    <div class="bubble flex-1 rounded-2xl rounded-tl-sm px-4 py-3 backdrop-blur-sm">
      <div class="text-xs uppercase tracking-wide opacity-60 mb-1">
        {{ label }}
      </div>
      <div class="text-sm font-mono leading-snug italic">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.is-sky .avatar {
  background: rgb(14 165 233 / 0.2);
  border: 1px solid rgb(56 189 248 / 0.4);
  color: rgb(125 211 252);
}
.is-sky .bubble {
  border: 1px solid rgb(7 89 133);
  background: rgb(8 47 73 / 0.35);
}

.is-violet .avatar {
  background: rgb(139 92 246 / 0.2);
  border: 1px solid rgb(167 139 250 / 0.4);
  color: rgb(196 181 253);
}
.is-violet .bubble {
  border: 1px solid rgb(76 29 149);
  background: rgb(46 16 101 / 0.35);
}
</style>
