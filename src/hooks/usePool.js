import { useMemo } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { BASE_BY_KEY, bySpice } from '../data/prompts.js'

// Returns the merged, spice-filtered prompt pool for a category:
// built-in prompts + any custom ones the players added.
export function usePool(category) {
  const { spice, customPrompts } = useGame()
  const base = BASE_BY_KEY[category] ?? []
  const custom = customPrompts?.[category] ?? []
  return useMemo(
    () => bySpice([...base, ...custom], spice),
    [base, custom, spice],
  )
}
