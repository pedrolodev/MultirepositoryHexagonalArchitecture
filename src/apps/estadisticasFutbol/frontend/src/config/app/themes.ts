import { Themes } from '@/types/app/page/themes'

export const themesList: Themes[] = ['light', 'dark']

export const chartThemes: Record<Themes, string[]> = {
  light: ['rgb(145, 185, 222)', 'rgb(0, 157, 214)', 'rgb(255, 248, 55)'],
  dark: ['rgb(242, 95, 76)', 'rgb(229, 49, 122)', 'rgb(255, 137, 6)'],
}

export const optionsChartThemes: Record<Themes, Record<string, string>> = {
  light: {
    legend: 'rgba(0,0,0,1)',
    gridAxis: 'rgba(0,0,0,0.3)',
    labelAxis: 'rgba(0,0,0,1)',
    tooltipBg: 'rgba(0,0,0,1)',
    tooltip: 'rgba(255,255,255,1)',
  },
  dark: {
    legend: 'rgba(255,255,255,1)',
    gridAxis: 'rgba(255,255,255,0.3)',
    labelAxis: 'rgba(255,255,255,1)',
    tooltipBg: 'rgba(255,255,255,1)',
    tooltip: 'rgba(0,0,0,1)',
  },
}
