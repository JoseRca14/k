import React, { useState } from 'react'
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const CalendarMemoriesSection: React.FC = () => {
  const { config } = useConfig()
  const { calendar } = config
  const [activeMonthIndex, setActiveMonthIndex] = useState(0)

  if (!calendar || calendar.length === 0) return null

  const currentMonthData = calendar[activeMonthIndex] || calendar[0]

  return (
    <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <CalendarIcon className="w-3.5 h-3.5 text-[#34313A]" />
          <span>LÍNEA DE TIEMPO</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-3">
          Un Año en Recuerdos
        </h2>
        <p className="text-base text-[#34313A]/70 font-sans-custom">
          Selecciona un mes para revivir lo que hicimos y descubrimos juntos.
        </p>
      </div>

      {/* Month Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {calendar.map((item, index) => {
          const isActive = activeMonthIndex === index
          return (
            <button
              key={index}
              onClick={() => setActiveMonthIndex(index)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono-custom font-semibold transition-all cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-[#34313A] text-white scale-105'
                  : 'bg-white/80 text-[#34313A]/70 hover:bg-white hover:text-[#34313A]'
              }`}
            >
              {item.month}
            </button>
          )
        })}
      </div>

      {/* Active Month Content */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white shadow-md">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#34313A]/10">
          <span className="text-2xl sm:text-3xl font-bold font-serif-custom text-[#34313A]">
            {currentMonthData.month}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-mono-custom text-[#34313A]/60">
            <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
            <span>{currentMonthData.memories.length} recuerdos</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentMonthData.memories.map((mem, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4 p-5 rounded-2xl bg-[#FFF9F1] border border-[#34313A]/6 hover:shadow-sm transition-all"
            >
              {mem.image && (
                <div className="rounded-xl overflow-hidden aspect-video">
                  <ModernImage
                    src={mem.image}
                    alt={mem.title}
                    fallbackText="Recuerdo del mes"
                    aspectRatio="landscape"
                    accentColor="var(--pastel-mint)"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <span className="text-xs font-mono-custom text-[#34313A]/50 block mb-1">
                  {mem.date}
                </span>
                <h4 className="text-xl font-bold font-serif-custom text-[#34313A] mb-2">
                  {mem.title}
                </h4>
                <p className="text-sm text-[#34313A]/80 font-sans-custom leading-relaxed">
                  {mem.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
