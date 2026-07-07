import SimplePromptGame from './SimplePromptGame.jsx'
import { neverHaveIEver } from '../data/prompts.js'

export default function NeverHaveIEver() {
  return (
    <SimplePromptGame
      list={neverHaveIEver}
      cta="Next one"
      hint="Everyone who HAS done it takes a drink."
    />
  )
}
