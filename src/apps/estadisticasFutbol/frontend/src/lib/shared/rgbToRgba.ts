export default function rgbToRgba(rgbColor: string, opacity: number) {
  return rgbColor
    .replace('rgb', 'rgba')
    .replace(')', ', ' + String(opacity) + ')')
}
