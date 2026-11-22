<script setup lang="ts">
import { computed, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{ src: string, alt?: string }>()

// Public assets referenced with a root-absolute path (`/foo.png`) are NOT
// automatically prefixed with the deploy base by Vite when used in raw
// `src`/`:src` bindings. Prepend `import.meta.env.BASE_URL` (which is `/`
// locally and `/martin-sveda/slidev-presentations/<deck>/` on GitHub
// Pages) so images resolve correctly in both environments.
const resolvedSrc = computed(() =>
  props.src.startsWith('/')
    ? `${import.meta.env.BASE_URL}${props.src.replace(/^\/+/, '')}`
    : props.src,
)

const zoomed = ref(false)
</script>

<template>
  <div inline-block>
    <img
      :src="resolvedSrc"
      :alt="props.alt"
      v-bind="$attrs"
      cursor-zoom-in transition duration-300 hover:opacity-90
      @click="zoomed = true"
    >

    <Teleport to="body">
      <Transition name="zoom-fade">
        <div
          v-if="zoomed"
          fixed inset-0 z-100 flex items-center justify-center bg="black/80" cursor-zoom-out p-10
          @click="zoomed = false"
        >
          <img
            :src="resolvedSrc" :alt="props.alt"
            max-w="90vw" max-h="90vh" rounded-lg border="2 solid white/20" shadow-2xl
          >
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.zoom-fade-enter-active,
.zoom-fade-leave-active {
  transition: opacity 0.25s ease;
}
.zoom-fade-enter-active img,
.zoom-fade-leave-active img {
  transition: transform 0.25s ease;
}
.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
}
.zoom-fade-enter-from img,
.zoom-fade-leave-to img {
  transform: scale(0.85);
}
</style>
