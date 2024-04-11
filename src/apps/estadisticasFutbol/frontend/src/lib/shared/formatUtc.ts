export default function formatUTCMadrid(
  dateString: string,
  formatString: string
): string {
  const date = new Date(dateString)
  const offset = 120 // Offset en minutos para UTC+2
  const madridOffset = offset + date.getTimezoneOffset()
  const madridTime = date.getTime() + madridOffset * 60000 // Obtener tiempo en la zona horaria de Madrid
  const madridDate = new Date(madridTime)

  const year = madridDate.getFullYear()
  const month = String(madridDate.getMonth() + 1).padStart(2, '0')
  const day = String(madridDate.getDate()).padStart(2, '0')
  const hours = String(madridDate.getHours()).padStart(2, '0')
  const minutes = String(madridDate.getMinutes()).padStart(2, '0')

  const formattedDate = formatString
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)

  return formattedDate
}
