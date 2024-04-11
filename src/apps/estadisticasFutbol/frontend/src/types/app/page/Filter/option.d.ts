import {
  EstadisticaLabels,
  EstadisticaValues,
} from '../../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEstadistica/TipoEstadistica'
import {
  EventoLabels,
  EventoValues,
} from '../../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'

export type Option = {
  value: string
  label: string
}

export type OptionNullable = {
  value: string
  label: string
} | null

export type EventosAcumulated = 'Total goles' | 'Total rojas'

export type OptionEventos = {
  [K in keyof Option]: K extends 'value'
    ? EventoValues | EventosAcumulated
    : K extends 'label'
    ? EventoLabels | EventosAcumulated
    : null
}

export type OptionEstadisticas = {
  [K in keyof Option]: K extends 'value'
    ? EstadisticaValues
    : K extends 'label'
    ? EstadisticaLabels
    : null
}
