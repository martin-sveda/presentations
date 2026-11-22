import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'
import { parseSession } from '../schema.ts'

const featureDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const wrapperNames = ['system_reminder', 'skill-context', 'tagged_files', 'current_datetime', 'environment_context']

function cleanPrompt(content, warnings) {
  for (const name of wrapperNames) {
    const paired = new RegExp(`<${name}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${name}>`, 'g')
    const cleaned = content.replace(paired, '')
    if (cleaned !== content)
      warnings.add('Runtime wrapper blocks were removed; verify the remaining prompts.')
    content = cleaned
    if (new RegExp(`<\\/?${name}(?:\\s|>)`).test(content))
      throw new Error('An incomplete runtime wrapper requires manual cleanup before import.')
  }
  if (/<(?:system|instructions|context|attachments)\b/i.test(content))
    warnings.add('A prompt contains an unrecognized context wrapper; remove it before publication.')
  return content.trim()
}

export function responseBlocks(content) {
  const blocks = []
  const fence = /^```([^\r\n`]*)\r?\n([\s\S]*?)^```[ \t]*\r?$/gm
  let offset = 0
  for (const match of content.matchAll(fence)) {
    const before = content.slice(offset, match.index).trim()
    if (before)
      blocks.push({ type: 'text', text: before })
    if (match[2].trim())
      blocks.push({ type: 'code', language: match[1].trim(), text: match[2].replace(/\r?\n$/, '') })
    offset = match.index + match[0].length
  }
  const after = content.slice(offset).trim()
  if (after)
    blocks.push({ type: 'text', text: after })
  return blocks
}

function actionLabel(name) {
  if (/read|view|cat/i.test(name))
    return 'Read file'
  if (/search|grep|glob|find/i.test(name))
    return 'Search workspace'
  if (/edit|patch|write|create/i.test(name))
    return 'Edit file'
  if (/bash|shell|terminal|exec|run/i.test(name))
    return 'Run command'
  return 'Tool activity'
}

export function extractSession(events, title) {
  const entries = []
  const warnings = new Set(['Unreviewed import: inspect every entry for sensitive information before publication.'])
  const tools = new Map()
  for (const event of events) {
    if (!event || typeof event.type !== 'string')
      throw new Error('Unsupported event shape: expected an event type.')
    const data = event.data
    if (!['user.message', 'assistant.message', 'tool.execution_start', 'tool.execution_complete'].includes(event.type))
      continue
    if (!data || typeof data !== 'object' || Array.isArray(data))
      throw new Error(`Unsupported ${event.type} data shape.`)
    if (event.type === 'tool.execution_start') {
      if (typeof data.toolCallId !== 'string' || typeof data.toolName !== 'string' || tools.has(data.toolCallId))
        throw new Error('Unsupported or duplicate tool start event.')
      const entry = { role: 'tool', text: actionLabel(data.toolName), status: 'pending' }
      tools.set(data.toolCallId, entry)
      entries.push(entry)
      continue
    }
    if (event.type === 'tool.execution_complete') {
      if (typeof data.toolCallId !== 'string' || typeof data.success !== 'boolean')
        throw new Error('Unsupported tool completion event.')
      const entry = tools.get(data.toolCallId)
      if (!entry) {
        warnings.add('A tool completion has no matching start; its activity row was omitted.')
        continue
      }
      entry.status = data.success ? 'success' : 'failure'
      tools.delete(data.toolCallId)
      continue
    }
    if (event.type === 'assistant.message' && data.phase === 'analysis')
      continue
    if (event.type === 'assistant.message' && data.phase !== undefined && !['final', 'final_answer', 'commentary'].includes(data.phase))
      throw new Error('Unsupported assistant message phase.')
    if (event.type === 'assistant.message' && Array.isArray(data.toolRequests) && data.toolRequests.length
      && (data.content === undefined || (typeof data.content === 'string' && !data.content.trim()))) {
      continue
    }
    if (typeof data.content !== 'string') {
      throw new TypeError('Unreadable message content; encrypted or unsupported transcripts cannot be imported.')
    }
    if (event.type === 'user.message') {
      const prompt = cleanPrompt(data.content, warnings)
      if (prompt)
        entries.push({ role: 'user', text: prompt })
    }
    else if (data.content.trim()) {
      const blocks = responseBlocks(data.content)
      if (blocks.length)
        entries.push({ role: 'assistant', blocks })
    }
    else if (data.encryptedContent) {
      throw new Error('An encrypted-only assistant message cannot be imported.')
    }
  }
  if (tools.size)
    warnings.add(`${tools.size} unfinished tool action(s) are marked Incomplete, not successful.`)
  return {
    session: parseSession({ version: 1, title, entries }),
    warnings: [...warnings],
  }
}

export function* parseEvents(source) {
  let number = 0
  for (const line of source.split(/\r?\n/)) {
    number++
    if (!line.trim())
      continue
    try {
      yield JSON.parse(line)
    }
    catch {
      throw new Error(`Malformed JSONL at line ${number}.`)
    }
  }
}

export function importOptions(args) {
  const { values } = parseArgs({
    args,
    options: {
      'session-id': { type: 'string' },
      'name': { type: 'string' },
      'source': { type: 'string' },
      'help': { type: 'boolean' },
    },
  })
  if (values.help)
    return { help: true }
  if (!values.name || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.name))
    throw new Error('--name must be a lowercase kebab-case slug.')
  if (values['session-id'] && !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(values['session-id']))
    throw new Error('--session-id must be a UUID.')
  if (Boolean(values.source) === Boolean(values['session-id']))
    throw new Error('Provide exactly one of --session-id or --source.')
  return {
    help: false,
    name: values.name,
    source: values.source
      ? resolve(values.source)
      : join(homedir(), '.copilot', 'session-state', values['session-id'], 'events.jsonl'),
    destination: join(featureDirectory, 'drafts', `${values.name}.json`),
  }
}

async function main() {
  const options = importOptions(process.argv.slice(2))
  if (options.help) {
    console.log('Usage: node scripts/import-session.mjs (--session-id <uuid> | --source <events.jsonl>) --name <slug>')
    return
  }
  let source
  try {
    source = await readFile(options.source, 'utf8')
  }
  catch (error) {
    throw new Error(`Cannot read the session log (${error.code || 'read error'}).`)
  }
  const { session, warnings } = extractSession(parseEvents(source), options.name.replaceAll('-', ' '))
  await mkdir(dirname(options.destination), { recursive: true, mode: 0o700 })
  try {
    await writeFile(options.destination, `${JSON.stringify(session, null, 2)}\n`, { flag: 'wx', mode: 0o600 })
  }
  catch (error) {
    throw new Error(error.code === 'EEXIST' ? 'Draft already exists; choose a different --name.' : `Cannot write draft (${error.code || 'write error'}).`)
  }
  console.log(`Imported ${session.entries.length} entries into drafts/${options.name}.json.`)
  for (const warning of warnings)
    console.warn(`Review: ${warning}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(`Import failed: ${error.message}`)
    process.exitCode = 1
  })
}
