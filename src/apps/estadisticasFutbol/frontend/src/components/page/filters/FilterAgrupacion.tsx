import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericList from '@/shared/components/GenericList'
import {
  FiltersAgrupacion,
  setFiltersAgrupacion,
} from '../../../store/slices/filtersAgrupacion.slice'

export default function FilterAgrupacion() {
  const options = useCustomSelector((state) => state.filtersAgrupacion.options)
  const dispatch = useCustomDispatch()

  const handleClick = (selected: string) => {
    dispatch(setFiltersAgrupacion(selected as FiltersAgrupacion))
  }

  return <GenericList items={options} onClick={handleClick} />
}
