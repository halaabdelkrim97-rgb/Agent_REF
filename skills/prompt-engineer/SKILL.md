---
name: prompt-engineer
description: Turns a rough or vague request into a clear, ready-to-use prompt for an AI, picking a prompting framework (RTF, RISEN, RODES, Chain of Thought, RACE, RISE, STAR, SOAP, CLEAR, GROW, Chain of Density) that fits the task. Use when the user asks for a prompt, wants a prompt improved, says "how do I ask AI to...", or when Forge must write a prompt for another model or agent.
license: MIT, complete terms in LICENSE.txt
metadata:
  source: https://github.com/sickn33/agentic-awesome-skills/tree/main/skills/prompt-engineer
  source_repo: sickn33/agentic-awesome-skills
  source_type: community (adapted for Forge)
  date_added: '2026-11-25'
---

# Prompt Engineer

Turns a raw prompt into a polished, self-contained prompt. It works quietly: the user gets the finished prompt, not a lecture on frameworks. Quality depends on the model and the task, so say so if the user needs a guarantee, and suggest a quick test of the prompt.

Works in any chat or terminal. It needs no project files.

## When to use

- The prompt is vague ("help me code Python") or has no structure, context or output format.
- The user has an idea but cannot put it into words.
- The task needs step-by-step reasoning (debugging, analysis, design).
- The user wants an existing prompt improved, or asks "create a prompt for...".
- Forge needs a prompt for another model, agent, image tool or skill, for example a brief for a sub-agent.

Not for: answering the task itself, or editing a skill's own text (use `writing-skills`).

## Workflow

### 1. Analyze the intent (always)

Read the raw prompt and note:

- **Type**: coding, writing, analysis, design, learning, planning, decision, creative.
- **Complexity**: one step, several steps, or needs reasoning and design. Length alone does not decide it.
- **Clarity**: clear goal, or vague verbs ("help", "improve") with no object.
- **Implicit needs**: examples wanted, output format, constraints (time, tools, scope), exploring versus doing.

### 2. Ask only if it is critical (at most 3 questions)

Ask only when a missing fact would change the framework or make the prompt wrong:

- the task type cannot be told (coding, writing or analysis?);
- the audience is unknown and it changes the result;
- the scope is undefined and a wrong guess would void the prompt;
- the output format is missing or conflicting and cannot be inferred.

Merge related questions into one message. Never ask more than three. If there is enough to go on, skip this step.

Never invent facts the user did not give. When a detail is missing but not critical, leave a clearly marked placeholder in the prompt, for example `[team size: not given]`, instead of guessing and instead of asking.

### 3. Pick the framework (silently)

Match the task to one framework, or blend two or three when the task spans types. Simple tasks get simple frameworks.

| Task | Framework |
| --- | --- |
| Act as an expert, clear output | RTF (Role, Task, Format) |
| Debugging, proof, logic | Chain of Thought |
| Multi-phase project with deliverables | RISEN |
| Systems, architecture, complex analysis | RODES |
| Summaries, compression | Chain of Density |
| Reports, talks, messages for an audience | RACE |
| Research, diagnosis | RISE |
| Problems with background | STAR |
| Structured records and documentation | SOAP |
| Goals, OKRs | CLEAR |
| Coaching, development | GROW |

The full mapping with reasons, blending rules and a blended example are in [references/frameworks.md](references/frameworks.md). Do not name the framework in the output. Explain the choice only if the user asks.

SOAP output for medical or clinical use is a documentation structure only; a qualified clinician must check it.

### 4. Write the prompt

- Same language as the user's request. If the request mixes languages, use English.
- Length follows complexity: short for simple tasks, detailed for complex ones.
- Include an output format. Add an example when the task is complex.
- Plain wording: no framework jargon in the prompt unless the user works in that domain.
- Self-contained: someone reading only the prompt can do the task.

### 5. Check before sending

- [ ] Self-contained, no hidden context needed
- [ ] Task is specific and checkable
- [ ] Output format is clear
- [ ] No ambiguous wording
- [ ] Detail matches the task's complexity

### 6. Deliver

Give the final prompt in one Markdown code block, with no meta-commentary ("This prompt uses...", "Note that..."). One line before or after is fine only to ask the clarifying question or to say what a placeholder needs.

## Rules

Never:

- invent information the user did not provide;
- hide the framework choice when the user asks about it;
- produce generic one-size-fits-all prompts;
- ask more than 3 questions;
- add commentary inside the final output;
- give the prompt outside a code block;
- mix languages without reason.

Always:

- analyze before writing (step 1 is mandatory);
- blend frameworks when it improves the prompt;
- state the output format inside the prompt;
- keep the prompt self-contained;
- check completeness before sending.

## In Forge

- When Forge writes a prompt for its own sub-agent or a tool, apply this skill, then keep the prompt in the project docs only if the user asks for it. Prompts are not secrets storage: never put keys, client data or private paths in one.
- Report the skill in the session's skill-use line like any other skill.
- Examples of full runs (a recommendation system with RODES plus Chain of Thought, a debugging prompt with Chain of Thought) are in [references/examples.md](references/examples.md).

## Limits

- Use it for prompt writing only; it does not run or test the prompt.
- It does not replace testing the prompt with the target model or expert review for safety-critical use.
- Stop and ask if required inputs, permissions, safety limits or success criteria are missing.
