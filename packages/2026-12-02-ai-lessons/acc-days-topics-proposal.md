I was asked by a friend who works in company SolarWinds if I want to join their Accelerate Tech Days and have a presentation about how Siemens rides  the wave of AI.

My goal is to share the Siemens approach, how our way evolved, lessons learned, good and bad examples and what I think is vital so one can succeed in this fast pacing world.



# Title: AI adoption beyond demo: Lessons from industrial R&D
Subtitle: Closing the gap between management enthusiasm, impressive individual experiments, and actual engineering-team adoption.


## Opening

Who am I and what organization I represent.

Put a slide with my photo, name and current employer and my roles in organization. 

- say the person in this photo is me — with a little help from AI. But today I want to talk about something harder than improving my photo: improving how we work.

My roles:
- I lead our Brno R&D office, with about forty engineers working on industrial automation. 
- I also manage FW delivery of the ET 200SP project - Siemens flagship product in industrial I/O automation 
- and I help promote AI adoption in our organization.


So I experience AI from three directions: the excitement of an engineer, the expectations of a manager, and the responsibility of helping other people use it.

This is not the story of everything Siemens does with AI. It is the story of what happened around me — what we tried, what disappointed us, and what we started to learn.


## The world I work in

But first lets start with explanation of my environment and the world live in.

This is the product I work on for most of my career in Siemens. 

ET 200SP:
- interface module that collects and provides I/O data in industrial automation
- it is a product with HARD real time requirements
- its cycle time goes down to 250us and it must be able to set and read all data on its inputs and outputs
- below the surface lies a hard real time operating system
- industrial real time communication bus - Profinet that runs on XXX layer of ISO/OSI model of Ethernet
- development stack is mostly C and C++ for FW developers
- Python and C# for developers in test automation
- CI/CD and HILs

Typial learning curve in this complex environment is 1-2 years before a senior developer can become really productive.

And these days another layer has been added to this complexity and this is the security - secure communicaiton and product security in all flavors.



## The journey begins

To understand that journey, let me start with why some of us became so excited.

It all started about 2 years ago with boom of Open AI ChatGPT and other first tools - at that time it was mostly web chat application and first integrations of those tools into VS Code
  
- It caught attention by top managemant as a way to improve productivity a faster time to market of our products

- High expectations were set about how much percent we shall gain in productivity no matter what the word means and how the productivity is measured

- We had AI week session with first models in VS code but it was not working well - The main complaints were about the size of workspace or context it can use. The model forget information and did not performe well. People were not satisfied and this was a big DISILLUSIONMENT. ut I think it was also largely that we cannot use it well

- Then there was a time period with mostly silence before the storm

- Management still kept talking about AI and all those improvements and savings etc., but nobody really saw any tangible results

- But overall our first experiments were not very convincing. The tools struggled with our workspaces and context, and people came away disappointed.


## Here comes the excitement 

- Something has changed... there were visible changes in VS code chat windows, all those fancy #commands, better work with context

- New models on the block - there came Claude Opus and results changed

- And we started to be awake all night and coding and coding.

- Many of the managers around me are former developers. We still have ideas for tools and applications — but usually not the time to build them.

- Suddenly, the distance between ‘I wish we had this’ and a working first version became much shorter.

- We built scripts. We automated some of our own work. We stayed up late because building things was fun again.


- We showed the teams what we had built. And we expected them to see the same opportunity we saw.

- But the response was: these are scripts, applications, and management tasks. We develop embedded software with hard real-time requirements. Your examples do not prove that this will help us.”

- We were surprised by the answer.

“The teams said our examples did not address their work. And instead of listening carefully, we did what enthusiastic former programmers do: we decided to impress them even more.”

- We answered a question about relevance with an **ABSURD** demonstration of capability...
  - You think that having our whole code to be migrated to virtual environmemnt is impossible? Overnight!
  - You think that having our TCP/IP stack written in C is fun? Lets rewrite it to Rust. Overnight. This is fun!
  - You look into bug and trying to fix it almost whole week. Look, I find it. And fix it. Overnight!

- But the response was even harder: these are scripts, applications, management tasks, cherry-picked problems and sometimes completely useless examples.
-  We develop embedded software with hard real-time requirements. Your examples do not prove that this will help us.”


**“We intended to inspire people. Sometimes, I suspect, we made them feel that we were dismissing the difficulty of their work."**

**“Their question was: ‘How does this help us deliver our product?’ Our answer was: ‘Look what else we can generate!’”**

“And that was fair.

We had demonstrated that AI could help us with our tasks. We had not yet demonstrated how it could help them with theirs.”

