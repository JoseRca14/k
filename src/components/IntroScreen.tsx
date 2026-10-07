import React, { useState } from 'react'
import { Sparkles, ArrowRight, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import confetti from 'canvas-confetti'

interface IntroScreenProps {
  onEnter: () => void
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const { config } = useConfig()
  const [isExiting, setIsExiting] = useState(false)

  const handleStart = () => {
    // Fire gentle pastel confetti
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F7C8D8', '#DCCEF9', '#C9E7F5', '#CDEDDC', '#F9E7A8', '#FFD5C2'],
    })

    setIsExiting(true)
    setTimeout(() => {
      onEnter()
    }, 700)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-6 transition-all duration-700 ease-in-out ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: `radial-gradient(circle at 50% 40%, var(--pastel-pink) 0%, var(--pastel-lavender) 45%, var(--background) 100%)`,
      }}
    >
      {/* Floating decorative elements */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-40 blur-3xl animate-blob"
        style={{
          backgroundColor: 'var(--pastel-yellow)',
          top: '15%',
          left: '10%',
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-40 blur-3xl animate-blob"
        style={{
          backgroundColor: 'var(--pastel-blue)',
          bottom: '15%',
          right: '10%',
          animationDelay: '3s',
        }}
      />

      {/* Floating little stars & dots */}
      <div className="absolute top-1/4 left-1/4 text-white/70 animate-twinkle">
        <Sparkles className="w-5 h-5 text-[#E88BA7]" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 text-white/70 animate-twinkle" style={{ animationDelay: '1.5s' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-[#9B86D4]/50" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-white/70 animate-twinkle" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6 text-[#9B86D4]" />
      </div>
      <div className="absolute bottom-1/4 right-1/5 text-white/70 animate-twinkle" style={{ animationDelay: '0.8s' }}>
        <div className="w-3 h-3 rounded-full bg-[#F7C8D8]" />
      </div>

      {/* Center card */}
      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Soft badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-xs mb-8 animate-float-slow">
          <Heart className="w-3.5 h-3.5 text-[#E88BA7] fill-[#E88BA7]" />
          <span className="text-xs uppercase tracking-widest font-mono-custom text-[#34313A]/70">
            {config.personal.birthDate || 'Día Especial'}
          </span>
        </div>

        {/* Minimal greeting */}
        <h1 className="text-5xl md:text-7xl font-bold font-serif-custom tracking-tight text-[#34313A] mb-4">
          {config.intro.greeting || 'hey.'}
        </h1>

        <p className="text-lg md:text-xl text-[#34313A]/80 font-sans-custom font-normal max-w-sm mb-10 leading-relaxed">
          {config.intro.subtitle || 'tengo algo para ti.'}
        </p>

        {/* Enter Button */}
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#34313A] text-[#FFF9F1] font-medium text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span>{config.intro.buttonText || 'Entrar →'}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p className="mt-8 text-xs text-[#34313A]/50 font-mono-custom">
          (sube el volumen para una mejor experiencia)
        </p>
      </div>
    </div>
  )
}
