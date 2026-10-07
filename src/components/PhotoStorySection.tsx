import React, { useState } from 'react'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const PhotoStorySection: React.FC = () => {
  const { config } = useConfig()
  const { photoStory } = config
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-6 sm:p-10 shadow-lg border border-white/80 transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, var(--pastel-pink) 0%, var(--background) 100%)',
        }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
            <span>INTERACTIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A] mb-2">
            {photoStory.title || '¿Te acuerdas de este día?'}
          </h2>
          <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom">
            {photoStory.subtitle || 'Toca la foto o el botón para descubrir la historia detrás de esta imagen.'}
          </p>
        </div>

        {/* Interactive Photo & Story Container */}
        <div className="relative max-w-xl mx-auto">
          {/* Polaroid container */}
          <div
            onClick={() => setIsRevealed(!isRevealed)}
            className="polaroid-card cursor-pointer group select-none"
          >
            <div className="washi-tape washi-tape-mint" />

            <div className="relative overflow-hidden rounded-xl">
              <ModernImage
                src={photoStory.imageUrl}
                alt="Foto con historia"
                fallbackText="Agrega esta fotografía especial desde el panel de control"
                aspectRatio="landscape"
                accentColor="var(--pastel-pink)"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />

              {/* Reveal hint badge */}
              <div className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono-custom flex items-center gap-1.5 transition-transform group-hover:scale-105">
                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isRevealed ? 'Ocultar historia' : 'Toca para leer'}</span>
              </div>
            </div>

            {/* Revealed Story with smooth slide-down */}
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isRevealed ? 'max-h-96 opacity-100 mt-5 pt-4 border-t border-[#34313A]/10' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono-custom text-[#34313A]/60 mb-2">
                <span className="uppercase font-semibold">Historia detrás de la foto</span>
                <span>{photoStory.date || '[FECHA]'}</span>
              </div>
              <p className="text-base text-[#34313A] font-sans-custom leading-relaxed">
                {photoStory.story ||
                  'Este día fue completamente espontáneo. Nos reímos hasta que nos dolió el estómago y prometimos que nunca olvidaríamos este instante.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
