---
layout: center
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
title: "AI adoption beyond demo: Lessons from industrial R&D"
exportFilename: 2026-accelerate-tech-days
download: ./2026-12-02-ai-lessons.pdf
lineNumbers: false
drawings:
  persist: false
mdc: true
clicks: 0
preload: false
glowSeed: 229
routerMode: hash
hideWatermark: true
---


<div translate-x--14 max-w-170>

<h1>
  <strong>AI adoption beyond demo: Lessons from industrial R&D</strong>
</h1>


<div mt-8 text-sm opacity-60>
  Closing the gap between management enthusiasm, impressive individual experiments, and actual engineering-team adoption.
</div>


</div>


---
layout: intro
class: px-24
glowSeed: 205
hideWatermark: true
---

<div flex items-center gap-16 justify-center>
  <ZoomImage src="/msveda.jpg" w-40 h-40 rounded-full object-cover />
  <div flex flex-col gap-2>
    <span font-semibold text-3xl>Martin Sveda</span>
    <span text-lg opacity-70>Engineering Manager — Industrial I/O Firmware</span>
    <div text-sm opacity-60 mt-4 max-w-140>
My roles at Siemens:

- Lead our Brno R&D office, with about 40 engineers working on industrial automation.
- Manage FW delivery of the ET 200SP project - Siemens flagship product in industrial I/O automation.
- Help promote AI adoption in our organization.

I drive technical work rather than write code day-to-day. I need to understand problems fast, turn messy inputs into clear plans, and make data-driven decisions.
</div>
  </div>
</div>



---
layout: two-cols-header
glowSeed: 15
---

# The world I live in: ET 200SP I/O interface module

<span>A device that collects and provides I/O data in industrial automation</span>

::left::

<div mt-2 pr-4>

- HARD real time requirements
- Profinet industrial real-time bus
- Complex features to support industrial automation

Tech stack:
- C/C++ in FW dev; Python and C# in test automation
- CI/CD and HILs

Typial learning curve in this complex environment is 1-2 years before a senior developer become really productive.

</div>

::right::

<div pl-4 mt-2 h-full flex items-start justify-center>

<ZoomImage src="ET200SP-frontal-transparent_small.png" rounded-lg border="2 solid white/10" shadow-lg max-w-full max-h-full />

</div>

<style>
.two-cols-header {
  grid-template-rows: auto minmax(0, 1fr) auto;
}
</style>





---
layout: section
glowSeed: 190
class: py-10
---

# 01 · The GOOD intentions

The road to hell is always paved with the good intentions

---
layout: two-cols-header
glowSeed: 95
---

# The AI journey begins

::left::

<div mt-4 flex flex-col gap-0>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid indigo-500" bg="indigo-800/40">
      <div i-carbon:compass text-indigo-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>The boom of OpenAI ChatGPT</div>
    <div text-sm opacity-70>First encounters of AI wonderland. Chat only sessions with Ctrl+C and Ctrl+V trials.</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid indigo-500" bg="indigo-800/40">
      <div i-carbon:chart-evaluation text-indigo-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>Management attention</div>
    <div text-sm opacity-70>Sadly, it was more marketing then real results. But management started to be excited. AI is the future of development.</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid indigo-500" bg="indigo-800/40">
      <div i-carbon:time text-indigo-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>High expectation were established</div>
    <div text-sm opacity-70>Suddenly, performance improvements were set no matter what it really means. Performance was not measured before and now we want to increase it by XY %.</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid cyan-500" bg="cyan-800/40">
      <div i-carbon:security text-cyan-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>AI hackathlons & AI weeks</div>
    <div text-sm opacity-70>AI trainings, presentations and expectation were suddenly everywhere. But the results from first AI weeks were mostly disastrous.</div>
  </div>
</div>


</div>

::right::

<div mt-4 flex flex-col gap-0>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid cyan-500" bg="cyan-800/40">
      <div i-carbon:network-4 text-cyan-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>AI remained the dominant narrative for management</div>
    <div text-sm opacity-70>Performance improvements and savings were on everyone's lips on every occasion. It was all about riding the AI wave.</div>
  </div>
</div>

<div v-click flex gap-4 relative justify-center pl-13>
  <div flex flex-col items-center>
     <ZoomImage src="jensen-roland.jpg" rounded-lg border="2 solid white/10" shadow-lg w-64 h-auto/>
  </div>
</div>

</div>


---
layout: two-cols-header
layoutClass: py-10
glowSeed: 42
---

# Here comes the excitement

This is where trust holds.

::left::

<div mt-4 flex flex-col gap-0>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid emerald-500" bg="emerald-800/40">
      <div i-carbon:list-checked text-emerald-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>New models on ther block</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:location-hazard text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>All those fancy /commands and context</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div>We, managers, started to do magic things we had no time before</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div>We showed the team what we built. And we expected them to see the same opportunity we saw.</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid indigo-500" bg="indigo-800/40">
      <div i-carbon:compass text-indigo-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>But the response was...</div>
    <div text-sm opacity-70>These are scripts, applications, and management tasks. Not an embedded software with hard real-time requirements. Your examples do not prove that this will help us.</div>
  </div>
</div>


</div>

::right::

<div mt-4 flex flex-col gap-0 m-8>

<script setup lang="ts">
import CopilotChatReplay from './components/copilot-chat/CopilotChatReplay.vue'
import session from './components/copilot-chat/sessions/firmware-review-demo.json'
</script>

