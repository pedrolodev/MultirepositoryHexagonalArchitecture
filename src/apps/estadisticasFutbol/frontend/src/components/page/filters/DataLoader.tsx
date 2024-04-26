import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import { getCompeticionesAndTemporadas } from '@/services/getCompeticionesAndTemporadas'
import { getEstadisticasAndEventos } from '@/services/getEstadisticasAndEventos'
import Loader from '@/shared/components/Loader'
import styles from '@/styles/components/page/filters/dataLoader.module.scss'
import { useEffect } from 'react'
import { setDataFiltered } from '../../../store/slices/dataFiltered.slice'
import { setDataRaw } from '../../../store/slices/dataRaw.slice'
import { setFilters } from '../../../store/slices/filters.slice'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'
import {
  setDisplayInfo,
  setError,
  setLoading,
} from '../../../store/slices/layout.slice'
import applyFilters from '@/lib/app/page/filters/applyFilters'

export default function DataLoader({ action }) {
  const dispatch = useCustomDispatch()
  const { temporadas, competiciones } = useCustomSelector(
    (state) => state.filtersSelected
  )
  const { loading } = useCustomSelector((state) => state.layout)
  const theme = useCustomSelector((state) => state.theme)

  const dataRaw = useCustomSelector((state) => state.dataRaw)
  const { jugadores, equipos, jornadas } = useCustomSelector(
    (state) => state.filtersSelected
  )

  const loadDataRaw = () => {
    dispatch(setDataRaw([]))
    dispatch(setFiltersSelected({ key: 'equipos', value: [] }))
    dispatch(setFiltersSelected({ key: 'jugadores', value: [] }))
    dispatch(setFiltersSelected({ key: 'jornadas', value: [] }))
    dispatch(setLoading(true))
    dispatch(setError(false))
    action(temporadas, competiciones)
      .then((values) => {
        dispatch(setError(false))
        dispatch(setDataRaw(values))
        dispatch(setDataFiltered(values))

        dispatch(
          setDisplayInfo(`${competiciones} ${temporadas - 1}/${temporadas}`)
        )
        dispatch(setLoading(false))
      })
      .catch(() => {
        dispatch(setError(true))
        dispatch(setLoading(false))
      })
  }

  const loadCompeticionesTemporadas = () => {
    getCompeticionesAndTemporadas().then((values) => {
      dispatch(
        setFilters({ key: 'competiciones', value: values.competiciones })
      )
      dispatch(setFilters({ key: 'temporadas', value: values.temporadas }))
    })
  }

  const loadEstadisticasEventos = () => {
    getEstadisticasAndEventos().then((values) => {
      dispatch(
        setFiltersSelected({ key: 'eventos', value: [values.eventos[0]] })
      )
      dispatch(setFilters({ key: 'estadisticas', value: values.estadisticas }))
      dispatch(setFilters({ key: 'eventos', value: values.eventos }))
    })
  }

  const handlerEnter = (e: KeyboardEvent) => e.key === 'Enter' && loadDataRaw()

  useEffect(() => {
    loadDataRaw()
    loadCompeticionesTemporadas()
    loadEstadisticasEventos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const data = applyFilters(dataRaw, { jugadores, equipos, jornadas })
    dispatch(setDataFiltered(data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jugadores, equipos, jornadas])

  useEffect(() => {
    document.addEventListener('keydown', handlerEnter)
    // clean up
    return () => {
      document.removeEventListener('keydown', handlerEnter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [competiciones, temporadas])

  /* const useKeyDown = (handler: (e: KeyboardEvent) => void, deps = []) => {
    useEffect(() => {
      document.addEventListener('keydown', handler)
      // clean up
      return () => {
        document.removeEventListener('keydown', handler)
      }
    }, deps)
  } */

  return (
    <Loader condition={!loading}>
      <div
        onClick={loadDataRaw}
        className={`${styles.container_button} ${styles[theme]}`}
      >
        <span className={`${styles.button}  ${loading ? styles.disabled : ''}`}>
          BUSCAR
        </span>
      </div>
    </Loader>
  )
}
