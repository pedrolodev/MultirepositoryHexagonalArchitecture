import { AggregateRoot } from './AggregateRoot'

export interface NewableAggregate<T extends AggregateRoot> extends Function {
  new (...args: any[]): T;
}
