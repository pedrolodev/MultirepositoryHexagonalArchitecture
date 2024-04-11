import { chartThemes } from '@/config/app/themes'
import rgbToRgba from '@/lib/shared/rgbToRgba'
import { Themes } from '@/types/app/page/themes'

export default function getChartColor(
  theme: Themes,
  index: number,
  opacity: number
): string {
  const chartTheme = chartThemes[theme]
  const reIndex = adjustIndex(index, chartTheme.length)
  const rgbColor = chartTheme[reIndex]
  return rgbToRgba(rgbColor, opacity)
}

function adjustIndex(index: number, chartThemeLength: number): number {
  if (index < chartThemeLength) {
    return index
  }
  return adjustIndex(index - chartThemeLength, chartThemeLength)
}
