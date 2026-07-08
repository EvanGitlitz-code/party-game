import { haptics } from '../haptics.js'

// A "How to play" overlay for a single game. `game.howTo` supplies the content.
export default function Instructions({ game, onClose }) {
  const howTo = game.howTo
  if (!howTo) return null

  const close = () => {
    haptics.tap()
    onClose()
  }

  return (
    <div className="sheet-backdrop" onClick={close}>
      <div
        className="sheet"
        style={{ '--accent': game.accent }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`How to play ${game.title}`}
      >
        <div className="sheet-grip" />
        <h2 className="sheet-title">
          {game.emoji} How to play · {game.title}
        </h2>
        <p className="sheet-goal">{howTo.goal}</p>
        <ol className="sheet-steps">
          {howTo.steps.map((step, i) => (
            <li key={i}>
              <span className="step-num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {howTo.tip && <p className="sheet-tip">💡 {howTo.tip}</p>}
        <button className="primary-btn" onClick={close}>
          Got it
        </button>
      </div>
    </div>
  )
}
