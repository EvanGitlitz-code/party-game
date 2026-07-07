// Kings Cup / Ring of Fire rules. Each card rank triggers an action.
// Tame rules are the classics; spicier levels swap in bolder variants.

export const SUITS = ['♠', '♥', '♦', '♣']
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

// Rule text keyed by rank, with a spice-graded twist where it makes sense.
export const cardRules = {
  A: {
    title: 'Waterfall',
    1: 'Everyone starts drinking. You stop when you want — nobody can stop until the person before them does.',
    2: 'Waterfall! Last one still drinking makes a rule for the round.',
    3: 'Waterfall! Last one still drinking takes a dare.',
  },
  2: {
    title: 'You',
    1: 'Pick someone to drink.',
    2: 'Pick someone to drink — or take a sip with them and tell them a secret.',
    3: 'Pick someone to drink, then trade a truth with them.',
  },
  3: {
    title: 'Me',
    1: 'You drink.',
    2: 'You drink and confess one thing to the group.',
    3: 'You drink and answer any question the group asks.',
  },
  4: {
    title: 'Floor',
    1: 'Last person to touch the floor drinks.',
    2: 'Last person to hit the floor drinks twice.',
    3: 'Last person to hit the floor takes a dare.',
  },
  5: {
    title: 'Guys',
    1: 'All the guys drink.',
    2: 'Guys drink and each name someone they’d date.',
    3: 'Guys drink and share a spicy confession.',
  },
  6: {
    title: 'Chicks',
    1: 'All the girls drink.',
    2: 'Girls drink and each name someone they’d date.',
    3: 'Girls drink and share a spicy confession.',
  },
  7: {
    title: 'Heaven',
    1: 'Last person to raise their hand drinks.',
    2: 'Last person to raise a hand drinks twice.',
    3: 'Last person to raise a hand takes a dare.',
  },
  8: {
    title: 'Mate',
    1: 'Pick a drinking buddy — they drink whenever you drink.',
    2: 'Pick a drinking mate for the whole game.',
    3: 'Pick a mate — you both take every dare together.',
  },
  9: {
    title: 'Rhyme',
    1: 'Say a word — go around rhyming. First to fail drinks.',
    2: 'Rhyme chain — first to fail drinks twice.',
    3: 'Rhyme chain — first to fail takes a dare.',
  },
  10: {
    title: 'Categories',
    1: 'Name a category. Go around naming things in it. First to fail drinks.',
    2: 'Categories — first to fail drinks twice.',
    3: 'Categories (keep it spicy) — first to fail takes a dare.',
  },
  J: {
    title: 'Thumb Master',
    1: 'Anytime you touch your thumb to the table, others must too. Last one drinks.',
    2: 'Thumb Master until the next Jack — abuse the power.',
    3: 'Thumb Master — the slowest each time takes a sip; third time, a dare.',
  },
  Q: {
    title: 'Question Master',
    1: 'Anyone who answers your questions drinks — until the next Queen.',
    2: 'Question Master — trip people up until the next Queen.',
    3: 'Question Master — anyone who answers takes a dare.',
  },
  K: {
    title: 'King’s Cup',
    1: 'Pour some of your drink into the center cup. Whoever draws the 4th King drinks it all.',
    2: 'Pour into the cup. 4th King drinks the whole thing.',
    3: 'Pour into the cup. 4th King drinks it — then takes a dare.',
  },
}
