import { TypeChartStatus } from '@/types/app/page/chart'
import { Themes } from '@/types/app/page/themes'
import getChartColor from './getChartColor'

export default function parseToChart(
  data: Record<string, Record<string, number>>,
  theme: Themes,
  tipo: TypeChartStatus
): {
  labels: string[]
  datasets: { label: string; data: number[] }[]
} {
  const finalObj: {
    labels: string[]
    datasets: { label: string; data: number[] }[]
  } = { labels: [], datasets: [] }

  const sortedData: Record<string, Record<string, number>> = {}

  // Ordenar el segundo nivel de objetos de mayor a menor
  const sortedKeys: string[] = []
  for (const key in data) {
    const subObject = data[key]
    const sortedSubObject = Object.entries(subObject).sort((a, b) => {
      return b[1] - a[1]
    })
    sortedData[key] = Object.fromEntries(sortedSubObject)

    const keys = Object.keys(sortedData[key])
    keys.forEach((key) => {
      if (!sortedKeys.includes(key)) sortedKeys.push(key)
    })
  }

  const finalData: Record<string, Record<string, number>> = Object.entries(
    sortedData
  ).reduce((acc, [key, value]) => {
    const sortedValue: Record<string, number> = {}
    sortedKeys.forEach((sortedKey) => {
      sortedValue[sortedKey] = value[sortedKey] || 0
    })
    return { ...acc, [key]: sortedValue }
  }, {})

  // finalObj.labels.push(...sortedKeys.slice(0, 40))
  Object.entries(finalData).forEach(([key, value], index) => {
    const data = Object.values(value).slice(0, 40)
    const backgroundColor =
      tipo === 'polarArea'
        ? data.map((value, indexD) => getChartColor(theme, indexD, 0.5))
        : getChartColor(theme, index, 0.5)
    const borderColor =
      tipo === 'polarArea'
        ? data.map((value, indexD) => getChartColor(theme, indexD, 1))
        : getChartColor(theme, index, 1)
    const elemento = {
      label: key,
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1,
    }

    if (index === 0) finalObj.labels.push(...Object.keys(value).slice(0, 40))
    finalObj.datasets.push(elemento)
  })

  return finalObj
}
