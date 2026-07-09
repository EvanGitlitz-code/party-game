import { Peer } from 'peerjs'

// PeerJS-backed transports implementing the same interface room.js expects.
// They connect over the free public PeerJS signaling cloud (no server to run),
// then exchange data peer-to-peer via WebRTC data channels.

// Room codes map to a namespaced peer id so hosts don't collide with other apps.
const PREFIX = 'pregame-v1-'
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // no ambiguous chars

export function makeRoomCode() {
  let code = ''
  for (let i = 0; i < 4; i++) code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return code
}

const peerId = (code) => PREFIX + code.toUpperCase()

export function createPeerHostTransport(code, { onStatus } = {}) {
  const peer = new Peer(peerId(code))
  const conns = new Map()
  const handlers = {}
  const on = (e, cb) => ((handlers[e] ||= []).push(cb))
  const emit = (e, arg) => (handlers[e] || []).forEach((cb) => cb(arg))

  peer.on('open', () => onStatus?.('ready'))
  peer.on('error', (err) => onStatus?.('error', err))
  peer.on('connection', (conn) => {
    conn.on('open', () => { conns.set(conn.peer, conn); emit('connect', conn.peer) })
    conn.on('data', (data) => emit('message', { from: conn.peer, data }))
    conn.on('close', () => { conns.delete(conn.peer); emit('disconnect', conn.peer) })
    conn.on('error', () => {})
  })

  return {
    on,
    broadcast(data) { for (const c of conns.values()) { try { c.send(data) } catch { /* ignore */ } } },
    send(id, data) { const c = conns.get(id); if (c) { try { c.send(data) } catch { /* ignore */ } } },
    close() { try { peer.destroy() } catch { /* ignore */ } },
  }
}

export function createPeerGuestTransport(code, { onStatus } = {}) {
  const peer = new Peer()
  const handlers = {}
  const on = (e, cb) => ((handlers[e] ||= []).push(cb))
  const emit = (e, arg) => (handlers[e] || []).forEach((cb) => cb(arg))
  let conn = null

  peer.on('open', () => {
    conn = peer.connect(peerId(code), { reliable: true })
    conn.on('open', () => { onStatus?.('connected'); emit('open') })
    conn.on('data', (data) => emit('message', data))
    conn.on('close', () => { onStatus?.('closed'); emit('close') })
    conn.on('error', (err) => onStatus?.('error', err))
  })
  peer.on('error', (err) => onStatus?.('error', err))

  return {
    on,
    send(data) { if (conn && conn.open) { try { conn.send(data) } catch { /* ignore */ } } },
    close() { try { peer.destroy() } catch { /* ignore */ } },
  }
}
