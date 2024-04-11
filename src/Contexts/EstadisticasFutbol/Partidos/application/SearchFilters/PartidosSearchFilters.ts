import { Estadisticas } from '../../domain/partidoEstadistica/TipoEstadistica'
import { Eventos } from '../../domain/partidoEvento/TipoEvento'

export type FilterItem = {'label':string, 'value':string}

export type PartidoFiltersItems = {
      eventos:FilterItem[];
      estadisticas:FilterItem[];
}

export class PartidosSearchFilters {
      constructor () {}

      async run (): Promise<PartidoFiltersItems> {
            return {
                  estadisticas: this.formatToOutput(Estadisticas),
                  eventos: this.formatToOutput(Eventos)
            }
      }

      private formatToOutput (enumObject: { [key: string]: string }):FilterItem[] {
            return Object.keys(enumObject).map((key) => ({
                  value: enumObject[key],
                  label: key
            }))
      }
}