**So the ultimate question that was in front of us was: How shall we move from individual excitement to useful change in an engineering team?**


## Learning and competence model

Chapter purpose: explain how we built support for AI competence and learning, then identified the need to connect it more firmly to project delivery.

Scope: this describes our approach in FT D AS IO Czechia, not a company-wide Siemens policy.

Story order: professional competence -> supported practice -> experience sharing -> human guidance -> private feedback -> the delivery gap -> involving project managers -> project assessment. This explains the logic of the approach, not necessarily the exact chronology of every initiative.

Transition into the chapter:

> "We realized that impressive examples were not enough. So we started building something more systematic - not just showing people AI, but helping them learn to work with it."

### Slide 1 proposal: We made AI part of professional competence

**Question:** What does using AI competently mean in our engineering organization?

**What it shall answer:** AI competence is part of normal professional expectations, not a separate badge or a target for how much AI somebody uses.

**Bullets:**

- We added seven shared AI competences to five role profiles: FW Developer, Integration Tester, FW Team Leader, Test Team Leader, and Project Leader.
- The seven competences:
  - **Task Framing:** define the goal, boundaries, constraints, and expected result.
  - **Context Engineering:** provide relevant, structured, approved information.
  - **Agent Enablement:** prepare tools, skills, prompts, and instructions.
  - **Autonomy Judgment:** decide what AI may do alone and where human control is needed.
  - **Verification & Evals:** check correctness and quality against real requirements.
  - **Orchestration:** connect steps into a controlled, repeatable workflow.
  - **Reliability & State:** preserve progress, decisions, and recoverability.
- All seven apply at every role level. What changes is independence and responsibility:
  - **Candidate:** follow an agreed method with support.
  - **Independent role:** choose the appropriate method, context, autonomy, and checks.
  - **Senior:** improve methods for others, handle difficult cases, and coach colleagues.
- AI does not replace domain expertise, engineering ownership, or our quality standards.

**Main message:** "Progress means becoming more capable and responsible with AI, not simply using it more."

**Suggested visual:** Three columns: follow the method / choose the method / improve the method. Show the seven competences as a shared foundation underneath.

**Preparation note:** These are organizational role levels, not Coachee's indicative L0-L5 adoption levels. The detailed AI criteria use largely shared wording; the strategy presentation explains the progression in independence.

### Slide 2 proposal: Learning needs a real task

**Question:** How do learning materials turn into useful capability in daily work?

**What it shall answer:** Learning needs a relevant project purpose, focused practice, time and support, and evidence discussed in a Grow talk.

**Bullets:**

- Start from a real project need or bottleneck, not from a tool demonstration.
- In a Grow talk, agree **one competence + one work habit + one real task + clear evidence + the support needed**.
- Connect responsibilities:
  - **Project leader:** defines the needed outcome, priority, limits, and project evidence.
  - **Employee and team leader:** agree practice, coaching, mentoring, and capacity.
  - **Employee:** applies the method, checks the result, and brings evidence back to the project.
- Support this with learning materials, courses, pairing, and guidance from colleagues.
- Make room for learning and review. If AI saves effort, the benefit can go into **value, quality, learning, or capacity** - not automatically more personal workload.

**Main message:** "Learning is supported practice on real work, not just access to courses."

**Suggested visual:** Project need -> Grow talk -> supported practice -> tested result -> reflection and reuse.

**Example to explain:** A recurring firmware-reset investigation becomes a learning task: write an initial hypothesis, ask AI to challenge it using relevant context, then verify the chosen explanation on the real system.

**Preparation note:** This is the intended learning loop. Explain the project leader's contribution in more detail when project managers enter the story; do not imply that the loop is already established in every project.

### Slide 3 proposal: Get AInspired - learning from each other

**Question:** How do we make useful experience available beyond the person who discovered it?

**What it shall answer:** Internal experience sharing gives colleagues starting points they can question, explore, and adapt to their own work.

**Suggested narration:**

> "Courses gave people a starting point. But we also wanted people to learn from colleagues working in our own environment.
>
> So we introduced Get AInspired - our internal tech-talk sessions. Colleagues could present their ideas and results, and others could ask questions and discuss them.
>
> This gave our enthusiasts a place to share what they were discovering, without expecting every demonstration to become a method for every team."

**Bullets:**

- Colleagues present AI ideas, approaches, and results.
- Others ask questions and discuss their relevance.
- Connect this sharing with our common repository of reusable agents, skills, prompts, and MCP integrations.
- Make individual discoveries available for others to explore and adapt.

