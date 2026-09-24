# Saved data and backup scope

## Saved in this repository

The HTML, CSS, JavaScript, built-in activity defaults, category and energy labels, documentation, Sites project configuration, and implementation history are versioned in Git. This app has no separate database or server-side user records.

## Saved in the user's browser

The app uses these localStorage keys on its origin:

| Key | Contents |
| --- | --- |
| `daywheel-v1` | Custom hourly activities (`hours`), most recent results (`picks`), and wheel state at the last save |
| `daywheel-modes-v1` | Customized category and energy options, indexed by wheel type and hour |
| `daywheel-spin-times-v1` | Spin-start timestamps used by the rolling 60-minute limit |

Publishing or pushing source code does not extract, upload, clear, or back up these browser values. The production URL and a local preview have separate storage. Browser data remains on the original browser/device; it is not automatically synchronized to GitHub or another device. No snapshot of personal browser data is included in this repository.

The app keeps only the most recent result for each planning hour. It does not retain a complete historical journal of all outcomes. Expired spin timestamps are removed on a later reservation. Those older records cannot be recovered from the current app state.

## Optional manual browser backup

While viewing Daywheel in a browser with developer tools, run the following in that page's console to download a JSON copy of its saved values:

```js
const keys = ['daywheel-v1', 'daywheel-modes-v1', 'daywheel-spin-times-v1'];
const backup = {
  app: 'Daywheel',
  exportedAt: new Date().toISOString(),
  origin: location.origin,
  storage: Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)]))
};
const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' }));
const link = document.createElement('a');
link.href = url;
link.download = 'daywheel-data-backup.json';
link.click();
setTimeout(() => URL.revokeObjectURL(url), 1000);
```

Keep that file in a private backup location. Personal backups are ignored by Git by default. The hourly limit is browser-local, not an account-wide or tamper-proof restriction.
