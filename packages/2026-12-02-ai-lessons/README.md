# AI Lessons deck

See the [workspace README](../../README.md) for setup, local preview, and deployment.

The chat replay in this copy is illustrative; the original internal transcript
and planning materials are not included.

## Bottleneck animation

The speed-of-coding slide now uses `<DeliveryFlowPipeline />`, the four-stage
pipe visualization in `components/delivery-flow/`. Its stages are Clarify intent,
Code, Review, and Ship. Copy that entire folder, including its MIT `LICENSE`,
to reuse it in another Slidev deck; no additional dependencies are required.
The model and diagram are independent of Slidev, while the wrapper handles slide
activity, controls, and print mode. CSS colors inherit Siemens variables with
standalone fallbacks. `<DeliveryFlowPipeline static />` renders the export view.

Pipe width represents capacity. Green tiles and the inner band preview the next
day of processing, including queued work; spare pipe area illustrates underused
capacity. Yellow pockets show current queues,
capped at twelve drawn tiles with exact numeric counts. The outlet gauge compares
sustainable output with the baseline of three changes per day. While an existing
queue drains, actual daily delivery can temporarily exceed that sustainable rate.

The presets tell the story in order: Baseline, Faster coding, Widen downstream,
and Intent is the limit. Sliders pause playback but preserve counters and queued
work, so the next step can drain a backlog. Presets restart the simulation.
If capacities change after a completed eight-day run, another eight-day window
opens without losing work; otherwise Replay starts fresh.
Reset clears work in progress and counters but keeps capacities. Leaving the
slide pauses playback; reduced motion disables decorative movement. Export shows
a deterministic day-eight Faster coding scenario without controls.

Intent means work with a clear outcome and acceptance criteria, not ticket count.
The illustrative model assumes unlimited candidate demand before clarification,
three changes per day per coding-speed multiplier, and same-day handoffs.
Unprocessed clarified work waits before coding; later stages also retain queues.
This models capacity and starvation, not the empirical quality of requirements.

The original panel-based `<BottleneckSimulation />` is retained unchanged as an
alternative in `components/bottleneck/`. To switch back, replace the component
tag on the slide.

### Original panel version

The original, dependency-free Vue animation lives in
`components/bottleneck/`. That module is MIT licensed; keep its `LICENSE` when
copying it into another presentation. It contains no code or artwork from the
training that inspired the topic. The licence applies to this module, not the
entire deck.

Use `<BottleneckSimulation />` in Slidev. Copy the whole component folder to
reuse it. The simulation owns its controls and uses Slidev's active-slide and
print-mode APIs; the board and model are otherwise independent of Slidev.
Colors inherit this deck's Siemens CSS variables, with standalone fallbacks.

Choose Baseline, Faster coding, or Balance flow, then run eight days, pause,
or advance one day at a time. All three sliders are adjustable. Changing a
capacity or preset clears the run; Reset clears counters but keeps capacities.
Leaving the slide pauses playback. Reduced motion disables decorative movement.
PDF export shows a deterministic final Faster coding scenario without controls.

The illustrative model assumes unlimited ready work, coding capacity of three
changes per day times the speed multiplier, and same-day handoffs. Review and
shipping process available work up to their daily capacities; unprocessed work
stays queued. This is a throughput illustration, not empirical productivity data.

Run its model tests from this package directory:

```sh
node --test scripts/bottleneck.test.mjs scripts/delivery-flow.test.mjs
```

## PDF export

From the repository root:

```sh
pnpm --filter 2026-12-02-ai-lessons export-pdf
```

The published PDF contains one complete page per slide, with all click-revealed
items visible. Export runs per slide to preserve the slide-specific background,
waits for network idle, then waits one second for motion and layout to settle.
Do not add `--with-clicks`: Slidev 52's per-slide exporter advances clicks using
keyboard shortcuts, which are disabled in print mode, leaving click content
hidden instead of producing complete pages.

The animated chat becomes a labeled, compact opening excerpt containing the
first two entries without playback controls or the composer. The web version
continues to replay normally.

After exporting, check page count, page separation, and expected text on every
page:

```sh
pnpm --filter 2026-12-02-ai-lessons test:pdf
```

This PDF-content regression check requires Poppler's `pdftotext` on `PATH`.
Also inspect the PDF visually when changing slide layouts or images; text checks
cannot establish that every graphic is positioned correctly.
