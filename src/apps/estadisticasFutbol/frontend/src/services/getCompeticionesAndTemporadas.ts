import axios, { AxiosResponse } from 'axios'
import { Option } from '@/types/app/page/Filter/option'

export async function getCompeticionesAndTemporadas(): Promise<{
  competiciones: Option[]
  temporadas: Record<string, number[]>
}> {
  try {
    const params: { filters: any[] } = {
      filters: [
        { type: 'group', field: 'temporada' },
        { type: 'group', field: 'competicion' },
      ],
    }
    const url = process.env.NEXT_PUBLIC_API_ADDRESS + '/partidos/'
    const response: AxiosResponse = await axios.get(url, {
      params,
    })
    const result: {
      competiciones: Option[]
      temporadas: Record<string, number[]>
    } = {
      competiciones: [],
      temporadas: {},
    }

    response.data.forEach(
      (item: { id: { temporada: number; competicion: string } }) => {
        const { temporada, competicion } = item.id

        if (!result.temporadas[competicion]) {
          result.temporadas[competicion] = [temporada]
          result.competiciones.push({ value: competicion, label: competicion })
        } else {
          result.temporadas[competicion].push(temporada)
        }
      }
    )
    return result
  } catch (error) {
    throw new Error('error fetching data')
  }
}
