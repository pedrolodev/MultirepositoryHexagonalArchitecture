import { FiltersAgrupacion } from '@/store/slices/filtersAgrupacion.slice'
import { FiltersSelectedState } from '@/store/slices/filtersSelected.slice'
// import { FiltersSelectedState } from '../../../../../../../../../src/apps/estadisticasFutbol/frontend/src/'

import { Option } from './option'

export type FiltersNames =
  | 'equipos'
  | 'jugadores'
  | 'jornadas'
  | 'competiciones'
  | 'temporadas'
  | 'eventos'
  | 'estadisticas'

export type FiltersAccepted = Pick<
  FiltersSelectedState,
  'equipos' | 'jugadores' | 'jornadas'
>

export type KeysFiltersAccepted = keyof FiltersAccepted

export type FiltersFromRaw = {
  [Key in FiltersAgrupacion]: Key extends 'jornadas' ? number[] : Option[]
}
