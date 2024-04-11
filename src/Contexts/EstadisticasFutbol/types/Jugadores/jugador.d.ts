export type JugadorFields = 'id' | 'idAntiguo' | 'name'

export type JugadorPrimitives = {
  [Key in JugadorFields]:string
}

export type JugadorOutput = {
  [Key in JugadorFields]?:string;
} & {
  '_id'? : string
}