<CopilotChatReplay
  :sessions="[session]"
  theme="dark"
  style="height: 350px"
/>

</div>


---
glowSeed: 140
---

# Show it the hard way

<PromptBubble label="Employee feedback" pt-5>
“The teams said our examples did not address their work. And instead of listening carefully, we did what enthusiastic former programmers do: we decided to <b>impress them even more.</b>”
</PromptBubble>


<div flex gap-4 relative pt-15 pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid violet-500" bg="violet-800/40">
      <div i-carbon:chat text-violet-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>We answered a question about relevance with an **ABSURD** demonstration of capability</div>
    <div text-sm opacity-70>

- Run whole of our code in virtual environment? Overnight!
- Rewrite our TCP/IP stack from C to Rust? Overnight. This is fun!
- Fixing a bug the team is investigating the whole week? Look, I find it and fix it. Overnight! 

</div>
  </div>
</div>



---
class: py-10
glowSeed: 175
---

#  The CRUEL lessons

<div mt-8 flex flex-col gap-0 max-w-220>

<div v-click flex gap-4 relative pb-10>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:chart-evaluation text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>We intended to inspire people</div>
    <div text-sm opacity-70>We made them feel that we were dismissing the difficulty of their work.</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-10>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:face-dissatisfied text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>Their question was: ‘How does this help us deliver our product?’</div>
    <div text-sm opacity-70>Our answer was: ‘Look what else we can generate!’</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-10>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:tool-kit text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>The ultimate question that was in front of</div>
    <div text-sm opacity-70>How shall we move from individual excitement to useful change in an engineering team?</div>
  </div>
</div>

</div>



---
layout: section
glowSeed: 190
class: py-10
---

# 02 · Back to the school

Training makes perfect



---
layout: two-cols-header
glowSeed: 80
---

# We made AI part of professional competence

Impressive examples were not enough. We needed to help people learn to work with AI.

::left::

<div mt-4 flex flex-col gap-0>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:currency-dollar text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div font-bold>Task Framing</div>
    <div text-sm opacity-70>Define the goal, boundaries, constraints, and expected result.</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Context Engineering</div>
    <div text-sm opacity-70>Provide relevant, structured, approved information.</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Agent Enablement</div>
    <div text-sm opacity-70>Prepare tools, skills, prompts, and instructions.</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Autonomy Judgment</div>
    <div text-sm opacity-70>Decide what AI may do alone and where human control is needed.</div>
  </div>
</div>

</div>

::right::

<div mt-4 flex flex-col gap-0>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Verification & Evals</div>
    <div text-sm opacity-70>Check correctness and quality against real requirements.</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Orchestration</div>
    <div text-sm opacity-70>Connect steps into a controlled, repeatable workflow.</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:play text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div font-bold>Reliability & State</div>
    <div text-sm opacity-70>Preserve progress, decisions, and recoverability.</div>
  </div>
</div>

  <div v-click border="2 solid red-800" bg="red-800/20" rounded-lg overflow-hidden mt-4>
    <div bg="red-800/40" px-4 py-2 flex items-center>
      <div i-carbon:chip text-red-300 text-xl mr-2 />
      <span font-bold>We made this list "Competence Expectations"</span>
    </div>
    <div px-4 py-3 text-sm>
      But it did not work neither.
    </div>
  </div>

</div>


---
layout: two-cols-header
glowSeed: 15
---

# Learning needs a real task

Learning is supported practice on real work, not just access to courses.

<div mt-4 />

<div flex justify-center mt-12>
  <div
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    grid grid-cols-3 gap-4 w-full text-sm
  >
    <div
      v-click="1"
      border="2 solid yellow-800" bg="yellow-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="yellow-800/40" px-4 py-3 flex items-center>
        <div i-carbon:idea text-3xl mr-3 />
        <span font-bold>Real project need</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>One competence</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>One habit</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>One real task</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Clear evidence</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>The supprt needed</span>
        </div>
      </div>
    </div>
    <div
      v-click="2"
      border="2 solid cyan-800" bg="cyan-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
      mt-10
    >
      <div bg="cyan-800/40" px-4 py-3 flex items-center>
        <div i-carbon:3rd-party-connected text-3xl mr-3 />
        <span font-bold>Connect responsibilities</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Project leader</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Employee and team leader</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Employee</span>
        </div>
      </div>
    </div>
    <div
      v-click="3"
      border="2 solid blue-800" bg="blue-800/20"
      rounded-lg overflow-hidden transition-all duration-500
      :class="$clicks === 5 ? 'opacity-40' : ''"
    >
      <div bg="blue-800/40" px-4 py-3 flex items-center>
        <div i-carbon:user-feedback text-3xl mr-3 />
        <span font-bold>Make room for learning and review</span>
      </div>
      <div px-4 py-3 flex flex-col gap-2>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Value</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Quality</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Learning</span>
        </div>
        <div flex items-center gap-2>
          <div i-carbon:checkmark-outline text-green-400 />
          <span>Capacity</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  v-click="4"
  mt-4 transition-all duration-500
  :class="$clicks < 4 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'"
>
  <div flex items-center justify-center>
    <div relative>
      <div
        border="2 solid green-800" bg="green-800/20"
        rounded-lg p-4 w-full
      >
        <div text-center font-bold text-xl mb-3>Learning needs a relevant project purpose, focused practice, time and support, and evidence discussed in a Grow talk.</div>
      </div>
    </div>
  </div>
