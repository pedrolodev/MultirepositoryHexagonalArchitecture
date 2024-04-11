import { useCustomDispatch, useCustomSelector } from '@/store/connector'
import GenericSelectMulti from '@/shared/components/GenericSelectMulti'
import Loader from '@/shared/components/Loader'
import { Option } from '@/types/app/page/Filter/option'
import React from 'react'
import { setFiltersSelected } from '../../../store/slices/filtersSelected.slice'
import Error from '@/shared/components/Error'

export default function FilterJugadores() {
  const jugadores = useCustomSelector((state) => state.filters.jugadores)

  const dispatch = useCustomDispatch()

  const handleSelectChange = (selectedOption: Option[]) => {
    dispatch(setFiltersSelected({ key: 'jugadores', value: selectedOption }))
  }

  return (
    <Error msg="">
      <Loader condition={jugadores.length !== 0}>
        <GenericSelectMulti
          options={jugadores}
          onChange={handleSelectChange}
          placeholder="Jugadores"
        />
      </Loader>
    </Error>
  )
}
