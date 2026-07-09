import { useRoom } from '../state/RoomContext.jsx'

// What a guest sees after joining a room: the shared roster and whatever the
// host is currently showing. The host drives; guests follow along on their own
// phones.
export default function GuestMirror() {
  const { code, status, guestState, leave } = useRoom()
  const roster = guestState?.roster ?? []
  const now = guestState?.now

  return (
    <div className="game-view">
      <header className="game-header">
        <button className="back-btn" onClick={leave}>← Leave</button>
        <span className="game-name">📱 Room {code}</span>
        <span className="spice-pill">{roster.length}🧑</span>
      </header>

      <main className="game-body">
        <div className="prompt-stage">
          {status !== 'connected' ? (
            <div className="big-card static">
              <span className="prompt-placeholder">
                {status === 'error'
                  ? 'Couldn’t connect. Check the code and try again.'
                  : 'Connecting to the room…'}
              </span>
            </div>
          ) : now ? (
            <div className="big-card">
              {now.game && <span className="kind-tag">{now.game}</span>}
              <span className="prompt-text">{now.text}</span>
            </div>
          ) : (
            <div className="big-card static">
              <span className="prompt-placeholder">
                You’re in! Waiting for the host to start a game… 🎉
              </span>
            </div>
          )}

          {roster.length > 0 && (
            <div className="roster-strip">
              {roster.map((name, i) => (
                <span key={i} className="chip">{name}</span>
              ))}
            </div>
          )}
          <p className="hint">The host is running the game — follow along here.</p>
        </div>
      </main>
    </div>
  )
}
