import { useState } from 'react'
import { GAMES } from './games/index.js'
import { SPICE_META, useGame } from './state/GameContext.jsx'
import PlayerSetup from './components/PlayerSetup.jsx'
import SpiceSlider from './components/SpiceSlider.jsx'

function Home({ onPick }) {
  return (
    <div className="home">
      <header className="hero">
        <h1 className="logo">SEPTIC</h1>
        <p className="tagline">The party game night in your pocket 🍻</p>
      </header>

      <PlayerSetup />
      <SpiceSlider />

      <section className="catalog">
        <h2>Pick a game</h2>
        <div className="game-grid">
          {GAMES.map((g) => (
            <button
              key={g.id}
              className="game-tile"
              style={{ '--accent': g.accent }}
              onClick={() => onPick(g)}
            >
              <span className="tile-emoji">{g.emoji}</span>
              <span className="tile-title">{g.title}</span>
              <span className="tile-tagline">{g.tagline}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="foot">
        <p>Please drink responsibly. Know your limits. 🚕 Never drink and drive.</p>
      </footer>
    </div>
  )
}

function GameView({ game, onBack }) {
  const { spice } = useGame()
  const meta = SPICE_META[spice]
  const { Component } = game
  return (
    <div className="game-view" style={{ '--accent': game.accent }}>
      <header className="game-header">
        <button className="back-btn" onClick={onBack}>← Games</button>
        <span className="game-name">{game.emoji} {game.title}</span>
        <span className="spice-pill">{meta.emoji}</span>
      </header>
      <main className="game-body">
        <Component />
      </main>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(null)

  return active ? (
    <GameView game={active} onBack={() => setActive(null)} />
  ) : (
    <Home onPick={setActive} />
  )
}
