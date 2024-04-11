import { Option } from '@/types/app/page/Filter/option'

export default function isArrayOfOptions(arr: unknown): arr is Option[] {
  if (!Array.isArray(arr)) {
    return false
  }

  return arr.every((element) => {
    return (
      typeof element === 'object' &&
      'value' in element &&
      'label' in element &&
      typeof element.value === 'string' &&
      typeof element.label === 'string'
    )
  })
}
