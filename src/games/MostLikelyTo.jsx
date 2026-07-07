import SimplePromptGame from './SimplePromptGame.jsx'
import { mostLikelyTo } from '../data/prompts.js'

export default function MostLikelyTo() {
  return (
    <SimplePromptGame
      list={mostLikelyTo}
      cta="Next one"
      hint="On 3, everyone points. Most fingers pointed at you? Drink!"
    />
  )
}