**Main message:** "One person's experience can become another person's starting point."

**Suggested visual:** One colleague's experience -> questions and discussion -> an approach another colleague can explore.

**Transition:**

> "But seeing how a colleague works still leaves a question: how do I apply this to my own task?"

### Slide 4 proposal: AI ambassadors - help closer to the work

**Question:** Who helps people move from an interesting idea to applying it themselves?

**What it shall answer:** Ambassadors provide a human support layer alongside courses, learning paths, and tools.

**Suggested narration:**

> "We also had enthusiastic people whom we called AI ambassadors. We expected them to be among our strongest practitioners - people who could provide help and guidance.
>
> Get AInspired created a place for sharing. Ambassadors added people you could turn to when you needed help."

**Bullets:**

- Enthusiastic practitioners providing AI help and guidance.
- A human support layer alongside courses, learning paths, and tools.
- Help colleagues connect AI approaches to their own tasks and constraints.

**Main message:** "People need someone to turn to, not just something to watch or read."

**Suggested visual:** A colleague with a real task + an ambassador providing guidance, with engineering ownership remaining with the colleague.

**Preparation note:** Describe the ambassadors' intended role. Add a concrete example if available; do not imply a formal mentoring or support process, or proven results, without evidence.

**Transition:**

> "Alongside help from colleagues, we wanted people to have feedback on their own working habits."

### Slide 5 proposal: Coachee gives people a private feedback loop

**Question:** How can people see what to improve in the way they work with AI?

**What it shall answer:** Coachee makes observable working habits available for personal reflection without turning private usage into employee assessment.

**Bullets:**

- We adapted Microsoft's open-source **AI Engineering Coach** into our internal **Coachee** fork, adding learning, effectiveness, and competence-related features.
- The reflection loop is **Observe -> Reflect -> Improve -> optionally Share**:
  - Review local sessions and notice context use, review behaviour, and repeated patterns.
  - Choose one useful finding, rather than trying to improve everything at once.
  - Try a concrete action: better context, stronger checks, fewer open threads, or a reusable skill.
  - Share a useful method if you choose to; private session data does not need to be shared.
- Coachee surfaces anti-patterns, context health, and session-effectiveness signals such as intent, validation, review, and closure.
- Its learning area connects **Updates, Develop, Practice, and Progress**. Reading alone does not change an observed competence stage; later work provides the evidence.
- It also shows indicative adoption levels: The Implementer, The AI User, The AI-Native, The Intent Owner, The AI System Builder, and The AI Strategist.
- Those levels and competence stages are guidance from observable signals, not organizational role assessments or proof of engineering correctness.
- Coachee is not a performance or mental-health rating. Core analytics stay local; sharing is the employee's choice.

**Main message:** "Coachee is a mirror for how we work with AI, not a scoreboard for people."

**Suggested visual:** One anonymised finding -> one improvement -> evidence from later work. Use a dashboard screenshot only if it helps explain this loop.

**Preparation note:** Coachee is an internal fork, not an official Siemens product. Avoid claiming the entire tool is offline: optional AI-assisted features use the configured model provider, and learning discovery makes network requests. Review and validation signals are heuristics, not proof that a review was thorough or the product is correct.

### Slide 6 proposal: We had learning expectations. What about delivery?

**Question:** What was still missing between developing AI competence and putting it to work in projects?

**What it shall answer:** Expectations about learning need a clearer connection to expectations about project delivery; a common method is not necessarily the answer for every task.

**Suggested narration:**

> "Now look at what we had put in place.
>
> We had defined competences. We had learning paths, training, sharing sessions, ambassadors, and personal feedback.
>
> We were making expectations about learning more explicit. But we still saw a missing connection: what difference did these capabilities make to what the project expected next?"

> "Our discussions with team leaders also showed that one method would not fit every person and task. Even a common code-review agent raised questions about whether the same rules made sense everywhere.
>
> That pushed us toward a different question: instead of expecting everyone to use the same method, what improvement should we expect in the work?"

**Bullets:**

- We had support and expectations for developing AI competence.
- Different people and tasks may need different methods.
- We still needed to connect those capabilities more clearly to project priorities and deliverables.
- Ask what improvement is needed in the work, not only which AI method people should use.

**Main message:** "Developing a capability and putting it to work are connected - but they are not the same thing."

**Suggested visual:** Learning expectations and support on one side; project priorities and deliverables on the other; highlight the connection still being developed.

**Preparation note:** The common code-review agent discussion illustrates a question about standardization, not proof that team leaders were the obstacle. Team leaders retain their role in developing people and engineering practice.

