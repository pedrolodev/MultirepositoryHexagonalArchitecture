import { NumberMother } from './NumberMother'
export class Repeater {
      static random (callable: Function, iterations: number) {
            return Array(iterations || NumberMother.random(30))
                  .fill({})
                  .map(() => callable())
      }
}
