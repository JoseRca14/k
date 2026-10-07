import React from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Lock, Sparkles, Gift, Heart } from 'lucide-react'

export const SecretSurpriseTab: React.FC = () => {
  const { config, updateConfig } = useConfig()
  const { secretSection, surprise, lastSurprise, easterEggs } = config

  const handleSecretChange = (field: string, value: string | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      secretSection: { ...prev.secretSection, [field]: value },
    }))
  }

  const handleSurpriseChange = (field: string, value: string | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      surprise: { ...prev.surprise, [field]: value },
    }))
  }

  const handleLastSurpriseChange = (field: string, value: string | boolean) => {
    updateConfig((prev) => ({
      ...prev,
      lastSurprise: { ...prev.lastSurprise, [field]: value },
    }))
  }

  const handleEggChange = (id: string, field: string, value: string | number) => {
    updateConfig((prev) => ({
      ...prev,
      easterEggs: prev.easterEggs.map((egg) => (egg.id === id ? { ...egg, [field]: value } : egg)),
    }))
  }

  return (
    <div className="space-y-8">
      {/* Secret Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#E88BA7]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Sección Secreta (Protegida con Palabra)
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom">
            <input
              type="checkbox"
              checked={secretSection.enabled}
              onChange={(e) => handleSecretChange('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-[#34313A]"
            />
            <span>Activada</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Palabra Secreta / Clave para Desbloquear
            </label>
            <input
              type="text"
              value={secretSection.secretWord}
              onChange={(e) => handleSecretChange('secretWord', e.target.value)}
              placeholder="siempre"
              className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm font-bold text-[#E88BA7] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Texto del Buscador / Input Placeholder
            </label>
            <input
              type="text"
              value={secretSection.inputPlaceholder}
              onChange={(e) => handleSecretChange('inputPlaceholder', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Título una vez Desbloqueada
          </label>
          <input
            type="text"
            value={secretSection.unlockedTitle}
            onChange={(e) => handleSecretChange('unlockedTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Mensaje Íntimo Desbloqueado
          </label>
          <textarea
            rows={3}
            value={secretSection.unlockedMessage}
            onChange={(e) => handleSecretChange('unlockedMessage', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Foto Desbloqueada (Opcional)
          </label>
          <input
            type="text"
            value={secretSection.unlockedImageUrl || ''}
            onChange={(e) => handleSecretChange('unlockedImageUrl', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>
      </div>

      {/* Surprise Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#529F78]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Sorpresa Interactiva (&quot;todavía falta algo&quot;)
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom">
            <input
              type="checkbox"
              checked={surprise.enabled}
              onChange={(e) => handleSurpriseChange('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-[#34313A]"
            />
            <span>Activada</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Título Teaser
            </label>
            <input
              type="text"
              value={surprise.teaserTitle}
              onChange={(e) => handleSurpriseChange('teaserTitle', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
              Texto del Botón
            </label>
            <input
              type="text"
              value={surprise.buttonText}
              onChange={(e) => handleSurpriseChange('buttonText', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Título al Abrir la Sorpresa
          </label>
          <input
            type="text"
            value={surprise.revealedTitle}
            onChange={(e) => handleSurpriseChange('revealedTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Mensaje Revelado
          </label>
          <textarea
            rows={3}
            value={surprise.revealedMessage}
            onChange={(e) => handleSurpriseChange('revealedMessage', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>
      </div>

      {/* Last Surprise Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#E88BA7]" />
            <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
              Última Sorpresa (&quot;¿Creíste que ya habíamos terminado?&quot;)
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-custom">
            <input
              type="checkbox"
              checked={lastSurprise.enabled}
              onChange={(e) => handleLastSurpriseChange('enabled', e.target.checked)}
              className="w-4 h-4 rounded text-[#34313A]"
            />
            <span>Activada</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Pregunta Teaser
          </label>
          <input
            type="text"
            value={lastSurprise.question}
            onChange={(e) => handleLastSurpriseChange('question', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Título Revelado
          </label>
          <input
            type="text"
            value={lastSurprise.revealedTitle}
            onChange={(e) => handleLastSurpriseChange('revealedTitle', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-mono-custom font-semibold text-[#34313A] mb-1">
            Texto Emocional Final
          </label>
          <textarea
            rows={3}
            value={lastSurprise.revealedText}
            onChange={(e) => handleLastSurpriseChange('revealedText', e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-sm focus:outline-hidden"
          />
        </div>
      </div>

      {/* Easter Eggs list */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#F9E7A8]" />
          <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
            Easter Eggs & Secretos Escondidos
          </h3>
        </div>

        <div className="space-y-4">
          {easterEggs.map((egg) => (
            <div key={egg.id} className="p-4 rounded-xl bg-[#FFF9F1] border border-[#34313A]/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-custom font-bold text-[#34313A]">
                  Trigger: {egg.trigger} ({egg.rewardEmoji})
                </span>
                <span className="text-[11px] font-mono-custom text-[#34313A]/60">
                  Requiere {egg.interactionCount} toques
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Título del Secreto
                </label>
                <input
                  type="text"
                  value={egg.rewardTitle}
                  onChange={(e) => handleEggChange(egg.id, 'rewardTitle', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#34313A]/15 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-custom text-[#34313A]/60 mb-1">
                  Mensaje Secreto
                </label>
                <textarea
                  rows={2}
                  value={egg.rewardMessage}
                  onChange={(e) => handleEggChange(egg.id, 'rewardMessage', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#34313A]/15 text-xs"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
