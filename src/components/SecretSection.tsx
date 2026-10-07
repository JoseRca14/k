import React, { useState } from 'react'
import { Lock, Unlock, KeyRound, Sparkles } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'
import confetti from 'canvas-confetti'

export const SecretSection: React.FC = () => {
  const { config } = useConfig()
  const { secretSection } = config
  const [inputWord, setInputWord] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [errorShake, setErrorShake] = useState(false)

  if (!secretSection.enabled) return null

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    const targetWord = (secretSection.secretWord || 'siempre').trim().toLowerCase()
    if (inputWord.trim().toLowerCase() === targetWord) {
      setIsUnlocked(true)
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F7C8D8', '#DCCEF9', '#C9E7F5', '#CDEDDC', '#F9E7A8'],
      })
    } else {
      setErrorShake(true)
      setTimeout(() => setErrorShake(false), 500)
    }
  }

  return (
    <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-14 border border-[#34313A]/10 shadow-lg text-center"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-pink) 0%, var(--pastel-lavender) 100%)',
        }}
      >
        {!isUnlocked ? (
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-[#34313A]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif-custom text-[#34313A] mb-3">
              {secretSection.prompt || 'hay algo escondido aquí.'}
            </h2>

            <p className="text-sm text-[#34313A]/70 font-sans-custom mb-8">
              Una pequeña sorpresa reservada solo para ti si sabes la palabra clave.
            </p>

            <form
              onSubmit={handleUnlock}
              className={`flex flex-col sm:flex-row gap-3 ${errorShake ? 'animate-bounce' : ''}`}
            >
              <div className="relative flex-1">
                <KeyRound className="w-4 h-4 text-[#34313A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  placeholder={secretSection.inputPlaceholder || 'escribe la palabra...'}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/90 border border-white text-sm font-sans-custom text-[#34313A] placeholder-[#34313A]/40 focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20 shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#34313A] text-white text-sm font-sans-custom font-semibold hover:scale-105 active:scale-95 transition-transform shadow-md cursor-pointer whitespace-nowrap"
              >
                Desbloquear
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Content */
          <div className="max-w-xl mx-auto bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl border border-white animate-fadeIn text-left">
            <div className="flex items-center gap-3 text-xs font-mono-custom text-[#529F78] mb-4">
              <Unlock className="w-4 h-4" />
              <span>DESBLOQUEADO CON ÉXITO</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif-custom text-[#34313A] mb-4">
              {secretSection.unlockedTitle || 'Lo descubriste ♡'}
            </h3>

            {secretSection.unlockedImageUrl && (
              <div className="rounded-2xl overflow-hidden mb-6 shadow-sm">
                <ModernImage
                  src={secretSection.unlockedImageUrl}
                  alt="Secreto desbloqueado"
                  fallbackText="Foto del secreto desbloqueado"
                  aspectRatio="landscape"
                  accentColor="var(--pastel-pink)"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-base sm:text-lg font-serif-custom text-[#34313A]/90 leading-relaxed">
              {secretSection.unlockedMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
