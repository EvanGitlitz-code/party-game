// Procedural prompt generator — makes the games feel endless without a server.
// Each (category, level) has a set of templates with {slot} placeholders and
// word banks. Filling templates from the banks yields hundreds of coherent,
// non-repeating combinations per tier, blended with the hand-written prompts.
//
// Banks are scoped per template group so every combination reads naturally.

const G = {
  neverHaveIEver: {
    1: {
      templates: ['Never have I ever {act}.', 'Never have I ever {act} {mod}.'],
      banks: {
        act: [
          'fallen asleep during a movie', 'eaten something off the floor',
          'sung in the shower', 'ghosted a group chat', 'cried at a cartoon',
          'talked to a pet like a person', 'pretended to know a song',
          'napped to avoid a chore', 'binged a whole series in a day',
          'laughed at the worst possible moment', 'forgotten why I walked into a room',
          'waved at a stranger by mistake', 'burned toast', 'lost my phone while holding it',
        ],
        mod: [
          'and told no one', 'more than once', 'and blamed someone else',
          'stone-cold sober', 'in front of everyone', 'and regretted it',
        ],
      },
    },
    2: {
      templates: ['Never have I ever {act}.', 'Never have I ever {act} {mod}.'],
      banks: {
        act: [
          'texted an ex after midnight', 'stalked a crush online',
          'kept a dating app just to look', 'flirted to get out of trouble',
          'sent a risky text', 'had a crush on a coworker', 'lied about my age',
          'snooped through someone’s phone', 'faked a call to escape a date',
          'screenshotted a private chat', 're-read old messages from an ex',
          'had a secret crush on someone in this room',
        ],
        mod: [
          'and regretted it instantly', 'and never admitted it', 'more than I should',
          'sober', 'and lied about it', 'just last week',
        ],
      },
    },
    3: {
      templates: ['Never have I ever {act}.', 'Never have I ever {act} {mod}.'],
      banks: {
        act: [
          'had a one-night stand', 'hooked up with a stranger', 'sent a spicy photo',
          'been walked in on', 'hooked up with someone in this room',
          'done a walk of shame', 'kissed someone on a dare', 'lied about my body count',
          'hooked up with two people in one week', 'gone skinny dipping',
          'made a very bad decision at a party', 'dated two people at once',
        ],
        mod: [
          'and told no one', 'and completely regretted it', 'sober', 'more than once',
          'and would do it again', 'and blamed the tequila',
        ],
      },
    },
  },

  mostLikelyTo: {
    1: {
      templates: ['Most likely to {act}.', 'Most likely to {act} {mod}.'],
      banks: {
        act: [
          'become famous', 'cry at a wedding', 'adopt ten pets',
          'get lost with GPS on', 'join a cult by accident', 'fall asleep first tonight',
          'lose their phone tonight', 'start a conspiracy theory', 'become a millionaire',
          'eat the last slice without asking',
        ],
        mod: [
          'at the worst possible moment', 'and post about it', 'and deny it later',
          'to win a bet', 'in front of everyone', 'and never live it down',
        ],
      },
    },
    2: {
      templates: ['Most likely to {act}.', 'Most likely to {act} {mod}.'],
      banks: {
        act: [
          'text an ex at 2am', 'have a secret dating profile', 'flirt for a discount',
          'get kicked out of a bar', 'kiss someone here tonight',
          'start drama in the group chat', 'have a work crush',
          'slide into a stranger’s DMs', 'get caught sneaking around',
          'lie about their number',
        ],
        mod: [
          'tonight', 'and regret it tomorrow', 'and deny everything',
          'to win a dare', 'without telling anyone',
        ],
      },
    },
    3: {
      templates: ['Most likely to {act}.', 'Most likely to {act} {mod}.'],
      banks: {
        act: [
          'go home with someone tonight', 'have hooked up with someone here',
          'send nudes first', 'have the highest body count', 'get caught in the act',
          'have a secret situationship', 'sleep with a stranger on vacation',
          'have the wildest search history', 'have a story they’ll never tell',
          'end the night in someone’s bed',
        ],
        mod: [
          'tonight', 'and brag about it', 'and swear it never happened',
          'before the night ends',
        ],
      },
    },
  },

  truths: {
    1: {
      templates: [
        'What’s the {sup} {thing} you’ve ever {verb}?',
        'What’s the {sup2} secret you’ve ever kept?',
        'Who in this room would you most likely {who}?',
        'What’s your biggest {noun}?',
      ],
      banks: {
        sup: ['most embarrassing', 'weirdest', 'silliest'],
        thing: ['text', 'selfie', 'voice note', 'group-chat message'],
        verb: ['sent', 'deleted', 'saved'],
        sup2: ['most embarrassing', 'silliest', 'oldest'],
        who: ['trust with a secret', 'call when bored', 'pick for a road trip', 'want on your trivia team'],
        noun: ['ick', 'irrational fear', 'guilty pleasure', 'pet peeve'],
      },
    },
    2: {
      templates: [
        'What’s the {sup} {thing} you’ve ever {verb}?',
        'What’s the {sup2} secret you’ve ever kept?',
        'Who in this room would you most likely {who}?',
        'What’s your biggest {noun}?',
      ],
      banks: {
        sup: ['boldest', 'most embarrassing', 'sneakiest'],
        thing: ['text', 'DM', 'photo', 'voice note'],
        verb: ['sent', 'received', 'deleted', 'screenshotted'],
        sup2: ['juiciest', 'most shocking', 'most surprising'],
        who: ['go on a date with', 'text after midnight', 'swipe right on', 'kiss on a dare'],
        noun: ['dating red flag', 'turn-off', 'regret', 'guilty crush'],
      },
    },
    3: {
      templates: [
        'What’s the {sup} {thing} you’ve ever {verb}?',
        'What’s the {sup2} secret you’ve ever kept?',
        'Who in this room would you most likely {who}?',
        'What’s your biggest {noun}?',
      ],
      banks: {
        sup: ['wildest', 'most scandalous', 'most reckless'],
        thing: ['DM', 'photo', 'confession', 'voice note'],
        verb: ['sent', 'received', 'deleted', 'hidden'],
        sup2: ['most scandalous', 'darkest', 'most dangerous'],
        who: ['kiss right now', 'spend the night with', 'sneak off with', 'hook up with'],
        noun: ['turn-on', 'secret fantasy', 'regret', 'wildest craving'],
      },
    },
  },

  dares: {
    1: {
      templates: ['{act}.', '{durAct} for {dur}.', 'Let the group {grp}.'],
      banks: {
        act: [
          'Do your best impression of another player',
          'Speak only in questions until your next turn',
          'Text a friend a single emoji and nothing else',
          'Do your best celebrity impression until someone guesses it',
          'Swap seats with the person across from you',
        ],
        durAct: ['Talk in an accent', 'Do your best runway walk', 'Do your best robot dance', 'Freeze like a statue', 'Speak only in a whisper'],
        dur: ['30 seconds', 'one minute', 'the rest of the round', 'until your next turn'],
        grp: ['see the last photo in your camera roll', 'read your most recent search out loud', 'doodle on the back of your hand'],
      },
    },
    2: {
      templates: ['{act}.', '{durAct} for {dur}.', 'Let the group {grp}.'],
      banks: {
        act: [
          'Read your last text in a dramatic voice',
          'Text a friend “I can’t stop thinking about you”',
          'Call someone and sing happy birthday',
          'Show the last photo in your camera roll',
          'Let someone post a story on your account',
        ],
        durAct: ['Do your most seductive walk', 'Hold eye contact with the player across from you', 'Do a slow-motion dance', 'Talk like a soap-opera star'],
        dur: ['30 seconds', 'one full minute', 'until your next turn'],
        grp: ['read your most recent search out loud', 'see the last photo in your camera roll', 'send a one-word text from your phone'],
      },
    },
    3: {
      templates: ['{act}.', '{durAct} for {dur}.', 'Let the group {grp}.'],
      banks: {
        act: [
          'Show the group your most recent DM',
          'Text your crush “thinking about you”',
          'Reveal your most-used emoji and who gets it',
          'Let someone read your last three sent texts',
          'Whisper your wildest confession to the player on your left',
        ],
        durAct: ['Do your most seductive dance', 'Hold eye contact with the player on your left', 'Give a dramatic slow-motion wink to everyone'],
        dur: ['30 seconds', 'one full minute'],
        grp: ['scroll your camera roll for 15 seconds', 'read your last DM out loud', 'see your most-used emoji and who gets it'],
      },
    },
  },

  wheel: {
    1: {
      templates: ['{act}.', 'gives {target} {gift}.'],
      banks: {
        act: [
          'takes two sips and tells a joke', 'shows off their best dance move',
          'takes a sip for every vowel in their first name', 'picks a drinking buddy for the round',
          'does an impression of the host', 'starts a group toast',
          'shows the group their phone wallpaper',
        ],
        target: ['the person on their left', 'the person on their right', 'someone across the room'],
        gift: ['a genuine compliment', 'a high five', 'a dramatic toast'],
      },
    },
    2: {
      templates: ['{act}.'],
      banks: {
        act: [
          'reveals their most embarrassing moment or takes two sips', 'reveals their celebrity crush or drinks',
          'swaps a piece of clothing with someone', 'lets the group check their last text',
          'compliments someone until they blush', 'names who they’d get stuck in an elevator with',
          'lets someone screenshot their lock screen', 'texts an ex a single wave emoji',
        ],
      },
    },
    3: {
      templates: ['{act}.'],
      banks: {
        act: [
          'confesses the wildest thing they did this year',
          'hands their phone to the group for 30 seconds',
          'reveals the last spicy thing in their search history', 'texts “I miss you” to the last person they dated',
          'shares their go-to pickup line', 'reveals who in the room they’d kiss',
          'shows the group their most recent DM',
        ],
      },
    },
  },
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)]

