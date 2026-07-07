import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Production builds are served from a GitHub Pages subpath
// (https://<user>.github.io/party-game/), so we set `base` accordingly.
// Local dev/preview stays at the root for simplicity.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/party-game/' : '/',
  plugins: [react()],
}))
