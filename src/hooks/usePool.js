import { useMemo } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { BASE_BY_KEY, atSpice } from '../data/prompts.js'

// Returns the merged prompt pool for a category at the CURRENT spice level:
// built-in prompts + any custom ones the players added, filtered to exactly
// the selected heat.
export function usePool(category) {
  const { spice, customPrompts } = useGame()
  const base = BASE_BY_KEY[category] ?? []
  const custom = customPrompts?.[category] ?? []
  return useMemo(
    () => atSpice([...base, ...custom], spice),
    [base, custom, spice],
  )
}
