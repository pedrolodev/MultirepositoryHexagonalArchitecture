import EquipoMongoArranger from '../../../../../test/Contexts/EstadisticasFutbol/Equipos/infraestructure/persistence/mongo/EquipoMongoArranger'
import JugadorMongoArranger from '../../../../../test/Contexts/EstadisticasFutbol/Jugadores/infraestructure/persistence/mongo/JugadorMongoArranger'
import PartidoMongoArranger from '../../../../../test/Contexts/EstadisticasFutbol/Partidos/infraestructure/persistence/mongo/PartidoMongoArranger'
import { MongoEnvironmentArranger } from '../../../../../test/Contexts/shared/infraestructure/persistence/mongo/MongoEnvironmentArranger'
import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerEfTest(container: ContainerBuilder) {
      const efEnvironmentArranger = new Definition(MongoEnvironmentArranger, [
            new Reference('ef.shared.mongoClient')
      ])
      container.setDefinition(
            'ef.shared.environmentArranger',
            efEnvironmentArranger
      )

      const dfPartidosArranger = new Definition(PartidoMongoArranger, [
            new Reference('ef.partido.repository')
      ])
      container.setDefinition('ef.partidos.arranger', dfPartidosArranger)
      const dfEquiposArranger = new Definition(EquipoMongoArranger, [
            new Reference('ef.equipo.repository')
      ])
      container.setDefinition('ef.equipos.arranger', dfEquiposArranger)
      const dfJugadoresArranger = new Definition(JugadorMongoArranger, [
            new Reference('ef.jugador.repository')
      ])
      container.setDefinition('ef.jugadores.arranger', dfJugadoresArranger)
}
