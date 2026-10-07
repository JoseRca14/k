import React, { useState } from 'react'
import { useConfig } from '../../context/ConfigContext'
import { Download, Upload, Bookmark, RotateCcw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'

export const BackupTab: React.FC = () => {
  const {
    exportConfigJson,
    importConfigJson,
    versions,
    saveNamedVersion,
    restoreVersion,
    deleteVersion,
    resetToDefault,
  } = useConfig()

  const [versionName, setVersionName] = useState('')
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null)

  const handleSaveSnapshot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!versionName.trim()) return
    saveNamedVersion(versionName.trim())
    setVersionName('')
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const result = importConfigJson(reader.result)
        if (result.success) {
          setImportStatus({ success: true, msg: '¡Configuración importada exitosamente!' })
        } else {
          setImportStatus({ success: false, msg: result.error || 'Error al importar JSON' })
        }
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-8">
      {/* Export & Import */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
          Exportar e Importar Configuración
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom">
          Descarga un archivo <code>birthday-config.json</code> con todos tus datos o sube un respaldo anterior.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={exportConfigJson}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar birthday-config.json</span>
          </button>

          <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-[#34313A] text-xs font-mono-custom hover:bg-white cursor-pointer transition-all shadow-xs">
            <Upload className="w-4 h-4" />
            <span>Importar archivo JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
        </div>

        {importStatus && (
          <div
            className={`p-3 rounded-xl text-xs font-mono-custom flex items-center gap-2 ${
              importStatus.success
                ? 'bg-[#CDEDDC]/80 text-[#283B32]'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {importStatus.success ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{importStatus.msg}</span>
          </div>
        )}
      </div>

      {/* Version Snapshots */}
      <div className="bg-white rounded-2xl p-6 border border-[#34313A]/10 shadow-xs space-y-4">
        <h3 className="text-lg font-bold font-serif-custom text-[#34313A]">
          Historial de Versiones
        </h3>
        <p className="text-xs text-[#34313A]/60 font-sans-custom">
          Guarda capturas de tu proyecto para volver a versiones anteriores en cualquier momento.
        </p>

        <form onSubmit={handleSaveSnapshot} className="flex gap-2">
          <input
            type="text"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            placeholder="Ej: Versión inicial, Versión con fotos..."
            className="flex-1 px-3 py-2 rounded-xl bg-[#FFF9F1] border border-[#34313A]/20 text-xs focus:outline-hidden"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#34313A] text-white text-xs font-mono-custom flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Guardar versión</span>
          </button>
        </form>

        <div className="space-y-2 pt-2">
          {versions.map((ver) => (
            <div
              key={ver.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#FFF9F1] border border-[#34313A]/10"
            >
              <div>
                <span className="text-xs font-semibold text-[#34313A] block">
                  {ver.name}
                </span>
                <span className="text-[10px] font-mono-custom text-[#34313A]/50">
                  {ver.timestamp}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => restoreVersion(ver.id)}
                  className="px-3 py-1 rounded-lg bg-white border border-[#34313A]/15 text-[11px] font-mono-custom hover:bg-[#34313A] hover:text-white transition-all cursor-pointer"
                >
                  Restaurar
                </button>
                {ver.id !== 'initial' && (
                  <button
                    onClick={() => deleteVersion(ver.id)}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                    title="Eliminar versión"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Defaults */}
      <div className="bg-red-50/50 rounded-2xl p-6 border border-red-200/50 space-y-3">
        <h3 className="text-sm font-bold text-red-800">
          Restaurar Valores Predeterminados
        </h3>
        <p className="text-xs text-red-700/80">
          Esto reiniciará todos los textos, imágenes y colores a los valores iniciales de la plantilla.
        </p>
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de reiniciar todo a los valores predeterminados?')) {
              resetToDefault()
            }
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-mono-custom hover:bg-red-700 cursor-pointer transition-colors shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restablecer plantilla inicial</span>
        </button>
      </div>
    </div>
  )
}
