export abstract class EnumValueObject<T> {
      readonly value: T

      constructor(value: T, validValues: T[]) {
            this.value = value
            this.checkValueIsValid(value, validValues)
      }

      public checkValueIsValid(value: T, validValues: T[]): void {
            if (!validValues.includes(value)) {
                  this.throwErrorForInvalidValue(value)
            }
      }

      protected abstract throwErrorForInvalidValue(value: T): void
}
