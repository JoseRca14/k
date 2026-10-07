import React, { useMemo } from 'react'
import { Sparkles, Sun, Heart, Infinity as InfinityIcon } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

export const StatsSection: React.FC = () => {
  const { config } = useConfig()
  const { stats, personal } = config

  const startDateStr = stats.startDate || personal.relationshipStartDate || '2023-01-01'

  const calculatedDays = useMemo(() => {
    const start = new Date(startDateStr)
    if (isNaN(start.getTime())) return 365
    const now = new Date()
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(1, diff)
  }, [startDateStr])

  return (
    <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      <div
        className="rounded-3xl p-8 sm:p-14 border border-white/80 shadow-md text-center"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-lavender) 0%, var(--pastel-blue) 100%)',
        }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#9B86D4]" />
          <span>NÚMEROS QUE IMPORTAN</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-4">
          desde que estamos juntos
        </h2>

        <p className="text-sm sm:text-base text-[#34313A]/70 font-sans-custom max-w-md mx-auto mb-12">
          Cada día a tu lado suma momentos que valen por mil.
        </p>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Days */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xs border border-white flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-bold font-mono-custom text-[#34313A] mb-1">
              {calculatedDays}
            </span>
            <span className="text-xs uppercase font-sans-custom font-semibold text-[#34313A]/60 tracking-wider">
              días
            </span>
          </div>

          {/* Sunrises */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xs border border-white flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-bold font-mono-custom text-[#34313A] mb-1">
              {stats.sunrisesOverride || calculatedDays}
            </span>
            <span className="text-xs uppercase font-sans-custom font-semibold text-[#34313A]/60 tracking-wider flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-[#F9E7A8]" />
              amaneceres
            </span>
          </div>

          {/* Memories */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xs border border-white flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-bold font-mono-custom text-[#34313A] mb-1">
              {stats.memoriesOverride || `${config.memories.length * 10}+`}
            </span>
            <span className="text-xs uppercase font-sans-custom font-semibold text-[#34313A]/60 tracking-wider flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#E88BA7]" />
              recuerdos
            </span>
          </div>

          {/* Infinite moments */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xs border border-white flex flex-col items-center">
            <span className="text-3xl sm:text-5xl font-bold font-mono-custom text-[#E88BA7] mb-1 flex items-center justify-center">
              <InfinityIcon className="w-10 h-10 sm:w-12 sm:h-12" />
            </span>
            <span className="text-xs uppercase font-sans-custom font-semibold text-[#34313A]/60 tracking-wider">
              momentos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