### Slide 7 proposal: Bringing project managers into the picture

**Question:** Who connects new capabilities to project priorities and deliverables?

**What it shall answer:** Project managers are the next connection we are working on, not a solution we can already declare proven.

**Suggested narration:**

> "That brought project managers into the picture.
>
> They ask for deeper analysis, quicker fixes, clearer proposals, and reliable delivery. We began to think that these conversations were another place where AI adoption needed to become practical.
>
> Not simply: 'Use AI.' And not: 'Everything must now be faster.'
>
> Rather: 'Here is a real project need. Could our new capabilities help us address it better? What result would count - and how will we verify it?'"

**Intended role:**

- Connect AI competence to real project needs and priorities.
- Agree the desired outcome, constraints, and evidence.
- Coordinate with team leaders on practice, support, and capacity.
- Keep engineering ownership and the same or stronger quality standards.
- Treat faster fixes and deeper analysis as goals to test, not benefits to assume.

**What we actually started doing:**

> "We started discussions with project managers - and began with examples from their own work: meeting transcripts, better PBI descriptions, and clearer relationships between PBIs.
>
> We wanted to make AI relevant to their work too, rather than only asking them to encourage its use by others."

**Main message:** "Project managers are the next connection we are working on - not a solution we can already declare proven."

**Suggested visual:** Project manager: outcome, priority, limits, evidence / team leader: practice, coaching, capacity / employee: application, verification, learning.

**Preparation note:** Distinguish the discussions and examples already started from the delivery changes we intend to establish. Do not claim measured improvements or successful adoption from PM involvement yet.

**Transition:**

> "If we connect AI to project delivery, how do we examine whether it is becoming useful practice rather than isolated experimentation?"

### Slide 8 proposal: We assess projects, not prompt counts

**Question:** How do we know whether individual AI experiments are becoming useful team practice?

**What it shall answer:** Our project-assessment approach is designed to check integration, evidence, ownership, and the next improvement - not individual competence or private Coachee scores.

**Bullets:**

- Assess AI integration across seven delivery areas:
  - requirements and analysis;
  - design and architecture;
  - coding and refactoring;
  - unit/integration testing;
  - documentation;
  - code review;
  - release, DevOps, and support.
- Use a project integration scale:
  - **0:** no meaningful integration.
  - **1:** individual experimentation.
  - **2:** assisted work in selected cases.
  - **3:** repeatable team practice.
  - **4:** integrated, outcome-linked practice with ownership, verification, and quality gates.
  - **5:** systemic leverage through reuse and deliberate continuous improvement.
- Check enabling capabilities too: approved knowledge access, adoption breadth, maintained skills and instructions, agents, MCPs, governance, and automation.
- Start with one real need. Check the strongest artifact and its quality, reliability, delivery effect, reuse, and limits.
- Decide whether to **continue, change, or stop**. Record the integration level, top evidence, next improvement, owner, and due date.
- Not every area needs level 5. Choose the level that fits project value and risk.
- Success means **project value, quality, learning, and healthy work - not more AI activity**.

**Main message:** "One person doing remarkable things with AI is not the same as a project having a reliable AI-enabled way of working."

**Suggested visual:** Individual experiment -> repeatable team workflow -> outcome-linked integration. Underneath, show the evidence and ownership required to move between them.

**Preparation note:** Present this as an assessment approach we have defined; distinguish it from assessments actually performed, and add project findings only where evidence is available. Keep the measures separate: role independence describes people expectations; Coachee signals support private reflection; the project 0-5 scale describes delivery integration. Engineering verification still determines whether the actual result meets product requirements. These models do not establish a measured productivity gain on their own.

### Chapter closing

> "We tried to impress people. Then we built support for learning. Now we are connecting that learning to the work projects actually need.
>
> The competence model defines what to develop. Get AInspired makes experience available to others. Ambassadors provide guidance. Coachee supports private reflection. Project managers are the next connection we are working on, and project evidence is how we intend to examine whether it helps - with human judgement remaining responsible for the result."

### Preparation sources

- [Competence framework overview](../../../competence_model/README.md)
- [People-first AI strategy and Grow-talk learning loop](../../../competence_model/presentation/slides.md)
- [FW Developer competence criteria](../../../competence_model/Competence_Model_FW_Developer.md)
- [Project AI Integration Assessment](../../../competence_model/Project_AI_Integration_Assessment.md)
- [Coachee overview and privacy boundaries](../../../Coachee/README.md)
- [Coachee observed competence signals](../../../Coachee/docs/content/level-up/competences.md)
- [Coachee learning and development loop](../../../Coachee/docs/content/level-up/learning-radar.md)

