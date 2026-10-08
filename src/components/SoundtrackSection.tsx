import React, { useState, useRef } from 'react'
import { Play, Pause, Music2, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'
import { assetPath } from '../assets/assetPath'

export const SoundtrackSection: React.FC = () => {
  const { config } = useConfig()
  const { playlist } = config
  const [activeSongId, setActiveSongId] = useState<string | null>(null)
  const previewAudioRef = useRef<HTMLAudioElement | null>(null)

  const toggleSongPlay = (songId: string, audioUrl?: string) => {
    if (activeSongId === songId) {
      if (previewAudioRef.current) previewAudioRef.current.pause()
      setActiveSongId(null)
    } else {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause()
        if (audioUrl) {
          previewAudioRef.current.src = assetPath(audioUrl)
          previewAudioRef.current.play().catch(() => {
            console.log('Audio file preview not found')
          })
        }
      }
      setActiveSongId(songId)
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Hidden preview audio element */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setActiveSongId(null)}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <Music2 className="w-3.5 h-3.5 text-[#9B86D4]" />
          <span>PLAYLIST ESPECIAL</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
          Nuestra Banda Sonora
        </h2>
        <p className="text-base text-[#34313A]/70 font-sans-custom">
          Las canciones que tienen el sonido de nuestros viajes, paseos y momentos juntos.
        </p>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {playlist.map((song, index) => {
          const isPlaying = activeSongId === song.id

          return (
            <div
              key={song.id || index}
              className="relative bg-white rounded-3xl p-5 shadow-sm border border-[#34313A]/10 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F1 100%)',
              }}
            >
              <div>
                {/* Cover with Vinyl effect */}
                <div className="relative mb-5 rounded-2xl overflow-hidden group">
                  <ModernImage
                    src={song.coverUrl}
                    alt={song.title}
                    fallbackText="Portada de la canción"
                    aspectRatio="square"
                    accentColor="var(--pastel-lavender)"
                    className="w-full h-full object-cover"
                  />

                  {/* Play overlay button */}
                  <button
                    onClick={() => toggleSongPlay(song.id, song.audioUrl)}
                    className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title={isPlaying ? 'Pausar' : 'Escuchar canción'}
                    aria-label={isPlaying ? 'Pausar' : 'Escuchar canción'}
                  >
                    <div className="w-12 h-12 rounded-full bg-white text-[#34313A] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </div>
                  </button>

                  {/* Top pill badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-mono-custom text-[#34313A]">
                    TRACK {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Song info */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold font-serif-custom text-[#34313A] truncate">
                    {song.title || '[CANCIÓN]'}
                  </h3>
                  <p className="text-sm font-sans-custom text-[#34313A]/60 font-medium">
                    {song.artist || '[ARTISTA]'}
                  </p>
                </div>

                {/* Associated memory description */}
                <p className="text-xs font-sans-custom text-[#34313A]/80 leading-relaxed mb-4">
                  {song.description || 'Una canción que siempre me hace recordar tu sonrisa.'}
                </p>
              </div>

              {/* Bottom Memory Tag */}
              <div className="pt-3 border-t border-[#34313A]/10 flex items-center justify-between text-xs font-mono-custom text-[#34313A]/50">
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3 text-[#E88BA7] fill-[#E88BA7]" />
                  <span>recuerdo</span>
                </span>
                <span>{isPlaying ? 'reproduciendo' : 'toca para oír'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
