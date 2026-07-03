# youtube-trousers

RIP shorts, I never liked you and never will.

A Chrome extension that removes YouTube Shorts everywhere: the Shorts button, Shorts pages, and any Shorts appearing in feeds, search results, recommendations, notifications, and channel pages.

## What it does

Shorts are killed at three layers:

1. **URL blocking** — navigating to `youtube.com/shorts/...` (directly or via a link) redirects to the YouTube homepage, both for full page loads (declarativeNetRequest rule) and YouTube's internal SPA navigation (content script).
2. **Instant CSS hiding** — known Shorts UI (sidebar button, Shorts shelves, Shorts items in feeds/search/recommendations, the channel "Shorts" tab) is hidden by CSS injected at `document_start`, so it never flashes on screen.
3. **Live DOM sweeping** — a `MutationObserver` watches for anything new that links to `/shorts/`, carries a SHORTS badge, or is a "Shorts" chip/tab, and hides it the moment it appears.

Works on `www.youtube.com` and `m.youtube.com`.

## Install

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select this folder

That's it. Reload any open YouTube tabs.

## Files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension manifest (Manifest V3) |
| `rules.json` | Network-level redirect of `/shorts/*` URLs |
| `style.css` | Static CSS kill list for Shorts UI |
| `content.js` | SPA navigation blocking + mutation-observer sweeps |