## Personal lessons and closing

Chapter purpose: share what this journey changed in my own thinking, then close with practical recommendations and a callback to the opening story.

Scope: personal experience and judgement, not a company-wide policy or a prediction of guaranteed AI benefits.

Transition into the chapter:

> "That is what we are building as an organization. But this journey has also changed how I think about my own work - as an engineer, a manager, and someone who still loves building things."

### Closing slide 1 proposal: AI amplified my ability - and exposed my judgement

**Question:** What does AI amplify, and what remains my responsibility?

**Bullets:**

- Useful context, clear framing, constraints, and direction improve the chances of a useful result.
- AI can amplify ideas - and mistakes.
- Generating an answer is not evidence that the answer is correct.
- Engineering judgement and verification remain essential.

**Suggested narration:**

> "I find it useful to think of AI as an amplifier, not an authority.
>
> When I provide useful context, clear constraints, and direction, I often get much further. When my assumptions are wrong, I can get further in the wrong direction - very quickly.
>
> Good input does not guarantee good output. I still need enough understanding to frame the problem, recognize architectural consequences, and verify the result."

**Main message:** "AI can amplify my ideas. It can also amplify my mistakes."

**Suggested visual:** One amplifier with two possible paths: a useful idea -> useful progress / a flawed assumption -> a larger mistake. Human checks are needed on both paths.

**Preparation note:** Use "amplifier" as a working metaphor, not a claim that settles whether AI is intelligence. Do not imply that good prompts guarantee correctness.

### Closing slide 2 proposal: I love building. Now I must be more selective about what I build.

**Question:** What changes when the distance between an idea and an implementation becomes shorter?

**Bullets:**

- AI lets me explore ideas I previously had no time to implement.
- Producing code faster does not finish a product.
- Architecture, integration, testing, security, and maintenance still matter.
- Being able to build something is not a reason to build it.

**Suggested narration:**

> "I sometimes say I hate coding. What I really hate is the distance between having an idea and finding enough time to implement it.
>
> I love designing systems and exploring concepts. AI has shortened that distance for me. But generating an implementation is not the same as finishing a product.
>
> When producing code becomes cheaper, deciding what deserves to exist becomes more important.
>
> Just because I can build it overnight does not mean my team should maintain it for five years."

**Main message:** "AI changes how much code I write with my fingers. It does not remove my responsibility to understand the system."

**Suggested visual:** Idea -> implementation -> useful, reliable product. Highlight the shorter first step and the engineering work still required in the second.

**Transition:**

> "And there is another cost I did not initially appreciate: how much attention my output requires from everyone else."

### Closing slide 3 proposal: Our mental tokens are the real budget

**Question:** What happens when generation outpaces the team's ability to understand and review?

**Bullets:**

- Generating is fast. Understanding and reviewing are not.
- Bring your reasoning, not an unfiltered pile of output.
- Review it yourself before asking someone else to review it.
- Use small, focused proposals and changes.

**Suggested narration:**

> "AI shortened the distance between an idea and an implementation. But now I see another distance growing: the distance between generating something and understanding it.
>
> People can produce lots of code and pages of Markdown, then send them to the team: 'Here is my idea. Please review it.'
>
> But our ability to read, reason, and challenge has not grown at the same speed. Our mental tokens run out before our Copilot tokens do.
>
> If we spend all that attention decoding generated material, we have less left to discuss where the product should go - or to notice a subtle mistake."

> "Bring the idea to us. Explain it in your own words. Draw the system. Tell us the trade-offs and what decision you need.
>
> For a substantial change, let us discuss the direction before producing a large implementation. Then bring a focused result you have already reviewed."

**Team rules to explain:**

- "Never ask a colleague to review something you have not been willing to review yourself."
- "If you cannot explain it, it is not ready to hand over as a finished proposal."
- Asking for help is legitimate. Identify the uncertainty instead of asking others to validate an unfiltered output.

**Practical handover standard:**

1. **Purpose:** What problem does this solve?
2. **Reasoning:** What approach did you choose, and why?
3. **Evidence:** What did you personally inspect or test?
4. **Request:** What specific decision or feedback do you need?

**Example of an honest request for help:**

> "This is an experiment. I have checked these parts. I am uncertain about this specific behavior, and that is where I need your help."

**Main message:** "AI makes generating cheap. It does not make our colleagues' attention cheap."

**Suggested visual:** A large stream of generated code and documents reaching a narrow human-review bottleneck. Contrast it with a focused proposal containing purpose, reasoning, evidence, and a specific request.

