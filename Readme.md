# Daywheel

A pink-and-purple spinning wheel for deciding what to do at each hour of the day.

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

## Three-spin limit

You can start at most **3 spins in a rolling 60-minute period**, shared across all selected hours and wheel types. Changing the planning hour or reloading the page does not reset the limit. Each spin becomes available again 60 minutes after it was started. The app displays the number of available spins and the next available time when you reach the limit. A spin counts when it starts, even if the page closes before it finishes.

The limit and settings are stored in localStorage in this browser. Same-origin tabs coordinate reservations with the Web Locks API when available. This is a personal-use restriction, not server-side enforcement: other browsers/devices, clearing browser data, or changing the device clock can bypass it. Storage must be available to spin. Your settings and plan are not synced between devices. Plan entries remain until replaced by another spin for that hour.

## Files and development

- `dist/index.html`: layout and accessible result dialog.
- `dist/style.css`: responsive pink-and-purple theme.
- `dist/app.js`: wheel drawing, hourly options, random selection, result handling, and spin limit.
- `.openai/hosting.json`: existing private Sites deployment configuration.

This is a static app with no build step or dependencies. Serve `dist` with a local HTTP server, or open `dist/index.html` in a browser that supports local storage. Google Fonts is optional; system sans-serif fonts provide a fallback.

Validate JavaScript syntax with `node --check dist/app.js`. Respect reduced-motion preferences. The production app is hosted privately at https://day-wheel-erink.eku2101.chatgpt.site/.
