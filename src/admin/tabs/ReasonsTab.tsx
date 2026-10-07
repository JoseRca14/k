import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Plus, Trash2 } from 'lucide-react'
import type { ReasonItem } from '../../types/config'

export const ReasonsTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { reasons } = config

  const handleAddReason = () => {
    const nextNum = String(reasons.length + 1).padStart(2, '0')
    const pastelColors = ['#F7C8D8', '#DCCEF9', '#C9E7F5', '#CDEDDC', '#F9E7A8', '#FFD5C2']
    const nextColor = pastelColors[reasons.length % pastelColors.length]

    const newReason: ReasonItem = {
      id: 'reason-' + Date.now(),
      number: nextNum,
      text: 'Nueva razón por la que te quiero...',
      color: nextColor,
    }

    updateConfig((prev) => ({
      ...prev,
      reasons: [...prev.reasons, newReason],
    }))
  }

  const handleUpdateReason = (id: string, field: keyof ReasonItem, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      reasons: prev.reasons.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }))
  }

  const handleDeleteReason = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      reasons: prev.reasons.filter((r) => r.id !== id),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Razones por las que te amo ({reasons.length})
          </h3>
          <p className="text-xs text-[#34313A]/60 font-sans-custom">
            Diseño editorial numerado. Agrega tantas razones como quieras.
          </p>
        </div>

        <button
          onClick={handleAddReason}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar razón</span>
        </button>
      </div>

      <div className="space-y-3">
        {reasons.map((reason) => (
          <div
            key={reason.id}
            className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#34313A]/10 shadow-xs"
          >
            {/* Number Input */}
            <input
              type="text"
              value={reason.number}
              onChange={(e) => handleUpdateReason(reason.id, 'number', e.target.value)}
              className="w-12 text-center py-2 rounded-xl font-mono-custom font-bold text-xs"
              style={{ backgroundColor: reason.color }}
            />

            {/* Text Input */}
            <input
              type="text"
              value={reason.text}
              onChange={(e) => handleUpdateReason(reason.id, 'text', e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/15 text-sm font-serif-custom focus:outline-hidden"
            />

            {/* Color Picker */}
            <input
              type="color"
              value={reason.color}
              onChange={(e) => handleUpdateReason(reason.id, 'color', e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-none"
              title="Color de acento"
            />

            {/* Delete button */}
            <button
              onClick={() => handleDeleteReason(reason.id)}
              className="p-2 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
              title="Eliminar razón"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