**Preparation note:** Review is necessary engineering work. The problem is making reviewers the first people who must understand and filter the output. Do not require a team discussion before every small change, or discourage early experiments and focused requests for help.

**Additional line to use:** "Saving my time is not an improvement if I consume more of yours."

### Closing slide 4 proposal: My opportunity is not automatically everyone else's opportunity

**Question:** What did my own enthusiasm teach me about supporting other people?

**Bullets:**

- The same tool does not create the same opportunity for every person or task.
- Architecture is not the only source of valuable judgement.
- Testing, debugging, maintenance, and domain expertise provide different forms of leverage.
- Understand someone's work before judging their response to AI.

**Suggested narration:**

> "AI gave me a way to build ideas I had been carrying for years. But my experience is not a universal template.
>
> Some people will find leverage in designing systems. Others will find it in investigating failures, challenging assumptions, or building better tests.
>
> Some will adapt quickly. Others need a different entry point or more support. Some tasks may offer little useful leverage.
>
> My excitement is not evidence that someone else should experience the same benefit. I need to understand their work before judging their response."

**Main message:** "Different people need different entry points - not a verdict on who is capable of adapting."

**Suggested visual:** Several paths to useful contribution: design / investigation / testing / maintenance. No ranking of people.

**Preparation note:** Avoid dividing colleagues into fixed categories of people who can or cannot embrace AI. The earlier story already shows that relevance, support, and expectations affect adoption.

### Closing slide 5 proposal: Keep learning. Keep ownership. Decide what the gains are for.

**Question:** What should we preserve while our tools and workflows change?

**Bullets:**

- Revisit assumptions as tools and capabilities change.
- Keep correctness, engineering ownership, and quality standards firm.
- Practise understanding, not only generating.
- Use gains deliberately: value, quality, learning, or capacity - not automatically more pressure.

**Suggested narration:**

> "Something that failed six months ago may work today. A workflow I love today may be obsolete next month. I need to keep testing my assumptions.
>
> But correctness, clear requirements, architecture, and responsibility do not become obsolete because a new model arrives."

> "We also need to preserve how people learn. If AI helps us skip parts of the struggle, we still need to practise explaining, predicting, debugging, and verifying.
>
> And if every saved hour becomes another hour of pressure, what exactly did we improve? What we do with the gains is a leadership choice."

**Main message:** "Keep your knowledge provisional. Keep your engineering standards firm."

**Suggested visual:** Changing tools above a stable foundation of understanding, ownership, and verification. Show possible uses of gained capacity: quality / learning / neglected work / output.

**Final spoken callback:**

> "I started this journey excited about what I could build overnight.
>
> Today, I am still excited. But I ask different questions: Is this the right thing to build? Can we trust it? Can others maintain it? And does it actually help the people doing the work?
>
> AI shortened the distance between my idea and an implementation. It did not remove the distance between an implementation and a useful, reliable product."

### Optional discussion topic: What happens to jobs?

Use if time permits or during questions, rather than making a speculative forecast the final message.

**Bullets:**

- Some tasks may need less labor; some roles may shrink or disappear.
- New work may emerge, but the overall employment balance is uncertain.
- New opportunities are not automatically accessible to people whose existing work disappears.
- Helping people develop new capabilities is a leadership responsibility.

**Suggested narration:**

> "Will some tasks need fewer people? I believe so. Will some jobs disappear and others emerge? I expect both. I do not know the balance.
>
> But as a manager, I cannot use that uncertainty as an excuse to do nothing. Helping people develop new capabilities is part of my responsibility."

**Preparation note:** Present these as personal expectations and uncertainty, not evidence that AI will create more jobs overall or a threat to colleagues.



### Is AI a good tool for everyone?

Follow "Garbage in, garbage out" with the harder question: what happens to developers whose main role is implementing decisions once AI makes that part of the work faster?

**Main message:** We built teams where a few people defined the work and many implemented it. If AI makes well-specified implementation substantially faster, we may need fewer roles focused mainly on turning specifications into code. That puts some good developers in a difficult position: they haven't got worse at their jobs, but what we hired and rewarded them for may no longer be enough on its own.

**What I've seen:**

- In a firmware DMA bug fix, moving the affected code to uncached memory made the symptom go away but slowed the system down. The developer stopped at "the bug is gone" without checking the performance cost.
- On a separate task, I gave a developer example prompts. The result was unusable, but they didn't recognize that. Their response was: "I didn't understand the prompt you gave me, and I couldn't write one myself." I'd given them another set of instructions, not a way to investigate a problem on their own.

