<script setup lang="ts">
// SPDX-License-Identifier: MIT
import type { Capacity } from './model'
import { useIsSlideActive, useNav } from '@slidev/client'
import { computed, onScopeDispose, reactive, shallowRef, watch } from 'vue'
import BottleneckBoard from './BottleneckBoard.vue'
import { advance, DAYS, initialSnapshot, PRESETS, rates, simulate } from './model'

const active = useIsSlideActive()
const { isPrintMode } = useNav()
const capacity = reactive<Capacity>({ ...PRESETS[0] })
const snapshot = shallowRef(initialSnapshot())
const running = shallowRef(false)
let timer: ReturnType<typeof setInterval> | undefined

const shownCapacity = computed(() => isPrintMode.value ? PRESETS[1] : capacity)
const shown = computed(() => isPrintMode.value ? simulate(PRESETS[1]) : snapshot.value)
const rate = computed(() => rates(shownCapacity.value))
const waiting = computed(() => shown.value.reviewQueue + shown.value.shipQueue)
const limit = computed(() => rate.value.constraints.map(index => ['Coding', 'Review', 'Shipping'][index]).join(' + '))
const sliders = [
  { key: 'speed', label: 'Coding speed', min: 1, max: 4 },
  { key: 'review', label: 'Review capacity', min: 2, max: 16 },
  { key: 'ship', label: 'Shipping capacity', min: 2, max: 16 },
] as const

function pause() {
  clearInterval(timer)
  timer = undefined
  running.value = false
}

function reset() {
  pause()
  snapshot.value = initialSnapshot()
}

function step() {
  snapshot.value = advance(snapshot.value, capacity)
  if (snapshot.value.day >= DAYS)
    pause()
}

function toggleRun() {
  if (running.value) {
    pause()
    return
  }
  if (snapshot.value.day >= DAYS)
    reset()
  running.value = true
  timer = setInterval(step, 650)
}

function selectPreset(preset: Capacity) {
  Object.assign(capacity, { speed: preset.speed, review: preset.review, ship: preset.ship })
  reset()
}

watch(capacity, reset, { flush: 'sync' })
watch(active, (value) => {
  if (!value)
    pause()
})
watch(isPrintMode, pause)
onScopeDispose(pause)
</script>

<template>
  <section class="bottleneck" :class="{ 'export-view': isPrintMode }" aria-label="Bottleneck simulation" @click.stop @pointerdown.stop @keydown.stop>
    <div class="intro-line">
      <span>More code is not the same as more delivered value.</span>
      <span class="day-label" data-testid="simulation-day">DAY {{ shown.day }} / {{ DAYS }}</span>
    </div>

    <div v-if="!isPrintMode" class="preset-row" role="group" aria-label="Scenarios">
      <button
        v-for="preset in PRESETS"
        :key="preset.label"
        type="button"
        class="preset"
        :aria-pressed="capacity.speed === preset.speed && capacity.review === preset.review && capacity.ship === preset.ship"
        @click="selectPreset(preset)"
      >
        {{ preset.label }}
      </button>
      <span class="preset-note">Choose a scenario, then run</span>
    </div>
    <div v-else class="print-caption">
      Faster coding scenario: 4× coding, unchanged downstream capacity
    </div>

    <BottleneckBoard :capacity="shownCapacity" :snapshot="shown" :moving="running && active && !isPrintMode" />

    <div v-if="!isPrintMode" class="sliders" role="group" aria-label="Stage capacities">
      <label v-for="slider in sliders" :key="slider.key" class="slider-label">
        <span>{{ slider.label }}<output>{{ capacity[slider.key] }}{{ slider.key === 'speed' ? '×' : '/day' }}</output></span>
        <input v-model.number="capacity[slider.key]" type="range" :min="slider.min" :max="slider.max" step="1" :aria-label="slider.label">
      </label>
    </div>

    <div class="summary-row">
      <div v-if="!isPrintMode" class="playback" role="group" aria-label="Simulation playback">
        <button type="button" class="run-button" @click="toggleRun">
          {{ running ? 'Pause' : shown.day >= DAYS ? 'Replay' : 'Run 8 days' }}
        </button>
        <button type="button" class="secondary-button" :disabled="running || shown.day >= DAYS" @click="step">
          +1 day
        </button>
        <button type="button" class="secondary-button" @click="reset">
          Reset
        </button>
      </div>
      <div class="metrics" role="status" aria-live="polite" aria-atomic="true">
        <span><strong data-testid="delivered">{{ shown.delivered }}</strong> delivered</span>
        <span><strong class="waiting-number" data-testid="waiting">{{ waiting }}</strong> waiting</span>
        <span class="rate"><strong>{{ rate.throughput }}</strong> / day possible</span>
      </div>
    </div>
    <div class="takeaway">
      <span><strong>{{ limit }}</strong> {{ rate.constraints.length > 1 ? 'share the limit' : 'sets the pace' }}. Improve the whole flow.</span>
      <span class="model-note">Illustrative model · MIT</span>
    </div>
  </section>
