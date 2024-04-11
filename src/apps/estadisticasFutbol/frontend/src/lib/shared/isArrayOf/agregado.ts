import { Agregado } from '@/types/app/agregado'

export default function isArrayOfAgregados(arr: unknown): arr is Agregado[] {
  if (!Array.isArray(arr)) {
    return false
  }

  return arr.every((element) => {
    return (
      typeof element === 'object' &&
      'id' in element &&
      typeof element.id === 'string'
    )
  })
}
