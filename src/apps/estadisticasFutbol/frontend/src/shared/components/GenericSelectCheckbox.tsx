import { ReactElement, useState } from 'react'
import Select, {
  components,
  OptionProps,
  ValueContainerProps,
} from 'react-select'
import { Option as OptionType } from '../../types/app/page/Filter/option'
import styles from '@/styles/shared/components/select.module.scss'
import { useCustomSelector } from '@/store/connector'

type CustomOptionType = OptionType & { onChange: (event: unknown) => void }

const CustomOption = (props: OptionProps<CustomOptionType>): ReactElement => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={props.data.onChange}
        />{' '}
        <label>{props.label}</label>
      </components.Option>
    </div>
  )
}

const CustomValueContainer = (
  props: ValueContainerProps<CustomOptionType>
): ReactElement => {
  return (
    <components.ValueContainer {...props}>
      <span>{props.selectProps.placeholder}</span>
    </components.ValueContainer>
  )
}

type SelectCheckBoxProps = {
  options: CustomOptionType[]
  placeholder: string
  menuPlacement?: 'top' | 'bottom'
}

export default function GenericSelectCheckbox({
  options,
  placeholder,
  menuPlacement = 'top',
}: SelectCheckBoxProps) {
  const [optionSelected, setOptionSelected] =
    useState<CustomOptionType[]>(options)
  const theme = useCustomSelector((state) => state.theme)

  const handleChange = (values: readonly CustomOptionType[]) => {
    setOptionSelected([...values])
  }
  return (
    <Select
      options={options}
      defaultValue={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: CustomOption,
        ValueContainer: CustomValueContainer,
      }}
      onChange={handleChange}
      value={optionSelected}
      menuPlacement={menuPlacement}
      placeholder={placeholder}
      isClearable={false}
      className={styles[theme]}
    />
  )
}
