# AGENTS.md

This pnpm workspace contains independent Slidev decks under
`packages/<YYYY-MM-DD>-<slug>/`. The root build assembles their web builds,
PDFs, and a generated landing page for GitHub Pages.

- Use pnpm and follow the [root README](./README.md) for setup, preview,
  tests, and deployment. Keep components and assets in their own deck, avoid
  cross-deck dependencies, and preserve the existing language of the content.
- Load the `slidev` skill for Slidev syntax, layouts, animations, components,
  or export work. Follow the [AI Lessons deck README](./packages/2026-12-02-ai-lessons/README.md)
  for this deck's export and replay behavior. Deck-specific rules take
  precedence over generic skill examples.
- Run the smallest relevant check: build the affected deck for slide changes,
  run `pnpm test` for code changes, and use the deck's documented export and
  PDF tests for print changes. Verify layout changes in a browser and inspect
  the PDF visually when print layout is affected.
- Do not push or deploy without explicit user approval. `pnpm run deploy`
  publishes from the current working tree, including uncommitted changes.

## Skills

Use the relevant skill from [`.agents/skills/`](./.agents/skills/) rather than
loading the whole set. If automatic discovery is unavailable, consult the
linked `SKILL.md` directly.

| Task | Skill |
| --- | --- |
| Slide syntax, layout, animation, or export | [Slidev](./.agents/skills/slidev/SKILL.md) |
| Utility classes, shortcuts, icons, or UnoCSS configuration | [UnoCSS](./.agents/skills/unocss/SKILL.md) |
| Vue component implementation or API lookup | [Vue](./.agents/skills/vue/SKILL.md) |
| Vue component design, refactoring, or review | [Vue best practices](./.agents/skills/vue-best-practices/SKILL.md) |
| Workspace configuration or dependency management | [pnpm](./.agents/skills/pnpm/SKILL.md) |
| Vite-specific build or configuration work | [Vite](./.agents/skills/vite/SKILL.md); check examples against this repo's Vite 6 dependency, not the skill's Vite 8 defaults. |
| Local slide preview or screenshots | [agent-browser](./.agents/skills/agent-browser/SKILL.md) if already available; otherwise use an available browser. |

Use [`/grilling`](./.github/skills/grilling/SKILL.md) only on request to
stress-test a plan or decision.
