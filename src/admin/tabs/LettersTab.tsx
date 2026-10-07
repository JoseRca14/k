import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Plus, Trash2, Feather } from 'lucide-react'

export const LettersTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { letter } = config

  const handleLetterFieldChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      letter: {
        ...prev.letter,
        [field]: value,
      },
    }))
  }

  const handleParagraphChange = (index: number, text: string) => {
    updateConfig((prev) => {
      const copy = [...prev.letter.paragraphs]
      copy[index] = text
      return {
        ...prev,
        letter: {
          ...prev.letter,
          paragraphs: copy,
        },
      }
    })
  }

  const handleAddParagraph = () => {
    updateConfig((prev) => ({
      ...prev,
      letter: {
        ...prev.letter,
        paragraphs: [...prev.letter.paragraphs, 'Nuevo párrafo de la carta...'],
      },
    }))
  }

  const handleDeleteParagraph = (index: number) => {
    updateConfig((prev) => ({
      ...prev,
      letter: {
        ...prev.letter,
        paragraphs: prev.letter.paragraphs.filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Feather className="w-4 h-4 text-[#34313A]" />
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
          Editor de Carta Personal
        </h3>
      </div>
      <p className="text-xs text-[#34313A]/60 font-sans-custom">
        Escribe y organiza los párrafos de la carta íntima para ella.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Título
          </label>
          <input
            type="text"
            value={letter.title}
            onChange={(e) => handleLetterFieldChange('title', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Subtítulo
          </label>
          <input
            type="text"
            value={letter.subtitle}
            onChange={(e) => handleLetterFieldChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>
      </div>

      {/* Paragraphs list */}
      <div className="space-y-4 pt-4 border-t border-[#34313A]/10">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A]">
            Párrafos de la Carta ({letter.paragraphs.length})
          </label>

          <button
            onClick={handleAddParagraph}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar párrafo</span>
          </button>
        </div>

        {letter.paragraphs.map((p, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 border border-[#34313A]/10 shadow-xs relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono-custom text-[#34313A]/60">
                Párrafo #{index + 1}
              </span>
              {letter.paragraphs.length > 1 && (
                <button
                  onClick={() => handleDeleteParagraph(index)}
                  className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                  title="Eliminar párrafo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <textarea
              rows={3}
              value={p}
              onChange={(e) => handleParagraphChange(index, e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/15 text-sm font-serif-custom focus:outline-hidden"
            />
          </div>
        ))}
      </div>

      {/* Sign-off & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#34313A]/10">
        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Despedida / Frase de Cierre
          </label>
          <input
            type="text"
            value={letter.signOff}
            onChange={(e) => handleLetterFieldChange('signOff', e.target.value)}
            placeholder="Con todo mi amor,"
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Fecha de la Carta
          </label>
          <input
            type="text"
            value={letter.date}
            onChange={(e) => handleLetterFieldChange('date', e.target.value)}
            placeholder="[FECHA]"
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>
      </div>
    </div>
  )
}
