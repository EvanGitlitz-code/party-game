import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Web (GitHub Pages) builds are served from a subpath
// (https://<user>.github.io/party-game/). Native app builds (Capacitor, via
// `CAP_BUILD=1`) load bundled assets from the root, so they use '/'. Local
// dev/preview also stays at the root.
export default defineConfig(({ command }) => {
  const forNativeApp = process.env.CAP_BUILD === '1'
  const isWebBuild = command === 'build' && !forNativeApp
  return {
    base: isWebBuild ? '/party-game/' : '/',
    plugins: [react()],
  }
})
