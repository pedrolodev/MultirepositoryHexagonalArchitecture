import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericSelectMulti from '@/shared/components/GenericSelectMulti'
import Loader from '@/shared/components/Loader'
import { Option } from '@/types/app/page/Filter/option'
import React from 'react'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'

export default function FilterEventos() {
  const eventos = useCustomSelector((state) => state.filters.eventos)

  const dispatch = useCustomDispatch()

  const handleSelectChange = (selectedOption: Option[]) => {
    dispatch(setFiltersSelected({ key: 'eventos', value: selectedOption }))
  }

  return (
    <Loader condition={eventos.length !== 0}>
      <GenericSelectMulti
        options={eventos}
        optionDefault={eventos[0]}
        placeholder="Eventos"
        onChange={handleSelectChange}
      />
    </Loader>
  )
}