function fill(template, banks) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const bank = banks[key]
    return bank && bank.length ? rand(bank) : ''
  })
}

// Generate a single fresh prompt for a category at a spice level, or null if
// the category can't be generated.
export function generate(category, level) {
  const cfg = G[category]?.[level]
  if (!cfg) return null
  return fill(rand(cfg.templates), cfg.banks)
}

export function canGenerate(category, level) {
  return Boolean(G[category]?.[level])
}

// --- App-supplied game content ---------------------------------------------
// So games never tell a player to "make up a rule / name a category / take a
// dare from the group" — the app hands them a concrete one instead.

const RULES = [
  'no using first names — call everyone “champ” (slip up, take a sip)',
  'no pointing at anyone — point and you drink',
  'everyone drinks with their non-dominant hand',
  'no swearing — a swear costs a sip',
  'you can’t say the word “drink” — say “sip” instead',
  'end every sentence with “…and that’s the tea”',
  'no phones in hand — get caught holding one and drink',
  'address the group like royalty until the next rule',
  'anyone who laughs takes a sip',
  'you must cheers someone before every drink',
]

const CATEGORIES = {
  1: ['types of beer', 'car brands', 'pizza toppings', 'breakfast cereals', 'movie franchises', 'sports teams', 'ice cream flavors'],
  2: ['dating-app red flags', 'celebrity crushes', 'worst pickup lines', 'reasons to text your ex', 'places to take a first date'],
  3: ['turn-ons', 'things whispered in the bedroom', 'places people have hooked up', 'excuses after a one-night stand', 'body parts'],
}

