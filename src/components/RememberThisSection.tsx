import React, { useState } from 'react'
import { Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'
import confetti from 'canvas-confetti'

export const RememberThisSection: React.FC = () => {
  const { config } = useConfig()
  const { rememberPlace } = config
  const [isRevealed, setIsRevealed] = useState(false)

  const handleReveal = () => {
    setIsRevealed(true)
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F7C8D8', '#C9E7F5', '#CDEDDC', '#F9E7A8'],
    })
  }

  return (
    <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-12 shadow-md border border-white/80"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-blue) 0%, var(--pastel-mint) 100%)',
        }}
      >
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#5E9FC6]" />
            <span>DESAFÍO DE MEMORIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A] mb-3">
            {rememberPlace.question || '¿Te acuerdas de este lugar?'}
          </h2>

          <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom">
            Una foto borrosa para poner a prueba tu memoria... ¿adivinas dónde fue?
          </p>
        </div>

        {/* Blurred Photo Container */}
        <div className="relative max-w-md mx-auto bg-white p-4 rounded-3xl shadow-lg border border-white">
          <div className="relative overflow-hidden rounded-2xl">
            <ModernImage
              src={rememberPlace.blurredImageUrl}
              alt="Lugar misterioso"
              fallbackText="Fotografía misteriosa"
              aspectRatio="landscape"
              accentColor="var(--pastel-blue)"
              className={`w-full h-full object-cover transition-all duration-700 ${
                isRevealed ? 'filter-none scale-100' : 'filter blur-xl scale-110'
              }`}
            />

            {/* Unrevealed button overlay */}
            {!isRevealed && (
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center p-4">
                <button
                  onClick={handleReveal}
                  className="px-6 py-3 rounded-full bg-white text-[#34313A] font-sans-custom text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E88BA7]" />
                  <span>Revelar</span>
                </button>
              </div>
            )}
          </div>

          {/* Revealed Backstory */}
          {isRevealed && (
            <div className="mt-5 px-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-mono-custom text-[#34313A]/60 mb-2">
                <span className="flex items-center gap-1 text-[#34313A] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#529F78]" />
                  {rememberPlace.revealedTitle || '¡Aquel momento!'}
                </span>
                <span>{rememberPlace.revealedDate || '[FECHA]'}</span>
              </div>
              <p className="text-sm sm:text-base text-[#34313A]/90 font-sans-custom leading-relaxed">
                {rememberPlace.revealedStory ||
                  'Este lugar donde nos tomamos un respiro y prometimos regresar pronto.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
