// SPDX-License-Identifier: MIT
/* eslint test/no-import-node-test: off */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { advance, initialSnapshot, PRESETS, rates, simulate } from '../components/bottleneck/model.ts'

test('faster coding grows queues unless downstream capacity also grows', () => {
  const baseline = simulate(PRESETS[0])
  const faster = simulate(PRESETS[1])
  const balanced = simulate(PRESETS[2])
  assert.equal(baseline.delivered, 24)
  assert.equal(faster.delivered, 40)
  assert.equal(faster.reviewQueue, 48)
  assert.equal(faster.shipQueue, 8)
  assert.equal(balanced.delivered, 96)
  assert.equal(balanced.reviewQueue + balanced.shipQueue, 0)
})

test('each step conserves work across all slider combinations', () => {
  for (let speed = 1; speed <= 4; speed++) {
    for (let review = 2; review <= 16; review++) {
      for (let ship = 2; ship <= 16; ship++) {
        const capacity = { speed, review, ship }
        let state = initialSnapshot()
        for (let day = 1; day <= 8; day++) {
          state = advance(state, capacity)
          assert.equal(state.day, day)
          assert.equal(state.created, state.delivered + state.reviewQueue + state.shipQueue)
          assert.ok(state.reviewQueue >= 0 && state.shipQueue >= 0)
          assert.ok(state.reviewedToday <= review && state.shippedToday <= ship)
        }
      }
    }
  }
})

test('existing queues drain when capacity becomes available', () => {
  const congested = simulate(PRESETS[1], 2)
  const drained = advance(congested, { speed: 1, review: 16, ship: 16 })
  assert.equal(drained.reviewQueue, 0)
  assert.equal(drained.shipQueue, 1)
  assert.equal(drained.shippedToday, 16)
  const cleared = advance(drained, { speed: 1, review: 16, ship: 16 })
  assert.equal(cleared.shipQueue, 0)
  assert.equal(cleared.shippedToday, 4)
})

test('all equally limiting stages are identified', () => {
  assert.deepEqual(rates(PRESETS[0]).constraints, [0])
  assert.deepEqual(rates(PRESETS[1]).constraints, [2])
  assert.deepEqual(rates(PRESETS[2]).constraints, [0, 1, 2])
})
