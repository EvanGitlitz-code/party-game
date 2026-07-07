# 🎲 Septic — Party Game Night

A mobile-first party drinking game app that bundles several games behind one
home screen. Add your friends, dial the spice level, and pick a game.

> **Please drink responsibly.** Know your limits and never drink and drive.
> The app is for adults of legal drinking age — play the spicier levels
> accordingly.

## Games included

| Game | What it is |
| --- | --- |
| 🎲 **Septic Roll** | The signature game — roll two dice, the sum lands on an escalating outcome. |
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

Players and spice preference are saved to `localStorage`, so they survive a
refresh.

## Tech

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- No backend — everything runs client-side, works offline once loaded
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
- `septicRoll.js` — dice outcomes

Each entry has a `level` (1 = Tame, 2 = Spicy, 3 = Full Send). Add a line,
tag its level, and it shows up automatically. To add a whole new game, drop a
component in `src/games/` and register it in `src/games/index.js`.
