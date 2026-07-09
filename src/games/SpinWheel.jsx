import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { usePromptSource } from '../hooks/usePromptSource.js'
import { randomItem } from '../utils.js'
import { haptics } from '../haptics.js'

export default function SpinWheel() {
  const { players, renderText } = useGame()
  const source = usePromptSource('wheel')

  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const spin = () => {
    if (spinning) return
    haptics.roll()
    setSpinning(true)
    setResult(null)
    let ticks = 0
    const iv = setInterval(() => {
      const who = players.length ? randomItem(players).name : 'Someone'
      setResult({ who, text: '' })
      ticks += 1
      if (ticks > 10) {
        clearInterval(iv)
        const who2 = players.length ? randomItem(players).name : 'Someone'
        setResult({ who: who2, text: source.next()?.text ?? '' })
        haptics.win()
        setSpinning(false)
      }
    }, 90)
  }

  return (
    <div className="prompt-stage">
      <div className={`wheel ${spinning ? 'spin' : ''}`}>🎡</div>
      {result && result.text ? (
        <div className="big-card roll">
          <span className="prompt-text">
            <strong>{result.who}</strong> {renderText(result.text)}
          </span>
        </div>
      ) : (
        <div className="big-card static">
          <span className="prompt-placeholder">
            {spinning ? result?.who : 'Spin to pick a victim 🎯'}
          </span>
        </div>
      )}
      <button className="primary-btn" onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning…' : 'Spin'}
      </button>
    </div>
  )
}
