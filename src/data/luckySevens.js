// Lucky Sevens — the signature game. Roll two dice; the sum lands on an outcome.
// Outcomes scale with spice. {player} is a random player's name; {rule},
// {category}, {nhie}, {truth}, and {dare} are filled with concrete, app-supplied
// content so the game always hands players a task instead of asking them to
// invent one.
import { fillDynamic } from './generator.js'

export const rollOutcomes = {
  2: {
    name: 'Snake Eyes',
    emoji: '🐍',
    1: '{player} drinks twice. Rough start.',
    2: '{player} finishes their drink. Snake eyes are brutal.',
    3: '{player} finishes their drink, then takes a dare: {dare}',
  },
  3: {
    name: 'Point & Pour',
    emoji: '👉',
    1: 'Everyone points at who they’d least trust with a secret. Most points drinks.',
    2: 'Point at who you’d date. Most points drinks and reacts.',
    3: 'Point at who you’d kiss. Most points takes a dare: {dare}',
  },
  4: {
    name: 'The Fours',
    emoji: '🍀',
    1: '{player} picks someone to drink with them.',
    2: '{player} and a chosen partner both drink and swap a secret.',
    3: '{player} and a chosen partner both take this dare: {dare}',
  },
  5: {
    name: 'Waterfall',
    emoji: '🌊',
    1: 'Everyone drinks in a waterfall starting from {player}.',
    2: 'Waterfall from {player}. Last one still drinking takes two extra sips.',
    3: 'Waterfall from {player}. Last one still drinking takes a dare: {dare}',
  },
  6: {
    name: 'Safe',
    emoji: '🛟',
    1: 'Lucky six! Nobody drinks. Bask in it.',
    2: '{player} is safe but must hand a sip to anyone.',
    3: '{player} is safe, and assigns this dare to anyone: {dare}',
  },
  7: {
    name: 'Lucky Seven',
    emoji: '🎰',
    1: 'New rule until the next 7: {rule}.',
    2: 'New rule: {rule}. Breaking it costs two sips.',
    3: 'New rule: {rule}. Break it and take a dare: {dare}',
  },
  8: {
    name: 'Categories',
    emoji: '🗂️',
    1: 'Category — {category}. Go around; first to blank drinks.',
    2: 'Category — {category}. First to blank drinks twice.',
    3: 'Category — {category}. First to blank takes a dare: {dare}',
  },
  9: {
    name: 'Never Have I',
    emoji: '🙅',
    1: '{player} reads aloud: “{nhie}” Everyone who has, drinks.',
    2: '{player} reads aloud: “{nhie}” Guilty parties drink twice.',
    3: '{player} reads aloud: “{nhie}” Guilty parties take a dare: {dare}',
  },
  10: {
    name: 'Truth Time',
    emoji: '🎯',
    1: '{player} must answer: {truth} (or drink twice).',
    2: '{player} must answer: {truth} (or finish your drink).',
    3: '{player} must answer: {truth} (or take a dare: {dare}).',
  },
  11: {
    name: 'Dare Devil',
    emoji: '😈',
    1: '{player} takes a dare: {dare}',
    2: '{player} takes a dare: {dare}',
    3: '{player} takes a full-send dare: {dare}',
  },
  12: {
    name: 'Boxcars',
    emoji: '🎁',
    1: 'Jackpot! {player} hands out three sips however they like.',
    2: 'Jackpot! {player} hands out three sips, or assigns this dare: {dare}',
    3: 'Jackpot! {player} assigns this dare to anyone: {dare} — then drinks in style.',
  },
}

export function rollOutcomeText(sum, spice, playerName) {
  const outcome = rollOutcomes[sum]
  if (!outcome) return { name: '—', emoji: '🎲', text: 'Roll again!' }
  const withPlayer = (outcome[spice] || outcome[1]).replaceAll('{player}', playerName)
  const text = fillDynamic(withPlayer, spice)
  return { name: outcome.name, emoji: outcome.emoji, text }
}
