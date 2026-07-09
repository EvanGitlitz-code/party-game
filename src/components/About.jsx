const APP_VERSION = '1.0.0'

// About / legal / privacy screen. Reachable from the home footer.
export default function About({ onBack }) {
  return (
    <div className="game-view about-view">
      <header className="game-header">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <span className="game-name">ℹ️ About</span>
        <span className="spice-pill" />
      </header>

      <main className="about-body">
        <h1 className="about-logo"><span>PRE</span><span>GAME</span></h1>
        <p className="about-tag">The party game night in your pocket 🍻</p>
        <p className="about-version">Version {APP_VERSION}</p>

        <section className="about-block warn">
          <h2>🍻 Drink responsibly</h2>
          <p>
            Pre Game is for adults of legal drinking age. Please play
            responsibly, know your limits, and <strong>never drink and drive</strong>.
            No one should ever be pressured to drink — every prompt can be
            skipped. Prefer not to drink at all? Turn on <strong>Alcohol-free
            mode</strong> on the home screen and every drink becomes a
            mini-challenge instead.
          </p>
        </section>

        <section className="about-block">
          <h2>🔒 Privacy</h2>
          <p>
            Your privacy is simple here: <strong>we collect nothing</strong>.
            There are no accounts, no sign-ups, no ads, and no tracking. Your
            players, custom prompts, and settings are stored only on your own
            device (in your browser’s local storage) and never leave it. Clearing
            the app’s data or your browser storage removes everything.
          </p>
        </section>

        <section className="about-block">
          <h2>📜 Terms of use</h2>
          <p>
            This app is provided “as is,” for entertainment only. You are
            responsible for how you and your group choose to play. By using it
            you confirm you are of legal drinking age in your location.
          </p>
        </section>

        <p className="about-foot">Made for good times, played responsibly. 🎲</p>
      </main>
    </div>
  )
}
