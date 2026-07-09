# 🍎 Building Pre Game for the iOS App Store

The app is wrapped for native iOS with [Capacitor](https://capacitorjs.com/).
These steps run on a **Mac** (Apple requires macOS + Xcode to build and submit
iOS apps). Everything is already configured — you mostly run a few commands.

## Prerequisites (one-time)

1. **A Mac** with **Xcode** installed (from the Mac App Store), then run Xcode
   once to accept its license and install components.
2. **CocoaPods**: `sudo gem install cocoapods` (or `brew install cocoapods`).
3. **Node 20+**: `node --version` (install from https://nodejs.org if needed).
4. An **Apple Developer Program** membership ($99/year) — required to publish.

## First-time setup

From the project folder:

```bash
npm install              # install dependencies
npm run build:app        # build the web assets for native (root base path)
npx cap add ios          # create the native ios/ Xcode project (first time only)
npx cap sync ios         # copy web assets + plugins into the project
```

Then generate the app icons and splash screens from the source art in
`resources/` (already prepared for you):

```bash
npx @capacitor/assets generate --ios
```

Open it in Xcode:

```bash
npx cap open ios
```

## In Xcode (one-time configuration)

1. Select the **App** target → **Signing & Capabilities**:
   - Check **Automatically manage signing** and pick your **Team**.
   - **Bundle Identifier**: `com.pregame.app` (change to your own reverse-domain
     if you prefer, e.g. `com.yourname.pregame`).
2. **General** tab: set the **Display Name** to `Pre Game` and a
   **Version** (1.0.0) and **Build** (1).
3. Pick a simulator or your plugged-in iPhone and press **▶ Run** to test.

## Everyday workflow

After any code change, rebuild and re-sync in one command:

```bash
npm run ios      # = build:app + cap sync ios + cap open ios
```

(or `npm run cap:sync` to sync without opening Xcode.)

## Submitting to the App Store

1. In Xcode: **Product → Archive**.
2. In the Organizer window: **Distribute App → App Store Connect**.
3. In [App Store Connect](https://appstoreconnect.apple.com): create the app
   listing, upload screenshots, set the description, and fill in the **age
   rating questionnaire**.

### App Store review notes for this app

- **Age rating**: answer the questionnaire so it lands at **17+** — the app has
  **frequent/intense references to alcohol** and mature/suggestive themes.
- **Point out the safeguards** in the "Notes for Review" field: the app has an
  **age gate** on launch, a **responsible-drinking notice**, and an
  **alcohol-free mode** that replaces every drink with a non-alcoholic
  mini-challenge. This directly addresses guideline **1.4.3**.
- **Privacy**: in App Store Connect's privacy section, you can declare **no data
  collected** — the app has no accounts and no analytics, and stores everything
  on-device. Cross-device multiplayer is **peer-to-peer** (WebRTC via PeerJS):
  player names and prompts flow directly between phones and are **not stored on
  any server**, so nothing is collected by you. You still must provide a
  **privacy policy URL** (host the text from the in-app About screen).
- **Trademark**: confirm you have the right to use the name "Pre Game"
  before submitting — it's a common pun and may be claimed by others.

## Notes

- The `ios/` folder is created on your Mac by `cap add ios`. Commit it so your
  signing config and any native tweaks persist.
- `npm audit` reports advisories in **@capacitor/cli**. That's a build-time-only
  developer tool — it is never bundled into the shipped app and never runs in
  the web deploy, so it doesn't affect end users. Upgrade Capacitor to a newer
  major later if you want it clean.
- The web/PWA version (GitHub Pages) is unaffected by any of this — `npm run
  build` still targets the `/party-game/` subpath; only `npm run build:app`
  switches to the root path Capacitor needs.
