import React, { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import type { GalleryPhoto } from '../types/config'
import { ModernImage } from './PlaceholderMedia'

interface LightboxModalProps {
  photos: GalleryPhoto[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  initialIndex,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setIsZoomed(false)
  }, [initialIndex])

  const handleNext = useCallback(() => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const handlePrev = useCallback(() => {
    setIsZoomed(false)
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  // Keyboard controls (Esc, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, handleNext, handlePrev])

  if (!isOpen || photos.length === 0) return null

  const currentPhoto = photos[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Container preventing background click propagation */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="absolute top-2 right-2 sm:-top-12 sm:right-0 z-20 flex items-center gap-2">
          {/* Zoom toggle button */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors cursor-pointer"
            title={isZoomed ? 'Reducir zoom' : 'Aumentar zoom'}
            aria-label="Zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors cursor-pointer"
            title="Cerrar (Esc)"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous navigation button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:-left-16 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
            title="Foto anterior"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main image */}
        <div
          className={`relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 transition-transform duration-300 ${
            isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ModernImage
            src={currentPhoto?.imageUrl}
            alt={currentPhoto?.caption || 'Foto en galería'}
            fallbackText="Fotografía de la galería"
            aspectRatio="landscape"
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
          />
        </div>

        {/* Next navigation button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:-right-16 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-transform hover:scale-110 cursor-pointer"
            title="Foto siguiente"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Caption & index indicator */}
        <div className="mt-4 text-center max-w-lg px-4">
          <p className="text-white text-base sm:text-lg font-sans-custom">
            {currentPhoto?.caption}
          </p>
          <span className="text-white/60 text-xs font-mono-custom mt-1 block">
            {currentIndex + 1} de {photos.length}
          </span>
        </div>
      </div>
    </div>
  )
}
