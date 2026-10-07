import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Plus, Trash2, Upload, Sparkles } from 'lucide-react'
import type { GalleryPhoto } from '../../types/config'

export const GalleryTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { gallery } = config

  const handleAddPhoto = () => {
    const newPhoto: GalleryPhoto = {
      id: 'photo-' + Date.now(),
      imageUrl: '/assets/images/gallery/photo1.jpg',
      caption: 'Nueva fotografía de nuestro álbum',
      orientation: 'vertical',
      tilt: 1.5,
      tapeColor: 'pink',
    }
    updateConfig((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newPhoto],
    }))
  }

  const handleUpdatePhoto = (
    id: string,
    field: keyof GalleryPhoto,
    value: string | number
  ) => {
    updateConfig((prev) => ({
      ...prev,
      gallery: prev.gallery.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }))
  }

  const handleDeletePhoto = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((p) => p.id !== id),
    }))
  }

  const handleUploadImage = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleUpdatePhoto(id, 'imageUrl', reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Galería Scrapbook ({gallery.length} fotos)
          </h3>
          <p className="text-xs text-[#34313A]/60 font-sans-custom">
            Organiza las fotos del collage, sus inclinaciones (tilt), cintas adhesivas y descripciones.
          </p>
        </div>

        <button
          onClick={handleAddPhoto}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar fotografía</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gallery.map((photo, index) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl p-4 border border-[#34313A]/10 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#34313A]/10">
              <span className="text-xs font-mono-custom font-semibold text-[#34313A] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
                Foto #{index + 1}
              </span>
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="p-1 rounded-lg hover:bg-red-50 text-red-500 cursor-pointer"
                title="Eliminar foto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                Ruta de la Imagen o Subir
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={photo.imageUrl}
                  onChange={(e) => handleUpdatePhoto(photo.id, 'imageUrl', e.target.value)}
                  placeholder="/assets/images/gallery/photo1.jpg"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-mono-custom"
                />
                <label className="px-3 py-1 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-[11px] font-mono-custom cursor-pointer flex items-center gap-1 hover:bg-white">
                  <Upload className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadImage(photo.id, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                Descripción / Pie de Foto
              </label>
              <input
                type="text"
                value={photo.caption}
                onChange={(e) => handleUpdatePhoto(photo.id, 'caption', e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-mono-custom text-[#34313A]/60 mb-1">
                  Orientación
                </label>
                <select
                  value={photo.orientation}
                  onChange={(e) =>
                    handleUpdatePhoto(
                      photo.id,
                      'orientation',
                      e.target.value as 'vertical' | 'horizontal' | 'square'
                    )
                  }
                  className="w-full px-2 py-1 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                >
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="square">Cuadrada</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono-custom text-[#34313A]/60 mb-1">
                  Inclinación (º)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="-6"
                  max="6"
                  value={photo.tilt}
                  onChange={(e) => handleUpdatePhoto(photo.id, 'tilt', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-custom text-[#34313A]/60 mb-1">
                  Cinta Washi
                </label>
                <select
                  value={photo.tapeColor}
                  onChange={(e) =>
                    handleUpdatePhoto(photo.id, 'tapeColor', e.target.value as any)
                  }
                  className="w-full px-2 py-1 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                >
                  <option value="pink">Rosa</option>
                  <option value="mint">Menta</option>
                  <option value="lavender">Lavanda</option>
                  <option value="yellow">Amarillo</option>
                  <option value="blue">Azul</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
