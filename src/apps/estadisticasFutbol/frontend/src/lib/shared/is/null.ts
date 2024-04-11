export default function isNull(value: unknown): value is null {
  return typeof value === null
}
