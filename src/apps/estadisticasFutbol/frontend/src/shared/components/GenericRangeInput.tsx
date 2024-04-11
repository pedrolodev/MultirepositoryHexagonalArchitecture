'use client'
import { ChangeEvent, useState } from 'react'
import LayoutRangeInput from './layout/LayoutRangeInput'
import styles from '@/styles/shared/components/range.module.scss'
import { useCustomSelector } from '@/store/connector'

interface RangeInputProps {
  values: number[]
  defaultValue: number
  cabecera: string
  label: string
  onChange: (value: number) => void
}

export default function GenericRange({
  values,
  defaultValue,
  cabecera,
  label,
  onChange,
}: RangeInputProps) {
  const [selectedOption, setSelectedOption] = useState<number>(defaultValue)
  const theme = useCustomSelector((state) => state.theme)

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Number(event.target.value)
    setSelectedOption(selected)
    onChange(selected)
  }

  return (
    <LayoutRangeInput cabecera={cabecera}>
      <div>
        <input
          type="range"
          value={selectedOption}
          min={Math.min(...values)}
          max={Math.max(...values)}
          onChange={handleRangeChange}
          className={styles[theme]}
        />
        <span>{label}</span>
      </div>
    </LayoutRangeInput>
  )
}
