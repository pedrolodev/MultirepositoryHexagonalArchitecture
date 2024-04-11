export default function numberToTime(totalSegundos: number): string {
      const horas = Math.floor(totalSegundos / 3600)
      const minutos = Math.floor((totalSegundos % 3600) / 60)
      const segundos = totalSegundos % 60

      const formatoHoras = horas < 10 ? `0${horas}` : horas
      const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos
      const formatoSegundos = segundos < 10 ? `0${segundos}` : segundos

      return `${formatoHoras}:${formatoMinutos}:${formatoSegundos}`
}
