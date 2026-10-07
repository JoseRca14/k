import React, { useState } from 'react'
import { Gift, Sparkles, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import confetti from 'canvas-confetti'

export const SurpriseSection: React.FC = () => {
  const { config } = useConfig()
  const { surprise } = config
  const [isRevealed, setIsRevealed] = useState(false)

  if (!surprise.enabled) return null

  const handleOpenSurprise = () => {
    setIsRevealed(true)
    confetti({
      particleCount: 70,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#F7C8D8', '#DCCEF9', '#CDEDDC', '#F9E7A8', '#FFD5C2'],
    })
  }

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-14 text-center border border-white/80 shadow-md transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-mint) 0%, var(--pastel-yellow) 100%)',
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
            <Gift className="w-3.5 h-3.5 text-[#529F78]" />
            <span>SORPRESA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
            {surprise.teaserTitle || 'todavía falta algo.'}
          </h2>

          <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom mb-8">
            {surprise.teaserSubtitle || 'Hay un pequeño detalle reservado para este momento especial.'}
          </p>

          {!isRevealed ? (
            <button
              onClick={handleOpenSurprise}
              className="px-8 py-4 rounded-full bg-[#34313A] text-white font-sans-custom text-sm font-semibold hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer inline-flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-[#F9E7A8] group-hover:rotate-45 transition-transform" />
              <span>{surprise.buttonText || 'Abrir sorpresa ✨'}</span>
            </button>
          ) : (
            <div className="bg-white/95 rounded-3xl p-8 shadow-xl border border-white animate-fadeIn text-center">
              <div className="w-14 h-14 rounded-full bg-[#CDEDDC] text-[#34313A] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#E88BA7] fill-[#E88BA7]" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif-custom text-[#34313A] mb-3">
                {surprise.revealedTitle || '¡Feliz cumpleaños, mi amor!'}
              </h3>

              <p className="text-base text-[#34313A]/85 font-sans-custom leading-relaxed">
                {surprise.revealedMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
