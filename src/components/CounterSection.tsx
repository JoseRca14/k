import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

interface TimeDiff {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const CounterSection: React.FC = () => {
  const { config } = useConfig()
  const startDateStr = config.personal.relationshipStartDate || '2023-01-01'

  const [timeDiff, setTimeDiff] = useState<TimeDiff>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateStr)
      if (isNaN(start.getTime())) return

      const now = new Date()
      let diffMs = now.getTime() - start.getTime()
      if (diffMs < 0) diffMs = 0

      // Calculate calendar difference
      let years = now.getFullYear() - start.getFullYear()
      let months = now.getMonth() - start.getMonth()
      let days = now.getDate() - start.getDate()

      if (days < 0) {
        months -= 1
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
        days += prevMonth.getDate()
      }
      if (months < 0) {
        years -= 1
        months += 12
      }

      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()

      setTimeDiff({
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, days),
        hours,
        minutes,
        seconds,
      })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [startDateStr])

  const format2Digits = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div
        className="relative rounded-3xl p-8 sm:p-12 overflow-hidden shadow-lg border border-white/60"
        style={{
          background: 'linear-gradient(135deg, var(--pastel-blue) 0%, var(--pastel-mint) 60%, var(--pastel-yellow) 100%)',
        }}
      >
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Header */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 text-xs font-mono-custom text-[#34313A] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#34313A]" />
            <span>NUESTRO TIEMPO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
            llevamos...
          </h2>
          <p className="text-sm sm:text-base text-[#34313A]/70 mb-10 font-sans-custom">
            compartiendo risas, abrazos y momentos inolvidables juntos.
          </p>

          {/* Counter Blocks */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {/* Years */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#34313A]">
                {format2Digits(timeDiff.years)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                años
              </span>
            </div>

            {/* Months */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#34313A]">
                {format2Digits(timeDiff.months)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                meses
              </span>
            </div>

            {/* Days */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#34313A]">
                {format2Digits(timeDiff.days)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                días
              </span>
            </div>

            {/* Hours */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#34313A]">
                {format2Digits(timeDiff.hours)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                horas
              </span>
            </div>

            {/* Minutes */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#34313A]">
                {format2Digits(timeDiff.minutes)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                minutos
              </span>
            </div>

            {/* Seconds */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-white/80 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono-custom text-[#E88BA7]">
                {format2Digits(timeDiff.seconds)}
              </span>
              <span className="text-xs uppercase font-sans-custom text-[#34313A]/60 font-medium mt-1">
                segundos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
