import React, { useState } from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Plus, Trash2, ArrowUp, ArrowDown, Sparkles } from 'lucide-react'
import type { MemoryItem } from '../../types/config'

export const MemoriesTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { memories, photoStory, rememberPlace } = config

  const [activeSubTab, setActiveSubTab] = useState<'journey' | 'photoStory' | 'remember'>('journey')

  // Add memory
  const handleAddMemory = () => {
    const newMemory: MemoryItem = {
      id: 'mem-' + Date.now(),
      date: '[FECHA]',
      title: 'Nuevo Recuerdo',
      description: 'Escribe aquí la historia de este momento...',
      imageUrl: '/assets/images/gallery/memory1.jpg',
      pastelColor: '#F7C8D8',
      layoutStyle: 'polaroid',
    }
    updateConfig((prev) => ({
      ...prev,
      memories: [...prev.memories, newMemory],
    }))
  }

  // Edit memory field
  const handleUpdateMemory = (id: string, field: keyof MemoryItem, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }))
  }

  // Delete memory
  const handleDeleteMemory = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id),
    }))
  }

  // Move memory up/down
  const handleMoveMemory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= memories.length) return

    updateConfig((prev) => {
      const copy = [...prev.memories]
      const temp = copy[index]
      copy[index] = copy[targetIndex]
      copy[targetIndex] = temp
      return { ...prev, memories: copy }
    })
  }

  // Update Photo Story
  const handlePhotoStoryChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      photoStory: { ...prev.photoStory, [field]: value },
    }))
  }

  // Update Remember Place
  const handleRememberPlaceChange = (field: string, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      rememberPlace: { ...prev.rememberPlace, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Subtab navigation */}
      <div className="flex gap-2 border-b border-[#34313A]/10 pb-3">
        <button
          onClick={() => setActiveSubTab('journey')}
          className={`px-4 py-2 rounded-xl text-xs font-mono-custom font-semibold transition-all cursor-pointer ${
            activeSubTab === 'journey'
              ? 'bg-[#34313A] text-white'
              : 'bg-white text-[#34313A]/70 hover:bg-[#FFF9F1]'
          }`}
        >
          Nuestra Historia ({memories.length})
        </button>
        <button
          onClick={() => setActiveSubTab('photoStory')}
          className={`px-4 py-2 rounded-xl text-xs font-mono-custom font-semibold transition-all cursor-pointer ${
            activeSubTab === 'photoStory'
              ? 'bg-[#34313A] text-white'
              : 'bg-white text-[#34313A]/70 hover:bg-[#FFF9F1]'
          }`}
        >
          Una Foto, Una Historia
        </button>
        <button
          onClick={() => setActiveSubTab('remember')}
          className={`px-4 py-2 rounded-xl text-xs font-mono-custom font-semibold transition-all cursor-pointer ${
            activeSubTab === 'remember'
              ? 'bg-[#34313A] text-white'
              : 'bg-white text-[#34313A]/70 hover:bg-[#FFF9F1]'
          }`}
        >
          ¿Te Acuerdas? (Foto Borrosa)
        </button>
      </div>

      {activeSubTab === 'journey' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
                Recuerdos de Nuestra Historia
              </h3>
              <p className="text-xs text-[#34313A]/60 font-sans-custom">
                Puedes reordenar, cambiar colores pastel y fotos de cada momento.
              </p>
            </div>

            <button
              onClick={handleAddMemory}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar recuerdo</span>
            </button>
          </div>

          <div className="space-y-4">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="bg-white rounded-2xl p-5 border border-[#34313A]/10 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#34313A]/10">
                  <span className="text-xs font-mono-custom font-bold text-[#34313A] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
                    Recuerdo #{index + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveMemory(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                      title="Mover arriba"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMoveMemory(index, 'down')}
                      disabled={index === memories.length - 1}
                      className="p-1.5 rounded-lg hover:bg-black/5 disabled:opacity-30 cursor-pointer"
                      title="Mover abajo"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMemory(memory.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer ml-1"
                      title="Eliminar recuerdo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                      Fecha del Recuerdo
                    </label>
                    <input
                      type="text"
                      value={memory.date}
                      onChange={(e) => handleUpdateMemory(memory.id, 'date', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={memory.title}
                      onChange={(e) => handleUpdateMemory(memory.id, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                      Color de Acento Pastel
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={memory.pastelColor}
                        onChange={(e) => handleUpdateMemory(memory.id, 'pastelColor', e.target.value)}
                        className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-none"
                      />
                      <span className="text-[11px] font-mono-custom text-[#34313A]/60">
                        {memory.pastelColor}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                    Ruta de la Foto o Imagen
                  </label>
                  <input
                    type="text"
                    value={memory.imageUrl}
                    onChange={(e) => handleUpdateMemory(memory.id, 'imageUrl', e.target.value)}
                    placeholder="/assets/images/gallery/memory1.jpg o URL"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                    Descripción / Historia
                  </label>
                  <textarea
                    rows={2}
                    value={memory.description}
                    onChange={(e) => handleUpdateMemory(memory.id, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'photoStory' && (
        <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Una Foto, Una Historia
          </h3>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Título
            </label>
            <input
              type="text"
              value={photoStory.title}
              onChange={(e) => handlePhotoStoryChange('title', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Ruta de la Imagen
            </label>
            <input
              type="text"
              value={photoStory.imageUrl}
              onChange={(e) => handlePhotoStoryChange('imageUrl', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Historia que se revela al hacer clic
            </label>
            <textarea
              rows={4}
              value={photoStory.story}
              onChange={(e) => handlePhotoStoryChange('story', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>
        </div>
      )}

      {activeSubTab === 'remember' && (
        <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            ¿Te Acuerdas de este Lugar? (Foto Borrosa)
          </h3>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Pregunta
            </label>
            <input
              type="text"
              value={rememberPlace.question}
              onChange={(e) => handleRememberPlaceChange('question', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Foto para desenfocar y revelar
            </label>
            <input
              type="text"
              value={rememberPlace.blurredImageUrl}
              onChange={(e) => handleRememberPlaceChange('blurredImageUrl', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Título al revelar
            </label>
            <input
              type="text"
              value={rememberPlace.revealedTitle}
              onChange={(e) => handleRememberPlaceChange('revealedTitle', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Historia revelada
            </label>
            <textarea
              rows={3}
              value={rememberPlace.revealedStory}
              onChange={(e) => handleRememberPlaceChange('revealedStory', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>
        </div>
      )}
    </div>
  )
}
