import { EventosAcumulated } from '@/types/app/page/Filter/option'
import { eventosAcumulados } from '../../../../config/domain/partido/eventosAcumulated'

export function isEventoAcumulado(value: unknown): value is EventosAcumulated {
  if (value === null) return false

  return (
    typeof value === 'string' &&
    eventosAcumulados.map((ea) => String(ea.value)).includes(value)
  )
}
