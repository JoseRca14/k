import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export const NavigationNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass-pastel border border-white/80 shadow-md flex items-center gap-4 text-xs font-mono-custom text-[#34313A] animate-fadeIn">
      <a
        href="#hero"
        className="hover:text-[#E88BA7] transition-colors"
      >
        inicio
      </a>
      <span>•</span>
      <a
        href="#historia"
        className="hover:text-[#E88BA7] transition-colors"
      >
        historia
      </a>
      <span>•</span>
      <a
        href="#galeria"
        className="hover:text-[#E88BA7] transition-colors"
      >
        galería
      </a>
      <span>•</span>
      <a
        href="#carta"
        className="hover:text-[#E88BA7] transition-colors"
      >
        carta
      </a>
      <span>•</span>
      <a
        href="#razones"
        className="hover:text-[#E88BA7] transition-colors"
      >
        razones
      </a>
      <span className="text-[#E88BA7]">
        <Sparkles className="w-3 h-3" />
      </span>
    </nav>
  )
}
