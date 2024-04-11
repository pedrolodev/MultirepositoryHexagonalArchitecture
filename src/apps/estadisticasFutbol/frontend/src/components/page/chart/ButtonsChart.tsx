import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import styles from '@/styles/components/page/chart/typeChartButtons.module.scss'
import { TypeChartStatus } from '@/types/app/page/chart'
import Image from 'next/image'
import { changeChartButton } from '../../../store/slices/layout.slice'

export default function ButtonsChart() {
  const tipos: TypeChartStatus[] = ['bar', 'line', 'polarArea']
  const chartButton = useCustomSelector((state) => state.layout.chartButton)
  const theme = useCustomSelector((state) => state.theme)

  const dispatch = useCustomDispatch()

  const handleOnClick = (selectedType: TypeChartStatus) => {
    dispatch(changeChartButton({ value: selectedType }))
  }

  return (
    <>
      {tipos.map((tipo) => (
        <Image
          onClick={() => handleOnClick(tipo)}
          key={tipo}
          className={`${styles[theme]} ${styles.boton_chart} ${
            chartButton === tipo ? styles.selected : ''
          }`}
          src={`/assets/chart/${tipo}_${theme}.svg`}
          height={30}
          width={30}
          alt={`${tipo} chart button`}
        />
      ))}
    </>
  )
}
