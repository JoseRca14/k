import React, { useState } from 'react'
import { Sparkles, HeartHandshake, ArrowRight } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'
import confetti from 'canvas-confetti'

export const LastSurpriseSection: React.FC = () => {
  const { config } = useConfig()
  const { lastSurprise } = config
  const [isRevealed, setIsRevealed] = useState(false)

  if (!lastSurprise.enabled) return null

  const handleReveal = () => {
    setIsRevealed(true)
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#F7C8D8', '#DCCEF9', '#C9E7F5', '#CDEDDC', '#F9E7A8', '#FFD5C2'],
    })
  }

  return (
    <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-14 text-center border border-white/80 shadow-lg relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-peach) 0%, var(--pastel-lavender) 100%)',
        }}
      >
        {!isRevealed ? (
          <div className="max-w-md mx-auto py-4">
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-4">
              {lastSurprise.question || '¿Creíste que ya habíamos terminado?'}
            </h2>

            <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom mb-8">
              Aún queda una última cosa antes de llegar al final...
            </p>

            <button
              onClick={handleReveal}
              className="px-8 py-4 rounded-full bg-[#34313A] text-white font-sans-custom text-sm font-semibold hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer inline-flex items-center gap-3 group"
            >
              <span>Ver última sorpresa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="bg-white/95 rounded-3xl p-8 sm:p-12 shadow-2xl border border-white animate-fadeIn text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono-custom text-[#34313A]/60 mb-4">
              <Sparkles className="w-4 h-4 text-[#E88BA7]" />
              <span className="uppercase font-semibold">DETALLE FINAL</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A] mb-4">
              {lastSurprise.revealedTitle || 'Una última cosa antes de que cierres esto...'}
            </h3>

            {lastSurprise.revealedPhotoUrl && (
              <div className="rounded-2xl overflow-hidden mb-6 shadow-sm">
                <ModernImage
                  src={lastSurprise.revealedPhotoUrl}
                  alt="Última foto sorpresa"
                  fallbackText="Fotografía final sorpresa"
                  aspectRatio="landscape"
                  accentColor="var(--pastel-peach)"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-base sm:text-lg font-serif-custom text-[#34313A]/90 leading-relaxed mb-6">
              {lastSurprise.revealedText}
            </p>

            <div className="pt-6 border-t border-[#34313A]/10 flex items-center justify-between text-xs font-mono-custom text-[#34313A]/60">
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#E88BA7]" />
                <span>hecho con todo mi corazón</span>
              </span>
              <span>gracias por estar aquí</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
