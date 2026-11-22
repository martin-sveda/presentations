<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'

interface Ghost {
  id: number
  name: string
  color: string
  x: number
  y: number
  dx: number
  dy: number
  turnIn: number
  size: number
  direction: 'left' | 'right'
  appearedAt: number
  opacity: number
}

const props = withDefaults(defineProps<{
  initialCount?: number
  maxCount?: number
  initialDelay?: number
  appearanceInterval?: number
  fadeInDuration?: number
  movementSpeed?: number
  size?: number
}>(), {
  initialCount: 2,
  maxCount: 8,
  initialDelay: 3000,
  appearanceInterval: 2200,
  fadeInDuration: 1000,
  movementSpeed: 42,
  size: 44,
})

const root = shallowRef<HTMLElement | null>(null)
const ghosts = shallowRef<Ghost[]>([])

let nextId = 0
let initialTimer: number | undefined
let appearanceTimer: number | undefined
let animationFrame: number | undefined
let previousTime = 0

const ghostTypes = [
  { name: 'Blinky', color: '#ff4d6d' },
  { name: 'Pinky', color: '#ff79c6' },
  { name: 'Inky', color: '#51e6d8' },
  { name: 'Clyde', color: '#ffb454' },
]

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function findSpawnPosition(size: number) {
  const width = root.value?.clientWidth ?? 1280
  const height = root.value?.clientHeight ?? 720
  const topPadding = height > 200 ? 170 : 8
  const maxX = Math.max(8, width - size - 8)
  const maxY = Math.max(topPadding, height - size - 8)
  const minimumDistance = size * 1.35

  for (let attempt = 0; attempt < 30; attempt++) {
    const x = randomBetween(8, maxX)
    const y = randomBetween(topPadding, maxY)
    const isSeparated = ghosts.value.every((ghost) => {
      const dx = ghost.x - x
      const dy = ghost.y - y
      return Math.hypot(dx, dy) >= minimumDistance
    })

    if (isSeparated)
      return { x, y }
  }

  const columns = Math.max(1, Math.floor((width - 16) / (size * 1.5)))
  const rows = Math.max(1, Math.ceil(maxCountOrGhostCount() / columns))
  const index = ghosts.value.length
  const column = index % columns
  const row = Math.floor(index / columns) % rows

  return {
    x: 8 + column * ((width - size - 16) / columns),
    y: topPadding + row * ((maxY - topPadding) / rows),
  }
}

function maxCountOrGhostCount() {
  return Math.max(props.maxCount, ghosts.value.length + 1)
}

function createGhost(index: number): Ghost {
  const size = props.size
  const angle = randomBetween(0, Math.PI * 2)
  const speed = props.movementSpeed * randomBetween(0.75, 1.25)
  const type = ghostTypes[index % ghostTypes.length]
  const position = findSpawnPosition(size)

  return {
    id: nextId++,
    name: type.name,
    color: type.color,
    x: position.x,
    y: position.y,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    turnIn: randomBetween(0.8, 2.4),
    size,
    direction: Math.cos(angle) >= 0 ? 'right' : 'left',
    appearedAt: performance.now(),
    opacity: 0,
  }
}

function stopTimers() {
  if (initialTimer !== undefined)
    window.clearTimeout(initialTimer)
  if (appearanceTimer !== undefined)
    window.clearInterval(appearanceTimer)
  if (animationFrame !== undefined)
    window.cancelAnimationFrame(animationFrame)

  appearanceTimer = undefined
  initialTimer = undefined
  animationFrame = undefined
  previousTime = 0
}

function addGhost() {
  const maxCount = Math.max(0, Math.floor(props.maxCount))
  if (ghosts.value.length >= maxCount)
    return

  ghosts.value = [
    ...ghosts.value,
    createGhost(ghosts.value.length),
  ]
}

function retargetGhost(ghost: Ghost) {
  const angle = randomBetween(0, Math.PI * 2)
  const speed = props.movementSpeed * randomBetween(0.75, 1.25)
  ghost.dx = Math.cos(angle) * speed
  ghost.dy = Math.sin(angle) * speed
  ghost.direction = ghost.dx >= 0 ? 'right' : 'left'
  ghost.turnIn = randomBetween(0.8, 2.4)
}

