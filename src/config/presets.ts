import type { ColorPalette } from '../types/config'

export interface PalettePreset {
  id: string
  name: string
  colors: ColorPalette
}

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: 'pastel-mix',
    name: 'Pastel Mix (Predeterminado)',
    colors: {
      pastelPink: '#F7C8D8',
      pastelLavender: '#DCCEF9',
      pastelBlue: '#C9E7F5',
      pastelMint: '#CDEDDC',
      pastelYellow: '#F9E7A8',
      pastelPeach: '#FFD5C2',
      background: '#FFF9F1',
      text: '#34313A',
      accent: '#E88BA7',
      secondary: '#9B86D4',
    },
  },
  {
    id: 'soft-pink',
    name: 'Soft Pink',
    colors: {
      pastelPink: '#F7C8D8',
      pastelLavender: '#F3DCE4',
      pastelBlue: '#FCEEF3',
      pastelMint: '#F9DFE9',
      pastelYellow: '#FFF1E8',
      pastelPeach: '#FFD5C2',
      background: '#FFF9FB',
      text: '#3A2E35',
      accent: '#E67B9A',
      secondary: '#DDA0B5',
    },
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    colors: {
      pastelPink: '#E8DCFC',
      pastelLavender: '#DCCEF9',
      pastelBlue: '#D2DAF8',
      pastelMint: '#E2E8F9',
      pastelYellow: '#F5ECFA',
      pastelPeach: '#E6D3F2',
      background: '#F9F7FD',
      text: '#2F2B3E',
      accent: '#8C6AD6',
      secondary: '#B39FE5',
    },
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    colors: {
      pastelPink: '#D6EBF8',
      pastelLavender: '#CFE4FA',
      pastelBlue: '#C9E7F5',
      pastelMint: '#C6EDEE',
      pastelYellow: '#F9E7A8',
      pastelPeach: '#FDE4DC',
      background: '#F6FAFD',
      text: '#283645',
      accent: '#5E9FC6',
      secondary: '#7CB9E8',
    },
  },
  {
    id: 'mint',
    name: 'Mint & Sage',
    colors: {
      pastelPink: '#E5F6EE',
      pastelLavender: '#DDF4EC',
      pastelBlue: '#CFEFEA',
      pastelMint: '#CDEDDC',
      pastelYellow: '#F4F7DA',
      pastelPeach: '#E8F5E9',
      background: '#F8FDF9',
      text: '#283B32',
      accent: '#529F78',
      secondary: '#76B894',
    },
  },
  {
    id: 'peach',
    name: 'Warm Peach',
    colors: {
      pastelPink: '#FFE0D6',
      pastelLavender: '#FBE2D8',
      pastelBlue: '#FFEADA',
      pastelMint: '#FFE5CE',
      pastelYellow: '#F9E7A8',
      pastelPeach: '#FFD5C2',
      background: '#FFF8F4',
      text: '#3D2F28',
      accent: '#F2886A',
      secondary: '#E69E87',
    },
  },
]
