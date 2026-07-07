// Tiny haptic helper. Vibration API is a no-op on unsupported devices
// (most desktops, iOS Safari), so every call is safely guarded.
function buzz(pattern) {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern)
    }
  } catch {
    /* ignore — vibration is a nice-to-have */
  }
}

export const haptics = {
  tap: () => buzz(12),
  pick: () => buzz([18, 40, 18]),
  roll: () => buzz([30, 60, 30, 60, 45]),
  win: () => buzz([15, 30, 15, 30, 60]),
}
