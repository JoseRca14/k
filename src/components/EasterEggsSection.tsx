import React, { useState, useEffect } from 'react'
import { Sparkles, X, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import confetti from 'canvas-confetti'
import type { EasterEggConfig } from '../types/config'

export const EasterEggsSection: React.FC = () => {
  const { config } = useConfig()
  const { easterEggs } = config

  const [starClicks, setStarClicks] = useState(0)
  const [activeEgg, setActiveEgg] = useState<EasterEggConfig | null>(null)
  const [typedBuffer, setTypedBuffer] = useState('')

  // Handle clicking secret star
  const handleStarClick = () => {
    const starEgg = easterEggs.find((e) => e.trigger === 'click-star')
    if (!starEgg) return

    const newClicks = starClicks + 1
    setStarClicks(newClicks)

    if (newClicks >= (starEgg.interactionCount || 3)) {
      triggerEggReward(starEgg)
      setStarClicks(0)
    }
  }

  const triggerEggReward = (egg: EasterEggConfig) => {
    setActiveEgg(egg)
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F7C8D8', '#DCCEF9', '#C9E7F5', '#F9E7A8', '#FFD5C2'],
    })
  }

  // Keyboard listener for secret typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input / textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return
      }

      const newBuffer = (typedBuffer + e.key.toLowerCase()).slice(-20)
      setTypedBuffer(newBuffer)

      easterEggs.forEach((egg) => {
        if (egg.secretWord && newBuffer.endsWith(egg.secretWord.toLowerCase())) {
          triggerEggReward(egg)
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [typedBuffer, easterEggs])

  return (
    <>
      {/* Floating Hidden Easter Egg Star in Top Right */}
      <button
        onClick={handleStarClick}
        className="fixed top-6 right-6 z-30 p-2.5 rounded-full bg-white/40 hover:bg-white/80 backdrop-blur-md border border-white/60 shadow-xs hover:scale-125 active:scale-95 transition-all cursor-pointer group"
        title="✨"
        aria-label="Elemento decorativo especial"
      >
        <Sparkles className="w-4 h-4 text-[#E88BA7] group-hover:rotate-45 transition-transform" />
      </button>

      {/* Secret Reward Modal */}
      {activeEgg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveEgg(null)}
        >
          <div
            className="relative max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border-2 border-white text-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #FFF9F1 0%, var(--pastel-pink) 100%)',
            }}
          >
            <button
              onClick={() => setActiveEgg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#34313A] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
              {activeEgg.rewardEmoji || '✨'}
            </div>

            <h3 className="text-2xl font-bold font-serif-custom text-[#34313A] mb-3">
              {activeEgg.rewardTitle}
            </h3>

            <p className="text-base text-[#34313A]/90 font-sans-custom leading-relaxed mb-6">
              {activeEgg.rewardMessage}
            </p>

            <button
              onClick={() => setActiveEgg(null)}
              className="px-6 py-2.5 rounded-full bg-[#34313A] text-white text-xs font-mono-custom uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform cursor-pointer inline-flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-[#F7C8D8] fill-current" />
              <span>Guardar secreto</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
