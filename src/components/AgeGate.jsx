import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { haptics } from '../haptics.js'

// Shown on first launch until the user confirms they're of legal drinking age.
export default function AgeGate() {
  const { verifyAge } = useGame()
  const [denied, setDenied] = useState(false)

  if (denied) {
    return (
      <div className="gate">
        <div className="gate-card">
          <h1 className="gate-logo"><span>PRE</span><span>GAME</span></h1>
          <p className="gate-deny">
            No worries — come back when you’re of legal drinking age. 🚸
          </p>
          <button className="ghost-btn" onClick={() => setDenied(false)}>Go back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="gate">
      <div className="gate-card">
        <h1 className="gate-logo"><span>PRE</span><span>GAME</span></h1>
        <p className="gate-tag">A party game for adults 🍻</p>
        <p className="gate-q">Are you of legal drinking age?</p>
        <p className="gate-note">
          This app is intended for adults of legal drinking age. It contains
          references to alcohol and mature themes.
        </p>
        <div className="gate-actions">
          <button
            className="primary-btn"
            onClick={() => { haptics.pick(); verifyAge() }}
          >
            Yes, I’m of legal age
          </button>
          <button className="ghost-btn" onClick={() => setDenied(true)}>
            No
          </button>
        </div>
        <p className="gate-resp">
          Please play responsibly. Never drink and drive. Know your limits, and
          never pressure anyone to drink — every prompt can be skipped.
        </p>
      </div>
    </div>
  )
}
