import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { soberize } from '../data/soberize.js'

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

const EMPTY_CUSTOM = { neverHaveIEver: [], mostLikelyTo: [], truths: [], dares: [] }

export function GameProvider({ children }) {
  const saved = loadInitial()
  const [players, setPlayers] = useState(saved?.players ?? [])
  const [spice, setSpice] = useState(saved?.spice ?? SPICE.SPICY)
  const [customPrompts, setCustomPrompts] = useState({
    ...EMPTY_CUSTOM,
    ...(saved?.customPrompts ?? {}),
  })
  // Whether the user has confirmed they're of legal drinking age.
  const [ageVerified, setAgeVerified] = useState(saved?.ageVerified ?? false)
  // Alcohol-free mode: swaps drink/sip prompts for challenges.
  const [dryMode, setDryMode] = useState(saved?.dryMode ?? false)

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ players, spice, customPrompts, ageVerified, dryMode }),
      )
    } catch {
      /* storage unavailable — fine, we just don't persist */
    }
  }, [players, spice, customPrompts, ageVerified, dryMode])

  const verifyAge = () => setAgeVerified(true)

  // Rewrite drink language into challenge language when no-alcohol mode is on.
  const renderText = (text) => (dryMode ? soberize(text) : text)

  const addCustomPrompt = (category, text, level) => {
    const clean = text.trim()
    if (!clean || !(category in EMPTY_CUSTOM)) return
    setCustomPrompts((prev) => ({
      ...prev,
      [category]: [
        ...prev[category],
        { id: crypto.randomUUID(), text: clean, level, custom: true },
      ],
    }))
  }

  const removeCustomPrompt = (category, id) =>
    setCustomPrompts((prev) => ({
      ...prev,
      [category]: prev[category].filter((p) => p.id !== id),
    }))

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
    () => ({
      players,
      addPlayer,
      removePlayer,
      clearPlayers,
      spice,
      setSpice,
      customPrompts,
      addCustomPrompt,
      removeCustomPrompt,
      ageVerified,
      verifyAge,
      dryMode,
      setDryMode,
      renderText,
    }),
    [players, spice, customPrompts, ageVerified, dryMode],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
