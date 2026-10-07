import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Eye, EyeOff, Layout } from 'lucide-react'

export const SectionsTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { sectionVisibility } = config

  const toggleSection = (key: keyof typeof sectionVisibility) => {
    updateConfig((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [key]: !prev.sectionVisibility[key],
      },
    }))
  }

  const sectionsList: Array<{ key: keyof typeof sectionVisibility; label: string; desc: string }> = [
    { key: 'hero', label: '01. Portada Hero', desc: 'Foto editorial grande, fecha y dedicatoria principal' },
    { key: 'counter', label: '02. Contador de Relación', desc: 'Años, meses, días, horas, minutos y segundos' },
    { key: 'memories', label: '03. Nuestra Historia (Recuerdos)', desc: 'Recorrido visual interactivo tipo scrapbook' },
    { key: 'photoStory', label: '04. Una Foto, Una Historia', desc: 'Sección "¿Te acuerdas de este día?" con revelación interactiva' },
    { key: 'gallery', label: '05. Galería Scrapbook', desc: 'Collage de fotos con tilt, washi tapes y lightbox' },
    { key: 'playlist', label: '06. Nuestra Banda Sonora', desc: 'Playlist con canciones, portadas y anécdotas' },
    { key: 'letter', label: '07. Carta Personal ("para ti.")', desc: 'Texto íntimo con apertura y lectura progresiva' },
    { key: 'reasons', label: '08. Razones por las que te amo', desc: 'Lista editorial numerada con colores pastel' },
    { key: 'voiceMessage', label: '09. Nota de Voz Personal', desc: 'Reproductor con visualizador waveform personalizado' },
    { key: 'video', label: '10. Video Cinematográfico', desc: 'Contenedor de video para momentos inolvidables' },
    { key: 'randomMemory', label: '11. Random Memory', desc: 'Botón "muéstrame un recuerdo ↗" interactivo' },
    { key: 'rememberPlace', label: '12. "¿Te acuerdas de este lugar?"', desc: 'Foto desenfocada con botón de revelado' },
    { key: 'calendar', label: '13. Calendario de Recuerdos', desc: 'Navegación por meses con anécdotas' },
    { key: 'stats', label: '14. Estadísticas Juntos', desc: 'Días, amaneceres, recuerdos y momentos infinitos' },
    { key: 'secretSection', label: '15. Sección Secreta', desc: 'Protegida con palabra clave para desbloquear' },
    { key: 'surprise', label: '16. Sorpresa ("todavía falta algo")', desc: 'Detalle interactivo con confeti' },
    { key: 'lastSurprise', label: '17. Última Sorpresa', desc: 'Revelación final emocional' },
    { key: 'final', label: '18. Despedida Final', desc: 'Fotografía minimalista, frase y firmas' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Layout className="w-4 h-4 text-[#34313A]" />
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
          Visibilidad de Secciones
        </h3>
      </div>
      <p className="text-xs text-[#34313A]/60 font-sans-custom">
        Activa o desactiva cualquier sección de la página según lo que quieras mostrar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sectionsList.map((sec) => {
          const isVisible = sectionVisibility[sec.key] ?? true

          return (
            <div
              key={sec.key}
              onClick={() => toggleSection(sec.key)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                isVisible
                  ? 'bg-white border-[#34313A]/15 shadow-xs'
                  : 'bg-white/40 border-[#34313A]/5 opacity-60'
              }`}
            >
              <div className="pr-4">
                <span className="text-xs font-semibold text-[#34313A] block">
                  {sec.label}
                </span>
                <span className="text-[11px] text-[#34313A]/60 block mt-0.5">
                  {sec.desc}
                </span>
              </div>

              <div
                className={`p-2 rounded-xl transition-colors ${
                  isVisible ? 'bg-[#CDEDDC] text-[#283B32]' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
