import { useRef, useState } from 'react'
import { usePool } from '../hooks/usePool.js'
import { makeShuffler } from '../utils.js'
import { haptics } from '../haptics.js'

// A reusable "tap for the next prompt" card game.
export default function SimplePromptGame({ category, cta = 'Next', hint }) {
  const filtered = usePool(category)
  const nextRef = useRef(makeShuffler(filtered))
  const [prompt, setPrompt] = useState(null)

  // Rebuild the shuffler if the filtered pool changes (spice moved or a
  // custom prompt was added/removed).
  const poolKey = filtered.map((p) => p.text).join('|')
  const lastKey = useRef(poolKey)
  if (lastKey.current !== poolKey) {
    lastKey.current = poolKey
    nextRef.current = makeShuffler(filtered)
  }

  const advance = () => {
    haptics.tap()
    setPrompt(nextRef.current())
  }

  return (
    <div className="prompt-stage">
      <button className="big-card" onClick={advance}>
        {prompt ? (
          <>
            {prompt.custom && <span className="custom-tag">✍️ Custom</span>}
            <span className="prompt-text">{prompt.text}</span>
          </>
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
