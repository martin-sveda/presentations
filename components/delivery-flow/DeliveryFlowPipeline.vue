<script setup lang="ts">
// SPDX-License-Identifier: MIT
import type { FlowSettings } from './deliveryFlowModel'
import { useIsSlideActive, useNav } from '@slidev/client'
import { computed, onScopeDispose, reactive, shallowRef, watch } from 'vue'
import { advanceFlow, emptyFlow, FLOW_DAYS, FLOW_PRESETS, flowRates, simulateFlow } from './deliveryFlowModel'
import FlowPipelineDiagram from './FlowPipelineDiagram.vue'

const props = defineProps<{ static?: boolean }>()
const active = useIsSlideActive()
const { isPrintMode } = useNav()
const settings = reactive<FlowSettings>({ ...FLOW_PRESETS[0] })
const snapshot = shallowRef(emptyFlow())
const running = shallowRef(false)
const runUntil = shallowRef(FLOW_DAYS)
const staticMode = computed(() => props.static || isPrintMode.value)
const shownSettings = computed(() => staticMode.value ? FLOW_PRESETS[1] : settings)
const shown = computed(() => staticMode.value ? simulateFlow(FLOW_PRESETS[1]) : snapshot.value)
const rate = computed(() => flowRates(shownSettings.value))
const baseline = flowRates(FLOW_PRESETS[0]).throughput
const waiting = computed(() => shown.value.readyQueue + shown.value.reviewQueue + shown.value.shipQueue)
const names = ['Clear intent', 'Coding', 'Review', 'Shipping']
const message = computed(() => {
  if (rate.value.constraints.includes(0) && shownSettings.value.intent < shownSettings.value.speed * 3) {
    if (waiting.value)
      return 'Intent limits steady delivery. Queued work can temporarily keep later stages busy.'
    return 'Not enough clear, ready work: downstream capacity sits idle.'
  }
  if (rate.value.constraints.length === 1 && rate.value.constraints[0] === 1)
    return 'Coding sets the pace today. Speed it up and watch the next constraint.'
  if (rate.value.constraints.length === 4)
    return 'Every stage keeps up. More capacity helps only if the whole flow can use it.'
  return `${rate.value.constraints.map(index => names[index]).join(' + ')} ${rate.value.constraints.length > 1 ? 'set' : 'sets'} the pace. Faster coding alone cannot remove that limit.`
})
const sliders = [
  { key: 'intent', label: 'Clarify intent', min: 2, max: 16, unit: ' ready/day' },
  { key: 'speed', label: 'Coding speed', min: 1, max: 4, unit: '×' },
  { key: 'review', label: 'Review capacity', min: 2, max: 16, unit: '/day' },
  { key: 'ship', label: 'Shipping capacity', min: 2, max: 16, unit: '/day' },
] as const
let timer: ReturnType<typeof setInterval> | undefined

function pause() {
  clearInterval(timer)
  timer = undefined
  running.value = false
}

function reset() {
  pause()
  snapshot.value = emptyFlow()
  runUntil.value = FLOW_DAYS
}

function step() {
  snapshot.value = advanceFlow(snapshot.value, settings)
  if (snapshot.value.day >= runUntil.value)
    pause()
}

function toggleRun() {
  if (running.value) {
    pause()
    return
  }
  if (snapshot.value.day >= runUntil.value)
    reset()
  running.value = true
  timer = setInterval(step, 800)
}

function selectPreset(preset: FlowSettings) {
  pause()
  Object.assign(settings, { intent: preset.intent, speed: preset.speed, review: preset.review, ship: preset.ship })
  reset()
}

// Keep work in progress when capacities change, so the next step can drain a queue.
watch(settings, () => {
  pause()
  if (snapshot.value.day >= runUntil.value)
    runUntil.value = snapshot.value.day + FLOW_DAYS
}, { flush: 'sync' })
watch([active, staticMode], () => {
  if (!active.value || staticMode.value)
    pause()
})
onScopeDispose(pause)
</script>

