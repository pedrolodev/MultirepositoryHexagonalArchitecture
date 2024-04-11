import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericSelectMulti from '@/shared/components/GenericSelectMulti'
import Loader from '@/shared/components/Loader'
import { Option } from '@/types/app/page/Filter/option'
import React from 'react'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'
import Error from '@/shared/components/Error'

export default function FilterEquipos() {
  const equipos = useCustomSelector((state) => state.filters.equipos)
  const dispatch = useCustomDispatch()

  const handleSelectChange = (selectedOption: Option[]) => {
    dispatch(setFiltersSelected({ key: 'equipos', value: selectedOption }))
  }

  const max = 2
  return (
    <Error msg="-">
      <Loader condition={equipos.length !== 0}>
        <GenericSelectMulti
          options={equipos}
          onChange={handleSelectChange}
          placeholder={`Equipos (Máx. ${max})`}
          max={max}
        />
      </Loader>
    </Error>
  )
}
