import SepticRoll from './SepticRoll.jsx'
import KingsCup from './KingsCup.jsx'
import NeverHaveIEver from './NeverHaveIEver.jsx'
import MostLikelyTo from './MostLikelyTo.jsx'
import TruthOrDare from './TruthOrDare.jsx'
import SpinWheel from './SpinWheel.jsx'

// The game catalog shown on the home screen.
export const GAMES = [
  {
    id: 'septic-roll',
    title: 'Septic Roll',
    tagline: 'Roll the bones, embrace the chaos.',
    emoji: '🎲',
    accent: '#7c5cff',
    Component: SepticRoll,
  },
  {
    id: 'kings-cup',
    title: 'Kings Cup',
    tagline: 'Draw a card, obey the rule.',
    emoji: '🃏',
    accent: '#ff5c8a',
    Component: KingsCup,
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    tagline: 'Confess or drink.',
    emoji: '🙊',
    accent: '#2fd4a8',
    Component: NeverHaveIEver,
  },
  {
    id: 'most-likely-to',
    title: 'Most Likely To',
    tagline: 'Point fingers, place blame.',
    emoji: '👉',
    accent: '#ffb020',
    Component: MostLikelyTo,
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    tagline: 'Spill it or do it.',
    emoji: '🔥',
    accent: '#ff6b3d',
    Component: TruthOrDare,
  },
  {
    id: 'spin-the-wheel',
    title: 'Spin the Wheel',
    tagline: 'Fate picks the victim.',
    emoji: '🎡',
    accent: '#3d9bff',
    Component: SpinWheel,
  },
]
