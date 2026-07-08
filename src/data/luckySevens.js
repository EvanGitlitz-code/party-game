// Lucky Sevens — the signature game. Roll two dice; the sum lands on an outcome.
// Outcomes scale with spice. {player} is replaced with a random player's name.

export const rollOutcomes = {
  2: {
    name: 'Snake Eyes',
    emoji: '🐍',
    1: '{player} drinks twice. Rough start.',
    2: '{player} finishes their drink. Snake eyes are brutal.',
    3: '{player} finishes their drink and takes a dare.',
  },
  3: {
    name: 'Point & Pour',
    emoji: '👉',
    1: 'Everyone points at who they’d least trust with a secret. Most points drinks.',
    2: 'Point at who you’d date. Most points drinks and reacts.',
    3: 'Point at who you’d kiss. Most points takes a dare.',
  },
  4: {
    name: 'The Fours',
    emoji: '🍀',
    1: '{player} picks someone to drink with them.',
    2: '{player} and a chosen partner both drink and swap a secret.',
    3: '{player} and a chosen partner both take a dare.',
  },
  5: {
    name: 'Waterfall',
    emoji: '🌊',
    1: 'Everyone drinks in a waterfall starting from {player}.',
    2: 'Waterfall from {player}. Last one still going makes a rule.',
    3: 'Waterfall from {player}. Last one still going takes a dare.',
  },
  6: {
    name: 'Safe',
    emoji: '🛟',
    1: 'Lucky six! Nobody drinks. Bask in it.',
    2: '{player} is safe but must hand out one sip to anyone.',
    3: '{player} is safe but assigns a dare to anyone.',
  },
  7: {
    name: 'Lucky Seven',
    emoji: '🎰',
    1: '{player} makes a rule everyone follows until the next 7.',
    2: '{player} makes a rule — breaking it costs two sips.',
    3: '{player} makes a rule — breaking it costs a dare.',
  },
  8: {
    name: 'Categories',
    emoji: '🗂️',
    1: '{player} names a category. Go around — first to blank drinks.',
    2: '{player} names a spicy category. First to blank drinks twice.',
    3: '{player} names a category. First to blank takes a dare.',
  },
  9: {
    name: 'Never Have I',
    emoji: '🙅',
    1: '{player} says a “never have I ever.” Everyone who has, drinks.',
    2: '{player} confesses a “never have I ever.” Guilty parties drink twice.',
    3: '{player} says a bold “never have I ever.” Guilty parties take a dare.',
  },
  10: {
    name: 'Truth Time',
    emoji: '🎯',
    1: 'The group asks {player} one truth. Answer or drink twice.',
    2: 'The group asks {player} a spicy truth. Answer or finish your drink.',
    3: 'The group asks {player} anything. Answer or take a double dare.',
  },
  11: {
    name: 'Dare Devil',
    emoji: '😈',
    1: '{player} does a silly dare of the group’s choosing.',
    2: '{player} takes a bold dare from the group.',
    3: '{player} takes a full-send dare — no backing out.',
  },
  12: {
    name: 'Boxcars',
    emoji: '🎁',
    1: 'Jackpot! {player} hands out three sips however they like.',
    2: 'Jackpot! {player} assigns three sips or one dare.',
    3: 'Jackpot! {player} assigns a dare to anyone, then drinks in style.',
  },
}

export function rollOutcomeText(sum, spice, playerName) {
  const outcome = rollOutcomes[sum]
  if (!outcome) return { name: '—', emoji: '🎲', text: 'Roll again!' }
  const text = (outcome[spice] || outcome[1]).replaceAll('{player}', playerName)
  return { name: outcome.name, emoji: outcome.emoji, text }
}
