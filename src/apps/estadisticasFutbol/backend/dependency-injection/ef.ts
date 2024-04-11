import MapperEquipo from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/MapperEquipo'
import TeamFinder from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/domain/services/TeamFinder'
import MongoEquipoRepository from '../../../../../src/Contexts/EstadisticasFutbol/Equipos/infraestructure/persistence/MongoEquipoRepository'
import MapperJugador from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/MapperJugador'
import JugadorFinder from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/domain/services/JugadorFinder'
import MongoJugadorRepository from '../../../../../src/Contexts/EstadisticasFutbol/Jugadores/infraestructure/persistence/MongoJugadorRepository'
import MapperPartido from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/domain/MapperPartido'
import MongoPartidoRepository from '../../../../../src/Contexts/EstadisticasFutbol/Partidos/infraestructure/persistence/MongoPartidoRepository'
import MongoConfigFactory from '../../../../../src/Contexts/EstadisticasFutbol/shared/infraestructure/persistence/mongoConfigFactory'
import MongoClientFactory from '../../../../../src/Contexts/shared/infraestructure/persistence/mongo/MongoClientFactory'

import {
      ContainerBuilder,
      Definition,
      Reference
} from 'node-dependency-injection'

export default function registerEf(container: ContainerBuilder) {
      const dfEfMongoconfigFactory = new Definition()
      dfEfMongoconfigFactory.setFactory(MongoConfigFactory, 'createConfig')
      container.setDefinition('ef.shared.mongoConfig', dfEfMongoconfigFactory)

      const dfEfMongoClientFactory = new Definition()
      dfEfMongoClientFactory.args = [
            'ef',
            new Reference('ef.shared.mongoConfig')
      ]
      dfEfMongoClientFactory.setFactory(MongoClientFactory, 'createClient')
      container.setDefinition('ef.shared.mongoClient', dfEfMongoClientFactory)

      container.register('ef.partido.mapper', MapperPartido)
      const dfRepositoryEfPartido = new Definition(MongoPartidoRepository, [
            new Reference('ef.shared.mongoClient'),
            new Reference('ef.partido.mapper'),
            'Partidos'
      ])
      container.setDefinition('ef.partido.repository', dfRepositoryEfPartido)

      container.register('ef.jugador.mapper', MapperJugador)
      const dfRepositoryEfJugador = new Definition(MongoJugadorRepository, [
            new Reference('ef.shared.mongoClient'),
            new Reference('ef.jugador.mapper'),
            'Jugadores'
      ])
      container.setDefinition('ef.jugador.repository', dfRepositoryEfJugador)

      container.register('ef.equipo.mapper', MapperEquipo)
      const dfRepositoryEfEquipo = new Definition(MongoEquipoRepository, [
            new Reference('ef.shared.mongoClient'),
            new Reference('ef.equipo.mapper'),
            'Equipos'
      ])
      container.setDefinition('ef.equipo.repository', dfRepositoryEfEquipo)

      const dfEquipoServiceSearcher = new Definition(TeamFinder, [
            new Reference('ef.equipo.repository')
      ])
      container.setDefinition(
            'ef.equipo.service.searcher',
            dfEquipoServiceSearcher
      )

      const dfJugadorServiceSearcher = new Definition(JugadorFinder, [
            new Reference('ef.jugador.repository')
      ])
      container.setDefinition(
            'ef.jugador.service.searcher',
            dfJugadorServiceSearcher
      )
}
