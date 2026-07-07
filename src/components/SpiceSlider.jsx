import { useGame, SPICE_META } from '../state/GameContext.jsx'

export default function SpiceSlider() {
  const { spice, setSpice } = useGame()
  const meta = SPICE_META[spice]

  return (
    <div className="spice">
      <div className="spice-head">
        <span className="spice-label">
          {meta.emoji} Spice: <strong>{meta.label}</strong>
        </span>
        <span className="spice-blurb">{meta.blurb}</span>
      </div>
      <input
        type="range"
        min="1"
        max="3"
        step="1"
        value={spice}
        onChange={(e) => setSpice(Number(e.target.value))}
        className={`spice-range level-${spice}`}
        aria-label="Spice level"
      />
      <div className="spice-ticks">
        <span className={spice === 1 ? 'on' : ''}>😇 Tame</span>
        <span className={spice === 2 ? 'on' : ''}>🌶️ Spicy</span>
        <span className={spice === 3 ? 'on' : ''}>🔥 Full Send</span>
      </div>
    </div>
  )
}
