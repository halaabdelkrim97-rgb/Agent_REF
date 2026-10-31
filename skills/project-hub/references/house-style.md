# Hub house style: the same hub in every project

Learned on a real client project (Oct 2026) where the user approved the result. Apply it to every hub so each project gets the same look, order and way of writing. The template gives the look; these rules give the content.

## Layout (never change per project)
- Copy `templates/index.html` and `templates/report.html` unchanged. Never write `ui.tabs`, extra tabs or custom styles unless the user asks for that project.
- Tab order is fixed by the template: Dashboard, Plan, Work plan, the type tabs (for example Firmware, Hardware, App), Business, Docs and quality, Agent, Gaps.
- Desktop first. Check the page at desktop width; the narrow view only has to stay readable, not polished.

## Dashboard
- Each fact appears once. Anything with its own tab (parts, tests, risks, decisions, tasks, next steps) stays out of the dashboard cards.
- Order: progress tiles, task map, hours by phase, timeline, needs attention (only when something is blocked), quick access, project details cards, then the project brief with the "Tell Forge" box last.
- The brief is a short plain text a newcomer understands: what is built, for whom, the stages, who does what, and the main limits.

## Work plan
- Split the work into stages when the agreement has stages (for example "Stage 1: proof of concept", "Stage 2: first real device"). Give each stage `name`, `short` (two or three words), `title`, `what` and `goal`.
- Every phase and task has `what` (what it is) and `goal` (what it achieves), one short line each.
- Tasks are 1 to 8 hours, one owner each. Use the real names of the people or companies who do the work, and check them with the user.
- Statuses and spent hours change only from real progress the user reports. Never mark work done on a guess.
- Hour changes: propose them with the reason, wait for the user's yes, then update every file that holds the numbers (context file, plans, hub) in one go so they never disagree.
- Coordination and small additions folded into existing tasks are not new work time unless the user says so.

## Parts and money
- One bill of materials per stage or kit (`hardware.bom[].list`), with a short note each.
- Hours only. No prices, rates or package values anywhere unless the user asks for them in that project.

## Writing
- Plain, simple English. Short sentences. No jargon the client may not know: write "device software", not "firmware"; "waterproof", not "IP65"; "updates over Wi-Fi", not "OTA". Keep part codes and protocol names in `note` or in the source-of-truth files, not in titles.
- Task and phase titles are what a client reads in the hours report, so write them plainly from the start.
- Never print private working rules in anything the client sees: hours per day, personal pace, internal rates or margins.

## Hours report (PDF)
- `report.html` sits next to `index.html` and reads the same `hub-data.js`. It prints an A4 portrait report in the same style: a summary page (key hours and hours by group), a one-page task map with a short description per group, and one timeline per stage.
- Fields it reads: `plan.stages[].short` and `what`, phase `what`, `plan.reserve` (percent, shown as a reserve line), `plan.pace` (hours per day per owner, default 8; used for the timeline and never printed), `plan.reportIntro` and `plan.reportNotes` (the "Good to know" lines).
- Each stage's timeline starts again at day 1. It counts working days only, never hours per day.
- Make the PDF with a headless browser when one is available, for example Playwright `page.pdf({ preferCSSPageSize: true, printBackground: true })` on `report.html`, or ask the user to open it and print to PDF (A4, background graphics on). Look at every page before sending it.
- Keep it simple: no extra charts, no cover page, no per-task tables unless the user asks.

## Local copy
- When the user names a folder on their computer for the project, keep the hub, the report and the docs synced there after every change.
