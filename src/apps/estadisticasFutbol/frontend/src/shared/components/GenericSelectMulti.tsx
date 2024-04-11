import { useState } from 'react'
import Select from 'react-select'
import { Option } from '../../types/app/page/Filter/option'
import styles from '@/styles/shared/components/select.module.scss'
import { useCustomSelector } from '@/store/connector'

interface GenericSelectMultiProps {
  options: Option[]
  placeholder: string
  max?: number
  optionDefault?: Option
  onChange: (selectedOption: Option[]) => void
}

export default function GenericSelectMulti({
  options,
  placeholder,
  max,
  optionDefault,
  onChange,
}: GenericSelectMultiProps) {
  const [selectedOption, setSelectedOption] = useState<Option[]>(
    optionDefault ? [optionDefault] : []
  )

  const theme = useCustomSelector((state) => state.theme)

  const onChangeSelected = (values: readonly Option[]) => {
    setSelectedOption([...values])
    onChange([...values])
  }

  return (
    <Select
      options={options}
      value={selectedOption}
      placeholder={placeholder}
      isMulti={true}
      onChange={onChangeSelected}
      className={styles[theme]}
      isOptionDisabled={() => (max ? selectedOption.length >= max : false)}
    />
  )
}
