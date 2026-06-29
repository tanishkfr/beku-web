// Footer audio engines — Web Audio DSP, framework-agnostic.
//
// Extracted from SiteFooter so the component stays about layout, not signal
// graphs. Each builder wires nodes onto a caller-provided master gain and
// pushes its scheduled sources onto `sources` so the component can stop them.

/** Generated reverb impulse — decaying stereo noise. */
export function makeImpulse(ctx: AudioContext, seconds: number, decay: number) {
  const len = Math.floor(ctx.sampleRate * seconds)
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay)
    }
  }
  return buf
}

// D major pentatonic, low register (D3–D4) — warm, few high notes, meditative.
const PENTATONIC = [146.83, 164.81, 185.0, 220.0, 246.94, 293.66]

/** Original ambient café room-tone (fallback when generativeMusic is off). */
export function buildRoomTone(
  ctx: AudioContext,
  master: GainNode,
  sources: AudioScheduledSourceNode[],
) {
  // Layer 1: room tone (60–250 Hz)
  const roomBuf = ctx.createBuffer(1, ctx.sampleRate * 6, ctx.sampleRate)
  const roomData = roomBuf.getChannelData(0)
  for (let i = 0; i < roomBuf.length; i++) roomData[i] = Math.random() * 2 - 1
  const room = ctx.createBufferSource()
  room.buffer = roomBuf; room.loop = true
  const roomHp = ctx.createBiquadFilter(); roomHp.type = "highpass"; roomHp.frequency.value = 60
  const roomLp = ctx.createBiquadFilter(); roomLp.type = "lowpass"; roomLp.frequency.value = 250
  const roomGain = ctx.createGain(); roomGain.gain.value = 0.03
  room.connect(roomHp); roomHp.connect(roomLp); roomLp.connect(roomGain); roomGain.connect(master)
  room.start(); sources.push(room)

  // Layer 2: conversation murmur (300–2200 Hz) with AM
  const murBuf = ctx.createBuffer(1, ctx.sampleRate * 8, ctx.sampleRate)
  const murData = murBuf.getChannelData(0)
  for (let i = 0; i < murBuf.length; i++) murData[i] = Math.random() * 2 - 1
  const mur = ctx.createBufferSource()
  mur.buffer = murBuf; mur.loop = true
  const murHp = ctx.createBiquadFilter(); murHp.type = "highpass"; murHp.frequency.value = 300
  const murLp = ctx.createBiquadFilter(); murLp.type = "lowpass"; murLp.frequency.value = 2200
  const murGain = ctx.createGain(); murGain.gain.value = 0.038
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.012
  lfo.connect(lfoGain); lfoGain.connect(murGain.gain); lfo.start()
  mur.connect(murHp); murHp.connect(murLp); murLp.connect(murGain); murGain.connect(master)
  mur.start(); sources.push(mur); sources.push(lfo)

  // Layer 3: presence (3000–7000 Hz)
  const airBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate)
  const airData = airBuf.getChannelData(0)
  for (let i = 0; i < airBuf.length; i++) airData[i] = Math.random() * 2 - 1
  const air = ctx.createBufferSource()
  air.buffer = airBuf; air.loop = true
  const airHp = ctx.createBiquadFilter(); airHp.type = "highpass"; airHp.frequency.value = 3000
  const airLp = ctx.createBiquadFilter(); airLp.type = "lowpass"; airLp.frequency.value = 7000
  const airGain = ctx.createGain(); airGain.gain.value = 0.008
  air.connect(airHp); airHp.connect(airLp); airLp.connect(airGain); airGain.connect(master)
  air.start(); sources.push(air)
}

/**
 * Generative meditative music — a deep sustained drone under a slow breathing
 * pad, with rare, soft pentatonic bells that swell and decay into a long
 * reverb. Closer to stillness than melody. Schedules recurring notes via the
 * caller's scheduleRef so they can be cleared.
 */
export function buildMusic(
  ctx: AudioContext,
  master: GainNode,
  sources: AudioScheduledSourceNode[],
  scheduleRef: { current: ReturnType<typeof setTimeout> | null },
) {
  // Warm bus: a soft lowpass so nothing is ever bright or harsh.
  const bus = ctx.createGain()
  const busLp = ctx.createBiquadFilter()
  busLp.type = "lowpass"; busLp.frequency.value = 2200
  bus.connect(busLp); busLp.connect(master)

  // Long, deep reverb — a still, spacious room.
  const reverb = ctx.createConvolver()
  reverb.buffer = makeImpulse(ctx, 6.5, 3.2)
  const reverbGain = ctx.createGain(); reverbGain.gain.value = 0.9
  reverb.connect(reverbGain); reverbGain.connect(bus)

  // Sustained low drone — root + fifth (D2/A2), gently detuned for shimmer,
  // with a slow tremolo so it never sits perfectly still.
  const droneGain = ctx.createGain(); droneGain.gain.value = 0.032
  droneGain.connect(bus); droneGain.connect(reverb)
  const droneTrem = ctx.createOscillator(); droneTrem.frequency.value = 0.07
  const droneTremGain = ctx.createGain(); droneTremGain.gain.value = 0.012
  droneTrem.connect(droneTremGain); droneTremGain.connect(droneGain.gain); droneTrem.start()
  sources.push(droneTrem)
  ;[73.42, 110.0].forEach((f) => {        // D2, A2
    [-3, 3].forEach((detune) => {
      const o = ctx.createOscillator()
      o.type = "sine"
      o.frequency.value = f
      o.detune.value = detune
      o.connect(droneGain); o.start(); sources.push(o)
    })
  })

  // Breathing pad: an open D–A–E chord, two detuned triangle voices each,
  // through a warm lowpass with a very slow LFO (~50s) so the chord breathes.
  const padFilter = ctx.createBiquadFilter()
  padFilter.type = "lowpass"; padFilter.frequency.value = 420
  const padGain = ctx.createGain(); padGain.gain.value = 0.03
  padFilter.connect(padGain); padGain.connect(bus); padGain.connect(reverb)

  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.02
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 120
  lfo.connect(lfoGain); lfoGain.connect(padFilter.frequency); lfo.start()
  sources.push(lfo)

  const padNotes = [146.83, 220.0, 329.63] // D3, A3, E4
  padNotes.forEach((f) => {
    [-5, 5].forEach((detune) => {
      const o = ctx.createOscillator()
      o.type = "triangle"
      o.frequency.value = f
      o.detune.value = detune
      o.connect(padFilter)
      o.start()
      sources.push(o)
    })
  })

  // Rare bells: one soft sine note from the low pentatonic, a slow swell and a
  // very long tail, spaced far apart — closer to silence than to melody.
  const playNote = () => {
    const now = ctx.currentTime
    const f = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)]
    const o = ctx.createOscillator()
    o.type = "sine"
    o.frequency.value = f
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(0.038, now + 1.4)           // slow swell
    g.gain.exponentialRampToValueAtTime(0.0001, now + 8.0)     // very long tail
    o.connect(g); g.connect(bus); g.connect(reverb)
    o.start(now); o.stop(now + 8.4)
    sources.push(o)
    scheduleRef.current = setTimeout(playNote, 6500 + Math.random() * 7000)
  }
  scheduleRef.current = setTimeout(playNote, 2500)
}
