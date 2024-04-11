/*
* Esta función devuelve elementos aleatorios de un array
* @param array El array en el que se buscarán los elementos a devolver
* @param cantidad El número de elementos que devolverá
* @param copy Si queremos copiar el array o trabajar sobre la referencia ya que cada elemento devuelto será eliminado del array
* @returns Un array con elementos aleatorios
*/
export function randomArrayElements<T> (array: T[], cantidad: number, copy:boolean = true): T[] {
      let elementosAleatorios = array
      if (copy) elementosAleatorios = array.slice() // copia el array original para no modificarlo
      const elementosSeleccionados = []

      for (let i = 0; i < cantidad; i++) {
            const indiceAleatorio = Math.floor(Math.random() * elementosAleatorios.length)
            const elementoAleatorio = elementosAleatorios[indiceAleatorio]
            elementosSeleccionados.push(elementoAleatorio)
            elementosAleatorios.splice(indiceAleatorio, 1) // elimina el elemento seleccionado del array para no volver a seleccionarlo
      }

      return elementosSeleccionados
}
