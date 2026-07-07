import { useMemo, useRef, useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { bySpice } from '../data/prompts.js'
import { makeShuffler } from '../utils.js'

// A reusable "tap for the next prompt" card game.
export default function SimplePromptGame({ list, cta = 'Next', hint }) {
  const { spice } = useGame()
  const filtered = useMemo(() => bySpice(list, spice), [list, spice])
  const nextRef = useRef(makeShuffler(filtered))
  const [prompt, setPrompt] = useState(null)

  // Rebuild the shuffler if the filtered pool changes (spice moved).
  const poolKey = filtered.map((p) => p.text).join('|')
  const lastKey = useRef(poolKey)
  if (lastKey.current !== poolKey) {
    lastKey.current = poolKey
    nextRef.current = makeShuffler(filtered)
  }

  const advance = () => setPrompt(nextRef.current())

  return (
    <div className="prompt-stage">
      <button className="big-card" onClick={advance}>
        {prompt ? (
          <span className="prompt-text">{prompt.text}</span>
        ) : (
          <span className="prompt-placeholder">Tap to start</span>
        )}
      </button>
      {hint && <p className="hint">{hint}</p>}
      <button className="primary-btn" onClick={advance}>
        {prompt ? cta : 'Deal a card'}
      </button>
    </div>
  )
}
