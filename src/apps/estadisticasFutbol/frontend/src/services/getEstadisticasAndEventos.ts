import { eventosAcumulados } from '@/config/domain/partido/eventosAcumulated'
import {
  OptionEstadisticas,
  OptionEventos,
} from '@/types/app/page/Filter/option'

/*export async function getEstadisticasAndEventos(): Promise<{
  estadisticas: OptionEstadisticas[]
  eventos: OptionEventos[]
}> {*/
export async function getEstadisticasAndEventos() {
  /*try {
    const url = process.env.NEXT_PUBLIC_API_ADDRESS + '/partidos/filters'
    const response: AxiosResponse = await axios.get(url)*/
  data.eventos.unshift(...eventosAcumulados)
  return data
  /*} catch (error) {
    throw new Error('error fetching data')
  }*/
}

const data = {
  estadisticas: [
    {
      value: 'Posesión del balón',
      label: 'Posesion',
    },
    {
      value: 'Goles',
      label: 'Goles',
    },
    {
      value: 'Tiros a puerta',
      label: 'Tiros-a-puerta',
    },
    {
      value: 'Tiros fuera',
      label: 'Tiro-fuera',
    },
    {
      value: 'Total tiros',
      label: 'Tiros-totales',
    },
    {
      value: 'Paradas del portero',
      label: 'Paradas',
    },
    {
      value: 'Saques de esquina',
      label: 'Corners',
    },
    {
      value: 'Tarjetas Amarillas',
      label: 'Amarillas',
    },
    {
      value: 'Tarjetas Rojas',
      label: 'Rojas',
    },
    {
      value: 'Fueras de juego',
      label: 'Offsides',
    },
    {
      value: 'Sustituciones',
      label: 'Sustituciones',
    },
    {
      value: 'Faltas',
      label: 'Faltas',
    },
    {
      value: 'Asistencias',
      label: 'Asistencias',
    },
    {
      value: 'Tiros al palo',
      label: 'Tiros-al-palo',
    },
    {
      value: 'Lesiones',
      label: 'Lesiones',
    },
    {
      value: 'Penalti cometido',
      label: 'Penaltis-cometidos',
    },
  ],
  eventos: [
    {
      value: 'Gol de ',
      label: 'Gol',
    },
    {
      value: 'Gol de penalti',
      label: 'Gol de penalti',
    },
    {
      value: 'Gol de falta',
      label: 'Gol de falta',
    },
    {
      value: 'Gol de (p.p)',
      label: 'Gol en propia meta',
    },
    {
      value: 'Gol anulado',
      label: 'Gol anulado',
    },
    {
      value: 'Anulado por var',
      label: 'Gol anulado por VAR',
    },
    {
      value: 'Asistencia',
      label: 'Asistencia',
    },
    {
      value: 'T. Amarilla',
      label: 'Amarilla',
    },
    {
      value: 'Tarjeta Roja a ',
      label: 'Roja',
    },
    {
      value: '2a Amarilla y Roja',
      label: 'Roja por segunda amarilla',
    },
    {
      value: 'Tiro al palo',
      label: 'Tiro palo',
    },
    {
      value: 'Entra en el partido',
      label: 'Sustitución-Entrada',
    },
    {
      value: 'Sale del partido',
      label: 'Sustitución-Salida',
    },
    {
      value: 'Penalti cometido',
      label: 'Penalti cometido',
    },
    {
      value: 'Penalti fallado',
      label: 'Penalti fallado',
    },
    {
      value: 'Penalti parado',
      label: 'Penalti parado',
    },
    {
      value: 'Lesionado',
      label: 'Lesionado',
    },
  ],
}
