import { mapFilterToPartidoFields } from '@/config/app/page/filter/mapFilterToPartidoFields'
import isNumber from '@/lib/shared/is/number'
import { FiltersAgrupacion } from '@/store/slices/filtersAgrupacion.slice'
import { FiltersFromRaw } from '@/types/app/page/Filter'
import { PartidoOutput } from '../../../../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

export default function getValuesForFiltersFromRaw(
  partidos: PartidoOutput[]
): FiltersFromRaw {
  const valuesForFilters = partidos.reduce<FiltersFromRaw>(
    (acc, partido) => {
      const filters = Object.keys(
        mapFilterToPartidoFields
      ) as FiltersAgrupacion[]

      filters.forEach((filter) => {
        if (filter === 'jornadas') {
          mapFilterToPartidoFields[filter].forEach((field) => {
            const valueFilter = partido[field]
            if (isNumber(valueFilter)) acc[filter].push(valueFilter)
          })
        } else {
          mapFilterToPartidoFields[filter].forEach((field) => {
            const partidoValue = partido[field]
            if (!Array.isArray(partidoValue)) {
              const value = partidoValue as { id: string; name: string }
              if (
                !acc[filter].find((elemento) => elemento.value === value.id)
              ) {
                acc[filter].push({
                  value: value.id,
                  label: value.name,
                })
              }
            } else {
              partidoValue.forEach((itemPartidoValue) => {
                const value = itemPartidoValue as { id: string; name: string }
                if (
                  !acc[filter].find((elemento) => elemento.value === value.id)
                ) {
                  acc[filter].push({
                    value: value.id,
                    label: value.name,
                  })
                }
              })
            }
          })
        }
      })
      return acc
    },
    { jugadores: [], equipos: [], jornadas: [] }
  )

  return valuesForFilters
}
