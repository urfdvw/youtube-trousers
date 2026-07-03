# Privacy Policy — YouTube Trousers

_Last updated: July 2, 2026_

YouTube Trousers does not collect, store, transmit, sell, or share any user data. Period.

## What the extension does

The extension runs entirely on your own device, on YouTube pages only (`youtube.com`, `www.youtube.com`, `m.youtube.com`). It:

- Hides YouTube Shorts elements on the page (the Shorts button, Shorts shelves, and Shorts in feeds, search results, and recommendations) using local CSS and JavaScript.
- Redirects navigations to `youtube.com/shorts/*` back to the YouTube homepage using a static, locally bundled redirect rule.

## What the extension does NOT do

- It does not collect any personal information, browsing history, or usage data.
- It does not read, monitor, or log the content of pages you visit.
- It does not make any network requests of its own.
- It does not use analytics, telemetry, cookies, or tracking of any kind.
- It does not communicate with any external server.
- It contains no remote code; all code is bundled in the extension package.

## Permissions

- **Host access to youtube.com** — required so the extension can hide Shorts elements on YouTube pages. It runs nowhere else.
- **declarativeNetRequest** — required for the single static rule that redirects `youtube.com/shorts/*` URLs to the YouTube homepage. This mechanism is declarative: the extension never sees or inspects your network traffic.

## Changes

If this policy ever changes, the update will be published at this same URL with a new "Last updated" date.

## Contact

Questions? Open an issue at <https://github.com/urfdvw/youtube-trousers/issues>.
