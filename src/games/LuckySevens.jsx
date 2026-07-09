import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { rollOutcomeText } from '../data/luckySevens.js'
import { rollDie, randomItem } from '../utils.js'
import { haptics } from '../haptics.js'

const PIPS = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' }

export default function LuckySevens() {
  const { spice, players, renderText } = useGame()
  const [dice, setDice] = useState([1, 1])
  const [outcome, setOutcome] = useState(null)
  const [rolling, setRolling] = useState(false)

  const roll = () => {
    if (rolling) return
    haptics.roll()
    setRolling(true)
    setOutcome(null)
    // Quick shuffle animation, then settle.
    let ticks = 0
    const spin = setInterval(() => {
      setDice([rollDie(), rollDie()])
      ticks += 1
      if (ticks > 8) {
        clearInterval(spin)
        const final = [rollDie(), rollDie()]
        setDice(final)
        const sum = final[0] + final[1]
        const who = players.length ? randomItem(players).name : 'Someone'
        setOutcome({ sum, ...rollOutcomeText(sum, spice, who) })
        haptics.win()
        setRolling(false)
      }
    }, 70)
  }

  return (
    <div className="prompt-stage">
      <div className={`dice-row ${rolling ? 'rolling' : ''}`}>
        <span className="die">{PIPS[dice[0]]}</span>
        <span className="die">{PIPS[dice[1]]}</span>
      </div>
      {outcome ? (
        <div className="big-card roll">
          <span className="kind-tag">{outcome.emoji} {renderText(outcome.name)} · {outcome.sum}</span>
          <span className="prompt-text">{renderText(outcome.text)}</span>
        </div>
      ) : (
        <div className="big-card static">
          <span className="prompt-placeholder">Roll the bones 🎲</span>
        </div>
      )}
      <button className="primary-btn" onClick={roll} disabled={rolling}>
        {rolling ? 'Rolling…' : 'Roll'}
      </button>
    </div>
  )
}
