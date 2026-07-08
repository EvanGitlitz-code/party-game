# 🎲 Pour Decisions — Party Game Night

A mobile-first party drinking game app that bundles several games behind one
home screen. Add your friends, dial the spice level, and pick a game. Every
game has a built-in **How to play** panel (tap the **?**).

> **Please drink responsibly.** Know your limits and never drink and drive.
> The app is for adults of legal drinking age — play the spicier levels
> accordingly.

## Games included

| Game | What it is |
| --- | --- |
| 🎲 **Lucky Sevens** | The signature game — roll two dice, the sum lands on an escalating outcome. |
| 🃏 **Kings Cup** | Draw from a virtual deck; each card rank triggers a rule. |
| 🙊 **Never Have I Ever** | Confess or drink. Tap through shuffled prompts. |
| 👉 **Most Likely To** | Everyone points; the most-pointed-at drinks. |
| 🔥 **Truth or Dare** | Spin for a player, they choose truth or dare. |
| 🎡 **Spin the Wheel** | Fate picks a random player and a challenge. |

## Spice slider 🌶️

Every game respects a global spice level, so the same app works for a chill
night or a wild one:

- **😇 Tame** — silly & social, safe for anyone
- **🌶️ Spicy** — flirty, bold, a little chaos
- **🔥 Full Send** — adults only, no filter

Prompts are tagged by level and a game only shows content at or below the
selected spice, so lowering the slider instantly makes everything tamer.

Players, spice preference, and custom prompts are saved to `localStorage`, so
they survive a refresh.

## ✍️ Custom prompts

Tap **Add your own prompts** on the home screen to write your own for Never
Have I Ever, Most Likely To, Truths, and Dares. Each prompt gets a spice level
and is mixed straight into the game's deck — so inside jokes and personal
call-outs show up alongside the built-ins.

## 📲 Install & offline (PWA)

Pour Decisions is a Progressive Web App. On a phone, open it in the browser and choose
**Add to Home Screen** — it installs like a native app (its own icon, full
screen, no address bar) and works **offline** after the first load thanks to a
service worker that caches the app shell.

## 📳 Haptics

On supported phones, rolls, draws, and picks give a little vibration for extra
game-show energy. It's a silent no-op everywhere else.

## Tech

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- No backend — everything runs client-side, works offline once loaded
- Installable PWA (`public/manifest.webmanifest` + `public/sw.js`)
- Mobile-first, dark neon theme

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server (hot reload)
npm run build   # production build into dist/
npm run preview # preview the production build
```

Then open the printed URL on your phone (same Wi-Fi) or in a browser.

## Adding content

All the prompts live in `src/data/`:

- `prompts.js` — Never Have I Ever, Most Likely To, Truths, Dares, Wheel
- `kingsCup.js` — the card rules
- `luckySevens.js` — dice outcomes

Each game's **How to play** text lives in the `howTo` field in
`src/games/index.js`.

Each entry has a `level` (1 = Tame, 2 = Spicy, 3 = Full Send). Add a line,
tag its level, and it shows up automatically. To add a whole new game, drop a
component in `src/games/` and register it in `src/games/index.js`.
