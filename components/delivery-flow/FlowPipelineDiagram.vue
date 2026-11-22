<script setup lang="ts">
// SPDX-License-Identifier: MIT
import type { FlowSettings, FlowSnapshot } from './deliveryFlowModel'
import { computed } from 'vue'
import { advanceFlow, flowRates } from './deliveryFlowModel'

const props = defineProps<{
  settings: FlowSettings
  snapshot: FlowSnapshot
  moving: boolean
  baseline: number
}>()

const names = ['Clarify intent', 'Code', 'Review', 'Ship']
const center = 95
const width = 126
const half = (capacity: number) => capacity * 2.5
const gaugeWidth = 92
const rate = computed(() => flowRates(props.settings))
const stages = computed(() => {
  const queues = [0, props.snapshot.readyQueue, props.snapshot.reviewQueue, props.snapshot.shipQueue]
  const nextDay = advanceFlow(props.snapshot, props.settings)
  return rate.value.capacities.map((capacity, index) => {
    const passing = nextDay.processed[index]
    return {
      name: names[index],
      x: 24 + index * 184,
      capacity,
      passing,
      constrained: rate.value.constraints.includes(index),
      unused: capacity - passing,
      queue: queues[index],
      tiles: Math.min(queues[index], 12),
      packets: Array.from({ length: passing }, (_, packet) => ({
        y: center - 2 + ((packet % 3) - 1) * Math.max(0, half(passing) - 5) * 0.6,
        delay: `${-packet / passing * 0.8}s`,
        restOffset: `${(packet + 0.5) / passing * 103}px`,
      })),
    }
  })
})
const description = computed(() => [
  'Delivery pipeline. Width is capacity; green tiles preview the next day of processing.',
  ...stages.value.map(stage => `${stage.name}: capacity ${stage.capacity}, next-day flow ${stage.passing}, ${stage.queue} waiting before this stage.`),
  `Steady output ${rate.value.throughput} per day; baseline ${props.baseline}.`,
].join(' '))

const connectors = computed(() => stages.value.slice(1).map((next, index) => {
  const previous = stages.value[index]
  const start = previous.x + width
  const end = next.x
  const middle = (start + end) / 2
  const topStart = center - half(previous.capacity)
  const topEnd = center - half(next.capacity)
  const bottomStart = center + half(previous.capacity)
  const bottomEnd = center + half(next.capacity)
  return `M${start},${topStart} C${middle},${topStart} ${middle},${topEnd} ${end},${topEnd}
    L${end},${bottomEnd} C${middle},${bottomEnd} ${middle},${bottomStart} ${start},${bottomStart} Z`
}))
</script>

<template>
  <svg class="pipeline" :class="{ moving }" viewBox="0 0 900 216" role="img" :aria-label="description">
    <path v-for="(connector, index) in connectors" :key="index" class="connector" :d="connector" />
    <path class="outlet" d="M702 95 H749 M743 90 L749 95 L743 100" />
    <g v-for="(stage, index) in stages" :key="stage.name" :data-stage="index" :class="{ constrained: stage.constrained, underfed: stage.unused > 0 }">
      <text class="stage-name" :x="stage.x + width / 2" y="19">{{ stage.name }}</text>
      <text class="capacity-label" :x="stage.x + width / 2" y="36">{{ stage.capacity }} {{ index === 0 ? 'ready changes' : 'changes' }}/day</text>
      <text v-if="stage.constrained" class="limit-label" :x="stage.x + width / 2" y="49">LIMIT</text>
      <rect
        class="pipe-wall"
        :x="stage.x"
        :y="center - half(stage.capacity)"
        :width="width"
        :height="stage.capacity * 5"
        rx="7"
      />
      <rect class="flow-band" :x="stage.x + 2" :y="center - half(stage.passing) + 2" :width="width - 4" :height="Math.max(0, stage.passing * 5 - 4)" rx="4" />
      <rect
        v-for="(packet, packetIndex) in stage.packets"
        :key="packetIndex"
        class="packet"
        :class="{ invisible: !moving && !snapshot.day }"
        :x="stage.x + 10"
        :y="packet.y"
        width="5"
        height="4"
        rx="1"
        :style="{ 'animationDelay': packet.delay, '--rest-offset': packet.restOffset }"
      />
      <text class="passing-label" :x="stage.x + width / 2" y="153">{{ stage.passing }} next day</text>
      <text v-if="stage.unused" class="unused-label" :x="stage.x + width / 2" y="169">{{ stage.unused }}/day spare capacity</text>
      <g v-if="index > 0 && stage.queue > 0" class="queue-pocket" :data-queue="index">
        <path class="queue-tether" :d="`M${stage.x - 29} 99 V140`" />
        <rect class="pocket-wall" :x="stage.x - 53" y="141" width="48" height="39" rx="6" />
        <rect
          v-for="tile in stage.tiles"
          :key="tile"
          class="queued-tile"
          :x="stage.x - 46 + ((tile - 1) % 4) * 9"
          :y="148 + Math.floor((tile - 1) / 4) * 9"
          width="6"
          height="6"
          rx="1"
        />
        <text class="queue-count" :x="stage.x - 29" y="194">{{ stage.queue }} waiting</text>
      </g>
    </g>

    <g class="output-gauge" transform="translate(776 0)">
      <text class="gauge-title" x="0" y="45">Steady output</text>
      <text class="gauge-number" x="0" y="77" data-testid="flow-rate">{{ rate.throughput }}<tspan class="gauge-unit"> /day</tspan></text>
      <rect class="gauge-track" x="0" y="91" :width="gaugeWidth" height="13" rx="3" />
      <rect class="gauge-bar" x="0" y="91" :width="gaugeWidth * rate.throughput / 16" height="13" rx="3" />
      <path class="baseline-marker" :d="`M${gaugeWidth * baseline / 16} 86 V111`" />
      <text class="baseline-label" x="0" y="129">┆ baseline {{ baseline }}/day</text>
      <text class="gauge-explanation" x="0" y="153">Useful delivery,</text>
      <text class="gauge-explanation" x="0" y="167">not code volume.</text>
    </g>

    <text class="legend" x="24" y="213">WIDTH = CAPACITY · GREEN = NEXT-DAY FLOW · YELLOW POCKETS = WAITING WORK (COUNTS ARE EXACT)</text>
  </svg>
