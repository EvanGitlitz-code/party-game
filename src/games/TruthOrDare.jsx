import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { usePromptSource } from '../hooks/usePromptSource.js'
import { randomItem } from '../utils.js'
import { haptics } from '../haptics.js'

export default function TruthOrDare() {
  const { players, renderText } = useGame()
  const truthSource = usePromptSource('truths')
  const dareSource = usePromptSource('dares')

  const [turnPlayer, setTurnPlayer] = useState(null)
  const [result, setResult] = useState(null)

  const pickPlayer = () => {
    haptics.pick()
    setResult(null)
    setTurnPlayer(players.length ? randomItem(players) : { name: 'Someone' })
  }

  const choose = (kind) => {
    haptics.tap()
    const next = kind === 'truth' ? truthSource.next() : dareSource.next()
    setResult({ kind, text: next?.text ?? '—' })
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
