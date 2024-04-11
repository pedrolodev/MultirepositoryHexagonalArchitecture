import { eventosAcumulados } from '@/config/domain/partido/eventosAcumulated'
import {
  OptionEstadisticas,
  OptionEventos,
} from '@/types/app/page/Filter/option'
import axios, { AxiosResponse } from 'axios'

export async function getEstadisticasAndEventos(): Promise<{
  estadisticas: OptionEstadisticas[]
  eventos: OptionEventos[]
}> {
  try {
    const url = 'http:192.168.1.74:5001/partidos/filters'
    const response: AxiosResponse = await axios.get(url)
    const data = response.data
    data.eventos.unshift(...eventosAcumulados)
    return data
  } catch (error) {
    throw new Error('error fetching data')
  }
}
