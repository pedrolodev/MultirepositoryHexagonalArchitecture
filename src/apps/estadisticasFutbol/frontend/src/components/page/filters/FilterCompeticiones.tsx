import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericSelect from '@/shared/components/GenericSelect'
import Loader from '@/shared/components/Loader'
import { OptionNullable } from '@/types/app/page/Filter/option'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'

export default function FilterCompeticiones() {
  const { competiciones, temporadas } = useCustomSelector(
    (state) => state.filters
  )

  const dispatch = useCustomDispatch()

  const handleSelectChange = (selectedCompeticion: OptionNullable) => {
    if (selectedCompeticion !== null) {
      dispatch(
        setFiltersSelected({
          key: 'temporadas',
          value: temporadas[selectedCompeticion.value][0],
        })
      )
      dispatch(
        setFiltersSelected({
          key: 'competiciones',
          value: selectedCompeticion.value,
        })
      )
    }
  }

  return (
    <Loader condition={competiciones.length !== 0}>
      <GenericSelect
        options={competiciones}
        optionDefault={competiciones[0]}
        onChange={handleSelectChange}
      />
    </Loader>
  )
}
