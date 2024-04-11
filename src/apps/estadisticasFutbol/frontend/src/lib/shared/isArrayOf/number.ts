export default function isArrayOfNumbers(arr: unknown): arr is number[] {
  if (!Array.isArray(arr)) {
    return false
  }

  return arr.every((element) => typeof element === 'number')
}
