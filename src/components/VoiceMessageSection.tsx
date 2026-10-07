import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Mic, Volume2 } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

export const VoiceMessageSection: React.FC = () => {
  const { config } = useConfig()
  const { voiceMessage } = config

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Waveform heights simulation
  const waveformHeights = [
    24, 40, 18, 55, 30, 48, 60, 25, 35, 52, 45, 62, 38, 20, 50, 65, 42, 30, 55, 40, 28, 48, 62, 35, 20
  ]

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If no local file yet, simulate playback animation for preview!
          setIsPlaying(true)
        })
    }
  }

  // Handle time update
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
        setCurrentTime(formatTime(audio.currentTime))
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime('00:00')
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Simulated progress timer if no real audio file is present yet
  useEffect(() => {
    if (isPlaying && (!voiceMessage.audioUrl || !audioRef.current?.duration)) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1.5
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isPlaying, voiceMessage.audioUrl])

  if (!voiceMessage.enabled) return null

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={voiceMessage.audioUrl}
        preload="metadata"
      />

      <div
        className="rounded-3xl p-8 sm:p-12 shadow-md border border-white/80"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-pink) 100%)',
        }}
      >
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
            <Mic className="w-3.5 h-3.5 text-[#E88BA7]" />
            <span>MENSAJE DE VOZ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A] mb-2">
            {voiceMessage.title || 'escucha esto cuando estés sola.'}
          </h2>

          <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom">
            {voiceMessage.subtitle || 'Un pequeño audio grabado con mucho amor para cuando me extrañes.'}
          </p>
        </div>

        {/* Custom Waveform Audio Player */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-sm border border-white max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-[#34313A] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex-shrink-0"
              title={isPlaying ? 'Pausar audio' : 'Reproducir nota de voz'}
              aria-label={isPlaying ? 'Pausar audio' : 'Reproducir nota de voz'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            {/* Waveform Visualization Bars */}
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between gap-1 h-16 px-2 py-1 bg-[#FFF9F1] rounded-xl overflow-hidden border border-[#34313A]/8">
                {waveformHeights.map((h, i) => {
                  const barProgress = (i / waveformHeights.length) * 100
                  const isPassed = barProgress <= progress

                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-full transition-all duration-200"
                      style={{
                        height: `${h}%`,
                        backgroundColor: isPassed ? '#34313A' : 'rgba(52, 49, 58, 0.2)',
                        transform: isPlaying && isPassed ? 'scaleY(1.15)' : 'scaleY(1)',
                      }}
                    />
                  )
                })}
              </div>

              {/* Player Bottom Timers */}
              <div className="flex justify-between items-center mt-3 text-xs font-mono-custom text-[#34313A]/60">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{currentTime}</span>
                </span>
                <span>{voiceMessage.duration || '01:24'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