**Suggested narration:**

> "Some developers I trust to deliver against a clear spec struggle when I give them a problem instead of a spec. The shift isn't about turning everyone into an architect. It's about knowing where to start, what to measure, which trade-offs matter, and when to reject an answer that looks plausible.
>
> As managers, we spent years rewarding people for delivering exactly what we asked for. Now we're asking them to do work they may have had little chance to practise. We owe them a real chance to learn. But I don't expect everyone to want that kind of work, or everyone who tries to make the transition. An AI licence and a training course won't change that."

**Preparation note:** Keep the claim about roles and skills, not age. The difficult position is real for people who've spent years doing implementation work, but age alone doesn't tell you who wants or is able to make the shift. Present fewer implementation-focused roles as a possibility, not a headcount forecast.

### What should I do next?

Follow “Is AI a good tool for everyone?” with the question a developer is likely to ask next. Use the next real task to practise solving a problem you'd normally wait for someone else to define. Try different kinds of work and use what you learn to find where you can contribute.

**Suggested visual and animation:** Put the Curiosity Mars rover on the left and the numbered points on the right. Show the first waypoint from the start, then reveal one more per click. Curiosity doesn't just roam: it sets out to answer a question, takes a measurement, and uses the result to decide where to go next.

1. **Don’t wait for a map.** Start before you have all the answers.
2. **Pick a real problem.** Start with something you don't already know how to solve.
3. **Run a small experiment.** Use AI where it helps, but measure what actually happens.
4. **Explain what you learned.** Start with the problem, then explain what you tried, where you got stuck, what the evidence showed, and why you'd take the next step. Ruling out a plausible explanation counts as progress, even if the bug is still open.

**Keep this quote visible on the slide, not just in the speaker notes:**

> **“Don’t start with ‘give me time to experiment.’ Bring me a real problem, the smallest useful test, and what its result would help you decide. If it’s worth doing, I’ll help make room for it.”**

**Suggested close:** “Experimenting won’t guarantee your next role. It will help you find out where you can contribute before you have to make that choice under pressure.”

## Presentation summary for organizers and Siemens approvers

### Title and positioning

**Title:** AI adoption beyond demo: Lessons from industrial R&D

**Subtitle:** Closing the gap between management enthusiasm, impressive individual experiments, and actual engineering-team adoption.

**Event:** SolarWinds Accelerate Tech Days.

**Speaker perspective:** Head of the Brno R&D office, responsible for ET 200SP firmware delivery and involved in promoting AI adoption locally.

**Audience:** Software and firmware engineers, test engineers, technical leaders, project managers, and colleagues supporting AI adoption.

**Format:** A story-led experience report combining organizational approaches, setbacks, ongoing work, and personal lessons. It is not a tool tutorial, vendor comparison, or report of company-wide Siemens AI strategy.

### Short abstract for the event programme

Impressive AI experiments do not automatically become useful engineering-team practice. Drawing on experience in a Siemens industrial R&D environment, this talk explores the gap between management enthusiasm, individual breakthroughs, and adoption in embedded development with hard real-time, hardware-testing, and security constraints.

The story moves from disappointing early experiments and increasingly spectacular demonstrations to a more systematic approach: professional AI competences, task-based learning, Get AInspired knowledge-sharing sessions, AI ambassadors, and private feedback through an internal coaching tool. It then examines the ongoing work of connecting these capabilities to project priorities and assessing integration through evidence rather than prompt counts.

The talk closes with personal lessons about AI as an amplifier, engineering ownership, continuous learning, and a new bottleneck: human attention. Generating code and documents faster is not the same as delivering a reliable product - or making a team more effective.

### Extended abstract

How do we move from individual excitement about AI to useful, repeatable change in an engineering team? This presentation shares a local adoption journey in FT D AS IO Czechia, told from the overlapping perspectives of an engineer, an R&D office leader, and a project manager.

The setting is industrial automation and ET 200SP firmware delivery: a demanding environment involving hard real-time behavior, a predominantly C/C++ development stack, hardware-dependent testing, security requirements, and substantial domain knowledge. These constraints help explain why examples that impressed managers did not necessarily convince engineers.

The opening follows early experiments that struggled with context and workspace limitations, renewed enthusiasm as tooling improved, and the rediscovered pleasure of building applications and scripts. When teams questioned the relevance of those examples, enthusiasts responded with even more ambitious demonstrations. The lesson was not that engineers lacked curiosity, but that demonstrations of capability were not answers to questions about everyday product delivery.

