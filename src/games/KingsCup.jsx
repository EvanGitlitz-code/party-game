import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { SUITS, RANKS, cardRules } from '../data/kingsCup.js'
import { fillDynamic } from '../data/generator.js'
import { haptics } from '../haptics.js'

function buildDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ suit, rank })
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export default function KingsCup() {
  const { spice, renderText } = useGame()
  const [deck, setDeck] = useState(() => buildDeck())
  const [card, setCard] = useState(null)

  const draw = () => {
    if (deck.length === 0) return
    haptics.pick()
    const next = deck[0]
    setDeck((d) => d.slice(1))
    // Resolve the rule text (and any {word}/{category}/{dare}/… tokens) once,
    // at draw time, so it stays stable while the card is shown.
    const rule = cardRules[next.rank]
    const text = fillDynamic(rule[spice] || rule[1], spice)
    setCard({ ...next, text })
  }

  const reset = () => {
    setDeck(buildDeck())
    setCard(null)
  }

  const rule = card ? cardRules[card.rank] : null
  const ruleText = card ? card.text : null
  const isRed = card && (card.suit === '♥' || card.suit === '♦')
  const drawn = 52 - deck.length

  return (
    <div className="prompt-stage">
      <div className="deck-meta">
        <span>{deck.length} cards left</span>
        <button className="ghost-btn" onClick={reset}>Reshuffle</button>
      </div>
      {card ? (
        <div className="playing-card">
          <span className={`card-corner ${isRed ? 'red' : 'black'}`}>
            {card.rank}{card.suit}
          </span>
          <span className="card-rule-title">{renderText(rule.title)}</span>
          <span className="card-rule-text">{renderText(ruleText)}</span>
        </div>
      ) : (
        <div className="big-card static">
          <span className="prompt-placeholder">Draw a card 🃏</span>
        </div>
      )}
      {deck.length === 0 ? (
        <button className="primary-btn" onClick={reset}>Deck empty — reshuffle</button>
      ) : (
        <button className="primary-btn" onClick={draw}>
          {drawn === 0 ? 'Draw first card' : 'Draw card'}
        </button>
      )}
    </div>
  )
}
