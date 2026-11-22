# Copilot chat replay

## Goal

A slide component that resembles VS Code Copilot Chat and continuously replays
curated conversations from real sessions. It simulates typing and streaming;
it does not connect to Copilot, execute tools, or generate new technical claims.

## Location

Keep the feature local to this deck, under `components/copilot-chat/`:

```text
components/copilot-chat/
  SPEC.md
  CopilotChatReplay.vue
  ChatMessage.vue
  useChatReplay.ts
  schema.ts                  # shared validation and TypeScript contracts
  preview.md                 # separate preview; does not alter the talk
  scripts/import-session.mjs
  scripts/*.test.mjs          # dependency-free Node tests
  sessions/                  # reviewed, presentation-safe JSON only
  drafts/                    # unreviewed imports; gitignored
  .gitignore                 # ignore drafts/
```

This feature is implemented with the layout above.
Keep scripts, replay data, and feature styling here, not at the workspace root
or in `public/`. Original logs stay in their existing private location and are
read locally, never copied into the deck. Do not share code across decks.

Explicitly import `CopilotChatReplay.vue` in the slide's `<script setup>` to
avoid depending on nested component auto-import naming.

## Visual behavior

- Dark and Light VS Code-like panel: CHAT header, conversation area, bottom composer (use dark/light param).
- Visible “Session replay” label; never imply a live Copilot connection.
- User prompt types into the composer with a blinking cursor, pauses, then
  moves into the conversation as a submitted message.
- Copilot shows a working indicator, then reveals its answer in short chunks.
- Optional tool rows show a curated action label and success/failure state.
  They are visual records, not executable controls.
- Use readable text and fenced-code styling; no editor or diff viewer in v1.
- Automatically scroll new content into view. Keep the composer stationary.
- Pause for reading, then type the next prompt.
- At the end, pause, clear the conversation, and start another session.
- Shuffle whole sessions without immediate repeats when more than one exists.
  Never shuffle messages within a session.
- Keep at most eight message/tool entries rendered. Playback may loop forever,
  but retained history and pending timers must remain bounded.
- Pause/resume and restart buttons affect only this panel, not slide navigation.

Use existing icon assets. A small dedicated
`ChatMessage` renderer provides the closer VS Code look without altering other
slides. Use Vue, CSS, and existing dependencies; add no packages.

## Component contract

```html
<CopilotChatReplay :sessions="chatSessions" :speed="1" theme="dark"/>
```

- `sessions`: explicitly imported, reviewed session data; required.
- `speed`: positive playback multiplier; defaults to `1`.
- `static`: optional completed-transcript mode for screenshots/rehearsal.
- Default playback loops automatically while the slide is active.
- Invalid/empty data produces a visible error instead of an empty working panel.
- `theme`: dark or light theme similar to VS code defaults

`CopilotChatReplay` owns panel controls and composition. `ChatMessage` renders
one entry. `useChatReplay` owns playback state, timing, and cancellation.

Start/resume through Slidev's slide-active lifecycle, not mounting alone.
Cancel pending work on slide leave and unmount; prevent duplicate loops when
returning. Playback runs only in the audience slide context, not hidden previews,
overview, or presenter copies. Pause while the browser tab is hidden.

Reduced-motion and `static` mode show a deterministic excerpt of the first
session without timers. Long excerpts are clipped to the panel rather than
expanding the slide.

Print/export shows the first two entries in full, labeled "Opening excerpt"
and "First two entries · Static PDF excerpt". Compact text and the removal of
the composer and playback controls keep this opening exchange readable within
the slide. It is not presented as a complete conversation. Interactive playback
and its eight-entry history limit are unchanged.

## Replay data

Use a small, versioned JSON format rather than retaining raw event logs:

```json
{
  "version": 1,
  "title": "Investigating a failing test",
  "entries": [
    { "role": "user", "text": "Help investigate this failing test." },
    { "role": "tool", "text": "Read test file", "status": "success" },
    {
      "role": "assistant",
      "blocks": [
        { "type": "text", "text": "The test assumes the old return value." },
        { "type": "code", "language": "cpp", "text": "return result;" }
      ]
    }
  ]
}
```