const WORDS = ['night', 'drink', 'luck', 'heart', 'shot', 'kiss', 'game', 'roll', 'last', 'wild']

const getRule = () => rand(RULES)
const getCategory = (level) => rand(CATEGORIES[level] || CATEGORIES[1])
const getWord = () => rand(WORDS)

// Replace dynamic tokens in a piece of game text with concrete, app-supplied
// content: {rule} {category} {word} {truth} {dare} {nhie} {question}.
export function fillDynamic(text, spice) {
  return text
    .replace(/\{rule\}/g, () => getRule())
    .replace(/\{category\}/g, () => getCategory(spice))
    .replace(/\{word\}/g, () => getWord())
    .replace(/\{truth\}/g, () => generate('truths', spice) || 'answer any question honestly')
    .replace(/\{question\}/g, () => generate('truths', spice) || 'answer any question honestly')
    .replace(/\{dare\}/g, () => generate('dares', spice) || 'take a sip')
    .replace(/\{nhie\}/g, () => generate('neverHaveIEver', spice) || 'Never have I ever told a white lie.')
}

// An endless prompt source: blends the curated + custom prompts (at the given
// spice) with freshly generated ones, avoiding recent repeats. Returns objects
// of shape { text, custom }.
export function makeSource({ category, spice, curated = [], custom = [] }) {
  const staticPool = [
    ...curated.filter((p) => p.level === spice).map((p) => ({ text: p.text, custom: false })),
    ...custom.filter((p) => p.level === spice).map((p) => ({ text: p.text, custom: true })),
  ]
  const recent = []
  const REMEMBER = 30
  const remember = (t) => {
    recent.push(t)
    if (recent.length > REMEMBER) recent.shift()
  }
  const generatable = canGenerate(category, spice)

  const pick = () => {
    // Favor generated prompts for endless variety, but fold in the curated and
    // custom ones (which are higher-touch) a good chunk of the time.
    const useStatic = staticPool.length > 0 && (!generatable || Math.random() < 0.4)
    if (useStatic) return { ...rand(staticPool) }
    return { text: generate(category, spice), custom: false }
  }

  const next = () => {
    let candidate = pick()
    for (let i = 0; i < 15 && candidate.text && recent.includes(candidate.text); i++) {
      candidate = pick()
    }
    if (candidate.text) remember(candidate.text)
    return candidate
  }

  return { next }
}
