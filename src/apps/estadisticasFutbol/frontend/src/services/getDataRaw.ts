'use server'
import axios, { AxiosResponse } from 'axios'
import { PartidoOutput } from '../../../../../Contexts/EstadisticasFutbol/types/Partidos/partido'

const apiAddress = process.env.API_ADDRESS

export async function getDataRaw(
  temporada: number,
  competicion: string
): Promise<PartidoOutput[]> {
  try {
    const params: { filters: any[] } = {
      filters: [
        {
          type: 'match',
          field: 'temporada',
          operator: 'EQUAL',
          value: temporada,
        },
        {
          type: 'match',
          field: 'competicion',
          operator: 'EQUAL',
          value: competicion,
        },
        { type: 'lookup', field: 'local', from: 'Equipos' },
        { type: 'lookup', field: 'visitante', from: 'Equipos' },
        {
          type: 'lookuparray',
          field: 'equipoLocalTitulares',
          from: 'Jugadores',
        },
        {
          type: 'lookuparray',
          field: 'equipoLocalSuplentes',
          from: 'Jugadores',
        },
        {
          type: 'lookuparray',
          field: 'equipoVisitanteTitulares',
          from: 'Jugadores',
        },
        {
          type: 'lookuparray',
          field: 'equipoVisitanteSuplentes',
          from: 'Jugadores',
        },
      ],
    }
    const url = apiAddress + '/partidos'
    const response: AxiosResponse = await axios.get(url, {
      params,
    })
    return response.data
  } catch (error) {
    throw new Error('error fetching data')
  }
}
