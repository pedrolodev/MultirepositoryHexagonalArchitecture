'use client'
import { useState } from 'react'
import LayoutRangeInput from './layout/LayoutRangeInput'
import styles from '@/styles/shared/components/range.module.scss'
import { useCustomSelector } from '@/store/connector'

interface RangeInputProps {
  values: number[]
  cabecera: string
  onChange: (value: number[]) => void
}

export default function GenericRangeDouble({
  values,
  cabecera,
  onChange,
}: RangeInputProps) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const [lowerValue, setLowerValue] = useState<number>(min)
  const [upperValue, setUpperValue] = useState<number>(max)
  const theme = useCustomSelector((state) => state.theme)

  const generarRango = (min: number, max: number): number[] => {
    const numbers: number[] = []
    for (let i = min; i <= max; i++) {
      numbers.push(i)
    }
    return numbers
  }

  const handleLowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (value <= upperValue) {
      setLowerValue(value)
      onChange(generarRango(value, upperValue))
    }
  }

  const handleUpperChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (value >= lowerValue) {
      setUpperValue(value)
      onChange(generarRango(lowerValue, value))
    }
  }

  return (
    <LayoutRangeInput cabecera={cabecera}>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={lowerValue}
          onChange={handleLowerChange}
          className={styles[theme]}
        />
        <span>{lowerValue}</span>
      </div>
      <div>
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={upperValue}
          onChange={handleUpperChange}
          className={styles[theme]}
        />
        <span>{upperValue}</span>
      </div>
    </LayoutRangeInput>
  )
}
