import { mapAcumulatedEventoToEvento } from '@/config/domain/partido/mapEventoToAcumulated'
import { EventosAcumulated } from '@/types/app/page/Filter/option'
import {
  EventoLabels,
  EventoValues,
} from '../../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'
import { isEventoAcumulado } from './isEventoAcumulated'

export function existsEventoInEventoAcumulado(
  eventos: (EventoValues | EventosAcumulated)[],
  tipoEvento: EventoLabels
): boolean {
  return eventos.some((v) => {
    if (!isEventoAcumulado(v)) return false
    const fields = mapAcumulatedEventoToEvento[v]
    return fields.includes(tipoEvento)
  })
}
