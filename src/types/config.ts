export interface ColorPalette {
  pastelPink: string
  pastelLavender: string
  pastelBlue: string
  pastelMint: string
  pastelYellow: string
  pastelPeach: string
  background: string
  text: string
  accent: string
  secondary: string
}

export interface TypographyConfig {
  primaryFont: string
  secondaryFont: string
  baseFontSize: string
  headingWeight: string
}

export interface MemoryItem {
  id: string
  date: string
  title: string
  description: string
  imageUrl: string
  videoUrl?: string
  audioUrl?: string
  pastelColor: string
  layoutStyle?: 'polaroid' | 'editorial' | 'card' | 'split'
}

export interface GalleryPhoto {
  id: string
  imageUrl: string
  caption: string
  orientation: 'vertical' | 'horizontal' | 'square'
  tilt: number
  tapeColor: 'pink' | 'lavender' | 'mint' | 'yellow' | 'blue'
}

export interface SongItem {
  id: string
  title: string
  artist: string
  description: string
  coverUrl: string
  audioUrl?: string
}

export interface ReasonItem {
  id: string
  number: string
  text: string
  color: string
}

export interface EasterEggConfig {
  id: string
  trigger: 'click-star' | 'triple-tap-photo' | 'long-press' | 'secret-keystroke'
  targetId?: string
  interactionCount: number
  secretWord?: string
  rewardTitle: string
  rewardMessage: string
  rewardImage?: string
  rewardAudio?: string
  rewardEmoji?: string
}

export interface CalendarMonth {
  month: string
  memories: Array<{
    title: string
    text: string
    date: string
    image?: string
  }>
}

export interface SiteConfig {
  personal: {
    recipientName: string
    senderName: string
    birthDate: string
    relationshipStartDate: string
    heroSubtitle: string
    heroBadge: string
    heroImage: string
  }
  intro: {
    greeting: string
    subtitle: string
    buttonText: string
  }
  theme: {
    currentPreset: string
    colors: ColorPalette
    typography: TypographyConfig
  }
  music: {
    backgroundMusicUrl: string
    backgroundMusicTitle: string
    backgroundMusicArtist: string
    autoPlayOnEnter: boolean
    defaultVolume: number
    loop: boolean
  }
  voiceMessage: {
    enabled: boolean
    audioUrl: string
    title: string
    subtitle: string
    duration: string
  }
  video: {
    enabled: boolean
    videoUrl: string
    title: string
    caption: string
    posterUrl: string
  }
  letter: {
    title: string
    subtitle: string
    paragraphs: string[]
    signOff: string
    date: string
  }
  memories: MemoryItem[]
  photoStory: {
    title: string
    subtitle: string
    imageUrl: string
    story: string
    date: string
  }
  gallery: GalleryPhoto[]
  playlist: SongItem[]
  reasons: ReasonItem[]
  rememberPlace: {
    question: string
    blurredImageUrl: string
    revealedTitle: string
    revealedStory: string
    revealedDate: string
  }
  calendar: CalendarMonth[]
  stats: {
    startDate: string
    sunrisesOverride?: string
    memoriesOverride?: string
    customStat1Label?: string
    customStat1Value?: string
  }
  secretSection: {
    enabled: boolean
    prompt: string
    inputPlaceholder: string
    secretWord: string
    unlockedTitle: string
    unlockedMessage: string
    unlockedImageUrl?: string
    unlockedAudioUrl?: string
  }
  easterEggs: EasterEggConfig[]
  surprise: {
    enabled: boolean
    teaserTitle: string
    teaserSubtitle: string
    buttonText: string
    revealedTitle: string
    revealedMessage: string
  }
  lastSurprise: {
    enabled: boolean
    question: string
    revealedTitle: string
    revealedText: string
    revealedPhotoUrl: string
  }
  final: {
    quote: string
    photoUrl: string
    signatureName: string
    recipientName: string
  }
  sectionVisibility: {
    hero: boolean
    counter: boolean
    memories: boolean
    photoStory: boolean
    gallery: boolean
    playlist: boolean
    letter: boolean
    reasons: boolean
    voiceMessage: boolean
    video: boolean
    randomMemory: boolean
    rememberPlace: boolean
    calendar: boolean
    stats: boolean
    secretSection: boolean
    surprise: boolean
    lastSurprise: boolean
    final: boolean
  }
}
