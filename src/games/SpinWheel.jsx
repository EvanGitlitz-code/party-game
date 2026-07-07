import { useMemo, useRef, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { wheelChallenges, bySpice } from '../data/prompts.js'
import { makeShuffler, randomItem } from '../utils.js'

export default function SpinWheel() {
  const { spice, players } = useGame()
  const pool = useMemo(() => bySpice(wheelChallenges, spice), [spice])
  const nextRef = useRef(makeShuffler(pool))
  const key = pool.map((p) => p.text).join('|')
  const lastKey = useRef(key)
  if (lastKey.current !== key) { lastKey.current = key; nextRef.current = makeShuffler(pool) }

  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const spin = () => {
    if (spinning) return
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
        setResult({ who: who2, text: nextRef.current()?.text ?? '' })
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
            <strong>{result.who}</strong> {result.text}
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
