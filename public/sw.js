// Simple offline-first service worker.
// Precaches the app shell, then serves same-origin GETs cache-first,
// falling back to the network and caching whatever it fetches (so the
// hashed JS/CSS bundles get cached on first load without knowing their names).

const CACHE = 'septic-v2'
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

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request)
        .then((res) => {
          // Only cache successful, basic (same-origin) responses.
          if (res.ok && res.type === 'basic') {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy))
          }
          return res
        })
        .catch(() => {
          // Offline and not cached — for navigations, fall back to the shell.
          if (request.mode === 'navigate') return caches.match(BASE + 'index.html')
          return Response.error()
        })
    }),
  )
})
