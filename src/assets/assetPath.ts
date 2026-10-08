export function assetPath(path: string): string {
  if (!path) return ''

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  const base = import.meta.env.BASE_URL

  if (path.startsWith('/')) {
    return `${base}${path.slice(1)}`
  }

  return `${base}${path}`
}