import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericRangeDouble from '@/shared/components/GenericRangeDoubleInput'
import Loader from '@/shared/components/Loader'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'
import Error from '@/shared/components/Error'

export default function FilterJornadas() {
  const jornadas = useCustomSelector((state) => state.filters.jornadas)

  const dispatch = useCustomDispatch()

  const handleSelectChange = (selected: number[]) => {
    dispatch(
      setFiltersSelected({
        key: 'jornadas',
        value: selected,
      })
    )
  }
  return (
    <>
      <Error msg="">
        <Loader condition={jornadas.length !== 0}>
          <GenericRangeDouble
            cabecera="Jornadas"
            values={jornadas}
            onChange={handleSelectChange}
          />
        </Loader>
      </Error>
    </>
  )
}
