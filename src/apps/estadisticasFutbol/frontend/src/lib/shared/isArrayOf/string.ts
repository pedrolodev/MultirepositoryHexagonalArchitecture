export default function isArrayOfStrings(arr: unknown): arr is string[] {
  if (!Array.isArray(arr)) {
    return false
  }

  return arr.every((element) => typeof element === 'string')
}
