/**
 * Generador de acordes acústicos/lo-fi ambientales con Web Audio API.
 * Proporciona música ambiental relajante pastel en caso de que no haya un archivo MP3 cargado todavía.
 */
class AmbientSynthesizer {
  private ctx: AudioContext | null = null
  private isPlaying = false
  private timer: number | null = null
  private volume = 0.5
  private masterGain: GainNode | null = null

  // Frecuencias pentatónicas dulces para melodía relajante (C maj9 / F maj9)
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B
    [349.23, 440.00, 523.25, 659.25], // F, A, C, E
    [220.00, 261.63, 329.63, 392.00], // A, C, E, G
    [196.00, 246.94, 293.66, 392.00], // G, B, D, G
  ]
  private chordIndex = 0

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = this.volume
      this.masterGain.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol))
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime)
    }
  }

  public playNote(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.masterGain) return

    const osc = this.ctx.createOscillator()
    const noteGain = this.ctx.createGain()

    // Onda sinusoidal suave con un toque de calidez
    osc.type = 'sine'
    osc.frequency.value = freq

    const startTime = this.ctx.currentTime + delay
    const endTime = startTime + duration

    noteGain.gain.setValueAtTime(0, startTime)
    noteGain.gain.linearRampToValueAtTime(0.08, startTime + 0.3)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, endTime)

    osc.connect(noteGain)
    noteGain.connect(this.masterGain)

    osc.start(startTime)
    osc.stop(endTime)
  }

  private playNextArpeggio() {
    if (!this.isPlaying) return

    const chord = this.chords[this.chordIndex]
    this.chordIndex = (this.chordIndex + 1) % this.chords.length

    chord.forEach((freq, idx) => {
      this.playNote(freq, 4.5, idx * 0.45)
    })

    this.timer = window.setTimeout(() => {
      this.playNextArpeggio()
    }, 2800)
  }

  public start() {
    if (this.isPlaying) return
    this.initContext()
    this.isPlaying = true
    this.playNextArpeggio()
  }

  public stop() {
    this.isPlaying = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  public getIsPlaying() {
    return this.isPlaying
  }
}

export const ambientSynth = new AmbientSynthesizer()
