<script setup lang="ts">
withDefaults(defineProps<{ icon?: string, color?: 'emerald' | 'sky' | 'violet' | 'amber', textSize?: string, label?: string }>(), {
  icon: 'i-ri:lightbulb-line',
  color: 'amber',
  textSize: 'text-sm',
})
</script>

<template>
  <div class="box rounded-lg px-4 py-2 flex items-center gap-3" :class="`is-${color}`">
    <div class="icon text-2xl shrink-0" :class="icon" />
    <div class="flex flex-col">
      <div v-if="label" class="text-xs uppercase tracking-wide opacity-60 mb-1">
        {{ label }}
      </div>
      <span :class="textSize"><slot /></span>
    </div>
  </div>
</template>

<style scoped>
.is-emerald {
  border: 2px solid rgb(6 95 70);
  background: rgb(6 95 70 / 0.2);
}
.is-emerald .icon {
  color: rgb(110 231 183);
}
.is-sky {
  border: 2px solid rgb(7 89 133);
  background: rgb(7 89 133 / 0.2);
}
.is-sky .icon {
  color: rgb(125 211 252);
}
.is-violet {
  border: 2px solid rgb(76 29 149);
  background: rgb(76 29 149 / 0.2);
}
.is-violet .icon {
  color: rgb(196 181 253);
}
.is-amber {
  border: 2px solid rgb(146 64 14);
  background: rgb(146 64 14 / 0.2);
}
.is-amber .icon {
  color: rgb(252 211 77);
}
</style>
