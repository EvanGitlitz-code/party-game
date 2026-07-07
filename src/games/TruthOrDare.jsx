import { useMemo, useRef, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { truths, dares, bySpice } from '../data/prompts.js'
import { makeShuffler, randomItem } from '../utils.js'

export default function TruthOrDare() {
  const { spice, players } = useGame()
  const truthPool = useMemo(() => bySpice(truths, spice), [spice])
  const darePool = useMemo(() => bySpice(dares, spice), [spice])

  const truthNext = useRef(makeShuffler(truthPool))
  const dareNext = useRef(makeShuffler(darePool))
  const tKey = truthPool.map((t) => t.text).join('|')
  const dKey = darePool.map((d) => d.text).join('|')
  const lastT = useRef(tKey)
  const lastD = useRef(dKey)
  if (lastT.current !== tKey) { lastT.current = tKey; truthNext.current = makeShuffler(truthPool) }
  if (lastD.current !== dKey) { lastD.current = dKey; dareNext.current = makeShuffler(darePool) }

  const [turnPlayer, setTurnPlayer] = useState(null)
  const [result, setResult] = useState(null)

  const pickPlayer = () => {
    setResult(null)
    setTurnPlayer(players.length ? randomItem(players) : { name: 'Someone' })
  }

  const choose = (kind) => {
    const next = kind === 'truth' ? truthNext.current() : dareNext.current()
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
              <span className="prompt-text">{result.text}</span>
            </div>
          )}
          <button className="primary-btn" onClick={pickPlayer}>Next player</button>
        </>
      )}
    </div>
  )
}
