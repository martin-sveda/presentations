// SPDX-License-Identifier: MIT
export interface Capacity {
  speed: number
  review: number
  ship: number
}

export interface Snapshot {
  day: number
  created: number
  delivered: number
  reviewQueue: number
  shipQueue: number
  reviewedToday: number
  shippedToday: number
}

export const DAYS = 8
export const PRESETS = [
  { label: 'Baseline', speed: 1, review: 6, ship: 5 },
  { label: 'Faster coding', speed: 4, review: 6, ship: 5 },
  { label: 'Balance flow', speed: 4, review: 12, ship: 12 },
] as const

export function initialSnapshot(): Snapshot {
  return { day: 0, created: 0, delivered: 0, reviewQueue: 0, shipQueue: 0, reviewedToday: 0, shippedToday: 0 }
}

export function rates(capacity: Capacity) {
  const entries = [capacity.speed * 3, capacity.review, capacity.ship]
  const throughput = Math.min(...entries)
  return {
    code: entries[0],
    throughput,
    constraints: entries.flatMap((value, index) => value === throughput ? [index] : []),
  }
}

export function advance(previous: Snapshot, capacity: Capacity): Snapshot {
  const code = capacity.speed * 3
  const reviewAvailable = previous.reviewQueue + code
  const reviewedToday = Math.min(reviewAvailable, capacity.review)
  const shipAvailable = previous.shipQueue + reviewedToday
  const shippedToday = Math.min(shipAvailable, capacity.ship)
  return {
    day: previous.day + 1,
    created: previous.created + code,
    delivered: previous.delivered + shippedToday,
    reviewQueue: reviewAvailable - reviewedToday,
    shipQueue: shipAvailable - shippedToday,
    reviewedToday,
    shippedToday,
  }
}

export function simulate(capacity: Capacity, days = DAYS): Snapshot {
  let state = initialSnapshot()
  for (let day = 0; day < days; day++)
    state = advance(state, capacity)
  return state
}
