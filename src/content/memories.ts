import type { MemoryItem } from '../types/config'

export const defaultMemories: MemoryItem[] = [
  {
    id: 'memory-1',
    date: '[FECHA]',
    title: '[PRIMER RECUERDO]',
    description: 'El día en que todo empezó a sentirse diferente y descubrimos lo fácil que era reír juntos durante horas.',
    imageUrl: '/assets/images/gallery/memory1.jpg',
    pastelColor: '#F7C8D8',
    layoutStyle: 'polaroid',
  },
  {
    id: 'memory-2',
    date: '[FECHA]',
    title: '[NUESTRO VIAJE]',
    description: 'Caminando sin rumbo fijo, perdiéndonos y encontrando el mejor café de la ciudad.',
    imageUrl: '/assets/images/gallery/memory2.jpg',
    pastelColor: '#DCCEF9',
    layoutStyle: 'editorial',
  },
  {
    id: 'memory-3',
    date: '[FECHA]',
    title: '[UNA TARDE CUALQUIERA]',
    description: 'Haciendo de un día común y corriente uno de los momentos más bonitos del mes.',
    imageUrl: '/assets/images/gallery/memory3.jpg',
    pastelColor: '#C9E7F5',
    layoutStyle: 'split',
  },
  {
    id: 'memory-4',
    date: '[FECHA]',
    title: '[UN CONCIERTO / CANCIÓN]',
    description: 'Cantando a todo pulmón en el coche sin importar si desafinábamos en cada coro.',
    imageUrl: '/assets/images/gallery/memory4.jpg',
    pastelColor: '#CDEDDC',
    layoutStyle: 'card',
  },
]

export const defaultPhotoStory = {
  title: '¿Te acuerdas de este día?',
  subtitle: 'Una foto, una historia guardada para siempre',
  imageUrl: '/assets/images/gallery/memory1.jpg',
  story: 'Estábamos agotados pero no queríamos que terminara el día. Nos sentamos un momento y tomé esta foto sin que te dieras cuenta. Capturó exactamente la paz que siempre me das.',
  date: '[FECHA]',
}

export const defaultRememberPlace = {
  question: '¿Te acuerdas de este lugar?',
  blurredImageUrl: '/assets/images/gallery/memory2.jpg',
  revealedTitle: 'Aquel rincón secreto',
  revealedStory: 'El día que encontramos este lugar por casualidad mientras buscábamos dónde refugiarnos de la lluvia. Pedimos dos postres y prometimos volver cada año.',
  revealedDate: '[FECHA]',
}
