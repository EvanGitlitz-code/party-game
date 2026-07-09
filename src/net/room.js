// Transport-agnostic multiplayer room protocol.
//
// A "transport" is a thin link with events. Host-side transport emits
// 'connect'(peerId) / 'disconnect'(peerId) / 'message'({from,data}) and can
// broadcast(data) or send(peerId, data). Guest-side transport emits
// 'open' / 'close' / 'message'(data) and can send(data).
//
// The same wiring runs over the real PeerJS transport (across devices) and over
// the in-memory transport (for tests) — so the sync logic is verifiable.

// Host: react to guests joining/leaving and push shared state to guests.
// hooks = { onJoin(peerId, name), onLeave(peerId), getSharedState() }
export function wireHost(transport, { onJoin, onLeave, getSharedState }) {
  transport.on('message', ({ from, data }) => {
    if (data?.t === 'join' && typeof data.name === 'string') {
      onJoin(from, cleanName(data.name))
    }
  })
  transport.on('disconnect', (from) => onLeave(from))
  // Send the current state to each peer as it connects.
  transport.on('connect', (from) => transport.send(from, { t: 'state', state: getSharedState() }))

  return {
    broadcast() {
      transport.broadcast({ t: 'state', state: getSharedState() })
    },
    close() {
      transport.close?.()
    },
  }
}

// Guest: send our name on join and mirror the host's broadcast state.
export function wireGuest(transport, { onState, onOpen }) {
  transport.on('message', (data) => {
    if (data?.t === 'state') onState(data.state)
  })
  transport.on('open', () => onOpen?.())

  return {
    join(name) {
      transport.send({ t: 'join', name: cleanName(name) })
    },
    close() {
      transport.close?.()
    },
  }
}

function cleanName(name) {
  return (name || 'Guest').trim().slice(0, 20) || 'Guest'
}

// In-memory transport hub used by tests: links one host to many guests in a
// single process, serializing payloads (as the real transport does).
export function createMemoryHub() {
  const hostH = {}
  const guests = new Map()
  const on = (H, e, cb) => ((H[e] ||= []).push(cb))
  const fire = (H, e, a) => (H[e] || []).forEach((cb) => cb(a))
  const ser = (d) => JSON.parse(JSON.stringify(d))

  const hostTransport = {
    on: (e, cb) => on(hostH, e, cb),
    broadcast: (d) => { for (const g of guests.values()) fire(g.h, 'message', ser(d)) },
    send: (id, d) => { const g = guests.get(id); if (g) fire(g.h, 'message', ser(d)) },
  }

  let n = 0
  function connect() {
    const id = 'g' + (++n)
    const h = {}
    const transport = {
      on: (e, cb) => on(h, e, cb),
      send: (d) => fire(hostH, 'message', { from: id, data: ser(d) }),
    }
    guests.set(id, { h })
    return {
      transport,
      open() { fire(hostH, 'connect', id); fire(h, 'open') },
      disconnect() { if (guests.delete(id)) fire(hostH, 'disconnect', id) },
    }
  }

  return { hostTransport, connect }
}
