# Daywheel change history

## 2026-10-01 — Three spins per clock hour

- Changed the rolling 60-minute limit to three spins per local clock hour, resetting at the start of the next hour.
- Kept the shared allowance across planning hours and wheel modes, persistence through reloads, and existing spin records for the current hour.
- Added the next reset time to the available-spin display.

## 2026-10-01 — Editable daily plan and Google Calendar

- Added editing activity names, dates, start hours, and durations, with protection against overwriting occupied hours.
- Added removal and completion toggles; manual changes do not use spins.
- Added optional Google Calendar event drafts with encoded titles and timezone-aware start/end times. Users review and save in Google; subsequent changes do not sync.
- Preserved existing activity data and stored plan details in a separate browser key.
- Checked JavaScript syntax, invalid dates, midnight rollover, occupied-hour protection, move persistence, and unchanged spin allowance.

## 2026-10-01 — Public website access

- Changed the existing Sites website audience from owner-only to public at the user's request.
- Verified unauthenticated HTTP 200 responses for the page, stylesheet, and JavaScript.
- Verified live wheel spins, the winner dialog, daily-plan updates, and decreasing spin allowance in the browser.
- Updated the README's production access description.

## 2026-10-01 — Project reflection

- Added the three project reflection questions and answers to Readme.md, covering the experience represented, its most important aspect, and what the current prototype captures or leaves out.

## 2026-09-24 — GitHub project backup

- Prepared the existing HTML, CSS, JavaScript, README, and Sites configuration for a private GitHub repository.
- Preserved the original two implementation commits rather than replacing them with a single snapshot.
- Added this chronological changelog and data-storage documentation.
- Added repository ignore rules for credentials, temporary artifacts, and personal data exports.

## 2026-09-24 — Categories, energy levels, and spin limits

Implementation commit: `ca3aeaf62ddacf1e15210d842f0f57067f59dae9`

- Changed the wheel and interface accents to pink and purple.
- Added a result dialog centered over the wheel, keyboard dismissal, and focus restoration.
- Limited spinning to three starts in a rolling 60-minute window, shared across all planning hours and wheel modes.
- Persisted the limit through reloads and coordinated reservations between tabs with Web Locks where supported.
- Added available-spin counts and the next available time.
- Added Life categories: Work, Health & Body, Social, Fun & Creativity, Home & Admin, Learning, Rest & Reset, and Random Challenge.
- Added Energy levels: Low Energy, Medium Energy, and High Energy.
- Preserved original activities in My activities.
- Kept separately editable options for each hour and wheel mode.
- Added Readme.md with operation, storage, accessibility, and development notes.
- Checked JavaScript syntax, all requested labels, the three-spin cap, and the exact 60-minute expiration boundary.
- Published to the existing private Sites URL.

## 2026-09-24 — Initial app

Implementation commit: `c9679685404c8cf4afa23e1f672b2d8eb8a00f41`

- Created a static app using separate HTML, CSS, and JavaScript files.
- Added a selector for all 24 hours and an animated random-selection wheel.
- Added editable activities with one to eight equally likely options per hour.
- Included piano, studying, and lunch as the 2 PM example.
- Added a daily plan displaying the most recent selection for each hour.
- Saved custom activities and selected results in browser localStorage.
- Added responsive layouts, accessible labels, and reduced-motion support.
- Checked the wheel pointer against every possible result for one to eight slices.
- Published privately with Sites.

## Maintaining this history

Record future changes here and commit the corresponding files together. Git retains the exact source differences; this document explains their purpose. Record verification actually performed and distinguish browser-local data from repository content.
