import isArrayOfNumbers from '@/lib/shared/isArrayOf/number'
import { Option } from '@/types/app/page/Filter/option'
import isArrayOfOptions from '@/lib/shared/isArrayOf/option'
import isNumber from '@/lib/shared/is/number'
import isAgregado from '@/lib/shared/is/agregado'
import isArrayOfAgregados from '@/lib/shared/isArrayOf/agregado'
import isArrayOfStrings from '@/lib/shared/isArrayOf/string'
import { PartidoOutput } from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'
import { FiltersAccepted, KeysFiltersAccepted } from '@/types/app/page/Filter'
import { mapFilterToPartidoFields } from '@/config/app/page/filter/mapFilterToPartidoFields'

export default function applyFilters(
  partidos: PartidoOutput[],
  filtros: FiltersAccepted
): PartidoOutput[] {
  return partidos.filter((partido) => {
    isFiltersEmpty(filtros)
    return Object.entries(filtros).every(([filtroName, filtroValues]) => {
      if (isFilterEmpty(filtroValues)) return true
      const valuesToSearch = getValuesToSearch(
        filtroName as KeysFiltersAccepted,
        partido
      )
      if (isArrayOfNumbers(filtroValues) && isArrayOfNumbers(valuesToSearch)) {
        if (
          isSomeFilterValueNumberEqualsToSearchedValue(
            filtroValues,
            valuesToSearch
          )
        )
          return true
      }
      if (isArrayOfOptions(filtroValues) && isArrayOfStrings(valuesToSearch)) {
        if (
          isEveryFilterValueOptionEqualsToSearchedValue(
            filtroValues,
            valuesToSearch
          )
        )
          return true
      }
      return false
    })
  })
}

function isFiltersEmpty(filtros: FiltersAccepted): true | void {
  if (Object.values(filtros).every((values) => values.length === 0)) {
    return true
  }
}

function isFilterEmpty(filtro: unknown[]): true | void {
  if (filtro.length === 0) return true
}

/**
 * Esta es una descripción de la función.
 *
 * @param {KeysFiltersAccepted[]} keyFiltro - Los filtros que acepta la herramienta
 * @param {PartidoOutput} partido El objeto donde buscar los datos
 * @returns {number[] | string[]} Busca las jornadas o los id en los campos mapeados
 */
function getValuesToSearch(
  keyFiltro: KeysFiltersAccepted,
  partido: PartidoOutput
): number[] | string[] {
  const jornadas: number[] = []
  const agregados: string[] = []

  mapFilterToPartidoFields[keyFiltro].forEach((field) => {
    const value = partido[field]
    if (isNumber(value)) jornadas.push(value)
    if (isArrayOfAgregados(value))
      value.forEach((value) => agregados.push(value.id))
    if (isAgregado(value)) agregados.push(value.id)
  })

  if (keyFiltro === 'jornadas') return jornadas
  return agregados
}

/**
 * Esta es una descripción de la función.
 *
 * @param {number[]} filtroValues - Las jornadas seleccionadas
 * @param {unknown[]} valuesToSearch El valor de la jornada
 * @returns {boolean} Para buscar si la jornada del partido coincide con alguna de las jornadas seleccionadas
 */
function isSomeFilterValueNumberEqualsToSearchedValue(
  filtroValues: number[],
  valuesToSearch: number[]
): boolean {
  return filtroValues.some((filtroValue) =>
    valuesToSearch.includes(filtroValue)
  )
}

/**
 * Esta es una descripción de la función.
 *
 * @param {Option[]} filtroValues - Los Equipos o Jugadores seleccionados
 * @param {string[]} valuesToSearch Los ids de los Jugadores o Equipos
 * @returns {boolean} Para buscar si todos los equipos y jugadores seleccionados estan en el partido
 */
function isEveryFilterValueOptionEqualsToSearchedValue(
  filtroValues: Option[],
  valuesToSearch: string[]
): boolean {
  return filtroValues.every((filtroValue) => {
    const valueFinder = valuesToSearch.find((valueToSearch) => {
      if (typeof valueToSearch !== 'number') {
        return valueToSearch === filtroValue.value
      }
      return false
    })
    if (valueFinder === undefined) return false
    return true
  })
}
