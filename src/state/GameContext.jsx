import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const GameContext = createContext(null)

const STORAGE_KEY = 'septic:v1'

// Spice levels: 1 = Tame, 2 = Spicy, 3 = Full Send.
// A prompt tagged with a level shows up at that level and anything hotter.
export const SPICE = {
  TAME: 1,
  SPICY: 2,
  WILD: 3,
}

export const SPICE_META = {
  1: { label: 'Tame', emoji: '😇', blurb: 'Silly & social. Safe for anyone.' },
  2: { label: 'Spicy', emoji: '🌶️', blurb: 'Flirty, bold, a little chaos.' },
  3: { label: 'Full Send', emoji: '🔥', blurb: 'Adults only. No filter.' },
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function GameProvider({ children }) {
  const saved = loadInitial()
  const [players, setPlayers] = useState(saved?.players ?? [])
  const [spice, setSpice] = useState(saved?.spice ?? SPICE.SPICY)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ players, spice }))
    } catch {
      /* storage unavailable — fine, we just don't persist */
    }
  }, [players, spice])

  const addPlayer = (name) => {
    const clean = name.trim()
    if (!clean) return
    setPlayers((prev) => {
      if (prev.some((p) => p.name.toLowerCase() === clean.toLowerCase())) return prev
      return [...prev, { id: crypto.randomUUID(), name: clean }]
    })
  }

  const removePlayer = (id) =>
    setPlayers((prev) => prev.filter((p) => p.id !== id))

  const clearPlayers = () => setPlayers([])

  const value = useMemo(
    () => ({ players, addPlayer, removePlayer, clearPlayers, spice, setSpice }),
    [players, spice],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