</template>

<style scoped>
.pipeline { display: block; width: 100%; overflow: visible; font-family: inherit; }
.stage-name { fill: #f5f5f5; font-size: 16px; font-weight: 600; text-anchor: middle; }
.capacity-label { fill: var(--flow-muted); font-size: 10px; text-anchor: middle; }
.limit-label { fill: var(--flow-warning); font: 9px monospace; letter-spacing: 0.1em; text-anchor: middle; }
.pipe-wall { fill: #00cccc09; stroke: var(--flow-petrol); stroke-width: 1.5; transition: y 300ms, height 300ms; }
.constrained .pipe-wall { stroke: var(--flow-warning); stroke-width: 2; }
.underfed .pipe-wall { stroke-dasharray: 4 3; }
.flow-band { fill: #00ffb91c; transition: y 300ms, height 300ms; }
.connector { fill: #00cccc08; stroke: #00cccc50; stroke-width: 1; transition: d 300ms; }
.outlet { fill: none; stroke: var(--flow-petrol); stroke-width: 1.5; }
.packet { fill: var(--flow-accent); animation: flow-packet 800ms linear infinite; animation-play-state: paused; }
.moving .packet { animation-play-state: running; }
.invisible { visibility: hidden; }
.passing-label { fill: var(--flow-accent); font-size: 10px; text-anchor: middle; }
.unused-label { fill: #ffffff60; font-size: 9px; text-anchor: middle; }
.queue-tether { stroke: var(--flow-warning); stroke-dasharray: 2 3; opacity: 0.6; }
.pocket-wall { fill: #000028cc; stroke: #ffd73260; }
.queued-tile { fill: var(--flow-warning); }
.queue-count { fill: var(--flow-warning); font-size: 9px; text-anchor: middle; font-weight: 600; }
.gauge-title { fill: #ffffffb0; font-size: 12px; }
.gauge-number { fill: var(--flow-accent); font-size: 29px; font-variant-numeric: tabular-nums; }
.gauge-unit { fill: var(--flow-muted); font-size: 12px; }
.gauge-track { fill: #ffffff16; }
.gauge-bar { fill: var(--flow-accent); transition: width 300ms; }
.baseline-marker { stroke: #ffffffa0; stroke-width: 2; stroke-dasharray: 3 2; }
.baseline-label { fill: #ffffff80; font-size: 10px; }
.gauge-explanation { fill: #ffffff70; font-size: 10px; }
.legend { fill: #ffffff50; font: 8px monospace; letter-spacing: 0.03em; }
@keyframes flow-packet {
  0% { transform: translateX(0); opacity: 0; }
  12%, 85% { opacity: 1; }
  100% { transform: translateX(103px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .packet { animation: none; opacity: 0.8; transform: translateX(var(--rest-offset)); }
  .pipe-wall, .flow-band, .gauge-bar, .connector { transition: none; }
}
@media print {
  .packet { animation: none; opacity: 0.8; transform: translateX(var(--rest-offset)); }
  .pipe-wall, .flow-band, .gauge-bar, .connector { transition: none; }
}
</style>
