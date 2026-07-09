import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { usePromptSource } from '../hooks/usePromptSource.js'
import { randomItem } from '../utils.js'
import { useRoom } from '../state/RoomContext.jsx'
import { haptics } from '../haptics.js'

export default function TruthOrDare() {
  const { players, renderText } = useGame()
  const { publishNow } = useRoom()
  const truthSource = usePromptSource('truths')
  const dareSource = usePromptSource('dares')

  const [turnPlayer, setTurnPlayer] = useState(null)
  const [result, setResult] = useState(null)

  const pickPlayer = () => {
    haptics.pick()
    setResult(null)
    const p = players.length ? randomItem(players) : { name: 'Someone' }
    setTurnPlayer(p)
    publishNow({ game: 'Truth or Dare', text: `🎲 ${p.name}, you’re up! Truth or Dare?` })
  }

  const choose = (kind) => {
    haptics.tap()
    const next = kind === 'truth' ? truthSource.next() : dareSource.next()
    setResult({ kind, text: next?.text ?? '—' })
    publishNow({ game: 'Truth or Dare', text: `${kind === 'truth' ? '💬 Truth' : '🔥 Dare'} — ${renderText(next?.text ?? '—')}` })
  }

  return (
    <div className="prompt-stage">
      {!turnPlayer ? (
        <>
          <div className="big-card static">
            <span className="prompt-placeholder">Pick who’s up first</span>
          </div>
          <button className="primary-btn" onClick={pickPlayer}>Spin for a player</button>
        </>
      ) : (
        <>
          <div className="turn-banner">🎲 {turnPlayer.name}, you’re up!</div>
          {!result ? (
            <div className="tod-choice">
              <button className="choice-btn truth" onClick={() => choose('truth')}>
                Truth
              </button>
              <button className="choice-btn dare" onClick={() => choose('dare')}>
                Dare
              </button>
            </div>
          ) : (
            <div className={`big-card ${result.kind}`}>
              <span className="kind-tag">{result.kind === 'truth' ? '💬 Truth' : '🔥 Dare'}</span>
              <span className="prompt-text">{renderText(result.text)}</span>
            </div>
          )}
          <button className="primary-btn" onClick={pickPlayer}>Next player</button>
        </>
      )}
    </div>
  )
}
