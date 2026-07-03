// YouTube Trousers — hide all traces of Shorts.
// Layer 1 (rules.json) redirects direct /shorts/ page loads at the network level.
// Layer 2 (style.css) hides known Shorts UI instantly.
// Layer 3 (this script) catches SPA navigations to /shorts/ and anything the
// static CSS can't express (text-matched chips, new/renamed elements).

(() => {
  "use strict";

  const HOME = "https://www.youtube.com/";

  // ---------- URL blocking (SPA navigation) ----------

  function isShortsUrl(pathname) {
    return pathname === "/shorts" || pathname.startsWith("/shorts/");
  }

  function enforceUrl() {
    if (isShortsUrl(location.pathname)) {
      // replace() so the Shorts URL doesn't pollute history / back button.
      location.replace(HOME);
      return true;
    }
    return false;
  }

  // Direct hit at document_start (fallback if the DNR rule didn't fire).
  if (enforceUrl()) return;

  // YouTube fires these on its internal SPA navigations.
  document.addEventListener("yt-navigate-start", enforceUrl, true);
  document.addEventListener("yt-navigate-finish", enforceUrl, true);

  // Generic fallback for history API navigation.
  let lastHref = location.href;
  setInterval(() => {
    if (location.href !== lastHref) {
      lastHref = location.href;
      enforceUrl();
    }
  }, 250);

  // ---------- DOM cleanup ----------

  // Containers worth hiding when they contain a link to a Short.
  const ITEM_CONTAINERS = [
    "ytd-rich-item-renderer",
    "ytd-video-renderer",
    "ytd-grid-video-renderer",
    "ytd-compact-video-renderer",
    "ytd-playlist-video-renderer",
    "ytd-notification-renderer",
    "ytd-rich-section-renderer",
    "ytd-reel-shelf-renderer",
    "grid-shelf-view-model",
    "ytm-shorts-lockup-view-model",
    "ytm-shorts-lockup-view-model-v2",
    "ytm-video-with-context-renderer",
  ].join(",");

  function hide(el) {
    if (el && el.style.display !== "none") {
      el.style.setProperty("display", "none", "important");
    }
  }

  function sweep() {
    // Anything anchoring to /shorts/ — hide its enclosing item/shelf.
    for (const a of document.querySelectorAll('a[href^="/shorts"]')) {
      const container = a.closest(ITEM_CONTAINERS);
      if (container) hide(container);
    }

    // Thumbnails badged as SHORTS even when the link format changes.
    for (const badge of document.querySelectorAll('[overlay-style="SHORTS"]')) {
      const container = badge.closest(ITEM_CONTAINERS);
      if (container) hide(container);
    }

    // Filter chips labeled "Shorts" (home / search / channel) — text match,
    // which CSS can't do.
    const chips = document.querySelectorAll(
      "yt-chip-cloud-chip-renderer, ytd-feed-filter-chip-bar-renderer yt-chip-cloud-chip-renderer, chip-shape"
    );
    for (const chip of chips) {
      if (chip.textContent.trim() === "Shorts") hide(chip);
    }

    // Channel page "Shorts" tab (covers markup variants without tab-title attr).
    for (const tab of document.querySelectorAll("yt-tab-shape, tp-yt-paper-tab")) {
      if (tab.textContent.trim() === "Shorts") hide(tab);
    }
  }

  // Run sweeps on DOM mutations, throttled to one per animation frame.
  let scheduled = false;
  function scheduleSweep() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      sweep();
    });
  }

  function start() {
    sweep();
    new MutationObserver(scheduleSweep).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    // YouTube reuses DOM nodes when navigating; re-sweep after each navigation.
    document.addEventListener("yt-navigate-finish", scheduleSweep, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