Render strings as escaped text; never use raw HTML from logs. Text supports
paragraphs and preserved line breaks in v1. Code blocks use monospace styling;
full Markdown parsing and syntax highlighting are not required.

Start with three to five short sessions. Semi-randomness comes from session
order and small timing variations, not rewriting answers or mixing contexts.

## Session-ID import tool

### Supported source

Initially support local Copilot SDK/CLI-style session logs:

```text
~/.copilot/session-state/<session-id>/events.jsonl
```

This format is present in the current environment. A session ID from another
provider or VS Code's native chat storage is not automatically compatible.
Native VS Code chat exports can be supported later with a separate adapter.

### Import an old session

Requires **Node 22.18+**. Run from the repository root, replacing
`YOUR-SESSION-UUID` with the UUID of a local Copilot SDK/CLI session:

```bash
node packages/2026-12-02-ai-lessons/components/copilot-chat/scripts/import-session.mjs \
  --session-id YOUR-SESSION-UUID \
  --name firmware-review
```

This reads `~/.copilot/session-state/<session-id>/events.jsonl` and creates
[drafts/firmware-review.json](./drafts/firmware-review.json). The name must be
a lowercase kebab-case slug. Existing drafts are never overwritten; choose a
different name if the file already exists.

Alternatively, provide an explicit compatible JSONL log:

```bash
node packages/2026-12-02-ai-lessons/components/copilot-chat/scripts/import-session.mjs \
  --source /absolute/path/to/events.jsonl \
  --name firmware-review
```

Use exactly one of `--session-id` or `--source`. Native VS Code chat logs and
remote session IDs are not supported.

Before using the result:

1. Open [drafts/firmware-review.json](./drafts/firmware-review.json), review every
   entry, and remove sensitive information.
2. Shorten long exchanges while keeping prompts and answers coherent.
3. Copy the approved file into
   [sessions/firmware-review.json](./sessions/firmware-review.json).

Drafts are gitignored, but that does not make their contents safe to publish.
**Approved files imported by the slide become public when the deck is deployed.**

Add the reviewed session to the main deck's `slides.md`:

```html
<script setup lang="ts">
import CopilotChatReplay from './components/copilot-chat/CopilotChatReplay.vue'
import session from './components/copilot-chat/sessions/firmware-review.json'
</script>

<CopilotChatReplay
  :sessions="[session]"
  theme="dark"
  style="height: 350px"
/>
```

These imports are relative to `slides.md`. Pass an array even when replaying
only one session.

If placing the component after `::right::`, select a layout that renders that
slot. Use `layout: two-cols-header` for a shared heading with `::left::` and
`::right::` columns, or `layout: two-cols` for default left content and a
`::right::` column. The default layout does not render named column slots.
For `two-cols-header`, use `layoutClass` for outer-slide padding; `class` applies
to the column containers.

### Command from the deck directory

Run from the deck directory:

```bash
node components/copilot-chat/scripts/import-session.mjs \
  --session-id <uuid> \
  --name failing-test
```

Read the session log and write `drafts/failing-test.json`. Allow `--source <path>`
for an explicitly supplied compatible JSONL log when it is not in the default
session-state directory. No network calls, model calls, or extra dependencies.
Resolve the home directory through Node's `os.homedir()`.

### Extraction rules

- Validate the session UUID and output slug; reject path traversal and existing
  output files. Missing logs, malformed JSONL, unsupported formats, and an empty
  usable conversation fail with a clear message and nonzero exit status.
- Read `user.message` and visible `assistant.message` content in event order.
  Preserve follow-ups; ignore empty tool-request-only assistant messages.
- Do not concatenate reasoning fields, system instructions, hidden contexts,
  attachments, or tool arguments/results into replay text.
