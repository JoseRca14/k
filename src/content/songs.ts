import type { SongItem } from '../types/config'

export const defaultPlaylist: SongItem[] = [
  {
    id: 'song-1',
    title: '[CANCIÓN 01]',
    artist: '[ARTISTA]',
    description: 'La canción que pusimos en aquel viaje y no dejamos de repetir todo el camino de regreso.',
    coverUrl: '/assets/images/gallery/memory1.jpg',
    audioUrl: '',
  },
  {
    id: 'song-2',
    title: '[CANCIÓN 02]',
    artist: '[ARTISTA]',
    description: 'Me recuerda a las mañanas de domingo preparando desayuno mientras suena de fondo.',
    coverUrl: '/assets/images/gallery/memory2.jpg',
    audioUrl: '',
  },
  {
    id: 'song-3',
    title: '[CANCIÓN 03]',
    artist: '[ARTISTA]',
    description: 'El soundtrack oficial de nuestras mejores noches cantando a medianoche.',
    coverUrl: '/assets/images/gallery/memory3.jpg',
    audioUrl: '',
  },
]
