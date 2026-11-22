// SPDX-License-Identifier: MIT
export interface FlowSettings {
  intent: number
  speed: number
  review: number
  ship: number
}

export interface FlowSnapshot {
  day: number
  clarified: number
  delivered: number
  readyQueue: number
  reviewQueue: number
  shipQueue: number
  processed: [number, number, number, number]
}

export const FLOW_DAYS = 8
export const FLOW_PRESETS = [
  { label: 'Baseline', intent: 12, speed: 1, review: 6, ship: 5 },
  { label: 'Faster coding', intent: 12, speed: 4, review: 6, ship: 5 },
  { label: 'Widen downstream', intent: 12, speed: 4, review: 14, ship: 14 },
  { label: 'Intent is the limit', intent: 4, speed: 4, review: 14, ship: 14 },
] as const

export function emptyFlow(): FlowSnapshot {
  return { day: 0, clarified: 0, delivered: 0, readyQueue: 0, reviewQueue: 0, shipQueue: 0, processed: [0, 0, 0, 0] }
}

export function flowRates(settings: FlowSettings) {
  const capacities = [settings.intent, settings.speed * 3, settings.review, settings.ship]
  let upstream = Number.POSITIVE_INFINITY
  const passing = capacities.map((capacity) => {
    upstream = Math.min(upstream, capacity)
    return upstream
  })
  const throughput = Math.min(...capacities)
  return {
    capacities,
    passing,
    throughput,
    constraints: capacities.flatMap((capacity, index) => capacity === throughput ? [index] : []),
  }
}

export function advanceFlow(previous: FlowSnapshot, settings: FlowSettings): FlowSnapshot {
  const ready = previous.readyQueue + settings.intent
  const coded = Math.min(ready, settings.speed * 3)
  const forReview = previous.reviewQueue + coded
  const reviewed = Math.min(forReview, settings.review)
  const forShipping = previous.shipQueue + reviewed
  const shipped = Math.min(forShipping, settings.ship)
  return {
    day: previous.day + 1,
    clarified: previous.clarified + settings.intent,
    delivered: previous.delivered + shipped,
    readyQueue: ready - coded,
    reviewQueue: forReview - reviewed,
    shipQueue: forShipping - shipped,
    processed: [settings.intent, coded, reviewed, shipped],
  }
}

export function simulateFlow(settings: FlowSettings, days = FLOW_DAYS): FlowSnapshot {
  let snapshot = emptyFlow()
  for (let day = 0; day < days; day++)
    snapshot = advanceFlow(snapshot, settings)
  return snapshot
}
