import React from 'react'
import { Calendar, Play, Volume2 } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const OurStorySection: React.FC = () => {
  const { config } = useConfig()
  const { memories } = config

  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A]/80 mb-3 shadow-xs">
          <span>CAPÍTULO 02</span>
          <span>•</span>
          <span>SCRAPBOOK</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-4">
          Nuestra Historia
        </h2>
        <p className="text-base sm:text-lg text-[#34313A]/70 font-sans-custom">
          Un recorrido visual por los momentos, viajes y pequeñas aventuras que hacen única nuestra historia.
        </p>
      </div>

      {/* Visual Journey - Varied Modern Editorial Layout */}
      <div className="space-y-16">
        {memories.map((memory, index) => {
          const isEven = index % 2 === 0
          const pastelBg = memory.pastelColor || '#F7C8D8'

          return (
            <div
              key={memory.id || index}
              className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Media Column */}
              <div
                className={`md:col-span-6 relative ${
                  isEven ? 'md:order-1' : 'md:order-2'
                }`}
              >
                {/* Washi tape decor */}
                <div className="washi-tape washi-tape-lavender" />

                {/* Polaroid / Editorial frame */}
                <div
                  className="bg-white p-3 sm:p-4 rounded-2xl shadow-md border border-white/90 transform hover:scale-[1.01] transition-transform duration-300"
                  style={{
                    transform: isEven ? 'rotate(-1deg)' : 'rotate(1.5deg)',
                  }}
                >
                  <ModernImage
                    src={memory.imageUrl}
                    alt={memory.title}
                    fallbackText="Foto del recuerdo"
                    aspectRatio="landscape"
                    accentColor={pastelBg}
                    className="rounded-xl w-full h-full object-cover"
                  />

                  {/* Audio or video badge if available */}
                  {(memory.audioUrl || memory.videoUrl) && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-mono-custom text-[#34313A]/70">
                      {memory.audioUrl && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#CDEDDC]/60">
                          <Volume2 className="w-3 h-3" /> Audio adjunto
                        </span>
                      )}
                      {memory.videoUrl && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#DCCEF9]/60">
                          <Play className="w-3 h-3" /> Video disponible
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Text / Backstory Column */}
              <div
                className={`md:col-span-6 flex flex-col justify-center ${
                  isEven ? 'md:order-2 md:pl-6' : 'md:order-1 md:pr-6'
                }`}
              >
                {/* Date tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold flex items-center gap-1.5 shadow-xs"
                    style={{
                      backgroundColor: pastelBg,
                      color: '#34313A',
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    {memory.date || '[FECHA]'}
                  </span>
                  <span className="text-xs text-[#34313A]/40 font-mono-custom">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Memory Title */}
                <h3 className="text-2xl sm:text-3xl font-bold font-serif-custom text-[#34313A] mb-3 leading-snug">
                  {memory.title || '[RECUERDO]'}
                </h3>

                {/* Description */}
                <p className="text-base text-[#34313A]/80 font-sans-custom leading-relaxed">
                  {memory.description ||
                    'Una tarde especial llena de risas y momentos que no cambiaría por nada.'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
