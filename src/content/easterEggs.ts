import type { EasterEggConfig } from '../types/config'

export const defaultEasterEggs: EasterEggConfig[] = [
  {
    id: 'egg-star',
    trigger: 'click-star',
    targetId: 'header-sparkle',
    interactionCount: 3,
    rewardTitle: '¡Encontraste una estrella escondida! ✨',
    rewardMessage: 'Cada vez que mires al cielo acuérdate de que eres mi persona favorita en todo el universo.',
    rewardEmoji: '🌟',
  },
  {
    id: 'egg-photo-tap',
    trigger: 'triple-tap-photo',
    targetId: 'hero-photo',
    interactionCount: 3,
    rewardTitle: '¡Toque secreto desbloqueado! 📸',
    rewardMessage: 'Te amo más de lo que las palabras de esta página pueden explicar.',
    rewardEmoji: '💌',
  },
  {
    id: 'egg-long-press',
    trigger: 'long-press',
    targetId: 'final-badge',
    interactionCount: 1,
    rewardTitle: 'Abrazo digital enviado 🫂',
    rewardMessage: 'Este botón activa un vale por 100 besos y tu comida favorita cuando tú quieras.',
    rewardEmoji: '🍰',
  },
]
