import { ChartTypeRegistry } from 'chart.js'

export type TypeChartStatus = Extract<
  keyof ChartTypeRegistry,
  'bar' | 'line' | 'polarArea'
>
