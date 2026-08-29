export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // saca tildes/diacríticos
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' ') // colapsa espacios múltiples
}