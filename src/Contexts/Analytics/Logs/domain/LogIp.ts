import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject'
import { LogIpIncorrectFormat } from './errors/LogIpIncorrectFormat'

export class LogIp extends StringValueObject {
      constructor(value: string) {
            super(value)
            this.validarIP(value)
      }

      private validarIP(ip: string): void {
            // Expresión regular para validar una dirección IP (IPv4 o IPv6)
            const regexIPv4 =
                  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            const regexIPv6 = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i
            if (!(regexIPv4.test(ip) || regexIPv6.test(ip))) {
                  throw new LogIpIncorrectFormat()
            }
      }
}
