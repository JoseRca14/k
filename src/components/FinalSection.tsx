import React from 'react'
import { Heart } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import { ModernImage } from './PlaceholderMedia'

export const FinalSection: React.FC = () => {
  const { config } = useConfig()
  const { final, personal } = config

  return (
    <footer className="pt-24 pb-32 px-4 md:px-8 max-w-4xl mx-auto text-center">
      {/* Editorial Minimalist Photograph */}
      <div className="max-w-sm mx-auto mb-12">
        <div className="polaroid-card rotate-1 hover:rotate-0 transition-transform">
          <div className="washi-tape washi-tape-lavender" />
          <ModernImage
  src="/assets/images/gallery/foto-final.jpeg"
  alt={personal.recipientName || 'Fotografía final'}
  fallbackText="Fotografía final de nosotros"
  aspectRatio="square"
  accentColor="var(--pastel-pink)"
  className="rounded-lg w-full h-full object-cover"
/>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif-custom italic text-[#34313A] max-w-2xl mx-auto mb-10 leading-snug">
        {final.quote ||
          '“El tiempo pasa volando cuando estoy contigo, pero contigo cada segundo vale la pena.”'}
      </blockquote>

      {/* Names & Heart */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 text-lg sm:text-xl font-serif-custom font-bold text-[#34313A]">
          <span>{personal.recipientName || '[NOMBRE]'}</span>
          <Heart className="w-4 h-4 text-[#E88BA7] fill-[#E88BA7]" />
          <span>{personal.senderName || '[MI NOMBRE]'}</span>
        </div>

        <span className="text-xs font-mono-custom text-[#34313A]/50">
          {personal.birthDate || '[FECHA]'} • Siempre
        </span>
      </div>
    </footer>
  )
}
