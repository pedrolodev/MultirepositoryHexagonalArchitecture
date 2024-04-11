export type EquipoFields = 'id' | 'idAntiguo' | 'name'

export type EquipoPrimitives = {
  [Key in EquipoFields]:string
}

export type EquipoOutput = {
  [Key in EquipoFields]?:string;
} & {
  '_id'? : string
}
