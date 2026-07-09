import { useState } from 'react'
import { GAMES } from './games/index.js'
import { SPICE_META, useGame } from './state/GameContext.jsx'
import { useRoom } from './state/RoomContext.jsx'
import PlayerSetup from './components/PlayerSetup.jsx'
import SpiceSlider from './components/SpiceSlider.jsx'
import CustomPrompts from './components/CustomPrompts.jsx'
import Instructions from './components/Instructions.jsx'
import AgeGate from './components/AgeGate.jsx'
import About from './components/About.jsx'
import DryToggle from './components/DryToggle.jsx'
import MultiplayerLobby from './components/MultiplayerLobby.jsx'
import GuestMirror from './components/GuestMirror.jsx'

function HostBanner({ onOpen }) {
  const { mode, code, guestCount } = useRoom()
  if (mode !== 'host') return null
  return (
    <button className="host-banner" onClick={onOpen}>
      📡 Hosting room <strong>{code}</strong> · {guestCount} joined
    </button>
  )
}

function Home({ onPick, onCustom, onAbout, onMultiplayer }) {
  const [helpGame, setHelpGame] = useState(null)

  const openHelp = (e, game) => {
    e.stopPropagation()
    setHelpGame(game)
  }

  return (
    <div className="home">
      <header className="hero">
        <h1 className="logo"><span>PRE</span><span>GAME</span></h1>
        <p className="tagline">The party game night in your pocket 🍻</p>
      </header>

      <HostBanner onOpen={onMultiplayer} />

      <button className="multiplayer-cta" onClick={onMultiplayer}>
        📱 Play on one phone or connect everyone’s
      </button>

      <PlayerSetup />
      <SpiceSlider />
      <DryToggle />

      <section className="catalog">
        <h2>Pick a game</h2>
        <div className="game-grid">
          {GAMES.map((g) => (
            <div
              key={g.id}
              className="game-tile"
              style={{ '--accent': g.accent }}
              role="button"
              tabIndex={0}
              onClick={() => onPick(g)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onPick(g)
                }
              }}
            >
              <button
                className="tile-info"
                onClick={(e) => openHelp(e, g)}
                aria-label={`How to play ${g.title}`}
              >
                ?
              </button>
              <span className="tile-emoji">{g.emoji}</span>
              <span className="tile-title">{g.title}</span>
              <span className="tile-tagline">{g.tagline}</span>
            </div>
          ))}
        </div>
      </section>

      <button className="custom-cta" onClick={onCustom}>
        ✍️ Add your own prompts
      </button>

      <footer className="foot">
        <p>Please drink responsibly. Know your limits. 🚕 Never drink and drive.</p>
        <button className="link-btn" onClick={onAbout}>About · Privacy · Terms</button>
      </footer>

      {helpGame && <Instructions game={helpGame} onClose={() => setHelpGame(null)} />}
    </div>
  )
}

function GameView({ game, onBack }) {
  const { spice, dryMode } = useGame()
  const meta = SPICE_META[spice]
  const { Component } = game
  const [showHelp, setShowHelp] = useState(false)
  return (
    <div className="game-view" style={{ '--accent': game.accent }}>
      <header className="game-header">
        <button className="back-btn" onClick={onBack}>← Games</button>
        <span className="game-name">{game.emoji} {game.title}</span>
        <div className="header-right">
          <button
            className="info-btn"
            onClick={() => setShowHelp(true)}
            aria-label={`How to play ${game.title}`}
          >
            ?
          </button>
          {dryMode && <span className="spice-pill" title="Alcohol-free mode">🚱</span>}
          <span className="spice-pill">{meta.emoji}</span>
        </div>
      </header>
      <main className="game-body">
        <Component />
      </main>
      {showHelp && <Instructions game={game} onClose={() => setShowHelp(false)} />}
    </div>
  )
}

export default function App() {
  const { ageVerified } = useGame()
  const { mode } = useRoom()
  const [active, setActive] = useState(null)
  const [screen, setScreen] = useState('home')

  if (!ageVerified) return <AgeGate />
  // A guest device mirrors the host — it doesn't run games locally.
  if (mode === 'guest') return <GuestMirror />
  if (active) return <GameView game={active} onBack={() => setActive(null)} />
  if (screen === 'lobby') {
    return (
      <MultiplayerLobby
        onBack={() => setScreen('home')}
        onHosting={() => setScreen('home')}
      />
    )
  }
  if (screen === 'custom') return <CustomPrompts onBack={() => setScreen('home')} />
  if (screen === 'about') return <About onBack={() => setScreen('home')} />
  return (
    <Home
      onPick={setActive}
      onCustom={() => setScreen('custom')}
      onAbout={() => setScreen('about')}
      onMultiplayer={() => setScreen('lobby')}
    />
  )
}
