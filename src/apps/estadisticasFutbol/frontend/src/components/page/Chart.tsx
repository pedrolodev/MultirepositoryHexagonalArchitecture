'use client'
import { useRef, useEffect } from 'react'
import { Chart as ChartLibrary } from 'chart.js/auto'
import styles from '@/styles/components/page/chart.module.scss'
import { useCustomSelector } from '../../store/connector'
import Loader from '@/shared/components/Loader'
import ButtonsChart from './chart/ButtonsChart'
import groupByFilterAgrupacion from '@/lib/app/page/chart/groupByFilterAgrupacion'
import parseToChart from '@/lib/app/page/chart/parseToChart'
import getChartOptions from '@/lib/app/page/chart/getChartOptions'
import Error from '@/shared/components/Error'

export default function Chart() {
  const { sidebar, chartButton } = useCustomSelector((state) => state.layout)
  const data = useCustomSelector((state) => state.dataFiltered)
  const filters = useCustomSelector((state) => state.filters)
  const theme = useCustomSelector((state) => state.theme)
  const filterAgrupacionSelected = useCustomSelector(
    (state) => state.filtersAgrupacion.selected
  )
  const { eventos, equipos, jugadores, jornadas } = useCustomSelector(
    (state) => state.filtersSelected
  )

  const valuesFilterAgrupationSelected = filters[filterAgrupacionSelected]
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const dataGrouped = groupByFilterAgrupacion(
      data,
      filterAgrupacionSelected,
      valuesFilterAgrupationSelected,
      eventos,
      { equipos, jugadores, jornadas }
    )

    const { labels, datasets } = parseToChart(dataGrouped, theme, chartButton)

    if (chartRef.current) {
      const options = getChartOptions(theme)
      const chart = new ChartLibrary(chartRef.current, {
        type: chartButton,
        data: {
          labels,
          datasets,
        },
        options,
      })

      return () => {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sidebar,
    filterAgrupacionSelected,
    valuesFilterAgrupationSelected,
    data,
    eventos,
    chartButton,
    theme,
  ])

  return (
    <>
      <div className={styles.botones_chart}>
        <ButtonsChart />
      </div>
      <div className={styles.container_chart}>
        <Error msg="Sucedió un error inesperado">
          <Loader
            type="circle"
            condition={
              data.length !== 0 && valuesFilterAgrupationSelected.length !== 0
            }
          >
            <canvas ref={chartRef} />
          </Loader>
        </Error>
      </div>
    </>
  )
}
