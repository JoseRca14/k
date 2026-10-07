import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Music, Mic, Film, Upload } from 'lucide-react'

export const MusicAudioTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { music, voiceMessage, video } = config

  const handleMusicChange = (field: string, value: string | number | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      music: {
        ...prev.music,
        [field]: value,
      },
    }))
  }

  const handleVoiceChange = (field: string, value: string | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      voiceMessage: {
        ...prev.voiceMessage,
        [field]: value,
      },
    }))
  }

  const handleVideoChange = (field: string, value: string | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        [field]: value,
      },
    }))
  }

  // Handle file input for instant base64 preview or asset reference
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Convert small files to data URL for instant live preview
    if (file.size < 8 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onComplete(reader.result)
        }
      }
      reader.readAsDataURL(file)
    } else {
      // Suggest placing in public folder for large files
      alert(
        `Para archivos grandes (${Math.round(file.size / 1024 / 1024)}MB), colócalos en la carpeta public/assets/ de tu proyecto para mejor rendimiento.`
      )
    }
  }

  return (
    <div className="space-y-8">
      {/* Background Music */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Music className="w-4 h-4 text-[#9B86D4]" />
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Música de Fondo
          </h3>
        </div>
        <p className="text-xs text-[#34313A]/60 font-sans-custom mb-4">
          La canción comenzará a sonar al hacer clic en &quot;Entrar →&quot; (evitando bloqueos de autoplay del navegador).
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
                Título de la Canción
              </label>
              <input
                type="text"
                value={music.backgroundMusicTitle}
                onChange={(e) => handleMusicChange('backgroundMusicTitle', e.target.value)}
                placeholder="Nuestra Canción"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
                Artista
              </label>
              <input
                type="text"
                value={music.backgroundMusicArtist}
                onChange={(e) => handleMusicChange('backgroundMusicArtist', e.target.value)}
                placeholder="Nombre del artista"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Ruta o URL del archivo de audio (.mp3)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={music.backgroundMusicUrl}
                onChange={(e) => handleMusicChange('backgroundMusicUrl', e.target.value)}
                placeholder="/assets/music/background.mp3"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
              <label className="px-4 py-2 rounded-xl bg-white border border-[#34313A]/20 text-xs font-mono-custom text-[#34313A] hover:bg-[#FFF9F1] cursor-pointer flex items-center gap-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Subir archivo</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileUpload(e, (url) => handleMusicChange('backgroundMusicUrl', url))}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom text-[#34313A]">
              <input
                type="checkbox"
                checked={music.autoPlayOnEnter}
                onChange={(e) => handleMusicChange('autoPlayOnEnter', e.target.checked)}
                className="w-4 h-4 rounded text-[#34313A]"
              />
              <span>Iniciar automáticamente al entrar</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom text-[#34313A]">
              <input
                type="checkbox"
                checked={music.loop}
                onChange={(e) => handleMusicChange('loop', e.target.checked)}
                className="w-4 h-4 rounded text-[#34313A]"
              />
              <span>Repetir en bucle (loop)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Voice Message */}
      <div className="pt-6 border-t border-[#34313A]/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#E88BA7]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Nota de Voz Personal
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom">
            <input
              type="checkbox"
              checked={voiceMessage.enabled}
              onChange={(e) => handleVoiceChange('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-[#34313A]"
            />
            <span>Sección Activa</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
                Título
              </label>
              <input
                type="text"
                value={voiceMessage.title}
                onChange={(e) => handleVoiceChange('title', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
                Duración mostrada (ej: 01:24)
              </label>
              <input
                type="text"
                value={voiceMessage.duration}
                onChange={(e) => handleVoiceChange('duration', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Ruta del audio (.mp3, .m4a o subir)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={voiceMessage.audioUrl}
                onChange={(e) => handleVoiceChange('audioUrl', e.target.value)}
                placeholder="/assets/audio/message.mp3"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
              />
              <label className="px-4 py-2 rounded-xl bg-white border border-[#34313A]/20 text-xs font-mono-custom text-[#34313A] hover:bg-[#FFF9F1] cursor-pointer flex items-center gap-1.5 shadow-xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Subir</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileUpload(e, (url) => handleVoiceChange('audioUrl', url))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="pt-6 border-t border-[#34313A]/10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#529F78]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Video Cinematográfico
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom">
            <input
              type="checkbox"
              checked={video.enabled}
              onChange={(e) => handleVideoChange('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-[#34313A]"
            />
            <span>Sección Activa</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Título del Video
            </label>
            <input
              type="text"
              value={video.title}
              onChange={(e) => handleVideoChange('title', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Ruta del Video (.mp4 o URL)
            </label>
            <input
              type="text"
              value={video.videoUrl}
              onChange={(e) => handleVideoChange('videoUrl', e.target.value)}
              placeholder="/assets/video/memory.mp4"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Foto de Portada / Poster del Video
            </label>
            <input
              type="text"
              value={video.posterUrl}
              onChange={(e) => handleVideoChange('posterUrl', e.target.value)}
              placeholder="/assets/images/gallery/memory1.jpg"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
