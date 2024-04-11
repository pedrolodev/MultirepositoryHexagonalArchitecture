import { KeysFiltersAccepted } from '@/types/app/page/Filter'
import { PartidoFields } from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

export const mapFilterToPartidoFields: Record<
  KeysFiltersAccepted,
  PartidoFields[]
> = {
  equipos: ['local', 'visitante'],
  jornadas: ['jornada'],
  jugadores: [
    'equipoLocalTitulares',
    'equipoLocalSuplentes',
    'equipoVisitanteTitulares',
    'equipoVisitanteSuplentes',
  ],
}
