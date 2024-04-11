import { FiltersAgrupacion } from '@/store/slices/filtersAgrupacion.slice'
import { FiltersSelectedState } from '@/store/slices/filtersSelected.slice'

import isNull from '@/lib/shared/is/null'
import { Option, OptionEventos } from '@/types/app/page/Filter/option'
import {
  Evento,
  PartidoOutput,
} from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import { existsEventoInEventoAcumulado } from '@/lib/app/page/filters/existsEventoInEventoAcumulado'
import {
  EventoLabels,
  EventoValues,
} from '../../../../../../../../Contexts/EstadisticasFutbol/Partidos/domain/partidoEvento/TipoEvento'
import { mapAcumulatedEventoToEvento } from '@/config/domain/partido/mapEventoToAcumulated'
import isArrayOfNumbers from '@/lib/shared/isArrayOf/number'

type EventosPartidosByAgrupation = Record<string, Record<string, number>>

export default function groupByFilterAgrupacion(
  partidos: PartidoOutput[],
  agrupacion: FiltersAgrupacion,
  mapperKeyToValue: Option[] | number[],
  eventos: OptionEventos[],
  filtros: Partial<FiltersSelectedState>
): EventosPartidosByAgrupation {
  const valuesAgrupados: EventosPartidosByAgrupation = {}
  const valuesAgrupadosRenamed: EventosPartidosByAgrupation = {}
  const valuesEventos = eventos.map((ea) => ea.value)
  const {
    equipos: equiposFiltro,
    jugadores: jugadoresFiltro,
    jornadas: jornadasFiltro,
  } = filtros

  valuesEventos.forEach((valueEvento) => {
    valuesAgrupados[valueEvento] = {}
  })

  partidos.forEach((partido) => {
    if (!isNumberInFilterNumber(partido.jornada, jornadasFiltro)) return

    partido.eventos.forEach((evento) => {
      const valueToGroup = mapperAgrupacionToValue(agrupacion, evento, partido)
      if (isNull(valueToGroup)) return
      if (!isStringInFilterOption(evento.equipo, equiposFiltro)) return
      if (!isStringInFilterOption(evento.jugador, jugadoresFiltro)) return

      const isEventoSelected = valuesEventos.includes(
        evento.tipoEvento as EventoValues
      )
      const isFieldEventoAcumuladoSelected = existsEventoInEventoAcumulado(
        valuesEventos,
        evento.tipoEvento as EventoLabels
      )

      if (isFieldEventoAcumuladoSelected) {
        Object.entries(mapAcumulatedEventoToEvento).forEach(
          ([keyAcum, fieldsAcum]) => {
            if (fieldsAcum.includes(evento.tipoEvento as EventoLabels)) {
              if (!(valueToGroup in valuesAgrupados[keyAcum])) {
                valuesAgrupados[keyAcum][valueToGroup] = 0
              }
              valuesAgrupados[keyAcum][valueToGroup] += 1
            }
          }
        )
      }
      if (isEventoSelected) {
        if (!(valueToGroup in valuesAgrupados[evento.tipoEvento])) {
          valuesAgrupados[evento.tipoEvento][valueToGroup] = 0
        }
        valuesAgrupados[evento.tipoEvento][valueToGroup] += 1
      }
    })
  })

  eventos.forEach((evento) => {
    const oldKey = evento.value
    const newKey = evento.label
    valuesAgrupadosRenamed[newKey] = valuesAgrupados[oldKey]
  })
  if (!isArrayOfNumbers(mapperKeyToValue)) {
    const valuesAgrupadosProcesados = Object.entries(
      valuesAgrupadosRenamed
    ).reduce((accTotal, [keyAgrupado, valueAgrupado]) => {
      const dataAgrupacion = Object.entries(valueAgrupado).reduce(
        (acc, [key, value]) => {
          const valueToMap = mapperKeyToValue.find((elementFiltered) => {
            if (elementFiltered.value === key) return elementFiltered
            return false
          })
          if (valueToMap === undefined) return acc
          return { ...acc, [valueToMap.label]: value }
        },
        {} as Record<string, number>
      )
      return { ...accTotal, [keyAgrupado]: dataAgrupacion }
    }, {} as EventosPartidosByAgrupation)

    return valuesAgrupadosProcesados
  }

  return valuesAgrupadosRenamed
}

function mapperAgrupacionToValue(
  agrupacion: FiltersAgrupacion,
  evento: Evento,
  partido: PartidoOutput
): string | null {
  switch (agrupacion) {
    case 'equipos':
      return evento.equipo
    case 'jugadores':
      return evento.jugador
    case 'jornadas':
      return String(partido.jornada)
    default:
      throw new Error(`Agrupación no válida: ${agrupacion}`)
  }
}

function isNumberInFilterNumber(
  toSearch: number,
  filter: number[] | undefined
): boolean {
  if (filter === undefined) return false
  if (filter.length === 0) return true
  if (filter.length !== 0 && filter.includes(toSearch)) return true
  return false
}

function isStringInFilterOption(
  toSearch: string,
  filter: Option[] | undefined
): boolean {
  if (filter === undefined) return false
  if (filter.length === 0) return true
  if (filter.map((f) => f.value).includes(toSearch)) return true
  return false
}
