import React from 'react'
import { Sparkles, Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const HeroSection: React.FC = () => {
  const { config } = useConfig()
  const { personal } = config

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background organic pastel blobs */}
      <div
        className="absolute w-[450px] h-[450px] -top-24 -left-20 rounded-full opacity-60 blur-3xl animate-blob pointer-events-none"
        style={{ backgroundColor: 'var(--pastel-lavender)' }}
      />
      <div
        className="absolute w-[500px] h-[500px] -bottom-28 -right-24 rounded-full opacity-50 blur-3xl animate-blob pointer-events-none"
        style={{ backgroundColor: 'var(--pastel-pink)', animationDelay: '4s' }}
      />
      <div
        className="absolute w-72 h-72 top-1/2 right-1/4 rounded-full opacity-40 blur-2xl animate-blob pointer-events-none"
        style={{ backgroundColor: 'var(--pastel-yellow)', animationDelay: '2s' }}
      />

      <div className="relative max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start z-10 text-left">
          {/* Badge 01 / Category */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A]/80 mb-6 shadow-xs">
            <span className="font-bold text-[#34313A]">01</span>
            <span className="w-1 h-1 rounded-full bg-[#34313A]/40" />
            <span>{personal.heroBadge || 'EDICIÓN CUMPLEAÑOS'}</span>
          </div>

          {/* Main Title: Feliz cumpleaños, [NOMBRE] */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif-custom tracking-tight text-[#34313A] leading-[1.08] mb-6">
            Feliz cumpleaños,{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(120deg, var(--pastel-pink) 0%, var(--pastel-lavender) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {personal.recipientName || '[NOMBRE]'}
            </span>
          </h1>

          {/* Subtitle / Personal message */}
          <p className="text-base sm:text-lg md:text-xl text-[#34313A]/80 font-sans-custom max-w-xl leading-relaxed mb-8">
            {personal.heroSubtitle ||
              'Hoy celebramos tu vida, tu risa y cada pequeño momento que compartimos juntos.'}
          </p>

          {/* Meta Information Bar (Editorial Style) */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[#34313A]/10 w-full font-mono-custom text-xs text-[#34313A]/70">
            <div>
              <span className="block text-[#34313A]/40 uppercase text-[10px] tracking-wider">Para</span>
              <span className="font-medium text-[#34313A]">{personal.recipientName || '[NOMBRE]'}</span>
            </div>
            <div className="w-px h-6 bg-[#34313A]/10" />
            <div>
              <span className="block text-[#34313A]/40 uppercase text-[10px] tracking-wider">Fecha</span>
              <span className="font-medium text-[#34313A]">{personal.birthDate || '[FECHA]'}</span>
            </div>
            <div className="w-px h-6 bg-[#34313A]/10" />
            <div>
              <span className="block text-[#34313A]/40 uppercase text-[10px] tracking-wider">De</span>
              <span className="font-medium text-[#34313A]">{personal.senderName || '[MI NOMBRE]'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Large Editorial Photography Composition */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Decorative backdrop shapes */}
          <div
            className="absolute -top-6 -right-6 w-full h-full rounded-3xl opacity-70 transform rotate-3 -z-10"
            style={{ backgroundColor: 'var(--pastel-lavender)' }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl opacity-50 transform -rotate-2 -z-10"
            style={{ backgroundColor: 'var(--pastel-pink)' }}
          />

          {/* Main Large Photograph Container (Editorial Cut) */}
          <div className="relative w-full max-w-md bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-white/80">
            {/* Minimal aesthetic sticker badge */}
            <div
              className="absolute -top-4 -right-4 z-20 px-3 py-1.5 rounded-full shadow-md text-xs font-semibold flex items-center gap-1.5 transform rotate-6 border border-white/50"
              style={{ backgroundColor: 'var(--pastel-yellow)', color: '#34313A' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Día especial</span>
            </div>

            {/* Polaroid / Editorial Image */}
            <div className="overflow-hidden rounded-2xl">
              <ModernImage
                src={personal.heroImage}
                alt={personal.recipientName || 'Foto principal'}
                fallbackText="Agrega tu foto favorita en /admin o en public/assets/images/hero.jpg"
                aspectRatio="portrait"
                accentColor="var(--pastel-lavender)"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
              />
            </div>

            {/* Bottom Polaroid-style caption note */}
            <div className="mt-3 px-2 flex justify-between items-center text-xs font-mono-custom text-[#34313A]/60">
              <span className="tracking-widest uppercase">CAPÍTULO 01</span>
              <div className="flex items-center gap-1 text-[#E88BA7]">
                <Heart className="w-3 h-3 fill-current" />
                <span>para ti</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
