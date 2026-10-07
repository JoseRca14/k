import React, { useState } from 'react'
import { Sparkles, Maximize2 } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'
import { LightboxModal } from './LightboxModal'

export const ScrapbookGallerySection: React.FC = () => {
  const { config } = useConfig()
  const { gallery } = config
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  const getTapeClass = (color?: string) => {
    switch (color) {
      case 'mint':
        return 'washi-tape washi-tape-mint'
      case 'yellow':
        return 'washi-tape washi-tape-yellow'
      case 'lavender':
        return 'washi-tape washi-tape-lavender'
      case 'blue':
        return 'washi-tape washi-tape-blue'
      default:
        return 'washi-tape'
    }
  }

  return (
    <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#34313A]/10 text-xs font-mono-custom text-[#34313A] mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E88BA7]" />
          <span>ÁLBUM DIGITAL</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold font-serif-custom text-[#34313A] mb-4">
          Galería de Recuerdos
        </h2>
        <p className="text-base sm:text-lg text-[#34313A]/70 font-sans-custom">
          Un collage de momentos, sonrisas y memorias guardadas en nuestro scrapbook.
        </p>
      </div>

      {/* Asymmetric Modern Scrapbook Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">
        {gallery.map((photo, index) => {
          const tiltDeg = photo.tilt || (index % 2 === 0 ? -1.8 : 2.2)

          return (
            <div
              key={photo.id || index}
              className="relative group cursor-pointer"
              style={{
                transform: `rotate(${tiltDeg}deg)`,
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
              }}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              {/* Pastel Washi Tape */}
              <div className={getTapeClass(photo.tapeColor)} />

              {/* Polaroid Frame */}
              <div className="polaroid-card group-hover:scale-102">
                <div className="relative overflow-hidden rounded-md bg-[#FFF9F1]">
                  <ModernImage
                    src={photo.imageUrl}
                    alt={photo.caption}
                    fallbackText="Recuerdo del álbum"
                    aspectRatio={photo.orientation === 'vertical' ? 'portrait' : photo.orientation === 'horizontal' ? 'landscape' : 'square'}
                    accentColor="var(--pastel-mint)"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover icon */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/80 backdrop-blur-sm text-[#34313A] shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Handwritten-feel / Modern caption */}
                <div className="mt-4 px-1">
                  <p className="text-sm font-sans-custom text-[#34313A]/90 font-medium line-clamp-2">
                    {photo.caption}
                  </p>
                  <span className="text-[11px] font-mono-custom text-[#34313A]/50 block mt-1">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <LightboxModal
          photos={gallery}
          initialIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </section>
  )
}
