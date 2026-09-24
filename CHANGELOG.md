# Daywheel change history

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
