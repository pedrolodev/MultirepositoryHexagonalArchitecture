import { EventosAcumulated } from '@/types/app/page/Filter/option'
import { EventoLabels } from '../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'

export const mapAcumulatedEventoToEvento: Record<
  EventosAcumulated,
  EventoLabels[]
> = {
  'Total goles': ['Gol de falta', 'Gol de penalti', 'Gol de (p.p)', 'Gol de '],
  'Total rojas': ['Tarjeta Roja a ', '2a Amarilla y Roja'],
}
