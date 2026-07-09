import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useGame } from './GameContext.jsx'
import { wireHost, wireGuest } from '../net/room.js'
import {
  createPeerHostTransport,
  createPeerGuestTransport,
  makeRoomCode,
} from '../net/peerTransport.js'

const RoomContext = createContext(null)

// mode: 'off' (single phone) | 'host' | 'guest'
// status: 'idle' | 'ready' | 'connecting' | 'connected' | 'error'
export function RoomProvider({ children }) {
  const { players, addPlayer, removePlayerByName } = useGame()

  const [mode, setMode] = useState('off')
  const [code, setCode] = useState(null)
  const [status, setStatus] = useState('idle')
  const [guestState, setGuestState] = useState(null) // guest's mirror of host state

  const hostRef = useRef(null)
  const guestRef = useRef(null)
  const peerNames = useRef(new Map()) // host: peerId -> guest name
  const nowRef = useRef(null)
  const playersRef = useRef(players)
  useEffect(() => { playersRef.current = players }, [players])

  const getSharedState = () => ({
    roster: playersRef.current.map((p) => p.name),
    now: nowRef.current,
  })

  // Host: re-broadcast whenever the roster changes.
  useEffect(() => {
    if (mode === 'host' && hostRef.current) hostRef.current.broadcast()
  }, [players, mode])

  const createRoom = () => {
    const c = makeRoomCode()
    setCode(c)
    setStatus('connecting')
    const transport = createPeerHostTransport(c, {
      onStatus: (s) => setStatus(s === 'ready' ? 'ready' : s === 'error' ? 'error' : status),
    })
    hostRef.current = wireHost(transport, {
      onJoin: (id, name) => {
        peerNames.current.set(id, name)
        addPlayer(name)
        hostRef.current?.broadcast()
      },
      onLeave: (id) => {
        const name = peerNames.current.get(id)
        peerNames.current.delete(id)
        if (name) removePlayerByName(name)
        hostRef.current?.broadcast()
      },
      getSharedState,
    })
    setMode('host')
  }

  const joinRoom = (joinCode, name) => {
    const c = joinCode.trim().toUpperCase()
    if (c.length !== 4) return
    setCode(c)
    setStatus('connecting')
    const transport = createPeerGuestTransport(c, {
      onStatus: (s) => {
        if (s === 'connected') setStatus('connected')
        else if (s === 'error' || s === 'closed') setStatus('error')
      },
    })
    const guest = wireGuest(transport, {
      onState: (state) => setGuestState(state),
      onOpen: () => guest.join(name),
    })
    guestRef.current = guest
    setMode('guest')
  }

  const leave = () => {
    hostRef.current?.close()
    guestRef.current?.close()
    hostRef.current = null
    guestRef.current = null
    peerNames.current = new Map()
    nowRef.current = null
    setGuestState(null)
    setCode(null)
    setStatus('idle')
    setMode('off')
  }

  // Host calls this whenever the current game shows something new.
  const publishNow = (now) => {
    if (mode !== 'host' || !hostRef.current) return
    nowRef.current = now
    hostRef.current.broadcast()
  }

  const value = useMemo(
    () => ({
      mode,
      code,
      status,
      guestState,
      guestCount: Math.max(0, players.length - 1),
      createRoom,
      joinRoom,
      leave,
      publishNow,
    }),
    [mode, code, status, guestState, players.length],
  )

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
}

export function useRoom() {
  const ctx = useContext(RoomContext)
  if (!ctx) throw new Error('useRoom must be used within RoomProvider')
  return ctx
}
