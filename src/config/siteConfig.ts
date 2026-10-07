import type { SiteConfig } from '../types/config'
import { defaultPersonal, defaultIntro } from '../content/personal'
import { defaultLetter } from '../content/letters'
import { defaultMemories, defaultPhotoStory, defaultRememberPlace } from '../content/memories'
import { defaultReasons } from '../content/reasons'
import { defaultPlaylist } from '../content/songs'
import { defaultGallery } from '../content/gallery'
import { defaultEasterEggs } from '../content/easterEggs'
import { defaultSurprise, defaultLastSurprise, defaultSecretSection, defaultFinal } from '../content/surprises'
import { defaultCalendar, defaultStats } from '../content/calendar'
import { PALETTE_PRESETS } from './presets'

/**
 * CONFIGURACIÓN CENTRAL DEL PROYECTO
 * 
 * Puedes modificar los valores directamente en este archivo con Visual Studio Code,
 * o usar la interfaz visual en /admin.
 */
export const defaultSiteConfig: SiteConfig = {
  personal: defaultPersonal,
  intro: defaultIntro,
  theme: {
    currentPreset: 'pastel-mix',
    colors: PALETTE_PRESETS[0].colors,
    typography: {
      primaryFont: 'Plus Jakarta Sans',
      secondaryFont: 'Playfair Display',
      baseFontSize: '16px',
      headingWeight: '700',
    },
  },
  music: {
    backgroundMusicUrl: '/assets/music/background.mp3',
    backgroundMusicTitle: 'Nuestra Canción Favorita',
    backgroundMusicArtist: '[ARTISTA]',
    autoPlayOnEnter: true,
    defaultVolume: 0.7,
    loop: true,
  },
  voiceMessage: {
    enabled: true,
    audioUrl: '/assets/audio/message.mp3',
    title: 'escucha esto cuando estés sola.',
    subtitle: 'un pequeño audio grabado con mucho cariño solo para tus oídos.',
    duration: '01:24',
  },
  video: {
    enabled: true,
    videoUrl: '/assets/video/memory.mp4',
    title: 'un momento que quiero guardar.',
    caption: 'Porque hay sonrisas y miradas que una sola foto no puede capturar.',
    posterUrl: '/assets/images/gallery/memory1.jpg',
  },
  letter: defaultLetter,
  memories: defaultMemories,
  photoStory: defaultPhotoStory,
  gallery: defaultGallery,
  playlist: defaultPlaylist,
  reasons: defaultReasons,
  rememberPlace: defaultRememberPlace,
  calendar: defaultCalendar,
  stats: defaultStats,
  secretSection: defaultSecretSection,
  easterEggs: defaultEasterEggs,
  surprise: defaultSurprise,
  lastSurprise: defaultLastSurprise,
  final: defaultFinal,
  sectionVisibility: {
    hero: true,
    counter: true,
    memories: true,
    photoStory: true,
    gallery: true,
    playlist: true,
    letter: true,
    reasons: true,
    voiceMessage: true,
    video: true,
    randomMemory: true,
    rememberPlace: true,
    calendar: true,
    stats: true,
    secretSection: true,
    surprise: true,
    lastSurprise: true,
    final: true,
  },
}
