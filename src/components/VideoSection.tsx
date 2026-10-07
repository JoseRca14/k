import React, { useState, useRef } from 'react'
import { Play, Pause, Film } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const VideoSection: React.FC = () => {
  const { config } = useConfig()
  const { video } = config
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setHasVideoError(true)
        })
    }
  }

  if (!video.enabled) return null

  return (
    <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <Film className="w-3.5 h-3.5 text-[#34313A]" />
          <span>CINEMATOGRÁFICO</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
          {video.title || 'un momento que quiero guardar.'}
        </h2>
        <p className="text-base text-[#34313A]/70 font-sans-custom">
          {video.caption || 'Porque los videos guardan la risa y el movimiento exacto del recuerdo.'}
        </p>
      </div>

      {/* Cinematic Video Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-video max-w-4xl mx-auto bg-black/90 group">
        {!hasVideoError && video.videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={video.videoUrl}
              poster={video.posterUrl}
              className="w-full h-full object-cover"
              playsInline
              onClick={toggleVideo}
              onError={() => setHasVideoError(true)}
            />

            {/* Play/Pause overlay */}
            <div
              className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
              }`}
              onClick={toggleVideo}
            >
              <button
                className="w-20 h-20 rounded-full bg-white/90 text-[#34313A] flex items-center justify-center shadow-xl transform group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
          </>
        ) : (
          /* Placeholder if no video uploaded yet */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-[#34313A] text-white text-center">
            <ModernImage
              src={video.posterUrl}
              alt="Video placeholder"
              fallbackText="Sube tu clip de video favorito en /admin o en public/assets/video/memory.mp4"
              aspectRatio="wide"
              accentColor="var(--pastel-blue)"
              className="absolute inset-0 opacity-40 object-cover"
            />
            <div className="relative z-10 max-w-md">
              <Film className="w-12 h-12 text-[#F7C8D8] mx-auto mb-3" />
              <h3 className="text-xl font-bold font-serif-custom mb-1">
                {video.title || 'un momento que quiero guardar.'}
              </h3>
              <p className="text-xs text-white/70 font-mono-custom">
                Puedes agregar un video .mp4 desde el panel /admin
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
