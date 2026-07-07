// Content for the prompt-based games.
// Each entry has a `level`: 1 = Tame, 2 = Spicy, 3 = Full Send.
// A game shows every prompt whose level is <= the selected spice.

export const neverHaveIEver = [
  { level: 1, text: 'Never have I ever fallen asleep during a movie.' },
  { level: 1, text: 'Never have I ever eaten food that fell on the floor.' },
  { level: 1, text: 'Never have I ever sang in the shower.' },
  { level: 1, text: 'Never have I ever pretended to be sick to skip something.' },
  { level: 1, text: 'Never have I ever laughed so hard I cried.' },
  { level: 1, text: 'Never have I ever binged a whole series in one day.' },
  { level: 1, text: 'Never have I ever forgotten someone’s name right after meeting them.' },
  { level: 1, text: 'Never have I ever talked to a pet like it was a person.' },
  { level: 1, text: 'Never have I ever ghosted a group chat.' },
  { level: 1, text: 'Never have I ever cried at a commercial.' },
  { level: 2, text: 'Never have I ever sent a text to the wrong person.' },
  { level: 2, text: 'Never have I ever had a crush on a friend’s partner.' },
  { level: 2, text: 'Never have I ever stalked an ex on social media this week.' },
  { level: 2, text: 'Never have I ever kissed someone in this room.' },
  { level: 2, text: 'Never have I ever lied to get out of a date.' },
  { level: 2, text: 'Never have I ever pretended to like a gift I hated.' },
  { level: 2, text: 'Never have I ever snuck someone into my place.' },
  { level: 2, text: 'Never have I ever re-gifted a present.' },
  { level: 3, text: 'Never have I ever had a one-night stand.' },
  { level: 3, text: 'Never have I ever hooked up with someone I met that same night.' },
  { level: 3, text: 'Never have I ever sent a spicy photo.' },
  { level: 3, text: 'Never have I ever done something at a party I’ll never admit to.' },
  { level: 3, text: 'Never have I ever hooked up with two people in the same week.' },
  { level: 3, text: 'Never have I ever been walked in on.' },
]

export const mostLikelyTo = [
  { level: 1, text: 'Most likely to become famous.' },
  { level: 1, text: 'Most likely to survive a zombie apocalypse.' },
  { level: 1, text: 'Most likely to cry at a wedding.' },
  { level: 1, text: 'Most likely to show up late to their own party.' },
  { level: 1, text: 'Most likely to become a millionaire.' },
  { level: 1, text: 'Most likely to eat the last slice without asking.' },
  { level: 1, text: 'Most likely to get lost with GPS on.' },
  { level: 1, text: 'Most likely to adopt ten pets.' },
  { level: 1, text: 'Most likely to start a conspiracy theory.' },
  { level: 1, text: 'Most likely to accidentally join a cult.' },
  { level: 2, text: 'Most likely to text an ex at 2am.' },
  { level: 2, text: 'Most likely to have a secret dating profile.' },
  { level: 2, text: 'Most likely to flirt to get out of a ticket.' },
  { level: 2, text: 'Most likely to date two people at once.' },
  { level: 2, text: 'Most likely to lie about their body count.' },
  { level: 2, text: 'Most likely to get kicked out of a bar.' },
  { level: 3, text: 'Most likely to have a wild story from last night.' },
  { level: 3, text: 'Most likely to have hooked up with someone here.' },
  { level: 3, text: 'Most likely to send nudes first.' },
  { level: 3, text: 'Most likely to have a secret they’d never tell.' },
  { level: 3, text: 'Most likely to sleep with a stranger on vacation.' },
]

export const truths = [
  { level: 1, text: 'What’s the most embarrassing thing in your search history?' },
  { level: 1, text: 'What’s a lie you tell all the time?' },
  { level: 1, text: 'What’s the childish thing you still do?' },
  { level: 1, text: 'Who in this room would you swap lives with for a day?' },
  { level: 1, text: 'What’s the worst gift you’ve ever received?' },
  { level: 1, text: 'What’s your most irrational fear?' },
  { level: 2, text: 'Who in this room would you go on a date with?' },
  { level: 2, text: 'What’s the biggest lie you’ve told a partner?' },
  { level: 2, text: 'What’s your worst dating red flag?' },
  { level: 2, text: 'When did you last check an ex’s profile?' },
  { level: 2, text: 'What’s a secret you’ve never told your best friend?' },
  { level: 3, text: 'What’s your wildest hookup story?' },
  { level: 3, text: 'Who was your worst kiss and why?' },
  { level: 3, text: 'What’s the most scandalous thing on your phone right now?' },
  { level: 3, text: 'What’s something you’d only do if no one ever found out?' },
]

export const dares = [
  { level: 1, text: 'Do your best impression of another player.' },
  { level: 1, text: 'Speak in an accent until your next turn.' },
  { level: 1, text: 'Let the group pick a new nickname for you tonight.' },
  { level: 1, text: 'Do 10 jumping jacks right now.' },
  { level: 1, text: 'Text the 5th person in your contacts “I knew it was you.”' },
  { level: 1, text: 'Talk in a whisper until your next turn.' },
  { level: 2, text: 'Let someone post a story on your account.' },
  { level: 2, text: 'Show the group the last photo in your camera roll.' },
  { level: 2, text: 'Read your last text out loud in a dramatic voice.' },
  { level: 2, text: 'Do your best seductive walk across the room.' },
  { level: 2, text: 'Let the player to your left send one text from your phone.' },
  { level: 3, text: 'Show the group your most recent DM.' },
  { level: 3, text: 'Let the group choose an emoji to text your crush.' },
  { level: 3, text: 'Give someone in the room a lap-dance-free but dramatic serenade.' },
  { level: 3, text: 'Reveal your most-used emoji and who you send it to.' },
]

// Random challenges for the Spin the Wheel game (assigned to a random player).
export const wheelChallenges = [
  { level: 1, text: 'takes a sip and tells a joke.' },
  { level: 1, text: 'picks someone to cheers with — both drink.' },
  { level: 1, text: 'gives a compliment to the person on their right.' },
  { level: 1, text: 'does their best dance move.' },
  { level: 1, text: 'makes up a rule everyone follows for one round.' },
  { level: 1, text: 'chooses someone to be their drinking buddy — you drink, they drink.' },
  { level: 2, text: 'answers one truth from the group, or takes two sips.' },
  { level: 2, text: 'reveals their celebrity crush or drinks.' },
  { level: 2, text: 'swaps a piece of clothing with someone (a sock counts).' },
  { level: 2, text: 'lets the group check their last sent text.' },
  { level: 3, text: 'takes a dare from anyone in the room.' },
  { level: 3, text: 'confesses the wildest thing they’ve done this year.' },
  { level: 3, text: 'gives their phone to the group for 30 seconds.' },
]

// Filter helper: return prompts at or below the current spice level.
export function bySpice(list, spice) {
  return list.filter((item) => item.level <= spice)
}

// The prompt categories players can add their own content to.
// `key` matches the storage bucket in GameContext.
export const CATEGORIES = [
  { key: 'neverHaveIEver', label: 'Never Have I Ever', emoji: '🙊', base: neverHaveIEver },
  { key: 'mostLikelyTo', label: 'Most Likely To', emoji: '👉', base: mostLikelyTo },
  { key: 'truths', label: 'Truths', emoji: '💬', base: truths },
  { key: 'dares', label: 'Dares', emoji: '🔥', base: dares },
]

export const BASE_BY_KEY = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.base]),
)
