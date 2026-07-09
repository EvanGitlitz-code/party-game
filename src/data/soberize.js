// Alcohol-free mode: rewrite drink/sip language into physical/social
// "challenge" language so the exact same games work with no alcohol. Applied at
// display time only when no-alcohol mode is on. Order matters — specific,
// multi-word phrases are handled before generic ones.

const RULES = [
  [/finishes their drink/gi, 'takes a mega-challenge'],
  [/finish your drink/gi, 'take a mega-challenge'],
  [/drinks it all/gi, 'does the whole pile'],
  [/drinks the whole thing/gi, 'does the whole pile'],
  [/Pour some of your drink into the center cup\./gi, 'Add a challenge to the center pile.'],
  [/Pour into the cup\./gi, 'Add a challenge to the pile.'],
  [/4th King drinks it/gi, '4th King does the whole pile'],
  [/drinks in a waterfall/gi, 'joins the wave'],
  [/Waterfall/g, 'Wave'],
  [/waterfall/g, 'wave'],
  [/takes two extra sips/gi, 'takes two extra challenges'],
  [/hands out three sips/gi, 'hands out three challenges'],
  [/takes two sips/gi, 'takes two challenges'],
  [/take two sips/gi, 'take two challenges'],
  [/takes a sip/gi, 'takes a challenge'],
  [/take a sip/gi, 'take a challenge'],
  [/hand a sip/gi, 'hand out a challenge'],
  [/\ba sip\b/gi, 'a challenge'],
  [/\bsips\b/gi, 'challenges'],
  [/\bsip\b/gi, 'challenge'],
  [/Everyone starts drinking/gi, 'Everyone starts the wave'],
  [/Last one still drinking/gi, 'Last one still going'],
  [/still drinking/gi, 'still going'],
  [/drinking buddy/gi, 'challenge buddy'],
  [/drinking mate/gi, 'challenge mate'],
  [/drinking/gi, 'challenge'],
  [/drinks twice/gi, 'does two challenges'],
  [/drink twice/gi, 'do two challenges'],
  [/drinks again/gi, 'goes again'],
  [/both drink/gi, 'both take a challenge'],
  [/\bdrinks\b/gi, 'takes a challenge'],
  [/\bdrink\b/gi, 'take a challenge'],
]

export function soberize(text) {
  if (!text) return text
  let out = text
  for (const [pattern, replacement] of RULES) out = out.replace(pattern, replacement)
  return out
}
