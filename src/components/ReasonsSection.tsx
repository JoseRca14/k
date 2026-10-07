import React from 'react'
import { Sparkles } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

export const ReasonsSection: React.FC = () => {
  const { config } = useConfig()
  const { reasons } = config

  return (
    <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
          <span>EDITORIAL</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
          Razones por las que te amo
        </h2>
        <p className="text-base text-[#34313A]/70 font-sans-custom">
          Podría escribir cien más, pero estas son algunas de mis favoritas.
        </p>
      </div>

      {/* Editorial Numbered List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reasons.map((reason, index) => {
          const accentColor = reason.color || '#F7C8D8'

          return (
            <div
              key={reason.id || index}
              className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#34313A]/8 shadow-xs hover:shadow-md transition-all duration-300 group flex items-start gap-5"
            >
              {/* Number Badge with Pastel Accent */}
              <div
                className="w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center font-mono-custom font-bold text-xl text-[#34313A] shadow-xs group-hover:scale-105 transition-transform"
                style={{ backgroundColor: accentColor }}
              >
                {reason.number || String(index + 1).padStart(2, '0')}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-lg sm:text-xl font-serif-custom text-[#34313A] leading-snug">
                  {reason.text}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
