export interface AggregateMapper{
  fromPrimitives(plainData:any):any;
  toOutput(plainData:any):any;
}
