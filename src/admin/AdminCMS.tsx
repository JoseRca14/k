import React, { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import {
  Undo2,
  Redo2,
  Save,
  Eye,
  ArrowLeft,
  Sparkles,
  Palette,
  FileText,
  Music,
  Heart,
  Images,
  BookOpen,
  Lock,
  Layout,
  Database,
  Music2,
} from 'lucide-react'
import { GeneralTab } from './tabs/GeneralTab'
import { AppearanceTab } from './tabs/AppearanceTab'
import { MusicAudioTab } from './tabs/MusicAudioTab'
import { MemoriesTab } from './tabs/MemoriesTab'
import { GalleryTab } from './tabs/GalleryTab'
import { LettersTab } from './tabs/LettersTab'
import { ReasonsTab } from './tabs/ReasonsTab'
import { PlaylistTab } from './tabs/PlaylistTab'
import { SecretSurpriseTab } from './tabs/SecretSurpriseTab'
import { SectionsTab } from './tabs/SectionsTab'
import { BackupTab } from './tabs/BackupTab'
import { PreviewPane } from './PreviewPane'

type AdminTab =
  | 'general'
  | 'appearance'
  | 'music'
  | 'memories'
  | 'gallery'
  | 'letters'
  | 'reasons'
  | 'playlist'
  | 'secrets'
  | 'sections'
  | 'backup'

export const AdminCMS: React.FC = () => {
  const {
    undo,
    redo,
    canUndo,
    canRedo,
    saveManual,
    lastSavedTime,
    activePreviewMode,
    setActivePreviewMode,
  } = useConfig()

  const [activeTab, setActiveTab] = useState<AdminTab>('general')
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false)

  const handleManualSave = () => {
    saveManual()
    setSaveSuccessMsg(true)
    setTimeout(() => setSaveSuccessMsg(false), 2000)
  }

  const tabsConfig: Array<{ id: AdminTab; label: string; icon: React.ReactNode }> = [
    { id: 'general', label: 'Contenido General', icon: <FileText className="w-4 h-4" /> },
    { id: 'appearance', label: 'Apariencia & Colores', icon: <Palette className="w-4 h-4" /> },
    { id: 'music', label: 'Música & Audio', icon: <Music className="w-4 h-4" /> },
    { id: 'memories', label: 'Recuerdos (Historia)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'gallery', label: 'Galería Scrapbook', icon: <Images className="w-4 h-4" /> },
    { id: 'letters', label: 'Carta Personal', icon: <Heart className="w-4 h-4" /> },
    { id: 'reasons', label: 'Razones', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'playlist', label: 'Banda Sonora', icon: <Music2 className="w-4 h-4" /> },
    { id: 'secrets', label: 'Secretos & Sorpresas', icon: <Lock className="w-4 h-4" /> },
    { id: 'sections', label: 'Secciones', icon: <Layout className="w-4 h-4" /> },
    { id: 'backup', label: 'Respaldo & Versiones', icon: <Database className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex flex-col font-sans-custom">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#34313A]/10 px-4 py-3 flex items-center justify-between shadow-xs">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF9F1] border border-[#34313A]/15 text-xs font-mono-custom text-[#34313A] hover:bg-[#34313A] hover:text-white transition-all shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la página</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#34313A]/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E88BA7] animate-pulse" />
            <h1 className="text-sm font-bold font-mono-custom text-[#34313A] uppercase tracking-wider">
              Panel Editor / Admin
            </h1>
          </div>
        </div>

        {/* Right: Actions (Undo, Redo, Save, Toggle Preview) */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center bg-[#FFF9F1] rounded-xl border border-[#34313A]/10 p-0.5">
            <button
              onClick={undo}
              disabled={!canUndo}
              className="p-1.5 rounded-lg text-[#34313A] hover:bg-white disabled:opacity-30 cursor-pointer"
              title="Deshacer (Undo)"
              aria-label="Deshacer"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className="p-1.5 rounded-lg text-[#34313A] hover:bg-white disabled:opacity-30 cursor-pointer"
              title="Rehacer (Redo)"
              aria-label="Rehacer"
            >
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Live Preview */}
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-custom border transition-all cursor-pointer ${
              showLivePreview
                ? 'bg-[#34313A] text-white border-[#34313A]'
                : 'bg-white text-[#34313A] border-[#34313A]/15 hover:bg-[#FFF9F1]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showLivePreview ? 'Ocultar vista previa' : 'Ver vista previa'}</span>
          </button>

          {/* Save Status & Button */}
          <div className="flex items-center gap-2">
            {lastSavedTime && (
              <span className="hidden xl:inline text-[11px] font-mono-custom text-[#34313A]/50">
                Guardado: {lastSavedTime}
              </span>
            )}
            <button
              onClick={handleManualSave}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#529F78] text-white text-xs font-mono-custom font-semibold hover:bg-[#438664] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saveSuccessMsg ? '¡Guardado!' : 'Guardar'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar / Tabs Navigation */}
        <nav className="w-full lg:w-64 bg-white border-r border-[#34313A]/10 p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-y-auto">
          {tabsConfig.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono-custom font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#34313A] text-white shadow-xs'
                    : 'text-[#34313A]/70 hover:bg-[#FFF9F1] hover:text-[#34313A]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Center: Active Tab Form Editor */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl mx-auto w-full">
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'appearance' && <AppearanceTab />}
          {activeTab === 'music' && <MusicAudioTab />}
          {activeTab === 'memories' && <MemoriesTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'letters' && <LettersTab />}
          {activeTab === 'reasons' && <ReasonsTab />}
          {activeTab === 'playlist' && <PlaylistTab />}
          {activeTab === 'secrets' && <SecretSurpriseTab />}
          {activeTab === 'sections' && <SectionsTab />}
          {activeTab === 'backup' && <BackupTab />}
        </main>

        {/* Right: Live Preview Pane (Split Screen) */}
        {showLivePreview && (
          <aside className="hidden lg:block w-[460px] xl:w-[540px] 2xl:w-[600px] h-[calc(100vh-57px)] sticky top-[57px]">
            <PreviewPane
              mode={activePreviewMode}
              onModeChange={setActivePreviewMode}
            />
          </aside>
        )}
      </div>
    </div>
  )
}
