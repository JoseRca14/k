import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { PALETTE_PRESETS } from '../../config/presets'
import { Palette, Check } from 'lucide-react'

export const AppearanceTab: React.FC = () => {
  const { config, updateConfig, applyPreset } = useConfig()
  const { theme } = config

  const handleColorChange = (key: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        currentPreset: 'custom',
        colors: {
          ...prev.theme.colors,
          [key]: value,
        },
      },
    }))
  }

  const handleTypographyChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        typography: {
          ...prev.theme.typography,
          [field]: value,
        },
      },
    }))
  }

  const colorFields: Array<{ key: keyof typeof theme.colors; label: string }> = [
    { key: 'pastelPink', label: 'Rosa Pastel' },
    { key: 'pastelLavender', label: 'Lavanda' },
    { key: 'pastelBlue', label: 'Azul Cielo' },
    { key: 'pastelMint', label: 'Verde Menta' },
    { key: 'pastelYellow', label: 'Amarillo Mantequilla' },
    { key: 'pastelPeach', label: 'Durazno' },
    { key: 'background', label: 'Fondo General' },
    { key: 'text', label: 'Color de Texto' },
    { key: 'accent', label: 'Acento Principal' },
    { key: 'secondary', label: 'Acento Secundario' },
  ]

  return (
    <div className="space-y-8">
      {/* Presets Selection */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-[#E88BA7]" />
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Paletas Pastel Predefinidas
          </h3>
        </div>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          Selecciona una armonía de colores prediseñada o personaliza cada tono individualmente.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PALETTE_PRESETS.map((preset) => {
            const isSelected = theme.currentPreset === preset.id

            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-[#34313A] bg-white shadow-md'
                    : 'border-[#34313A]/10 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#34313A] truncate">
                    {preset.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#34313A]" />}
                </div>

                {/* Color chips preview */}
                <div className="flex items-center gap-1">
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.colors.pastelPink }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.colors.pastelLavender }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.colors.pastelBlue }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.colors.pastelMint }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10"
                    style={{ backgroundColor: preset.colors.pastelPeach }}
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Custom Color Pickers */}
      <div className="pt-6 border-t border-[#34313A]/10">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Color Pickers Individuales
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          Haz clic en cada círculo para afinar cualquier color con el selector.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {colorFields.map((field) => (
            <div
              key={field.key}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-[#34313A]/10 shadow-xs"
            >
              <div>
                <span className="text-xs font-semibold text-[#34313A] block">
                  {field.label}
                </span>
                <span className="text-[11px] font-mono-custom text-[#34313A]/50">
                  {theme.colors[field.key]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.colors[field.key]}
                  onChange={(e) => handleColorChange(field.key, e.target.value)}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-xs cursor-pointer appearance-none bg-transparent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography settings */}
      <div className="pt-6 border-t border-[#34313A]/10">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A] mb-1">
          Tipografías & Textos
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          Fuentes modernas limpias sin estilos de caligrafía de boda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Tipografía Principal (Sans-serif)
            </label>
            <select
              value={theme.typography.primaryFont}
              onChange={(e) => handleTypographyChange('primaryFont', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Recomendada)</option>
              <option value="Inter">Inter</option>
              <option value="Outfit">Outfit</option>
              <option value="Space Grotesk">Space Grotesk</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Tipografía Editorial para Frases (Serif)
            </label>
            <select
              value={theme.typography.secondaryFont}
              onChange={(e) => handleTypographyChange('secondaryFont', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            >
              <option value="Playfair Display">Playfair Display (Editorial)</option>
              <option value="Newsreader">Newsreader</option>
              <option value="Fraunces">Fraunces</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