<template>
  <section class="delivery-flow" aria-label="Delivery flow pipeline" @click.stop @pointerdown.stop @keydown.stop>
    <div class="intro">
      <span>Useful delivery needs clear intent and capacity at every stage.</span>
      <span class="day" data-testid="flow-day">DAY {{ shown.day }} / {{ staticMode ? FLOW_DAYS : runUntil }}</span>
    </div>
    <div v-if="!staticMode" class="presets" role="group" aria-label="Flow scenarios">
      <button
        v-for="preset in FLOW_PRESETS"
        :key="preset.label"
        type="button"
        class="preset"
        :aria-pressed="sliders.every(slider => settings[slider.key] === preset[slider.key])"
        @click="selectPreset(preset)"
      >
        {{ preset.label }}
      </button>
    </div>
    <div v-else class="static-caption">
      4× faster coding, unchanged downstream capacity
    </div>

    <FlowPipelineDiagram :settings="shownSettings" :snapshot="shown" :moving="running && active && !staticMode" :baseline="baseline" />

    <div v-if="!staticMode" class="sliders" role="group" aria-label="Pipeline capacities">
      <label v-for="slider in sliders" :key="slider.key" class="slider-label">
        <span>{{ slider.label }}<output>{{ settings[slider.key] }}{{ slider.unit }}</output></span>
        <input v-model.number="settings[slider.key]" type="range" :min="slider.min" :max="slider.max" step="1" :aria-label="slider.label">
      </label>
    </div>
    <div class="summary">
      <div v-if="!staticMode" class="playback" role="group" aria-label="Flow playback">
        <button type="button" class="run" @click="toggleRun">
          {{ running ? 'Pause' : shown.day >= runUntil ? 'Replay' : shown.day ? 'Resume' : 'Run 8 days' }}
        </button>
        <button type="button" class="secondary" :disabled="running || shown.day >= runUntil" @click="step">
          +1 day
        </button>
        <button type="button" class="secondary" @click="reset">
          Reset
        </button>
      </div>
      <div class="metrics" role="status" aria-live="polite" aria-atomic="true">
        <span><strong data-testid="flow-delivered">{{ shown.delivered }}</strong> delivered</span>
        <span><strong class="waiting" data-testid="flow-waiting">{{ waiting }}</strong> waiting</span>
        <span class="actual">{{ shown.processed[3] }} shipped last day</span>
      </div>
    </div>
    <div class="takeaway">
      {{ message }}
    </div>
    <div class="footnote">
      <span>Intent = clear outcome + acceptance criteria. Sliders pause, keeping queues; scenarios restart.</span>
      <span>Illustrative · MIT</span>
    </div>
  </section>
</template>

<style scoped>
.delivery-flow {
  --flow-accent: var(--siemens-bright-green, #00ffb9);
  --flow-petrol: var(--siemens-bright-petrol, #00cccc);
  --flow-warning: var(--siemens-yellow, #ffd732);
  --flow-muted: #ffffff90;
  display: grid;
  gap: 8px;
  color: #f5f5f5;
  font-family: inherit;
}
.intro, .summary, .metrics, .footnote { display: flex; align-items: center; justify-content: space-between; }
.intro { font-size: 14px; color: #ffffffb0; }
.day { font: 10px monospace; color: var(--flow-petrol); }
.presets, .playback { display: flex; gap: 7px; }
.preset, .secondary, .run { font: inherit; font-size: 11px; line-height: 1; padding: 8px 11px; border-radius: 6px; cursor: pointer; }
.preset, .secondary { color: #ffffffb0; background: #ffffff06; border: 1px solid #ffffff28; }
.preset[aria-pressed='true'] { color: var(--flow-accent); border-color: var(--flow-accent); background: #00ffb912; }
.preset:hover, .secondary:hover { background: #ffffff15; color: white; }
.run { color: #000028; background: var(--flow-accent); border: 1px solid var(--flow-accent); min-width: 90px; font-weight: 600; }
.run:hover { background: #7dffdc; }
.secondary:disabled { opacity: 0.35; cursor: default; }
.delivery-flow button:focus-visible, .slider-label input:focus-visible { outline: 2px solid var(--flow-accent); outline-offset: 3px; }
.sliders { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.slider-label { display: grid; gap: 4px; color: var(--flow-muted); font-size: 10px; }
.slider-label > span { display: flex; justify-content: space-between; }
.slider-label output { color: var(--flow-accent); font-variant-numeric: tabular-nums; }
.slider-label input { width: 100%; height: 18px; margin: 0; accent-color: var(--flow-accent); cursor: pointer; }
.metrics { justify-content: start; gap: 16px; color: var(--flow-muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.metrics strong { color: var(--flow-accent); font-size: 23px; margin-right: 3px; font-weight: 600; }
.metrics .waiting { color: var(--flow-warning); }
.actual { font-size: 10px; color: #ffffff70; }
.takeaway { padding-top: 8px; border-top: 1px solid #ffffff20; color: var(--flow-accent); font-size: 13px; }
.footnote { font-size: 9px; color: #ffffff60; gap: 10px; }
.static-caption { font-size: 12px; color: var(--flow-petrol); }
</style>
