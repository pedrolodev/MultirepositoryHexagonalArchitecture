'use client'
import { useState } from 'react'
import Select from 'react-select'
import { Option, OptionNullable } from '../../types/app/page/Filter/option'
import styles from '@/styles/shared/components/select.module.scss'
import { useCustomSelector } from '@/store/connector'

interface GenericSelectProps {
  options: Option[]
  optionDefault: OptionNullable
  onChange: (selectedOption: OptionNullable) => void
  placement?: 'bottom' | 'top'
}

export default function GenericSelect({
  options,
  optionDefault,
  onChange,
  placement = 'top',
}: GenericSelectProps) {
  const [selectedOption, setSelectedOption] =
    useState<OptionNullable>(optionDefault)
  const theme = useCustomSelector((state) => state.theme)

  const handleChange = (selected: OptionNullable) => {
    setSelectedOption(selected)
    onChange(selected)
  }

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      menuPlacement={placement}
      className={styles[theme]}
    />
  )
}
