import React, { useState } from 'react'
import { Sparkles, Shuffle, Calendar, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const RandomMemorySection: React.FC = () => {
  const { config } = useConfig()
  const { memories, reasons } = config

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePickRandom = () => {
    setIsAnimating(true)
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * memories.length)
      if (nextIndex === currentIndex && memories.length > 1) {
        nextIndex = (nextIndex + 1) % memories.length
      }
      setCurrentIndex(nextIndex)
      setIsAnimating(false)
    }, 250)
  }

  const currentMemory = memories[currentIndex] || memories[0]
  const associatedReason = reasons[currentIndex % reasons.length]

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-12 shadow-md border border-white/80"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-yellow) 0%, var(--pastel-peach) 100%)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#34313A]" />
              <span>ALEATORIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A]">
              Cofre de Recuerdos
            </h2>
          </div>

          {/* Random Memory Trigger Button */}
          <button
            onClick={handlePickRandom}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#34313A] text-white font-sans-custom text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer group"
          >
            <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>muéstrame un recuerdo ↗</span>
          </button>
        </div>

        {/* Display Card with Transition */}
        {currentMemory && (
          <div
            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#34313A]/8 transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5">
                <div className="polaroid-card">
                  <ModernImage
                    src={currentMemory.imageUrl}
                    alt={currentMemory.title}
                    fallbackText="Recuerdo aleatorio"
                    aspectRatio="square"
                    accentColor="var(--pastel-peach)"
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono-custom font-semibold bg-[#FFF9F1] border border-[#34313A]/10 text-[#34313A] flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {currentMemory.date || '[FECHA]'}
                  </span>
                  <span className="text-xs font-mono-custom text-[#34313A]/50">
                    RECUERDO SELECCIONADO
                  </span>
                </div>

                <h3 className="text-2xl font-bold font-serif-custom text-[#34313A] mb-3">
                  {currentMemory.title}
                </h3>

                <p className="text-base text-[#34313A]/80 font-sans-custom leading-relaxed mb-4">
                  {currentMemory.description}
                </p>

                {associatedReason && (
                  <div className="pt-3 border-t border-[#34313A]/10 text-xs font-mono-custom text-[#34313A]/60 flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-[#E88BA7] fill-[#E88BA7]" />
                    <span>Razón #{associatedReason.number}: {associatedReason.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
