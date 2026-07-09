import { useState } from 'react'
import { usePromptSource } from '../hooks/usePromptSource.js'
import { useGame } from '../state/GameContext.jsx'
import { haptics } from '../haptics.js'

// A reusable "tap for the next prompt" card game. Prompts are endless: each tap
// pulls a fresh one from the generator + curated/custom pool for this category.
export default function SimplePromptGame({ category, cta = 'Next', hint }) {
  const source = usePromptSource(category)
  const { renderText } = useGame()
  const [prompt, setPrompt] = useState(null)

  const advance = () => {
    haptics.tap()
    setPrompt(source.next())
  }

  return (
    <div className="prompt-stage">
      <button className="big-card" onClick={advance}>
        {prompt ? (
          <>
            {prompt.custom && <span className="custom-tag">✍️ Custom</span>}
            <span className="prompt-text">{renderText(prompt.text)}</span>
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
