export class Describer {
      static getClassProperties (TypeOfClass: any) {
            const clase = new TypeOfClass()
            const array = Object.getOwnPropertyNames(clase)
            return array
      }
}