The central chapter describes the support developed for learning and practice: seven AI competences across engineering and leadership role profiles; learning paths anchored in real tasks; Get AInspired sessions for sharing experience; AI ambassadors providing guidance; and reusable agents, skills, prompts, and integrations. It also introduces Coachee, an internal adaptation of Microsoft's AI Engineering Coach, as a private reflection aid rather than an employee-performance scoreboard.

The next step is connecting learning expectations more firmly to project priorities. Discussions with project managers have started with examples relevant to their own work, including meeting transcripts, PBI descriptions, and relationships between PBIs. Their intended contribution is to connect real needs, desired outcomes, support, and verification. A defined project-assessment approach examines evidence, ownership, and repeatable integration; it is not presented as proof of measured productivity gains or a completed transformation.

The personal closing explores AI as an amplifier of both ideas and mistakes, the continuing importance of judgement, and the difference between generating an implementation and finishing a product. Particular attention is given to review overload: AI can generate material faster than colleagues can understand it. Practical recommendations include explaining proposals in one's own words, reviewing work before handing it over, and making focused requests for feedback. The final message is to keep learning while preserving engineering ownership, quality, and respect for colleagues' attention.

### Proposed agenda

1. **My perspective and engineering environment**
   - Local R&D responsibilities, ET 200SP firmware, and the constraints of industrial embedded development.
2. **From early disappointment to individual excitement**
   - Initial limitations, changing capabilities, and the return of hands-on experimentation.
3. **Why impressive examples were not enough**
   - The teams' relevance objection and a self-critical look at the "overnight" demonstrations.
4. **Building competence and supported learning**
   - Role expectations, real-task learning paths, Get AInspired, AI ambassadors, and reusable team assets.
5. **Personal feedback without a people scoreboard**
   - Reflection loop within internal coaching tool, privacy boundaries, and the limits of observed signals.
6. **Connecting learning to delivery**
   - The ongoing involvement of project managers and an evidence-based project-integration assessment approach.
7. **Personal lessons and practical recommendations**
   - AI as an amplifier; implementation versus product; human-review capacity; different entry points; continuous learning and ownership.
8. **Discussion**
   - Questions and, if appropriate, a clearly qualified personal discussion of changing tasks and roles.

### Intended audience takeaways

- Distinguish an impressive individual result from a reliable team practice.
- Connect learning to relevant work, support, and explicit evidence.
- Recognize complementary roles for employees, team leaders, ambassadors, and project managers.
- Keep private coaching signals separate from project assessment and engineering verification.
- Protect review capacity: share purpose, reasoning, evidence, and a specific request, not unfiltered generated output.
- Evaluate value and quality rather than AI activity alone.

### Scope and disclosure notes for Siemens approval

**Purpose of the approval review:** Confirm the suitability of sharing this local experience report at an externally hosted company tech event, including the final wording, examples, and visuals. This summary does not itself establish approval to disclose internal material.

- **Representation:** The presentation describes the speaker's immediate R&D environment and local approach in FT D AS IO Czechia. It does not claim to represent all Siemens AI activities or official company-wide policy.
- **Content proposed for review:** The local competence framework and learning approach; Get AInspired and ambassador activities; a high-level description of Coachee and its privacy boundaries; the project-assessment model; and illustrative accounts of adoption challenges.
- **Status of claims:** Separate activities already undertaken, intended roles and workflows, ongoing PM discussions, and personal opinions. Do not imply proven gains, production readiness of experimental demonstrations, or successful rollout across all projects.
- **Technical and organizational details:** Verify product descriptions and timing statements, resolve draft placeholders, and confirm which organizational identifiers, framework details, and examples may be shared. The "overnight" examples are self-critical illustrations of the limits of demonstrations, not claims of validated production replacements.
- **Confidentiality and privacy:** Use public, approved, synthetic, or appropriately anonymised material. Any code, architecture, screenshots, prompts, session records, meeting transcripts, PBI content, or project findings require a specific disclosure check before inclusion. Do not expose confidential product information, personal data, or identifiable employee assessments.
- **Tool positioning:** Describe Coachee as an internal fork, not an official Siemens product or an employee-rating system. Do not imply that all features operate offline, that heuristic signals prove correctness, or that named tools constitute corporate endorsements.
- **Personal conclusions:** Explicitly label reflections on AI, work, and employment as the speaker's views. Employment discussion is optional and acknowledges uncertainty; it does not announce staffing decisions or forecast net job creation.

**Central message:** AI adoption is not primarily a contest to generate more material. It is an ongoing effort to connect capabilities, learning, and project needs while preserving quality, ownership, and the team's ability to understand the work.
