import { useGame } from '../state/GameContext.jsx'
import { haptics } from '../haptics.js'

// Toggle for alcohol-free mode.
export default function DryToggle() {
  const { dryMode, setDryMode } = useGame()

  const toggle = () => {
    haptics.tap()
    setDryMode(!dryMode)
  }

  return (
    <button
      className={`dry-toggle ${dryMode ? 'on' : ''}`}
      onClick={toggle}
      role="switch"
      aria-checked={dryMode}
    >
      <span className="dry-info">
        <span className="dry-label">🚱 Alcohol-free mode</span>
        <span className="dry-blurb">
          {dryMode
            ? 'Drinks are swapped for mini-challenges.'
            : 'Play the same games with no drinking.'}
        </span>
      </span>
      <span className="switch"><span className="knob" /></span>
    </button>
  )
}
