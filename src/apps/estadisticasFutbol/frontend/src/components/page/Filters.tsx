'use client'
import styles from '@/styles/components/page/filters.module.scss'
import { useEffect } from 'react'
import { useCustomDispatch, useCustomSelector } from '../../store/connector'
import DataLoader from './filters/DataLoader'
import FilterAgrupacion from './filters/FilterAgrupacion'
import FilterCompeticiones from './filters/FilterCompeticiones'
import FilterEquipos from './filters/FilterEquipos'
import FilterEventos from './filters/FilterEventos'
import FilterItem from './filters/FilterItem'
import FilterJornadas from './filters/FilterJornadas'
import FilterJugadores from './filters/FilterJugadores'
import FilterTemporadas from './filters/FilterTemporadas'
import MenuBar from './filters/MenuBar'
import { setFilters } from '../../store/slices/filters.slice'
import getValuesForFiltersFromRaw from '@/lib/app/page/filters/getValuesForFiltersFromRaw'
import { getDataRaw } from '../../services/getDataRaw'

export default function Filters() {
  const sidebar = useCustomSelector((state) => state.layout.sidebar)
  const dataRaw = useCustomSelector((state) => state.dataRaw)
  const dispatch = useCustomDispatch()

  useEffect(() => {
    const { equipos, jornadas, jugadores } = getValuesForFiltersFromRaw(dataRaw)
    dispatch(setFilters({ key: 'equipos', value: equipos }))
    dispatch(setFilters({ key: 'jornadas', value: jornadas }))
    dispatch(setFilters({ key: 'jugadores', value: jugadores }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRaw])

  return (
    <>
      <MenuBar />
      <aside className={`${styles.container} ${styles[sidebar]}`}>
        <FilterItem header="Selección Datos">
          <FilterCompeticiones />
          <FilterTemporadas />
          <DataLoader action={getDataRaw} />
        </FilterItem>
        <FilterItem header="Eventos">
          <FilterEventos />
        </FilterItem>
        <FilterItem header="Agrupación">
          <FilterAgrupacion />
        </FilterItem>
        <FilterItem header="Filtros">
          <FilterJugadores />
          <FilterEquipos />
          <FilterJornadas />
        </FilterItem>
      </aside>
    </>
  )
}
