import type { GalleryPhoto } from '../types/config'

export const defaultGallery: GalleryPhoto[] = [
  {
    id: 'photo-1',
    imageUrl: '/assets/images/gallery/photo1.jpg',
    caption: 'Tú, en tu elemento más auténtico y feliz.',
    orientation: 'vertical',
    tilt: -2,
    tapeColor: 'pink',
  },
  {
    id: 'photo-2',
    imageUrl: '/assets/images/gallery/photo2.jpg',
    caption: 'Aquel atardecer que parecía pintado solo para nosotros.',
    orientation: 'horizontal',
    tilt: 1.5,
    tapeColor: 'mint',
  },
  {
    id: 'photo-3',
    imageUrl: '/assets/images/gallery/photo3.jpg',
    caption: 'Cómplices en cada pequeña travesura.',
    orientation: 'square',
    tilt: -1,
    tapeColor: 'yellow',
  },
  {
    id: 'photo-4',
    imageUrl: '/assets/images/gallery/photo4.jpg',
    caption: 'Foto espontánea favorita de todos los tiempos.',
    orientation: 'vertical',
    tilt: 2.5,
    tapeColor: 'lavender',
  },
  {
    id: 'photo-5',
    imageUrl: '/assets/images/gallery/photo5.jpg',
    caption: 'Un recuerdo que guardo con todo el cariño.',
    orientation: 'horizontal',
    tilt: -1.5,
    tapeColor: 'blue',
  },
  {
    id: 'photo-6',
    imageUrl: '/assets/images/gallery/photo6.jpg',
    caption: 'Esa mirada que siempre me calma.',
    orientation: 'square',
    tilt: 1,
    tapeColor: 'pink',
  },
]
