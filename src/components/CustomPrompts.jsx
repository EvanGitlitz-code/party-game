import { useState } from 'react'
import { useGame, SPICE_META } from '../state/GameContext.jsx'
import { CATEGORIES } from '../data/prompts.js'
import { haptics } from '../haptics.js'

export default function CustomPrompts({ onBack }) {
  const { customPrompts, addCustomPrompt, removeCustomPrompt } = useGame()
  const [active, setActive] = useState(CATEGORIES[0].key)
  const [text, setText] = useState('')
  const [level, setLevel] = useState(1)

  const activeCat = CATEGORIES.find((c) => c.key === active)
  const list = customPrompts[active] ?? []

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    haptics.tap()
    addCustomPrompt(active, text, level)
    setText('')
  }

  return (
    <div className="game-view custom-view">
      <header className="game-header">
        <button className="back-btn" onClick={onBack}>← Home</button>
        <span className="game-name">✍️ Your Prompts</span>
        <span className="spice-pill" />
      </header>

      <main className="custom-body">
        <div className="cat-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`cat-tab ${c.key === active ? 'on' : ''}`}
              onClick={() => setActive(c.key)}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <form className="custom-form" onSubmit={submit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Write a "${activeCat.label}" prompt…`}
            maxLength={140}
            rows={2}
            aria-label="Prompt text"
          />
          <div className="level-picker">
            {[1, 2, 3].map((lv) => (
              <button
                type="button"
                key={lv}
                className={`level-chip ${level === lv ? 'on' : ''} lv-${lv}`}
                onClick={() => setLevel(lv)}
              >
                {SPICE_META[lv].emoji} {SPICE_META[lv].label}
              </button>
            ))}
          </div>
          <button type="submit" className="primary-btn" disabled={!text.trim()}>
            Add prompt
          </button>
        </form>

        <div className="custom-list">
          <h3>
            Your {activeCat.label}
            {list.length > 0 && <span className="count">{list.length}</span>}
          </h3>
          {list.length === 0 ? (
            <p className="empty-hint">
              No custom prompts yet. Add one above — it’ll show up in the game
              when the spice is set to that level.
            </p>
          ) : (
            <ul>
              {list.map((p) => (
                <li key={p.id} className="custom-row">
                  <span className={`lv-dot lv-${p.level}`}>{SPICE_META[p.level].emoji}</span>
                  <span className="custom-row-text">{p.text}</span>
                  <button
                    className="del-btn"
                    onClick={() => removeCustomPrompt(active, p.id)}
                    aria-label="Delete prompt"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
