// Offline-capable service worker.
// - Navigations (the HTML page) are network-first, so a fresh deploy shows up
//   immediately; the cached shell is only used when offline.
// - Everything else (content-hashed JS/CSS, icons) is cache-first, since a new
//   build produces new filenames and can never serve a stale asset.

const CACHE = 'septic-v3'
// The SW is served from the app's base dir (e.g. "/" locally or "/Septic/" on
// GitHub Pages). Derive that base from this file's own URL so the cached shell
// paths are correct regardless of where the app is hosted.
const BASE = self.location.pathname.replace(/sw\.js$/, '')
const SHELL = [BASE, BASE + 'index.html', BASE + 'manifest.webmanifest', BASE + 'icon.svg']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return
  }

  const cachePut = (res) => {
    if (res.ok && res.type === 'basic') {
      const copy = res.clone()
      caches.open(CACHE).then((c) => c.put(request, copy))
    }
    return res
  }

  // Network-first for page navigations so new deploys appear right away.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(cachePut)
        .catch(() => caches.match(request).then((c) => c || caches.match(BASE + 'index.html'))),
    )
    return
  }

  // Cache-first for content-hashed assets and other same-origin GETs.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then(cachePut)
        .catch(() => Response.error())
    }),
  )
})