</template>

<style scoped>
.bottleneck {
  --flow-accent: var(--siemens-bright-green, #00ffb9);
  --flow-petrol: var(--siemens-bright-petrol, #00cccc);
  --flow-warning: var(--siemens-yellow, #ffd732);
  --flow-muted: #ffffff90;
  display: grid;
  gap: 12px;
  color: #f5f5f5;
  font-family: inherit;
}
.intro-line, .preset-row, .summary-row, .metrics, .takeaway { display: flex; align-items: center; justify-content: space-between; }
.intro-line { color: #ffffffb0; font-size: 16px; margin-bottom: 2px; }
.day-label { color: var(--flow-petrol); font: 11px monospace; }
.preset-row { justify-content: start; gap: 8px; }
.preset, .secondary-button, .run-button { font-family: inherit; cursor: pointer; border-radius: 6px; font-size: 12px; line-height: 1; padding: 8px 12px; transition: background 150ms; }
.preset, .secondary-button { background: #ffffff06; border: 1px solid #ffffff28; color: #ffffffb0; }
.preset[aria-pressed='true'] { border-color: var(--flow-accent); background: #00ffb915; color: var(--flow-accent); }
.preset:hover, .secondary-button:hover { background: #ffffff15; color: white; }
.preset-note { margin-left: auto; font-size: 10px; color: var(--flow-muted); }
.sliders { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.slider-label { display: grid; gap: 4px; color: var(--flow-muted); font-size: 11px; }
.slider-label > span { display: flex; justify-content: space-between; }
.slider-label output { color: var(--flow-accent); font-variant-numeric: tabular-nums; }
.slider-label input { width: 100%; height: 18px; margin: 0; accent-color: var(--flow-accent); cursor: pointer; }
.playback { display: flex; gap: 6px; }
.run-button { background: var(--flow-accent); color: #000028; border: 1px solid var(--flow-accent); font-weight: 650; min-width: 90px; }
.run-button:hover { background: #7dffdc; }
.secondary-button:disabled { opacity: 0.35; cursor: default; }
.bottleneck button:focus-visible, .slider-label input:focus-visible { outline: 2px solid var(--flow-accent); outline-offset: 3px; }
.metrics { gap: 16px; color: var(--flow-muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.metrics strong { color: var(--flow-accent); font-size: 23px; margin-right: 3px; font-weight: 600; }
.metrics .waiting-number { color: var(--flow-warning); }
.metrics .rate strong { font-size: 16px; }
.takeaway { border-top: 1px solid #ffffff20; padding-top: 10px; font-size: 13px; color: #ffffffb0; }
.takeaway strong { color: var(--flow-accent); }
.model-note { color: #ffffff50; font-size: 10px; }
.print-caption { font-size: 12px; color: var(--flow-petrol); }
.export-view { gap: 18px; }
.export-view .metrics { width: 100%; justify-content: start; gap: 35px; }
</style>
