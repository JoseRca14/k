import React from 'react'
import { useConfig } from '../../context/ConfigContext'

export const GeneralTab: React.FC = () => {
  const { config, updateConfig } = useConfig()

  const handlePersonalChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }))
  }

  const handleIntroChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      intro: {
        ...prev.intro,
        [field]: value,
      },
    }))
  }

  const handleStatsChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Información Principal & Nombres
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          Personaliza los nombres, fechas y mensajes que aparecen en la portada.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Nombre de tu novia
            </label>
            <input
              type="text"
              value={config.personal.recipientName}
              onChange={(e) => handlePersonalChange('recipientName', e.target.value)}
              placeholder="Ej: Sofia o [NOMBRE]"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Tu nombre
            </label>
            <input
              type="text"
              value={config.personal.senderName}
              onChange={(e) => handlePersonalChange('senderName', e.target.value)}
              placeholder="Ej: Ramón o [MI NOMBRE]"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Fecha de Cumpleaños
            </label>
            <input
              type="text"
              value={config.personal.birthDate}
              onChange={(e) => handlePersonalChange('birthDate', e.target.value)}
              placeholder="Ej: 14 de Octubre o [FECHA]"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Fecha de Inicio de Relación (para el contador)
            </label>
            <input
              type="date"
              value={config.personal.relationshipStartDate}
              onChange={(e) => handlePersonalChange('relationshipStartDate', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#34313A]/10">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Pantalla de Entrada (Intro)
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          La primera pantalla que verá antes de presionar el botón de inicio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Saludo
            </label>
            <input
              type="text"
              value={config.intro.greeting}
              onChange={(e) => handleIntroChange('greeting', e.target.value)}
              placeholder="hey."
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              value={config.intro.subtitle}
              onChange={(e) => handleIntroChange('subtitle', e.target.value)}
              placeholder="tengo algo para ti."
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Texto del Botón
            </label>
            <input
              type="text"
              value={config.intro.buttonText}
              onChange={(e) => handleIntroChange('buttonText', e.target.value)}
              placeholder="Entrar →"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#34313A]/10">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Hero & Portada Editorial
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Insignia / Badge Superior
            </label>
            <input
              type="text"
              value={config.personal.heroBadge}
              onChange={(e) => handlePersonalChange('heroBadge', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Frase o Subtítulo del Hero
            </label>
            <textarea
              rows={2}
              value={config.personal.heroSubtitle}
              onChange={(e) => handlePersonalChange('heroSubtitle', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Ruta o URL de la Foto Principal (Hero)
            </label>
            <input
              type="text"
              value={config.personal.heroImage}
              onChange={(e) => handlePersonalChange('heroImage', e.target.value)}
              placeholder="/assets/images/hero.jpg o URL"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#34313A]/20"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-[#34313A]/10">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Estadísticas & Días Juntos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Sobrescribir Amaneceres (Opcional)
            </label>
            <input
              type="text"
              value={config.stats.sunrisesOverride || ''}
              onChange={(e) => handleStatsChange('sunrisesOverride', e.target.value)}
              placeholder="Dejar vacío para calcular automático"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Sobrescribir Recuerdos (Opcional)
            </label>
            <input
              type="text"
              value={config.stats.memoriesOverride || ''}
              onChange={(e) => handleStatsChange('memoriesOverride', e.target.value)}
              placeholder="Ej: 500+ o dejar vacío"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
