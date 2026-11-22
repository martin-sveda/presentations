export interface ReplayBlock {
  type: 'text' | 'code'
  text: string
  language?: string
}

export type ReplayEntry
  = | { role: 'user', text: string }
    | { role: 'assistant', blocks: ReplayBlock[] }
    | { role: 'tool', text: string, status: 'success' | 'failure' | 'pending' }

export interface ReplaySession {
  version: 1
  title: string
  entries: ReplayEntry[]
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function text(value: unknown, field: string): string {
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`${field} must be nonempty text.`)
  return value
}

export function parseSession(value: unknown): ReplaySession {
  if (!record(value) || value.version !== 1)
    throw new Error('Unsupported replay format; expected version 1.')
  const title = text(value.title, 'Session title')
  if (!Array.isArray(value.entries) || !value.entries.length)
    throw new Error('Session entries must be a nonempty array.')
  const entries: ReplayEntry[] = value.entries.map((entry, index) => {
    const field = `Entry ${index + 1}`
    if (!record(entry))
      throw new Error(`${field} must be an object.`)
    if (entry.role === 'user')
      return { role: 'user', text: text(entry.text, field) }
    if (entry.role === 'tool') {
      if (!['success', 'failure', 'pending'].includes(String(entry.status)))
        throw new Error(`${field} has an invalid tool status.`)
      return {
        role: 'tool',
        text: text(entry.text, field),
        status: entry.status as 'success' | 'failure' | 'pending',
      }
    }
    if (entry.role === 'assistant') {
      if (!Array.isArray(entry.blocks) || !entry.blocks.length)
        throw new Error(`${field} must contain response blocks.`)
      const blocks: ReplayBlock[] = entry.blocks.map((block) => {
        if (!record(block) || (block.type !== 'text' && block.type !== 'code'))
          throw new Error(`${field} contains an unsupported response block.`)
        if (block.language !== undefined && typeof block.language !== 'string')
          throw new Error(`${field} has an invalid code language.`)
        return {
          type: block.type,
          text: text(block.text, `${field} block`),
          ...(block.type === 'code' && block.language ? { language: block.language } : {}),
        }
      })
      return { role: 'assistant', blocks }
    }
    throw new Error(`${field} has an unsupported role.`)
  })
  if (entries[0]?.role !== 'user' || !entries.some(entry => entry.role === 'assistant'))
    throw new Error('A replay must start with a user prompt and include an assistant answer.')
  return { version: 1, title, entries }
}
