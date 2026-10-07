import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Plus, Trash2, Music2 } from 'lucide-react'
import type { SongItem } from '../../types/config'

export const PlaylistTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { playlist } = config

  const handleAddSong = () => {
    const newSong: SongItem = {
      id: 'song-' + Date.now(),
      title: '[NUEVA CANCIÓN]',
      artist: '[ARTISTA]',
      description: 'Escribe el recuerdo o significado especial de esta canción.',
      coverUrl: '/assets/images/gallery/memory1.jpg',
      audioUrl: '',
    }
    updateConfig((prev) => ({
      ...prev,
      playlist: [...prev.playlist, newSong],
    }))
  }

  const handleUpdateSong = (id: string, field: keyof SongItem, value: string) => {
    updateConfig((prev) => ({
      ...prev,
      playlist: prev.playlist.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  const handleDeleteSong = (id: string) => {
    updateConfig((prev) => ({
      ...prev,
      playlist: prev.playlist.filter((s) => s.id !== id),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Music2 className="w-4 h-4 text-[#9B86D4]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Nuestra Banda Sonora ({playlist.length} canciones)
            </h3>
          </div>
          <p className="text-xs text-[#34313A]/60 font-sans-custom">
            Agrega las canciones con sus portadas y anécdotas compartidas.
          </p>
        </div>

        <button
          onClick={handleAddSong}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar canción</span>
        </button>
      </div>

      <div className="space-y-4">
        {playlist.map((song, index) => (
          <div
            key={song.id}
            className="bg-white rounded-2xl p-5 border border-[#34313A]/10 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#34313A]/10">
              <span className="text-xs font-mono-custom font-semibold text-[#34313A]">
                Pista #{index + 1}
              </span>
              <button
                onClick={() => handleDeleteSong(song.id)}
                className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                title="Eliminar canción"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Título de la Canción
                </label>
                <input
                  type="text"
                  value={song.title}
                  onChange={(e) => handleUpdateSong(song.id, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Artista
                </label>
                <input
                  type="text"
                  value={song.artist}
                  onChange={(e) => handleUpdateSong(song.id, 'artist', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Portada (Foto / Carátula)
                </label>
                <input
                  type="text"
                  value={song.coverUrl}
                  onChange={(e) => handleUpdateSong(song.id, 'coverUrl', e.target.value)}
                  placeholder="/assets/images/gallery/memory1.jpg"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-mono-custom"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Archivo de Audio (Opcional)
                </label>
                <input
                  type="text"
                  value={song.audioUrl || ''}
                  onChange={(e) => handleUpdateSong(song.id, 'audioUrl', e.target.value)}
                  placeholder="/assets/music/cancion1.mp3"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-mono-custom"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                Recuerdo Asociado / Descripción
              </label>
              <textarea
                rows={2}
                value={song.description}
                onChange={(e) => handleUpdateSong(song.id, 'description', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[#FFF9F1] border border-[#34313A]/15 text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
