import React, { useState } from 'react'
import { Heart, Sparkles, Feather } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

export const LetterSection: React.FC = () => {
  const { config } = useConfig()
  const { letter, personal } = config
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-28 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Container with Cream & Soft Pastel Accents */}
      <div
        className="relative rounded-3xl p-8 sm:p-14 md:p-20 shadow-md border border-[#34313A]/10 overflow-hidden"
        style={{
          backgroundColor: '#FFF9F1',
          backgroundImage: 'radial-gradient(#34313A08 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Soft pastel decorative corner glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-50 blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--pastel-peach)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{ backgroundColor: 'var(--pastel-pink)' }}
        />

        {/* Small floating paper tape decoration */}
        <div className="washi-tape washi-tape-yellow" />

        {/* Letter Header */}
        <div className="text-center max-w-lg mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-4 shadow-xs">
            <Feather className="w-3.5 h-3.5 text-[#34313A]" />
            <span>CARTA PERSONAL</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold font-serif-custom text-[#34313A] mb-3">
            {letter.title || 'para ti.'}
          </h2>

          <p className="text-sm sm:text-base text-[#34313A]/60 font-sans-custom">
            {letter.subtitle || 'Unas palabras escritas especialmente para este día.'}
          </p>
        </div>

        {/* Letter Envelope / Read Mode Toggle */}
        {!isOpen ? (
          <div className="text-center py-6">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#34313A] text-[#FFF9F1] font-sans-custom text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer group"
            >
              <Heart className="w-4 h-4 text-[#F7C8D8] fill-[#F7C8D8] group-hover:scale-125 transition-transform" />
              <span>Abrir carta completa</span>
              <Sparkles className="w-4 h-4 text-[#F9E7A8]" />
            </button>
          </div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn text-[#34313A]">
            {letter.paragraphs && letter.paragraphs.map((paragraph, index) => {
              // Replace placeholder [NOMBRE] dynamically if present
              const formattedText = paragraph.replace(/\[NOMBRE\]/g, personal.recipientName || '[NOMBRE]')

              return (
                <p
                  key={index}
                  className="text-base sm:text-lg md:text-xl font-serif-custom leading-relaxed sm:leading-loose text-justify text-[#34313A]/90 first-letter:text-3xl first-letter:font-bold first-letter:font-serif-custom"
                >
                  {formattedText}
                </p>
              )
            })}

            {/* Signature & Date */}
            <div className="pt-10 border-t border-[#34313A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-mono-custom text-sm text-[#34313A]/70">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#34313A]/40 mb-1">
                  {letter.signOff || 'Con todo mi amor,'}
                </span>
                <span className="font-serif-custom text-xl font-bold text-[#34313A]">
                  {personal.senderName || '[MI NOMBRE]'}
                </span>
              </div>
              <div className="text-xs text-[#34313A]/50">
                {letter.date || personal.birthDate || '[FECHA]'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
