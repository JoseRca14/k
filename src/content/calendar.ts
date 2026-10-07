import type { CalendarMonth } from '../types/config'

export const defaultCalendar: CalendarMonth[] = [
  {
    month: 'ENERO',
    memories: [
      {
        title: 'Inicio de año juntos',
        text: 'Empezando con nuevos propósitos y risas compartidas.',
        date: '01 Enero',
        image: '/assets/images/gallery/memory1.jpg',
      },
    ],
  },
  {
    month: 'MARZO',
    memories: [
      {
        title: 'Tarde de postres y lluvia',
        text: 'Comprando donas mientras llovía fuerte afuera.',
        date: '15 Marzo',
        image: '/assets/images/gallery/memory2.jpg',
      },
    ],
  },
  {
    month: 'JUNIO',
    memories: [
      {
        title: 'Escapada de fin de semana',
        text: 'Respirando aire fresco lejos del ruido de la ciudad.',
        date: '20 Junio',
        image: '/assets/images/gallery/memory3.jpg',
      },
    ],
  },
  {
    month: 'AGOSTO',
    memories: [
      {
        title: 'Noche de películas y cobijas',
        text: 'No terminamos de ver la película pero no importó.',
        date: '10 Agosto',
        image: '/assets/images/gallery/memory4.jpg',
      },
    ],
  },
]

export const defaultStats = {
  startDate: '2023-01-01',
  sunrisesOverride: '',
  memoriesOverride: '',
  customStat1Label: 'risas compartidas',
  customStat1Value: '9,999+',
}
