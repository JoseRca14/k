import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ambientSynth } from '../utils/audioSynth'

interface FloatingMusicPlayerProps {
  autoStartTrigger?: boolean
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({ autoStartTrigger = false }) => {
  const { config } = useConfig()
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(config.music.defaultVolume ?? 0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [useSynthFallback, setUseSynthFallback] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Start music
  const startAudio = useCallback(() => {
    if (audioRef.current && config.music.backgroundMusicUrl && !useSynthFallback) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // If mp3 fails to load or file not found, activate soothing ambient synth fallback!
          setUseSynthFallback(true)
          ambientSynth.setVolume(volume)
          ambientSynth.start()
          setIsPlaying(true)
        })
    } else {
      // Direct fallback
      ambientSynth.setVolume(volume)
      ambientSynth.start()
      setIsPlaying(true)
    }
  }, [config.music.backgroundMusicUrl, useSynthFallback, volume])

  const pauseAudio = useCallback(() => {
    if (audioRef.current && !useSynthFallback) {
      audioRef.current.pause()
    }
    ambientSynth.stop()
    setIsPlaying(false)
  }, [useSynthFallback])

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      startAudio()
    }
  }

  // Handle external trigger (when clicking "Entrar →")
  useEffect(() => {
    if (autoStartTrigger && config.music.autoPlayOnEnter) {
      startAudio()
    }
  }, [autoStartTrigger, config.music.autoPlayOnEnter, startAudio])

  // Update volume
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol)
    if (audioRef.current) {
      audioRef.current.volume = newVol
    }
    ambientSynth.setVolume(newVol)
    if (newVol > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      if (audioRef.current) audioRef.current.volume = volume
      ambientSynth.setVolume(volume)
    } else {
      setIsMuted(true)
      if (audioRef.current) audioRef.current.volume = 0
      ambientSynth.setVolume(0)
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={config.music.backgroundMusicUrl}
        loop={config.music.loop}
        preload="auto"
        onError={() => {
          // Gracefully fallback to ambient chords if file doesn't exist
          setUseSynthFallback(true)
        }}
      />

      {/* Floating Modern Pill */}
      <div
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-2 rounded-full glass-pastel border border-white/60 shadow-lg transition-all duration-300"
        style={{
          boxShadow: '0 8px 30px rgba(52, 49, 58, 0.12)',
        }}
      >
        {/* Disc / Music icon with spin when playing */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
            isPlaying ? 'animate-spin' : ''
          }`}
          style={{
            animationDuration: '6s',
            background: 'linear-gradient(135deg, var(--pastel-pink) 0%, var(--pastel-lavender) 100%)',
          }}
          title={isExpanded ? 'Ocultar controles' : 'Ver controles de música'}
          aria-label="Ver controles de música"
        >
          {isPlaying ? (
            <Disc className="w-5 h-5 text-[#34313A]" />
          ) : (
            <Music className="w-5 h-5 text-[#34313A]" />
          )}
        </button>

        {/* Play/Pause main button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-[#34313A] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-xs"
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Expanded info & controls */}
        {isExpanded && (
          <div className="flex items-center gap-3 pr-3 pl-1 animate-fadeIn">
            <div className="flex flex-col text-left max-w-[130px] overflow-hidden">
              <span className="text-xs font-semibold text-[#34313A] truncate font-sans-custom">
                {config.music.backgroundMusicTitle || 'Nuestra Música'}
              </span>
              <span className="text-[10px] text-[#34313A]/60 truncate font-mono-custom">
                {useSynthFallback ? 'Melodía Ambiental' : config.music.backgroundMusicArtist || 'Álbum'}
              </span>
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="text-[#34313A]/70 hover:text-[#34313A] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Desactivar silencio' : 'Silenciar'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1.5 rounded-lg appearance-none cursor-pointer accent-[#34313A] bg-[#34313A]/20"
              aria-label="Volumen"
            />
          </div>
        )}
      </div>
    </>
  )
}