</div>




---
layout: two-cols-header
layoutClass: py-10
glowSeed: 96
---

# Get inspAIred - Learning from each other

How do we make useful experience available beyond the person who discovered it?

::left::

<div mt-4 flex flex-col gap-0>


<div flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid emerald-500" bg="emerald-800/40">
      <div i-carbon:list-checked text-emerald-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Present AI ideas and approaches (don't focus on result)</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:location-hazard text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Others can ask questions and discuss the approach</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Connect this sharing with our common repository of reusable agents, skills, prompts, and MCP integrations</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
  </div>
  <div pt-1>
    <div>Make individual discoveries available for others to explore and adapt</div>
  </div>
</div>



</div>

::right::

<div mt-4 flex flex-col gap-0 m-8>

<div flex gap-4 relative justify-center pl-13>
  <div flex flex-col items-center>
     <ZoomImage src="get-inspaired.jpg" rounded-lg border="2 solid white/10" shadow-lg h-auto/>
  </div>
</div>


</div>



---
layout: two-cols-header
layoutClass: py-10
glowSeed: 130
---

# AI Ambassadors - help closer to the work

Who helps people move from an interesting idea to applying it themselves?


::left::

<div mt-4 flex flex-col gap-0>


<div flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid emerald-500" bg="emerald-800/40">
      <div i-carbon:list-checked text-emerald-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Enthusiastic practitioners providing AI help and guidance</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:location-hazard text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>A human support layer alongside courses, learning paths, and tools</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Help colleagues connect AI approaches to their own tasks and constraints</div>
  </div>
</div>

<PromptBubble v-click label="" pt-5>
People need someone to turn to, not just something to watch or read.
</PromptBubble>


</div>

::right::

<div mt-4 flex flex-col gap-0 m-8>

<div flex gap-4 relative justify-center pl-13>
  <div flex flex-col items-center>
     <ZoomImage src="get-inspaired.jpg" rounded-lg border="2 solid white/10" shadow-lg h-auto/>
  </div>
</div>


</div>



---
layout: two-cols-header
layoutClass: py-10
glowSeed: 130
---

# Coachee - private feedback loop

How can people see what to improve in the way they work with AI?


::left::

<div mt-4 flex flex-col gap-0>


<div flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid emerald-500" bg="emerald-800/40">
      <div i-carbon:list-checked text-emerald-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Our internal fork of Microsoft's AI Engineering Coach with MANY improvements</div>
  </div>
</div>

<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:location-hazard text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Observe habits, reflect, try one improvement, optionally share</div>
  </div>
</div>


<div v-click flex gap-4 relative pb-5>
  <div flex flex-col items-center>
    <div w-9 h-9 rounded-full flex items-center justify-center shrink-0 border="2 solid pink-500" bg="pink-800/40">
      <div i-carbon:ai-status-rejected text-pink-300 />
    </div>
    <div w-px flex-1 bg="white/15" />
  </div>
  <div pt-1>
    <div>Core analytics stay local. Sharing is your choice.</div>
  </div>
</div>

<PromptBubble v-click label="" pt-5>
A mirror for how we work with AI, not a scoreboard for people.
</PromptBubble>


</div>

::right::

<div mt-4 flex flex-col gap-0 m-8>

<div flex gap-4 relative justify-center>
  <div flex flex-col items-center>
     <ZoomImage src="coachee-1.png" rounded-lg border="2 solid white/10" shadow-lg h-auto/>
  </div>
</div>


</div>

<!--
We adapted Microsoft's open-source AI Engineering Coach into our internal
Coachee fork, adding learning, effectiveness, and competence-related features.
It is not an official Siemens product.

The reflection loop is Observe -> Reflect -> Improve -> optionally Share.
Review local sessions for context use, review behaviour, and repeated patterns.
Choose one useful finding and try a concrete action: better context, stronger
checks, fewer open threads, or a reusable skill. Share the method if useful;
private session data does not need to be shared.

The learning area connects Updates, Develop, Practice, and Progress.
Reading alone does not change an observed competence stage; later work
provides the evidence. Adoption levels and competence stages are indicative
guidance, not organizational role assessments.

Anti-patterns, context health, and signals of intent, validation, review,
and closure are heuristics, not proof of thorough review or engineering
correctness. Coachee is not a performance or mental-health rating.

Core analytics stay local, but not every feature is offline: optional
AI-assisted features use the configured model provider, and learning
discovery makes network requests. Sharing remains the employee's choice.
-->





---
layoutClass: py-10
glowSeed: 150
---

# Coachee - live demo

How can people see what to improve in the way they work with AI?

<div mt-4 flex flex-col gap-0 m-8>

<div grid grid-cols-3 gap-4>
  <div flex flex-col items-center>
     <ZoomImage src="coachee-2.png" rounded-lg border="2 solid white/10" shadow-lg max-w-full h-auto/>
  </div>
  <div flex flex-col items-center>
     <ZoomImage src="coachee-3.png" rounded-lg border="2 solid white/10" shadow-lg max-w-full h-auto/>
  </div>
  <div flex flex-col items-center>
     <ZoomImage src="coachee-4.png" rounded-lg border="2 solid white/10" shadow-lg max-w-full h-auto/>
  </div>
</div>


</div>




---
layout: two-cols-header
layoutClass: py-10
glowSeed: 130
---

# From learning AI to delivering better work

<div mt-7 grid grid-cols-3 items-center text-center>
  <div px-3 py-4 rounded-xl border="1 solid emerald-500/40" bg="emerald-800/20">
    <div i-carbon:idea mx-auto text-3xl text-emerald-300 />
    <div mt-2 font-bold text-lg>AI skills</div>
    <div text-sm opacity-75>Training, sharing, feedback</div>
  </div>
  <div relative>
    <div absolute inset-0 flex items-center justify-center gap-2 aria-hidden="true" :class="{ 'opacity-0': $clicks >= 1 }">
      <div flex-1 border="t dashed white/25" />
      <span text="xs white/65" tracking-wide uppercase>The missing link</span>
      <div flex-1 border="t dashed white/25" />
    </div>
    <div v-click="1" flex items-center>
      <div w-6 h-px bg-cyan-400 shrink-0 />
      <div flex-1 px-2 py-3 rounded-xl border="1 solid cyan-400/80" bg="cyan-900/45" class="shadow-[0_0_24px_rgba(34,211,238,0.25)]">
        <div text-xs uppercase tracking-wide text-cyan-200>What we started trying</div>
        <div mt-1 font-bold text-lg>Project managers + team</div>
        <div text-sm text-cyan-100>Agree what should improve</div>
      </div>
      <div w-6 h-px bg-cyan-400 shrink-0 relative>
        <div i-carbon:chevron-right absolute right-0 top="-2" text-cyan-300 />
      </div>
    </div>
  </div>
  <div px-3 py-4 rounded-xl border="1 solid violet-400/45" bg="violet-800/20">
    <div i-carbon:flag mx-auto text-3xl text-violet-300 />
    <div mt-2 font-bold text-lg>Project outcomes</div>
    <div text-sm opacity-75>Check whether it improved</div>
  </div>
</div>

<div v-click="2" mt-6 mx-auto max-w-180>
  <div mb-2 text-xs uppercase tracking-wide text-cyan-200>Illustrative example · Make the next step clear</div>
  <div grid grid-cols-12 items-center gap-3 text-sm leading-snug>
    <div col-span-4 self-stretch px-3 py-2 rounded-lg border="1 solid white/15" bg="white/5">
      <div flex items-center gap-2 mb-1 font-bold><span i-carbon:document /> Meeting notes</div>
      <div opacity-75>“Look into slow startup.”</div>
    </div>
    <div i-carbon:arrow-right mx-auto text-2xl text-cyan-300 />
    <div col-span-7 px-3 py-2 rounded-lg border="1 solid cyan-400/40" bg="cyan-900/25">
      <div flex items-center gap-2 mb-1 font-bold><span i-carbon:list-checked /> Backlog item</div>
      <div>Measure startup time on the test device.</div>
      <div text-cyan-200>Done when the baseline and slowest step are recorded.</div>
    </div>
  </div>
</div>

<PromptBubble v-click="3" label="Takeaway" mt-3>
Set the outcome together. Let the team choose the method.
</PromptBubble>

<!--
We defined what people should learn and supported them with training, peer
sharing, and feedback. We still needed to connect those skills to project needs.
When we discussed a shared code-review agent, we found ourselves asking whether
the same rules made sense for every task.

We started exploring the link with project managers: pick a real priority, not
a request to “use AI,” and agree with the team on what better looks like and how
to check it. We began with their own work: could AI help turn meeting notes into
backlog items the team could act on? The startup example illustrates the idea;
it isn't a reported project result.
-->


---
layout: two-cols-header
layoutClass: py-10
glowSeed: 130
---

# We assess projects, not prompt counts

How do we know whether individual AI experiments are becoming useful team practice?


---
layout: section
glowSeed: 190
class: py-10
---

# 03 · Personal lessons

What your managers will (probably) never tell you



---
layoutClass: py-10
glowSeed: 130
---

# Speed of coding is not a problem

<DeliveryFlowPipeline />


---
layout: default
class: px-12 py-9
glowSeed: 130
clicks: 4
---

# Polished does not mean correct

<div class="polished-story" :class="{ 'polished-reviewed': $clicks >= 3, 'polished-concluded': $clicks >= 4 }">
  <div class="polished-board">
    <div class="polished-card polished-request">
      <div class="polished-label">Your request</div>
      <div class="polished-prompt">“Make this firmware<br>code faster.”</div>
      <div v-click="2" class="polished-constraints">
        <div class="polished-label">What I didn't mention</div>
        <div class="polished-spec"><span>01</span> No dynamic allocation permitted</div>
        <div class="polished-spec"><span>02</span> Hard real-time deadline</div>
        <div class="polished-spec"><span>03</span> Tight RAM budget</div>
      </div>
    </div>
    <div v-click="1" class="polished-arrow" aria-label="Sent to AI">
      <span>AI</span>
      <div i-carbon:arrow-right text-4xl />
    </div>
    <div v-click="1" class="polished-card polished-result">
      <div class="polished-sticker">Looks mergeable!</div>
      <div class="polished-label">AI-generated solution</div>
      <div class="polished-solution">Added a lookup cache<br>backed by heap memory.</div>
      <div class="polished-benchmark"><span i-carbon:checkmark /> Faster on the benchmark</div>
      <div v-click="3" class="polished-review">
        <div><span i-carbon:close /> Heap allocation prohibited</div>
        <div><span i-carbon:help /> Worst-case timing unproven</div>
        <div><span i-carbon:help /> RAM budget not checked</div>
        <div class="polished-verdict">Not acceptable as delivered.</div>
      </div>
    </div>
  </div>
  <div v-click="4" class="polished-takeaway">
    <div>AI amplifies your specification. <strong>Including its gaps.</strong></div>
    <div class="polished-footnote">Data + context + goal + constraints → better starting point. Verification still required.</div>
  </div>
</div>

<style>
.polished-story {
  margin-top: 24px;
}
.polished-board {
  display: grid;
  grid-template-columns: 1fr 60px 1.08fr;
  gap: 16px;
  height: 306px;
  transition: opacity 400ms ease;
}
.polished-card {
  position: relative;
  padding: 22px;
  border: 1px solid #ffffff24;
  border-radius: 16px;
  background: #ffffff06;
}
.polished-label {
  margin-bottom: 14px;
  color: #ffffff80;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.polished-prompt,
.polished-solution {
  font-size: 23px;
  line-height: 1.35;
}
.polished-constraints {
  margin-top: 24px;
  padding-top: 17px;
  border-top: 1px dashed #f9a8d44d;
}
.polished-constraints .polished-label {
  margin-bottom: 12px;
  color: #f9a8d4;
}
.polished-spec {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-size: 14px;
}
.polished-spec > span {
  color: #f9a8d4;
  font-size: 10px;
  font-family: monospace;
}
.polished-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 66px;
  color: var(--siemens-bright-petrol);
  font-size: 12px;
  letter-spacing: 0.12em;
}
.polished-result {
  border-color: #00cccc55;
  background: #00cccc08;
  transition: border-color 400ms ease, background 400ms ease;
}
.polished-sticker {
  position: absolute;
  top: -13px;
  right: 14px;
  padding: 5px 11px;
  border: 1px solid #00cccc80;
  border-radius: 6px;
  background: #073637;
  color: #9ff;
  font-size: 12px;
  font-weight: 600;
  transform: rotate(5deg);
}
.polished-benchmark {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 15px;
  padding: 5px 9px;
  border-radius: 6px;
  background: #00cccc18;
  color: #67e8f9;
  font-size: 13px;
  transition: opacity 400ms ease;
}
.polished-review {
  margin-top: 16px;
  font-size: 14px;
  line-height: 1.5;
}
.polished-review > div {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}
.polished-review span {
  flex-shrink: 0;
  color: #f9a8d4;
}
.polished-review .polished-verdict {
  margin-top: 12px;
  color: #f9a8d4;
  font-size: 17px;
  font-weight: 700;
}
.polished-reviewed .polished-result {
  border-color: #f9a8d466;
  background: #f9a8d408;
}
.polished-reviewed .polished-benchmark {
  opacity: 0.45;
}
.polished-reviewed .polished-sticker {
  border-color: #f9a8d480;
  background: #3b1730;
  color: #f9a8d4;
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}
.polished-concluded .polished-board {
  opacity: 0.55;
}
.polished-takeaway {
  margin-top: 21px;
  text-align: center;
  font-size: 23px;
}
.polished-takeaway strong {
  color: var(--siemens-bright-green);
}
.polished-footnote {
  margin-top: 8px;
  color: #ffffff90;
  font-size: 12px;
}
</style>

<!--
Start: Let's give AI a simple engineering task.
[click] The benchmark improves. Nice explanation. Convincing result.
[click] Except this is our firmware. Those constraints were obvious - to me.
[click] It optimized what I asked for. It didn't establish what our product requires.
The benchmark does not prove worst-case timing; we are not claiming a measured deadline miss.
[click] We gave it an incomplete problem and got a polished answer to an incomplete problem.
Good inputs improve the starting point. They do not remove our responsibility to verify.
-->

---
layout: default
class: px-12 py-9
glowSeed: 130
clicks: 3
---

# AI is an amplifier. Not an authority.

<div class="judgement-summary">
  <div class="judgement-premise">
    <div class="judgement-quote">Garbage in, garbage out...</div>
    <div class="judgement-caveat">But good input does not guarantee a correct result.</div>
  </div>
  <div class="judgement-checks">
    <div v-click="1" class="judgement-check">
      <div class="judgement-step"><span>01</span> Before generation</div>
      <div class="judgement-heading">Frame the problem</div>
      <div class="judgement-detail">Provide useful data, context,<br>a clear goal and constraints.</div>
    </div>
    <div v-click="2" class="judgement-check">
      <div class="judgement-step"><span>02</span> Before acceptance</div>
      <div class="judgement-heading">Challenge the answer</div>
      <div class="judgement-detail">Question assumptions.<br>Understand system consequences.</div>
    </div>
    <div v-click="3" class="judgement-check judgement-verification">
      <div class="judgement-step"><span>03</span> Before delivery</div>
      <div class="judgement-heading">Verify the result</div>
      <div class="judgement-detail">Review and test against<br>real product requirements.</div>
    </div>
  </div>
  <div v-click="3" class="judgement-ownership">
    <div>AI can amplify my ideas. <span>And my mistakes.</span></div>
    <strong>I remain responsible for what I accept and deliver.</strong>
  </div>
</div>

<style>
.judgement-summary {
  margin-top: 27px;
}
.judgement-premise {
  padding-left: 18px;
  border-left: 3px solid #f9a8d4;
}
.judgement-quote {
  color: #f9a8d4;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.3;
}
.judgement-caveat {
  margin-top: 9px;
  color: #ffffffb3;
  font-size: 17px;
}
.judgement-checks {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 28px;
}
.judgement-check {
  padding: 21px 18px;
  border: 1px solid #ffffff24;
  border-radius: 14px;
  background: #ffffff06;
}
.judgement-step {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #ffffff80;
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.judgement-step span {
  color: var(--siemens-bright-petrol);
  font-family: monospace;
  font-size: 13px;
}
.judgement-heading {
  margin-top: 17px;
  font-size: 20px;
  font-weight: 600;
}
.judgement-detail {
  margin-top: 10px;
  color: #ffffffb3;
  font-size: 14px;
  line-height: 1.6;
}
.judgement-verification {
  border-color: #00ffb955;
  background: #00ffb908;
}
.judgement-ownership {
  margin-top: 29px;
  text-align: center;
  font-size: 18px;
}
.judgement-ownership span {
  color: #f9a8d4;
}
.judgement-ownership strong {
  display: block;
  margin-top: 9px;
  color: var(--siemens-bright-green);
  font-size: 23px;
}
</style>

<!--
I find it useful to think of AI as an amplifier, not an authority.
Garbage in, garbage out - but the reverse is not a guarantee.
[click] Useful context, data, a clear goal and constraints improve my starting point.
[click] When my assumptions are wrong, AI can take me further in the wrong direction, very quickly.
I still need enough understanding to recognize architectural consequences and challenge the answer.
[click] Generating an answer is not evidence that it is correct.
Engineering judgement, review and verification remain my responsibility.
-->

---
layout: default
class: px-12 py-9
glowSeed: 130
clicks: 3
---

# Is AI a good tool for everyone?

<div class="role-shift" :class="{ 'role-shift-ai': $clicks >= 1, 'role-shift-judgement': $clicks >= 2 }">
  <div class="role-shift-premise">We built teams where a few people defined the work and many implemented it.</div>
  <div class="role-shift-flow">
    <div class="role-shift-card role-shift-define">
      <div class="role-shift-step"><span>01</span> Open-ended problem</div>
      <div class="role-shift-heading">Define the work</div>
      <div class="role-shift-detail">Investigate, weigh trade-offs, and decide what good looks like.</div>
      <div v-click="2" class="role-shift-label">Someone still has to make the call.</div>
    </div>
    <span class="role-shift-arrow" aria-hidden="true">&rarr;</span>
    <div class="role-shift-card role-shift-implement">
      <div class="role-shift-step"><span>02</span> Clear specification</div>
      <div class="role-shift-heading">Implement the decision</div>
      <div class="role-shift-detail">Turn agreed requirements into working code.</div>
      <div v-click="1" class="role-shift-label">AI can speed up this part.</div>
    </div>
  </div>
  <div v-click="3" class="role-shift-takeaway">
    <strong>We may need fewer roles focused mainly on implementation.</strong>
    <div>Some good developers may not want to make that shift. Others may try and struggle.</div>
  </div>
</div>

<style>
.role-shift {
  margin-top: 27px;
}
.role-shift-premise {
  padding-left: 18px;
  border-left: 3px solid var(--siemens-bright-petrol);
  color: #ffffffd9;
  font-size: 20px;
  line-height: 1.45;
}
.role-shift-flow {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 44px minmax(0, 1fr);
  align-items: center;
  margin-top: 26px;
}
.role-shift-card {
  align-self: stretch;
  padding: 20px;
  border: 1px solid #ffffff24;
  border-radius: 14px;
  background: #ffffff06;
  transition: border-color 240ms ease, background-color 240ms ease;
}
.role-shift-step {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #ffffff99;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.role-shift-step span {
  color: var(--siemens-bright-petrol);
  font-family: monospace;
  font-size: 13px;
}
.role-shift-heading {
  margin-top: 12px;
  font-size: 24px;
  font-weight: 600;
}
.role-shift-detail {
  margin-top: 6px;
  color: #ffffffb3;
  font-size: 16px;
  line-height: 1.45;
}
.role-shift-arrow {
  color: #ffffff80;
  text-align: center;
  font-size: 26px;
}
.role-shift-label {
  margin-top: 15px;
  font-size: 15px;
  font-weight: 600;
}
.role-shift-ai .role-shift-implement {
  border-color: #00ffb955;
  background: #00ffb908;
}
.role-shift-implement .role-shift-label {
  color: var(--siemens-bright-green);
}
.role-shift-judgement .role-shift-define {
  border-color: #6de5df66;
  background: #6de5df0d;
}
.role-shift-define .role-shift-label {
  color: var(--siemens-bright-petrol);
}
.role-shift-takeaway {
  margin-top: 25px;
  padding: 12px 17px;
  border-left: 3px solid #f9a8d4;
  background: #f9a8d40d;
  font-size: 16px;
  line-height: 1.45;
}
.role-shift-takeaway strong {
  display: block;
  margin-bottom: 4px;
  color: #f9a8d4;
  font-size: 21px;
}
</style>

<!--
We built teams where a few people defined the work and many implemented it. I trust some developers to deliver against a clear spec, but I've seen them struggle when I give them a problem instead of a spec.
[click] AI can speed up implementation when the task is well specified. It doesn't take all the hard work out of implementing and testing firmware.
[click] Someone still has to investigate and own the trade-offs. In one DMA fix, moving code to uncached memory made the symptom go away but slowed the system down. On a separate task, I gave a developer example prompts. They didn't understand the prompt, couldn't write one themselves, and didn't spot that the AI output was unusable. I'd given them more instructions, not a way to investigate.
[click] If we can get the same implementation work done with fewer people, we may need fewer roles built around it. That puts some good developers in a difficult position. They haven't got worse at their jobs; the work may be changing. As managers, we spent years rewarding people for delivering what we asked for. We owe them a real chance to practise solving open-ended problems, but I don't expect everyone to want that work or everyone who tries to make the transition.
-->

---
layout: default
class: px-12 py-9
glowSeed: 130
clicks: 3
---

# What should I do next?

<div class="mars-learning">
  <div class="mars-traverse">
    <svg class="mars-scene" viewBox="0 0 448 228" role="img" aria-label="Illustration of NASA’s Curiosity rover crossing Mars along a four-waypoint route">
      <defs>
        <linearGradient id="learning-mars-ground" x2="0" y2="1">
          <stop offset="0" stop-color="#ad584d" stop-opacity=".67" />
          <stop offset="1" stop-color="#301e31" stop-opacity=".08" />
        </linearGradient>
        <linearGradient id="learning-rover-deck" x2="0" y2="1">
          <stop offset="0" stop-color="#e5ddd0" />
          <stop offset="1" stop-color="#a69e96" />
        </linearGradient>
        <g id="learning-rover-wheel">
          <path d="M-7-10H0V10H-7C-17 10-17-10-7-10Z" fill="#35424b" stroke="#99a6a5" stroke-width=".8" />
          <path d="M-11-8h6m-9 4h6m-7 4h6m-5 4h6m-3 4h6" fill="none" stroke="#a1aaa9" stroke-width="1" />
          <ellipse rx="7.5" ry="10" fill="#18252f" stroke="#b7c1bd" stroke-width="1" />
          <ellipse rx="5" ry="7" fill="none" stroke="#7c8e96" stroke-width=".8" />
          <path d="M0-7V7M-5 0H5M-3.5-5l7 10m0-10-7 10" stroke="#7c8e96" stroke-width=".65" />
          <ellipse rx="2.3" ry="3" fill="#d0c4af" />
        </g>
      </defs>
      <path d="M8 179 64 154 111 161 174 118 207 131 270 88 313 98 362 65 442 95V228H8Z" fill="url(#learning-mars-ground)" />
      <path d="M8 179 64 154 111 161 174 118 207 131 270 88 313 98 362 65 442 95M8 203l67-19 38 4 79-46 47 4 60-35 40 4 29-17 74 14M148 218l48-23 30 3 74-44 51-9 41-25 50 12" fill="none" stroke="#d58a71" stroke-opacity=".48" />
      <path d="M36 205 111 190 228 150 351 107" fill="none" stroke="#f5b28e" stroke-width="1.5" stroke-dasharray="4 6" />
      <g v-for="(point, index) in [[36, 205], [111, 190], [228, 150], [351, 107]]" :key="index" class="mars-stop" :class="{ 'mars-stop-reached': $clicks >= index }" :transform="`translate(${point[0]}, ${point[1]})`">
        <circle r="12" />
        <text text-anchor="middle" y="4">{{ index + 1 }}</text>
      </g>
      <g class="mars-rover" :style="{ '--rover-position': ['0px, 120px', '53px, 105px', '170px, 65px', '293px, 22px'][Math.min($clicks, 3)] }">
        <g opacity=".82">
          <use href="#learning-rover-wheel" x="18" y="40" />
          <use href="#learning-rover-wheel" x="57" y="35" />
          <use href="#learning-rover-wheel" x="95" y="30" />
        </g>
        <g stroke="#192632" stroke-width="1.2" stroke-linejoin="round">
          <path d="M9 27 31 9 99 5 116 16 94 33Z" fill="url(#learning-rover-deck)" />
          <path d="M9 27 94 33 94 46 16 41Z" fill="#9a8978" />
          <path d="M94 33 116 16 114 33 94 46Z" fill="#c0b3a2" />
          <path d="M26 22 41 13 65 12 52 23ZM63 24 78 11 94 10 103 16 90 26Z" fill="#556471" />
          <path d="M32 32l19 1v8l-19-2Zm30 2 22 2v7l-22-2Z" fill="#36454f" />
          <path d="m35 35 13 1m-13 1 13 1m18-1 14 1m-14 1 14 1" fill="none" stroke="#b9c2bd" stroke-width=".75" />
          <path d="m100 33 10-8-1 5-9 8Z" fill="#253540" />
          <path d="M12 24 29 10 38 11 38 16 22 29Z" fill="#737e84" />
          <path d="m16 23 14-11m-10 13 14-12m-11 14 14-12" fill="none" stroke="#ccc4b3" stroke-width=".9" />
          <path d="M51 17V9m-8 0 14-4 8 2-14 5Z" fill="#c5b8a2" stroke="#657781" />
          <path d="M72 24 74 1 73-9 81-9 81 4 79 24Z" fill="#c8bdac" />
          <path d="M68-10 81-14 90-11 90-4 78 0 68-3Z" fill="#d8cbb8" />
          <path d="m78-7 12-4v7L78 0Z" fill="#3a4b58" />
          <circle cx="85" cy="-6" r="2.1" fill="#65f2ce" stroke="none" />
        </g>
        <path d="M57 39 43 48 31 55M43 48 68 53M57 39 86 40 104 50M109 33 121 40 129 34" fill="none" stroke="#28323d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M57 39 43 48 31 55M43 48 68 53M57 39 86 40 104 50M109 33 121 40 129 34" fill="none" stroke="#d4bc9d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="57" cy="39" r="2.6" fill="#c3c8c1" stroke="#354652" />
        <path d="m126 32 5-2 3 4-5 3Z" fill="#a9b4b6" stroke="#394d58" />
        <use href="#learning-rover-wheel" x="31" y="55" />
        <use href="#learning-rover-wheel" x="68" y="53" />
        <use href="#learning-rover-wheel" x="104" y="50" />
      </g>
      <text x="13" y="24" class="mars-caption">CURIOSITY · MARS TRAVERSE</text>
    </svg>
    <ol class="mars-waypoints">
      <li><span>01</span><div><strong>Don’t wait for a map</strong><small>Start before you have all the answers.</small></div></li>
      <li v-click="1"><span>02</span><div><strong>Pick a real problem</strong><small>Start with something you don’t know how to solve.</small></div></li>
      <li v-click="2"><span>03</span><div><strong>Run a small experiment</strong><small>Use AI where it helps. Measure what actually happens.</small></div></li>
      <li v-click="3"><span>04</span><div><strong>Explain what you learned</strong><small>What failed, what changed your mind, and what’s next?</small></div></li>
    </ol>
  </div>
  <div class="mars-quote" role="blockquote">“Don’t start with ‘give me time to experiment.’ Bring me a real problem, the smallest useful test, and what its result would help you decide. If it’s worth doing, I’ll help make room for it.”</div>
</div>

<style>
.mars-learning {
  margin-top: 19px;
}
.mars-traverse {
  display: grid;
  grid-template-columns: 1.06fr 1fr;
  align-items: center;
  gap: 30px;
  margin: 17px 0 18px;
}
.mars-scene {
  display: block;
  width: 100%;
}
.mars-caption,
.mars-stop text {
  font-family: monospace;
  font-size: 11px;
}
.mars-caption {
  fill: #f5b28e;
  letter-spacing: 2px;
}
.mars-stop circle {
  fill: #282331;
  stroke: #ad7e76;
}
.mars-stop text {
  fill: #edd4cc;
}
.mars-stop-reached circle {
  fill: #65f2ce;
  stroke: #65f2ce;
}
.mars-stop-reached text {
  fill: #141b25;
}
.mars-rover {
  transform: translate(var(--rover-position));
  transition: transform 480ms ease;
}
.mars-waypoints {
  display: grid;
  gap: 19px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.mars-waypoints li {
  display: grid;
  grid-template-columns: 32px 1fr;
  margin: 0;
  line-height: 1.35;
}
.mars-waypoints span {
  margin-top: 4px;
  color: var(--siemens-bright-petrol);
  font: 14px monospace;
}
.mars-waypoints strong,
.mars-waypoints small {
  display: block;
}
.mars-waypoints strong {
  font-size: 20px;
}
.mars-waypoints small {
  margin-top: 3px;
  color: #ffffffb3;
  font-size: 15px;
}
.mars-quote {
  padding-left: 16px;
  border-left: 3px solid #f9a8d4;
  color: #f9c6df;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.45;
}
@media (prefers-reduced-motion: reduce) {
  .mars-rover {
    transition: none;
  }
}
</style>

<!--
Don't wait for a map. We don't know exactly how our roles will change. Curiosity doesn't just drive around Mars: it asks a question, makes a measurement, and uses the answer to choose its next move.
[click] Start with your next real task, not the next AI tool. Take on a problem you'd usually wait for someone else to define.
[click] Bring me the smallest useful test and tell me what decision it would help you make. If it's worth doing, I'll help make room for it.
[click] Come back and explain the problem from the system down to the code. Tell me what you tried, where you got stuck, what the evidence showed, and why you'd take the next step. Ruling out a plausible cause counts as progress, even if the bug is still open.
Experimenting won't guarantee your next role. It will help you find where you can contribute before you have to make that choice under pressure.
-->

<!-- QUESTIONS -->
---
class: py-10
hideWatermark: true
---

<RetroGhosts
  :initial-count="3"
  :max-count="12"
  :initial-delay="6000"
  :appearance-interval="2900"
  :fade-in-duration="1000"
  :movement-speed="38"
  :size="42"
/>


<div flex>
  <div flex-1>
    <div mt-50 />
    <div text="[48px]">
      Thank you
    </div>
    <div mt-4 text-lg opacity-70>Questions?</div>
  </div>
  <!--
  <div text-sm text="zinc-300" text-right flex flex-col gap-3 mt-3>
    <div>
      Martin Sveda
    </div>
    <div>
      Slides built on top of <a href="https://sli.dev"><div inline-block mr-1 translate-y-0.8 i-logos:slidev />sli.dev</a>
    </div>
    <div opacity-50 max-w-100>
      Internal use only — bug/PBI numbers and codenames kept for authenticity, names of colleagues replaced with role descriptions
    </div>
  </div>
  -->
</div>


