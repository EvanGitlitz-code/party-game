import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'

export default function PlayerSetup() {
  const { players, addPlayer, removePlayer, clearPlayers } = useGame()
  const [name, setName] = useState('')

  const submit = (e) => {
    e.preventDefault()
    addPlayer(name)
    setName('')
  }

  return (
    <section className="players">
      <div className="players-head">
        <h2>Players {players.length > 0 && <span className="count">{players.length}</span>}</h2>
        {players.length > 0 && (
          <button className="ghost-btn" onClick={clearPlayers}>Clear</button>
        )}
      </div>

      <form className="player-form" onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add a player…"
          maxLength={20}
          aria-label="Player name"
        />
        <button type="submit" className="add-btn" aria-label="Add player">＋</button>
      </form>

      {players.length === 0 ? (
        <p className="empty-hint">Add everyone playing so games can call people out by name. (Optional — you can play without.)</p>
      ) : (
        <ul className="player-chips">
          {players.map((p) => (
            <li key={p.id} className="chip">
              {p.name}
              <button onClick={() => removePlayer(p.id)} aria-label={`Remove ${p.name}`}>×</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
