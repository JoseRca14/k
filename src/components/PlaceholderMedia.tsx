import React, { useState } from 'react'
import { Camera, Sparkles, Image as ImageIcon } from 'lucide-react'
import { assetPath } from '../assets/assetPath'

interface ModernImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt: string
  fallbackText?: string
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide'
  containerClassName?: string
  accentColor?: string
}

export const ModernImage: React.FC<ModernImageProps> = ({
  src,
  alt,
  fallbackText = 'Tu foto aquí',
  aspectRatio = 'landscape',
  containerClassName = '',
  accentColor = '#F7C8D8',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    wide: 'aspect-[16/9]',
  }[aspectRatio]

  // If no src or error loading
  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden rounded-2xl border border-[#34313A]/10 ${aspectClass} ${containerClassName}`}
        style={{
          background: `linear-gradient(135deg, ${accentColor}33 0%, #FFF9F1 100%)`,
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-sm"
          style={{ backgroundColor: `${accentColor}88` }}
        >
          <Camera className="w-6 h-6 text-[#34313A]/70" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#34313A]/80 font-mono-custom mb-1">
          {alt || 'Fotografía'}
        </p>
        <span className="text-[11px] text-[#34313A]/60 max-w-[200px]">
          {fallbackText}
        </span>
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] text-[#34313A]/40 font-mono-custom">
          <Sparkles className="w-3 h-3 text-[#34313A]/40" />
          <span>scrapbook</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${containerClassName}`}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center animate-pulse"
          style={{ backgroundColor: `${accentColor}25` }}
        >
          <ImageIcon className="w-6 h-6 text-[#34313A]/30" />
        </div>
      )}
      <img
        src={assetPath(src)}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        {...props}
      />
    </div>
  )
}
