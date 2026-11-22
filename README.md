# Presentations

A pnpm workspace of Slidev decks. Each presentation lives in its own package
under `packages/`. The current deck is [AI Lessons](./packages/2026-12-02-ai-lessons/).

## Setup

Use Node.js 22.18 or newer, pnpm 10.19.0, and Poppler (`pdftotext`, available
via `brew install poppler` on macOS) to run the PDF tests. From the repo root:

```sh
pnpm install --frozen-lockfile
pnpm --filter 2026-12-02-ai-lessons exec playwright install chromium
```

## Develop and preview

```sh
pnpm --filter 2026-12-02-ai-lessons dev         # edit one deck (port 3030)
pnpm --filter 2026-12-02-ai-lessons build       # build one deck to its own dist/
pnpm --filter 2026-12-02-ai-lessons export-pdf  # export one deck to the root dist/
pnpm test                                     # index and deck tests

pnpm run build    # build the full Pages site and export all PDFs
pnpm run test:pdf # validate the exported PDFs
pnpm run preview  # open http://localhost:4173/presentations/
```

The full build replaces the root `dist/` directory and creates a landing page
with web and PDF links for each presentation:

```text
dist/
  index.html
  <deck-slug>/
    index.html
    <deck-slug>.pdf
    assets/
```

## Deploy to GitHub Pages

1. Review the decks, bundled assets, and PDFs for the intended audience. A
   private repository does not guarantee a private Pages site. Do not publish
   restricted material to a public site.
2. Confirm `git remote get-url origin` returns
   `git@github.com:martin-sveda/presentations.git` and that you have SSH push
   access. Commit the approved source changes and push `main` separately:
   `git push -u origin main`.
3. From the repo root, run **`pnpm run deploy`** (not `pnpm deploy`). This
   builds from the current working tree, validates the web and PDF outputs,
   and replaces `origin/gh-pages` with the generated `dist/` contents. It
   does not push `main`. If the build or PDF checks fail, nothing is published.
4. For the first deployment, once the `gh-pages` branch exists, go to
   **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**,
   select **`gh-pages`** and **`/ (root)`**, and save. No custom Actions
   workflow is required.
5. When Pages finishes, open <https://martin-sveda.github.io/presentations/>
   and verify the deck and PDF links. On subsequent updates, repeat step 3.

To rehearse without pushing, run `pnpm run build`, `pnpm run test:pdf`, and
`pnpm run preview`.

## Add a deck

Create `packages/<YYYY-MM-DD>-<slug>/` with its own `slides.md`, assets, and
`package.json`. Use the folder name as the package name. Follow the
[AI Lessons package scripts](./packages/2026-12-02-ai-lessons/package.json):
`build-base` must build to root `dist/<deck-slug>/` with base
`/presentations/<deck-slug>/`, and `export-pdf` must write
`dist/<deck-slug>/<deck-slug>.pdf`. Add `test:pdf` if the deck has PDF
regression checks. Run `pnpm install` to update the shared lockfile.
