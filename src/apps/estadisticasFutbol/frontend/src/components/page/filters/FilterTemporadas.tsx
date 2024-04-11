import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericRange from '@/shared/components/GenericRangeInput'
import Loader from '@/shared/components/Loader'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'

export default function FilterTemporadas() {
  const temporadas = useCustomSelector((state) => state.filters.temporadas)
  const filtersSelected = useCustomSelector((state) => state.filtersSelected)
  const dispatch = useCustomDispatch()

  const options =
    filtersSelected.competiciones !== null
      ? temporadas[filtersSelected.competiciones]
      : []

  const handleSelectChange = (selectedTemporada: number) => {
    if (selectedTemporada !== null) {
      dispatch(
        setFiltersSelected({
          key: 'temporadas',
          value: selectedTemporada,
        })
      )
    }
  }
  return (
    <Loader condition={Object.keys(temporadas).length !== 0}>
      <GenericRange
        cabecera="Temporadas"
        values={options}
        defaultValue={filtersSelected.temporadas}
        label={`${filtersSelected.temporadas - 1}/${
          filtersSelected.temporadas
        }`}
        onChange={handleSelectChange}
      />
    </Loader>
  )
}