function animate(time: number) {
  if (!previousTime)
    previousTime = time

  const elapsedSeconds = Math.min((time - previousTime) / 1000, 0.05)
  previousTime = time

  const width = root.value?.clientWidth ?? 1280
  const height = root.value?.clientHeight ?? 720
  const topPadding = height > 200 ? 170 : 8
  const nextGhosts = ghosts.value.map((ghost) => {
    const copy = { ...ghost }
    const fadeInDuration = Math.max(0, props.fadeInDuration)
    copy.opacity = fadeInDuration === 0
      ? 1
      : Math.min(1, Math.max(0, (time - copy.appearedAt) / fadeInDuration))
    copy.turnIn -= elapsedSeconds

    if (copy.turnIn <= 0)
      retargetGhost(copy)

    copy.x += copy.dx * elapsedSeconds
    copy.y += copy.dy * elapsedSeconds

    if (copy.x <= 0 || copy.x >= width - copy.size) {
      copy.x = Math.max(0, Math.min(copy.x, width - copy.size))
      copy.dx *= -1
      copy.direction = copy.dx >= 0 ? 'right' : 'left'
      copy.turnIn = randomBetween(0.8, 2.4)
    }

    if (copy.y <= topPadding || copy.y >= height - copy.size) {
      copy.y = Math.max(topPadding, Math.min(copy.y, height - copy.size))
      copy.dy *= -1
      copy.turnIn = randomBetween(0.8, 2.4)
    }

    return copy
  })

  ghosts.value = nextGhosts
  animationFrame = window.requestAnimationFrame(animate)
}

function start() {
  stopTimers()

  const initialCount = Math.max(0, Math.floor(props.initialCount))
  const maxCount = Math.max(0, Math.floor(props.maxCount))
  const startingCount = Math.min(initialCount, maxCount)

  ghosts.value = []

  const beginAppearances = () => {
    for (let index = 0; index < startingCount; index++)
      ghosts.value = [...ghosts.value, createGhost(index)]

    if (startingCount === 0)
      addGhost()

    if (ghosts.value.length < maxCount && props.appearanceInterval > 0) {
      appearanceTimer = window.setInterval(
        addGhost,
        Math.max(100, props.appearanceInterval),
      )
    }
  }

  initialTimer = window.setTimeout(
    beginAppearances,
    Math.max(0, props.initialDelay),
  )

  animationFrame = window.requestAnimationFrame(animate)
}

onMounted(start)

watch(
  () => [
    props.initialCount,
    props.maxCount,
    props.initialDelay,
    props.appearanceInterval,
    props.fadeInDuration,
    props.movementSpeed,
    props.size,
  ],
  start,
)

onBeforeUnmount(stopTimers)
</script>

<template>
  <div ref="root" class="retro-ghosts" aria-hidden="true">
    <div
      v-for="ghost in ghosts"
      :key="ghost.id"
      class="retro-ghost"
      :class="`is-${ghost.direction}`"
      :title="ghost.name"
      :style="{
        'width': `${ghost.size}px`,
        'height': `${ghost.size}px`,
        'transform': `translate3d(${ghost.x}px, ${ghost.y}px, 0)`,
        'opacity': ghost.opacity,
        '--ghost-color': ghost.color,
      }"
    >
      <div class="ghost-body">
        <div class="ghost-eyes">
          <div class="ghost-eye">
            <span />
          </div>
          <div class="ghost-eye">
            <span />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.retro-ghosts {
  position: absolute;
  z-index: 2;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.retro-ghost {
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  image-rendering: pixelated;
  filter: drop-shadow(3px 4px 0 rgb(0 0 0 / 0.28));
}

.ghost-body {
  position: absolute;
  inset: 0;
  background: var(--ghost-color);
  border: 3px solid rgb(0 0 0 / 0.72);
  border-bottom: 0;
  border-radius: 50% 50% 0 0;
  clip-path: polygon(
    0 100%,
    0 43%,
    8% 43%,
    8% 25%,
    18% 25%,
    18% 12%,
    28% 12%,
    28% 5%,
    72% 5%,
    72% 12%,
    82% 12%,
    82% 25%,
    92% 25%,
    92% 43%,
    100% 43%,
    100% 100%,
    84% 86%,
    68% 100%,
    52% 86%,
    36% 100%,
    20% 86%
  );
  animation: ghost-wobble 420ms steps(2, end) infinite;
}

.ghost-eyes {
  position: absolute;
  display: flex;
  gap: 7%;
  left: 20%;
  top: 31%;
  width: 60%;
}

.ghost-eye {
  position: relative;
  width: 42%;
  height: 13px;
  border: 2px solid rgb(0 0 0 / 0.78);
  background: #fff;
  border-radius: 2px;
}

.ghost-eye span {
  position: absolute;
  right: 2px;
  bottom: 1px;
  width: 5px;
  height: 5px;
  background: #172b4d;
  transition: left 180ms steps(2), right 180ms steps(2);
}

.is-left .ghost-eye span {
  right: auto;
  left: 2px;
}

@keyframes ghost-wobble {
  50% {
    transform: translateY(-2px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ghost-body {
    animation: none;
  }
}
</style>
