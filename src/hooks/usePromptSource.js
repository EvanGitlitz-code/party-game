import { useRef } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { BASE_BY_KEY, wheelChallenges } from '../data/prompts.js'
import { makeSource } from '../data/generator.js'

// Curated prompt lists keyed by category (the four custom categories plus the
// wheel, which has no custom bucket).
const CURATED = { ...BASE_BY_KEY, wheel: wheelChallenges }

// Returns a stable endless prompt source for a category. The source is rebuilt
// only when the spice level or the set of custom prompts changes.
export function usePromptSource(category) {
  const { spice, customPrompts } = useGame()
  const curated = CURATED[category] ?? []
  const custom = customPrompts?.[category] ?? []

  const key = `${category}|${spice}|${custom.map((c) => c.id).join(',')}`
  const ref = useRef({ key: null, source: null })
  if (ref.current.key !== key) {
    ref.current = { key, source: makeSource({ category, spice, curated, custom }) }
  }
  return ref.current.source
}
