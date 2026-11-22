/* eslint test/no-import-node-test: off */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const pdf = fileURLToPath(new URL('../../../dist/2026-12-02-ai-lessons/2026-12-02-ai-lessons.pdf', import.meta.url))
// Raw order keeps columns separate; PDF text spacing varies with font size.
const normalize = text => text.replace(/\s+/g, '')
const pages = execFileSync('pdftotext', ['-raw', pdf, '-'], { encoding: 'utf-8' })
  .split('\f')
  .slice(0, -1)
  .map(normalize)

const expected = [
  ['AI adoption beyond demo: Lessons from industrial R&D', 'Closing the gap between management enthusiasm'],
  ['Martin Sveda', 'Engineering Manager', 'Lead our Brno R&D office', 'Manage FW delivery', 'Help promote AI adoption', 'make data-driven decisions'],
  ['The world I live in: ET 200SP I/O interface module', 'HARD real time requirements', 'Profinet industrial real-time bus', 'Complex features', 'C/C++ in FW dev', 'CI/CD and HILs', 'really productive'],
  ['01 · The GOOD intentions', 'The road to hell'],
  ['The AI journey begins', 'The boom of OpenAI ChatGPT', 'Management attention', 'High expectation were established', 'AI hackathlons & AI weeks', 'AI remained the dominant narrative for management'],
  ['Here comes the excitement', 'New models on ther block', 'All those fancy /commands and context', 'started to do magic things', 'We showed the team what we built', 'But the response was...', 'Your examples do not prove that this will help us.', 'Opening excerpt', 'Review this example firmware plan', 'GitHub Copilot', 'I\'ll start by checking the timing and acceptance criteria.', 'First two entries · Static PDF excerpt'],
  ['Show it the hard way', 'impress them even more.', 'demonstration of capability', 'Run whole of our code', 'Rewrite our TCP/IP stack', 'Fixing a bug'],
  ['The CRUEL lessons', 'We intended to inspire people', 'How does this help us deliver our product?', 'How shall we move from individual excitement'],
  ['02 · Back to the school', 'Training makes perfect'],
  ['We made AI part of professional competence', 'Task Framing', 'Context Engineering', 'Agent Enablement', 'Autonomy Judgment', 'Verification & Evals', 'Orchestration', 'Reliability & State', 'Competence Expectations', 'But it did not work neither.'],
  ['Learning needs a real task', 'Real project need', 'One competence', 'One habit', 'One real task', 'Clear evidence', 'The supprt needed', 'Connect responsibilities', 'Project leader', 'Employee and team leader', 'Make room for learning and review', 'Value', 'Quality', 'Learning', 'Capacity', 'evidence discussed in a Grow talk.'],
  ['Get inspAIred - Learning from each other', 'How do we make useful experience available'],
  ['AI Ambassadors - help closer to the work', 'Who helps people move from an interesting idea'],
  ['Coachee - private feedback loop', 'How can people see what to improve'],
  ['Coachee - live demo', 'How can people see what to improve'],
  ['We had learning expectations. What about delivery?', 'What was still missing'],
  ['Bringing project managers into the picture', 'Who connects new capabilities'],
  ['We assess projects, not prompt counts', 'How do we know whether individual AI experiments'],
  ['03 · Personal lessons', 'What your managers will (probably) never tell you'],
  ['Speed of coding is not a problem', 'Useful delivery needs clear intent and capacity at every stage.'],
  ['Polished does not mean correct', 'AI amplifies your specification. Including its gaps.'],
  ['AI is an amplifier. Not an authority.', 'Garbage in, garbage out'],
  ['Is AI a good tool for everyone?', 'We built teams where a few people defined the work'],
  ['What should I do next?'],
  ['Thank you', 'Questions?'],
]

test('exports exactly one complete page per slide without adjacent-slide text', () => {
  assert.equal(pages.length, expected.length)
  for (const [index, phrases] of expected.entries()) {
    for (const phrase of phrases)
      assert.ok(pages[index].includes(normalize(phrase)), `PDF page ${index + 1} is missing: ${phrase}`)
    for (const [otherIndex, [heading]] of expected.entries()) {
      if (otherIndex !== index)
        assert.ok(!pages[index].includes(normalize(heading)), `PDF page ${index + 1} also contains slide ${otherIndex + 1}: ${heading}`)
    }
  }
})

test('prints a complete labeled opening exchange rather than a clipped replay viewport', () => {
  const chat = pages[5]
  assert.ok(chat.includes(normalize('Review this example firmware plan before we change the code.')))
  assert.ok(chat.includes(normalize('I\'ll start by checking the timing and acceptance criteria.')))
  assert.ok(chat.includes(normalize('First two entries · Static PDF excerpt')))
  assert.ok(!chat.includes(normalize('Ask Copilot')))
  assert.ok(!chat.includes(normalize('Completed excerpt')))
})
