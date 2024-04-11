import { AggregateRoot } from '../../../../shared/domain/AggregateRoot'
import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { Repository } from '../../../../shared/domain/Repository'

export class Finder<T extends AggregateRoot, P> {
      private listado: Promise<T[]>
      constructor(private repository: Repository<T>) {
            this.listado = this.load()
      }

      async search(toSearch: Partial<any>): Promise<any[]> {
            const listado = await this.listado
            const keysToSearch = Object.keys(toSearch)
            return listado.filter((listadoElement: any) => {
                  return keysToSearch.every((key) => {
                        if (typeof listadoElement[key] === 'object') {
                              return (
                                    listadoElement[key].value.toString() ===
                                    String(toSearch[key])
                              )
                        }
                        return (
                              String(listadoElement[key]) ===
                              String(toSearch[key])
                        )
                  })
            })
      }

      async exist(toSearch: Partial<P>): Promise<boolean> {
            const busqueda = await this.search(toSearch)
            if (busqueda.length === 0) return false
            return true
      }

      async add(element: T): Promise<void> {
            await (await this.listado).push(element)
      }

      async addMany(elements: T[]): Promise<void> {
            const listado = await this.listado
            elements.forEach((element) => {
                  listado.push(element)
            })
      }

      private load(): Promise<any[]> {
            return this.repository.matching({} as Criteria)
      }
}
