import { useState } from 'react'
import { useRoom } from '../state/RoomContext.jsx'
import { useGame } from '../state/GameContext.jsx'

// Screen for choosing single vs multi-phone play, and for hosting/joining a
// multi-phone room.
export default function MultiplayerLobby({ onBack, onHosting }) {
  const { mode, code, status, createRoom, joinRoom, leave, guestCount } = useRoom()
  const { players } = useGame()
  const [tab, setTab] = useState('choose') // 'choose' | 'join'
  const [joinCode, setJoinCode] = useState('')
  const [name, setName] = useState('')

  // Create the room and stay on the host panel (shows the code) until the host
  // taps "Start playing".
  const startHosting = () => createRoom()

  const submitJoin = (e) => {
    e.preventDefault()
    if (joinCode.trim().length === 4 && name.trim()) joinRoom(joinCode, name)
  }

  return (
    <div className="game-view">
      <header className="game-header">
        <button className="back-btn" onClick={mode === 'off' ? onBack : leave}>← Back</button>
        <span className="game-name">📱 Play with friends</span>
        <span className="spice-pill" />
      </header>

      <main className="about-body">
        {mode === 'off' && tab === 'choose' && (
          <>
            <p className="lobby-intro">
              Play on one phone (pass it around) or connect everyone’s phones to
              one shared room.
            </p>

            <button className="lobby-card" onClick={onBack}>
              <span className="lobby-emoji">🤝</span>
              <span className="lobby-title">One phone</span>
              <span className="lobby-sub">Pass-and-play. Add names and share the screen.</span>
            </button>

            <button className="lobby-card accent" onClick={startHosting}>
              <span className="lobby-emoji">📡</span>
              <span className="lobby-title">Host a room</span>
              <span className="lobby-sub">Get a code; friends join from their own phones.</span>
            </button>

            <button className="lobby-card" onClick={() => setTab('join')}>
              <span className="lobby-emoji">🔑</span>
              <span className="lobby-title">Join a room</span>
              <span className="lobby-sub">Enter a friend’s room code.</span>
            </button>
          </>
        )}

        {mode === 'off' && tab === 'join' && (
          <form className="join-form" onSubmit={submitJoin}>
            <button type="button" className="ghost-btn" onClick={() => setTab('choose')}>← Back</button>
            <h2 className="join-h">Join a room</h2>
            <label className="join-label">Room code</label>
            <input
              className="code-input"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 4))}
              placeholder="ABCD"
              autoCapitalize="characters"
              maxLength={4}
              aria-label="Room code"
            />
            <label className="join-label">Your name</label>
            <input
              className="player-form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={20}
              aria-label="Your name"
            />
            <button
              type="submit"
              className="primary-btn"
              disabled={joinCode.trim().length !== 4 || !name.trim()}
            >
              Join
            </button>
          </form>
        )}

        {mode === 'host' && (
          <div className="host-panel">
            <p className="host-code-label">Your room code</p>
            <div className="host-code">{code}</div>
            <p className="host-status">
              {status === 'ready' || status === 'connecting'
                ? guestCount > 0
                  ? `${guestCount} friend${guestCount > 1 ? 's' : ''} joined 🎉`
                  : 'Waiting for friends to join…'
                : status === 'error'
                  ? 'Connection problem — try leaving and hosting again.'
                  : ''}
            </p>
            <div className="roster-strip">
              {players.map((p) => (
                <span key={p.id} className="chip">{p.name}</span>
              ))}
            </div>
            <button className="primary-btn" onClick={onHosting}>Start playing →</button>
            <button className="ghost-btn" onClick={leave}>Close room</button>
          </div>
        )}
      </main>
    </div>
  )
}
