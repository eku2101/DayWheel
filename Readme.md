# Daywheel

A pink-and-purple spinning wheel for deciding what to do at each hour of the day.

The project already includes separate HTML, CSS, and JavaScript files in `dist/`; no compilation is required. See [CHANGELOG.md](CHANGELOG.md) for all app adjustments and [DATA.md](DATA.md) for saved-data details and backup instructions. Git history preserves the original implementation and subsequent updates.

## Project reflection

### What phenomenon or experience is your project representing?

Daywheel represents the everyday experience of deciding how to spend your time when several activities compete for your attention. It turns that uncertainty into a playful interaction: choose an hour, set your possibilities, and spin.

### What part of that experience matters most?

The most important part is moving from indecision to action while keeping some personal control. You choose the options, and the wheel makes a suggestion. The three-spin limit encourages committing to a choice instead of repeatedly searching for a better result.

### Does your current prototype represent that experience well? What does it capture or leave out?

The prototype captures the anticipation, surprise, and relief of having a decision made. Editable options, hourly planning, and the result pop-up make the choice feel concrete. The pink-and-purple design keeps the experience playful.

It leaves out some real-life complexity: deadlines, responsibilities, activity duration, and changing energy levels. Every option has an equal chance, even when one is more urgent. The energy wheel randomly selects an energy level rather than responding to how you actually feel. It also records a choice without knowing whether you followed through. These limits make it a useful decision prompt, but not yet a complete daily planner.

## Use the app

1. Choose the hour you are planning.
2. Choose Life categories, Energy levels, or My activities.
3. Edit, add, or remove options (1–8 per wheel). Every option has an equal chance.
4. Spin. The winner appears in a pop-up centered over the wheel and in your daily plan. Dismiss with “Let’s do it” or Escape.

### Life categories

- Work
- Health & Body
- Social
- Fun & Creativity
- Home & Admin
- Learning
- Rest & Reset
- Random Challenge

### Energy levels

- Low Energy
- Medium Energy
- High Energy

My activities preserves the original customizable activities, including piano, studying, and lunch at 2 PM. Each wheel type has its own options for each selected hour.

## Customize your daily plan

Each activity under “Your day, taking shape” now has Edit, Remove, Mark complete, and Add to Google Calendar controls. Edit its name, date, hour, and duration. Moving to an occupied hour is blocked to protect the existing activity. Manual changes do not consume spins. A new spin for an hour replaces its previous activity and resets its completion status.

Google Calendar is optional: review the date, time, and duration, then choose Open Google Calendar and save the draft there. Times use your device timezone. This is a one-time event link, not two-way synchronization; future edits or removals in Daywheel do not update Google Calendar. Reopening and saving the draft again can create duplicates. Daywheel does not access your Google account or know whether you saved the event.

Plan dates, durations, and completion status are saved locally in `daywheel-plan-meta-v1`. Existing hourly choices are preserved. The plan continues to allow one activity per hour; it is not a multi-day calendar database.

## Three-spin limit

You can start at most **3 spins per local clock hour**, shared across all selected hours and wheel types. Changing the planning hour or reloading the page does not reset the limit. All three spins become available at the start of the next clock hour (for example, at 3:00 PM), using your device’s local time. The app displays the number of available spins and the next available time when you reach the limit. A spin counts when it starts, even if the page closes before it finishes.

The limit and settings are stored in localStorage in this browser. Same-origin tabs coordinate reservations with the Web Locks API when available. This is a personal-use restriction, not server-side enforcement: other browsers/devices, clearing browser data, or changing the device clock can bypass it. Storage must be available to spin. Your settings and plan are not synced between devices. Plan entries remain until replaced by another spin for that hour.

## Files and development

- `dist/index.html`: layout and accessible result dialog.
- `dist/style.css`: responsive pink-and-purple theme.
- `dist/plan.js`: editable daily plan, local plan details, and optional Google Calendar drafts.
- `dist/app.js`: wheel drawing, hourly options, random selection, result handling, and spin limit.
- `.openai/hosting.json`: existing private Sites deployment configuration.

This is a static app with no build step or dependencies. Serve `dist` with a local HTTP server, or open `dist/index.html` in a browser that supports local storage. Google Fonts is optional; system sans-serif fonts provide a fallback.

Validate JavaScript syntax with `node --check dist/app.js`. Respect reduced-motion preferences. The production app is publicly accessible at https://day-wheel-erink.eku2101.chatgpt.site/.
