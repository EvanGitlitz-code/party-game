// Small shared helpers.

export function randomItem(list) {
  if (!list || list.length === 0) return null
  return list[Math.floor(Math.random() * list.length)]
}

// Returns a function that yields items without immediate repeats,
// reshuffling once the deck is exhausted. Great for prompt games.
export function makeShuffler(list) {
  let deck = []
  const reshuffle = () => {
    deck = [...list]
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[deck[i], deck[j]] = [deck[j], deck[i]]
    }
  }
  return () => {
    if (deck.length === 0) reshuffle()
    return deck.pop()
  }
}

export function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}
