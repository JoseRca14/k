import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import type { SiteConfig } from '../types/config'
import { defaultSiteConfig } from '../config/siteConfig'
import { PALETTE_PRESETS } from '../config/presets'

interface SavedVersion {
  id: string
  name: string
  timestamp: string
  config: SiteConfig
}

interface ConfigContextType {
  config: SiteConfig
  updateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void
  setConfigDirectly: (newConfig: SiteConfig) => void
  applyPreset: (presetId: string) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  saveManual: () => void
  lastSavedTime: string | null
  versions: SavedVersion[]
  saveNamedVersion: (name: string) => void
  restoreVersion: (versionId: string) => void
  deleteVersion: (versionId: string) => void
  exportConfigJson: () => void
  importConfigJson: (jsonString: string) => { success: boolean; error?: string }
  resetToDefault: () => void
  activePreviewMode: 'desktop' | 'mobile'
  setActivePreviewMode: (mode: 'desktop' | 'mobile') => void
  isEntered: boolean
  setIsEntered: (entered: boolean) => void
}

const STORAGE_KEY = 'birthday_app_config_v1'
const VERSIONS_KEY = 'birthday_app_versions_v1'

const ConfigContext = createContext<ConfigContextType | undefined>(undefined)

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial config from localStorage or default
  const [config, setConfigState] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        // Merge with defaults to ensure any new keys exist
        return {
          ...defaultSiteConfig,
          ...parsed,
          theme: { ...defaultSiteConfig.theme, ...parsed.theme },
          personal: { ...defaultSiteConfig.personal, ...parsed.personal },
          music: { ...defaultSiteConfig.music, ...parsed.music },
          letter: { ...defaultSiteConfig.letter, ...parsed.letter },
          sectionVisibility: { ...defaultSiteConfig.sectionVisibility, ...parsed.sectionVisibility },
        }
      }
    } catch (e) {
      console.warn('Error loading config from localStorage', e)
    }
    return defaultSiteConfig
  })

  // History stack for Undo / Redo
  const [history, setHistory] = useState<SiteConfig[]>([config])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Version management
  const [versions, setVersions] = useState<SavedVersion[]>(() => {
    try {
      const saved = localStorage.getItem(VERSIONS_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // fallback
    }
    return [
      {
        id: 'initial',
        name: 'Versión inicial',
        timestamp: new Date().toLocaleDateString(),
        config: defaultSiteConfig,
      },
    ]
  })

  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)
  const [activePreviewMode, setActivePreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [isEntered, setIsEntered] = useState<boolean>(false)

  // Apply CSS Variables to document root whenever theme changes
  useEffect(() => {
    const root = document.documentElement
    const colors = config.theme.colors
    root.style.setProperty('--pastel-pink', colors.pastelPink)
    root.style.setProperty('--pastel-lavender', colors.pastelLavender)
    root.style.setProperty('--pastel-blue', colors.pastelBlue)
    root.style.setProperty('--pastel-mint', colors.pastelMint)
    root.style.setProperty('--pastel-yellow', colors.pastelYellow)
    root.style.setProperty('--pastel-peach', colors.pastelPeach)
    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--text', colors.text)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--secondary', colors.secondary)

    if (config.theme.typography.primaryFont) {
      root.style.setProperty('--font-sans', `'${config.theme.typography.primaryFont}', sans-serif`)
    }
    if (config.theme.typography.secondaryFont) {
      root.style.setProperty('--font-serif', `'${config.theme.typography.secondaryFont}', serif`)
    }

    // Auto-update HTML title
    if (config.personal.recipientName) {
      document.title = `Para Ti, ${config.personal.recipientName} | Feliz Cumpleaños`
    }
  }, [config.theme, config.personal.recipientName])

  // Autosave to localStorage on change (debounce)
  const autosaveTimer = useRef<number | null>(null)
  useEffect(() => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    autosaveTimer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
        setLastSavedTime(new Date().toLocaleTimeString())
      } catch (err) {
        console.error('Autosave failed:', err)
      }
    }, 800)
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current)
    }
  }, [config])

  // Update config with history tracking
  const updateConfig = useCallback((updater: (prev: SiteConfig) => SiteConfig) => {
    setConfigState((prev) => {
      const next = updater(prev)
      setHistory((oldHist) => {
        const sliced = oldHist.slice(0, historyIndex + 1)
        return [...sliced, next]
      })
      setHistoryIndex((prevIdx) => prevIdx + 1)
      return next
    })
  }, [historyIndex])

  const setConfigDirectly = useCallback((newConfig: SiteConfig) => {
    setConfigState(newConfig)
    setHistory((oldHist) => [...oldHist.slice(0, historyIndex + 1), newConfig])
    setHistoryIndex((prevIdx) => prevIdx + 1)
  }, [historyIndex])

  // Apply a color preset
  const applyPreset = useCallback((presetId: string) => {
    const preset = PALETTE_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    updateConfig((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        currentPreset: presetId,
        colors: { ...preset.colors },
      },
    }))
  }, [updateConfig])

  // Undo / Redo
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const undo = useCallback(() => {
    if (!canUndo) return
    const newIdx = historyIndex - 1
    setHistoryIndex(newIdx)
    setConfigState(history[newIdx])
  }, [canUndo, history, historyIndex])

  const redo = useCallback(() => {
    if (!canRedo) return
    const newIdx = historyIndex + 1
    setHistoryIndex(newIdx)
    setConfigState(history[newIdx])
  }, [canRedo, history, historyIndex])

  // Manual save
  const saveManual = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
      setLastSavedTime(new Date().toLocaleTimeString())
    } catch (e) {
      console.error(e)
    }
  }, [config])

  // Save named snapshot version
  const saveNamedVersion = useCallback((name: string) => {
    const newVer: SavedVersion = {
      id: 'ver-' + Date.now(),
      name: name.trim() || `Versión ${versions.length + 1}`,
      timestamp: new Date().toLocaleString(),
      config: JSON.parse(JSON.stringify(config)),
    }
    const updated = [newVer, ...versions]
    setVersions(updated)
    try {
      localStorage.setItem(VERSIONS_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error(e)
    }
  }, [config, versions])

  const restoreVersion = useCallback((versionId: string) => {
    const ver = versions.find((v) => v.id === versionId)
    if (!ver) return
    setConfigDirectly(JSON.parse(JSON.stringify(ver.config)))
  }, [versions, setConfigDirectly])

  const deleteVersion = useCallback((versionId: string) => {
    const filtered = versions.filter((v) => v.id !== versionId)
    setVersions(filtered)
    try {
      localStorage.setItem(VERSIONS_KEY, JSON.stringify(filtered))
    } catch (e) {
      console.error(e)
    }
  }, [versions])

  // Export JSON file
  const exportConfigJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'birthday-config.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }, [config])

  // Import JSON file with validation
  const importConfigJson = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Formato de JSON inválido.' }
      }
      if (!parsed.personal || !parsed.theme) {
        return { success: false, error: 'El archivo no contiene la estructura requerida (faltan campos principales).' }
      }
      const mergedConfig: SiteConfig = {
        ...defaultSiteConfig,
        ...parsed,
        theme: { ...defaultSiteConfig.theme, ...parsed.theme },
        personal: { ...defaultSiteConfig.personal, ...parsed.personal },
        music: { ...defaultSiteConfig.music, ...parsed.music },
        letter: { ...defaultSiteConfig.letter, ...parsed.letter },
        sectionVisibility: { ...defaultSiteConfig.sectionVisibility, ...parsed.sectionVisibility },
      }
      setConfigDirectly(mergedConfig)
      return { success: true }
    } catch {
      return { success: false, error: 'Error al interpretar el archivo JSON.' }
    }
  }, [setConfigDirectly])

  // Reset to default
  const resetToDefault = useCallback(() => {
    setConfigDirectly(defaultSiteConfig)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      //
    }
  }, [setConfigDirectly])

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        setConfigDirectly,
        applyPreset,
        undo,
        redo,
        canUndo,
        canRedo,
        saveManual,
        lastSavedTime,
        versions,
        saveNamedVersion,
        restoreVersion,
        deleteVersion,
        exportConfigJson,
        importConfigJson,
        resetToDefault,
        activePreviewMode,
        setActivePreviewMode,
        isEntered,
        setIsEntered,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (!context) throw new Error('useConfig must be used within a ConfigProvider')
  return context
}
