import { LogCreator } from '@src/Contexts/Analytics/Logs/application/Create/LogCreate'
import { LogsRepositoryMock } from '../../__mocks__/LogsRepositoryMock'
import { LogMother } from '../../domain/LogMother'
import { LogIpIncorrectFormat } from '@src/Contexts/Analytics/Logs/domain/errors/LogIpIncorrectFormat'

describe('Register User', () => {
      const logRepository = new LogsRepositoryMock()
      const logs = [LogMother.random(), LogMother.random()]
      const log = LogMother.random()
      logRepository.returnOnSearch([...logs])
      const logCreator = new LogCreator(logRepository)

      describe('#Create Log ', () => {
            it('should create a valid Log', async () => {
                  const logPrimitives = log.toPrimitives()
                  await logCreator.run(logPrimitives)
                  logRepository.assertSaveHaveBeenCalledWith(log)
                  logRepository.assertLength(logs.length + 1)
            })

            it('should return LogIpIncorrectFormat Error if ip has a bad format', async () => {
                  const logInvalid = LogMother.random().toPrimitives()
                  logInvalid.ip = '192.168.1.669'
                  await expect(logCreator.run(logInvalid)).rejects.toThrow(
                        LogIpIncorrectFormat
                  )
            })
      })
})
