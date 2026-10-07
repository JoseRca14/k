import React, { useState, useEffect } from 'react'
import { ConfigProvider, useConfig } from './context/ConfigContext'
import { IntroScreen } from './components/IntroScreen'
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer'
import { NavigationNav } from './components/NavigationNav'
import { BirthdayExperience } from './components/BirthdayExperience'
import { AdminCMS } from './admin/AdminCMS'
import { Settings } from 'lucide-react'

const AppContent: React.FC = () => {
  const { isEntered, setIsEntered } = useConfig()
  const [isAdminRoute, setIsAdminRoute] = useState(false)
  const [autoStartAudio, setAutoStartAudio] = useState(false)

  // Listen to path or hash change to support both /admin and #/admin
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase()
      const hash = window.location.hash.toLowerCase()
      setIsAdminRoute(path.includes('/admin') || hash.includes('admin'))
    }

    checkRoute()
    window.addEventListener('popstate', checkRoute)
    window.addEventListener('hashchange', checkRoute)
    return () => {
      window.removeEventListener('popstate', checkRoute)
      window.removeEventListener('hashchange', checkRoute)
    }
  }, [])

  // If visiting /admin
  if (isAdminRoute) {
    return <AdminCMS />
  }

  // Handle entering from Intro Screen
  const handleEnterExperience = () => {
    setIsEntered(true)
    setAutoStartAudio(true)
  }

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--text)] transition-colors duration-500">
      {/* Intro Screen Overlay (until user clicks Entrar) */}
      {!isEntered && <IntroScreen onEnter={handleEnterExperience} />}

      {/* Floating Modern Navigation */}
      {isEntered && <NavigationNav />}

      {/* Persistent Floating Music Player */}
      <FloatingMusicPlayer autoStartTrigger={autoStartAudio} />

      {/* Main Birthday Scrapbook Experience */}
      <div className={!isEntered ? 'filter blur-sm pointer-events-none' : ''}>
        <BirthdayExperience />
      </div>

      {/* Discrete admin gear icon at the bottom of the page */}
      <div className="py-6 text-center">
        <a
          href="/admin"
          onClick={(e) => {
            e.preventDefault()
            window.location.hash = '#/admin'
            setIsAdminRoute(true)
          }}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono-custom text-[#34313A]/25 hover:text-[#34313A]/70 transition-colors p-2 rounded-lg cursor-pointer"
          title="Panel de Configuración Personal"
          aria-label="Panel de Configuración Personal"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>personalizar experiencia</span>
        </a>
      </div>
    </div>
  )
}

export function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  )
}

export default App
