import { Agregado } from '@/types/app/agregado'

export default function isAgregado(value: unknown): value is Agregado {
  if (value === null) return false

  return (
    typeof value === 'object' && 'id' in value && typeof value.id === 'string'
  )
}