- Tool events may become optional rows containing only a normalized action
  label and outcome. Pair start/completion events by `toolCallId`; do not
  invent success for unfinished actions.
- Strip identifiable runtime wrapper blocks from user content where supported.
  If a wrapper cannot safely be separated from the prompt, flag the draft for
  review rather than silently treating it as presentation content.
- Convert fenced code to code blocks. Preserve other content as plain text.
- Reject encrypted-only or otherwise unreadable transcripts with an explicit
  explanation; do not fabricate missing answers.
- Validate the normalized result before writing. Report counts and review
  warnings, never raw message contents in terminal output.

The event schema can change. The importer must report unsupported message
shapes rather than silently producing a partial, apparently complete transcript.

Unfinished tool actions use `status: "pending"` and display “Incomplete”.
The importer requires Node 22.18+ (native TypeScript stripping for the shared
schema). Imported drafts use owner-only file permissions where supported.

### Review and publication

1. Import by session ID into the ignored `drafts/` directory.
2. Manually review every retained entry. Remove secrets, personal information,
   internal links, proprietary code, local paths, and unnecessary details.
3. Shorten content for slide readability while preserving technical meaning.
   Prefer complete prompt/answer exchanges; omit irrelevant exchanges together.
4. Copy only the approved JSON into `sessions/` and explicitly import it for
   the slide. Do not glob-import drafts or load raw session IDs at runtime.

Automated filtering is not a confidentiality guarantee. Drafts remain sensitive
local files until reviewed; gitignore only prevents accidental tracking.
Committed session data is bundled into the deck and is accessible to viewers.
Raw IDs, paths, timestamps, and provider metadata are unnecessary in published
replay files.

## Using the implementation

Preview both themes without adding anything to the main presentation:

```bash
pnpm --filter 2026-12-02-ai-lessons exec slidev components/copilot-chat/preview.md --port 3041
```

The three bundled examples are synthetic demonstration content, not imported
personal sessions or verified project code. Replace them with reviewed data.

In the main deck's `slides.md`, use explicit imports. The filename
`my-reviewed-session.json` below is a placeholder: replace it with an approved
file that actually exists in `sessions/`. An import does not create the file;
if it is missing, Vite reports “Failed to resolve import”. Complete the import,
review, and copy steps above before referencing a personal session.

```html
<script setup lang="ts">
import CopilotChatReplay from './components/copilot-chat/CopilotChatReplay.vue'
import session from './components/copilot-chat/sessions/my-reviewed-session.json'

const chatSessions = [session]
</script>

<CopilotChatReplay :sessions="chatSessions" theme="dark" style="height: 350px" />
```

Use `theme="light"` for the light panel, `:speed="2"` for double speed, and
`static` for a fixed excerpt. The default height is 410px; set an explicit
height or constrain the parent to fit the slide's heading and other content.
Theme is independent of the presentation's color scheme.

Run focused tests from the repository root:

```bash
node --test packages/2026-12-02-ai-lessons/components/copilot-chat/scripts/*.test.mjs
```

The importer only supports the local SDK/CLI event format described above.
It does not fetch remote history or read native VS Code chat storage.

## Acceptance checks

- A slide displays a recognizable chat panel and a complete animated exchange.
- Follow-up prompts remain in the correct order and sessions loop continuously.
- Pause/resume, restart, leave/re-enter, and hidden-tab behavior never create
  overlapping playback tasks or continue background typing.
- History remains at eight entries or fewer after repeated loops.
- Export and reduced-motion rendering are static and deterministic.
- Session-ID import produces valid draft JSON without leaking excluded fields;
  malformed input, missing sessions, and incomplete tool events are covered.
- Drafts are ignored and absent from the built deck; only reviewed imports ship.
- The target deck builds and the panel is visually checked in Slidev.

## Out of scope

Live AI access, arbitrary provider adapters, exact VS Code chrome, executable
tools, clickable file navigation, expandable diffs, a session browser, and a
review/redaction UI.
