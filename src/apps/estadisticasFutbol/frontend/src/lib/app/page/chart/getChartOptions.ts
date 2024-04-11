import { chartOptions } from '@/config/app/page/chart/chartOptions'
import { optionsChartThemes } from '@/config/app/themes'
import { Themes } from '@/types/app/page/themes'

export default function getChartOptions(theme: Themes) {
  return {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        labels: {
          ...chartOptions.plugins.legend.labels,
          color: optionsChartThemes[theme].legend,
        },
      },
      tooltip: {
        ...chartOptions.plugins.tooltip,
        bodyColor: optionsChartThemes[theme].tooltip,
        backgroundColor: optionsChartThemes[theme].tooltipBg,
        titleColor: optionsChartThemes[theme].tooltip,
      },
    },
    scales: {
      ...chartOptions.scales,
      x: {
        ...chartOptions.scales.x,
        grid: {
          ...chartOptions.scales.x.grid,
          color: optionsChartThemes[theme].gridAxis,
        },
        ticks: {
          ...chartOptions.scales.x.ticks,
          color: optionsChartThemes[theme].labelAxis,
        },
      },
      y: {
        ...chartOptions.scales.y,
        grid: {
          ...chartOptions.scales.y.grid,
          color: optionsChartThemes[theme].gridAxis,
        },
        ticks: {
          ...chartOptions.scales.y.ticks,
          color: optionsChartThemes[theme].labelAxis,
        },
      },
    },
  }
}
