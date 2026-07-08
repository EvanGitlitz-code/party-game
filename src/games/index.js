import LuckySevens from './LuckySevens.jsx'
import KingsCup from './KingsCup.jsx'
import NeverHaveIEver from './NeverHaveIEver.jsx'
import MostLikelyTo from './MostLikelyTo.jsx'
import TruthOrDare from './TruthOrDare.jsx'
import SpinWheel from './SpinWheel.jsx'

// The game catalog shown on the home screen.
// Each game carries a `howTo` used by the in-game "How to play" panel:
//   goal  — one-line objective
//   steps — ordered rules to follow
//   tip   — optional extra note
export const GAMES = [
  {
    id: 'lucky-sevens',
    title: 'Lucky Sevens',
    tagline: 'Roll the bones, embrace the chaos.',
    emoji: '🎲',
    accent: '#7c5cff',
    Component: LuckySevens,
    howTo: {
      goal: 'Roll two dice — the total decides your fate.',
      steps: [
        'On your turn, tap Roll.',
        'Read the outcome for the total you rolled — it calls out a player and an action.',
        'Do what it says: drink, take the dare it gives you, follow the new rule, or hand out sips.',
        'Pass the phone to the next player and roll again.',
      ],
      tip: 'Seven is wild — and every outcome gets bolder as you raise the spice.',
    },
  },
  {
    id: 'kings-cup',
    title: 'Kings Cup',
    tagline: 'Draw a card, obey the rule.',
    emoji: '🃏',
    accent: '#ff5c8a',
    Component: KingsCup,
    howTo: {
      goal: 'Each card rank triggers a rule. Draw and obey.',
      steps: [
        'Put one empty cup in the middle of the table.',
        'Take turns tapping Draw card.',
        'Do whatever the drawn card’s rule says.',
        'On a King, pour some of your drink into the middle cup — whoever draws the 4th King drinks it all.',
        'Reshuffle when the deck runs out.',
      ],
      tip: 'Tap Reshuffle any time to start a fresh deck.',
    },
  },
  {
    id: 'never-have-i-ever',
    title: 'Never Have I Ever',
    tagline: 'Confess or drink.',
    emoji: '🙊',
    accent: '#2fd4a8',
    Component: NeverHaveIEver,
    howTo: {
      goal: 'Reveal secrets — if you’ve done it, you drink.',
      steps: [
        'Tap to reveal a “Never have I ever…” statement.',
        'Read it aloud.',
        'Everyone who HAS done it takes a drink.',
        'Tap for the next one (and swap stories if you dare).',
      ],
    },
  },
  {
    id: 'most-likely-to',
    title: 'Most Likely To',
    tagline: 'Point fingers, place blame.',
    emoji: '👉',
    accent: '#ffb020',
    Component: MostLikelyTo,
    howTo: {
      goal: 'Vote for the guilty party — most votes drinks.',
      steps: [
        'Read the “Most likely to…” prompt aloud.',
        'Count down 3… 2… 1…',
        'On “1”, everyone points at one player.',
        'Whoever gets the most fingers pointed at them drinks.',
      ],
    },
  },
  {
    id: 'truth-or-dare',
    title: 'Truth or Dare',
    tagline: 'Spill it or do it.',
    emoji: '🔥',
    accent: '#ff6b3d',
    Component: TruthOrDare,
    howTo: {
      goal: 'Pick a player, then it’s truth or dare.',
      steps: [
        'Tap Spin for a player to choose who’s up.',
        'They pick Truth or Dare.',
        'Reveal the prompt — they answer the truth or do the dare.',
        'Chicken out? Take a penalty drink instead. Then it’s the next player.',
      ],
    },
  },
  {
    id: 'spin-the-wheel',
    title: 'Spin the Wheel',
    tagline: 'Fate picks the victim.',
    emoji: '🎡',
    accent: '#3d9bff',
    Component: SpinWheel,
    howTo: {
      goal: 'Let fate choose a player and a challenge.',
      steps: [
        'Tap Spin.',
        'The wheel lands on a random player and a challenge.',
        'That player does the challenge — or takes a drink.',
        'Spin again for the next victim.',
      ],
    },
  },
]
