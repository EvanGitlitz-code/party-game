// Small shared helpers.

export function randomItem(list) {
  if (!list || list.length === 0) return null
  return list[Math.floor(Math.random() * list.length)]
}

export function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}
