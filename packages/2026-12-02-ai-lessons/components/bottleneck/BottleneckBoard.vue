<script setup lang="ts">
// SPDX-License-Identifier: MIT
import type { Capacity, Snapshot } from './model'
import { computed } from 'vue'
import { rates } from './model'

const props = defineProps<{
  capacity: Capacity
  snapshot: Snapshot
  moving: boolean
}>()

const stages = computed(() => {
  const rate = rates(props.capacity)
  return [
    { name: 'Code', verb: 'created today', icon: '</>', capacity: rate.code, done: props.snapshot.day ? rate.code : 0, queue: 0 },
    { name: 'Review', verb: 'reviewed today', icon: '✓', capacity: props.capacity.review, done: props.snapshot.reviewedToday, queue: props.snapshot.reviewQueue },
    { name: 'Ship', verb: 'delivered today', icon: '↗', capacity: props.capacity.ship, done: props.snapshot.shippedToday, queue: props.snapshot.shipQueue },
  ].map((stage, index) => ({
    ...stage,
    constrained: rate.constraints.includes(index),
    tiles: Math.min(stage.queue, 18),
  }))
})
</script>

<template>
  <div class="flow-board" :class="{ moving }" aria-label="Delivery pipeline">
    <article v-for="(stage, index) in stages" :key="stage.name" class="station" :class="{ constrained: stage.constrained }">
      <header class="station-header">
        <span class="station-name"><span class="station-icon" aria-hidden="true">{{ stage.icon }}</span>{{ stage.name }}</span>
        <span class="constraint">{{ stage.constrained ? 'LIMIT' : `${stage.capacity}/day` }}</span>
      </header>
      <div class="capacity-line">
        <span>{{ stage.capacity }} changes / day</span>
        <span class="station-number">{{ stage.done }}</span>
      </div>
      <div class="capacity-track" aria-hidden="true">
        <span :style="{ width: `${stage.capacity / 16 * 100}%` }" />
      </div>
      <div class="station-caption">
        {{ stage.verb }}
      </div>
      <div class="queue-label">
        <span>{{ index === 0 ? 'Ready work assumed' : 'Waiting at this stage' }}</span>
        <strong v-if="index !== 0" :class="{ 'has-queue': stage.queue > 0 }" :data-queue="index === 1 ? 'review' : 'ship'">{{ stage.queue }}</strong>
        <span v-else aria-hidden="true">∞</span>
      </div>
      <div class="queue-tray" aria-hidden="true">
        <span v-for="tile in stage.tiles" :key="tile" class="work-item" :style="{ animationDelay: `${(tile % 6) * 25}ms` }" />
        <span v-if="stage.queue > 18" class="queue-extra">+{{ stage.queue - 18 }}</span>
        <span v-if="!stage.queue" class="empty-queue">{{ index === 0 ? 'Demand is not the constraint' : 'No queue' }}</span>
      </div>
      <span v-if="index < 2" class="handoff" aria-hidden="true"><span />→</span>
    </article>
  </div>
</template>

<style scoped>
.flow-board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
.station {
  position: relative;
  padding: 12px 14px;
  border: 1px solid #ffffff24;
  border-radius: 12px;
  background: #00002875;
}
.constrained {
  border-color: var(--flow-warning);
  background: linear-gradient(145deg, #ffd7320d, #00002885);
}
.station-header,
.station-name,
.capacity-line,
.queue-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.station-header { height: 24px; }
.station-name { justify-content: start; gap: 8px; font-size: 19px; font-weight: 650; }
.station-icon { color: var(--flow-accent); font: 16px monospace; }
.constraint { color: var(--flow-muted); font: 10px monospace; letter-spacing: 0.06em; }
.constrained .constraint { color: var(--flow-warning); }
.capacity-line { margin-top: 10px; font-size: 11px; color: var(--flow-muted); }
.station-number { color: var(--flow-accent); font-size: 28px; line-height: 1; font-variant-numeric: tabular-nums; }
.capacity-track { height: 4px; background: #ffffff10; border-radius: 4px; margin-top: 6px; }
.capacity-track span { display: block; height: 100%; background: var(--flow-petrol); border-radius: inherit; transition: width 180ms; }
.constrained .capacity-track span { background: var(--flow-warning); }
.station-caption { text-align: right; color: var(--flow-muted); font-size: 10px; margin: 3px 0 10px; }
.queue-label { border-top: 1px solid #ffffff13; padding-top: 7px; color: var(--flow-muted); font-size: 10px; }
.queue-label strong { font-size: 16px; color: var(--flow-accent); line-height: 1; }
.queue-label .has-queue { color: var(--flow-warning); }
.queue-tray { display: flex; align-items: center; flex-wrap: wrap; align-content: center; gap: 4px; height: 32px; padding-top: 5px; }
.work-item { width: 10px; height: 10px; background: var(--flow-warning); border-radius: 2px; animation: tile-in 180ms backwards; }
.queue-extra { font-size: 10px; color: var(--flow-warning); }
.empty-queue { font-size: 10px; color: #ffffff50; }
.handoff { position: absolute; right: -24px; top: 67px; width: 23px; text-align: center; color: var(--flow-petrol); font-size: 19px; }
.handoff span { position: absolute; top: 12px; left: 0; width: 5px; height: 5px; background: var(--flow-accent); border-radius: 1px; opacity: 0; }
.moving .handoff span { animation: transfer 650ms linear infinite; }
@keyframes transfer {
  0% { transform: translateX(0) rotate(45deg); opacity: 0; }
  30%, 70% { opacity: 1; }
  100% { transform: translateX(20px) rotate(45deg); opacity: 0; }
}
@keyframes tile-in {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .work-item, .moving .handoff span { animation: none; }
  .capacity-track span { transition: none; }
}
@media print {
  .work-item, .moving .handoff span { animation: none; }
}
</style>
