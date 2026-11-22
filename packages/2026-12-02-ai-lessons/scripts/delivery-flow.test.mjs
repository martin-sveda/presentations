// SPDX-License-Identifier: MIT
/* eslint test/no-import-node-test: off */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { advanceFlow, emptyFlow, FLOW_PRESETS, flowRates, simulateFlow } from '../components/delivery-flow/deliveryFlowModel.ts'

test('presets distinguish faster coding, improved delivery, and intent starvation', () => {
  const [baseline, faster, downstream, intent] = FLOW_PRESETS.map(preset => simulateFlow(preset))
  assert.equal(baseline.delivered, 24)
  assert.equal(baseline.readyQueue, 72)
  assert.equal(faster.delivered, 40)
  assert.equal(faster.reviewQueue, 48)
  assert.equal(faster.shipQueue, 8)
  assert.equal(downstream.delivered, 96)
  assert.equal(downstream.readyQueue + downstream.reviewQueue + downstream.shipQueue, 0)
  assert.equal(intent.delivered, 32)
  assert.equal(intent.readyQueue + intent.reviewQueue + intent.shipQueue, 0)
  assert.deepEqual(flowRates(FLOW_PRESETS[3]).passing, [4, 4, 4, 4])
  assert.deepEqual(flowRates(FLOW_PRESETS[3]).constraints, [0])
})

test('work is conserved and capacity is respected across all slider combinations', () => {
  for (let intent = 2; intent <= 16; intent++) {
    for (let speed = 1; speed <= 4; speed++) {
      for (let review = 2; review <= 16; review++) {
        for (let ship = 2; ship <= 16; ship++) {
          const settings = { intent, speed, review, ship }
          let state = emptyFlow()
          for (let day = 1; day <= 8; day++) {
            state = advanceFlow(state, settings)
            assert.equal(state.day, day)
            assert.equal(state.clarified, state.delivered + state.readyQueue + state.reviewQueue + state.shipQueue)
            assert.ok(state.readyQueue >= 0 && state.reviewQueue >= 0 && state.shipQueue >= 0)
            assert.ok(state.processed.every((count, index) => count <= flowRates(settings).capacities[index]))
          }
        }
      }
    }
  }
})

test('capacity improvements drain existing queues without discarding work', () => {
  const queued = simulateFlow(FLOW_PRESETS[1], 2)
  const improved = advanceFlow(queued, { intent: 4, speed: 4, review: 16, ship: 16 })
  assert.equal(improved.clarified, queued.clarified + 4)
  assert.equal(improved.reviewQueue, 0)
  assert.equal(improved.shipQueue, 2)
  assert.equal(improved.delivered, queued.delivered + 16)
  const drained = advanceFlow(improved, { intent: 4, speed: 4, review: 16, ship: 16 })
  assert.equal(drained.shipQueue, 0)
  assert.equal(drained.processed[3], 6)
})

test('an intent constraint starves coding only after ready work is consumed', () => {
  const buffered = simulateFlow(FLOW_PRESETS[0], 1)
  assert.equal(buffered.readyQueue, 9)
  const settings = FLOW_PRESETS[3]
  const first = advanceFlow(buffered, settings)
  assert.equal(first.processed[1], 12)
  assert.equal(first.readyQueue, 1)
  const second = advanceFlow(first, settings)
  assert.equal(second.processed[1], 5)
  const third = advanceFlow(second, settings)
  assert.equal(third.processed[1], 4)
})
