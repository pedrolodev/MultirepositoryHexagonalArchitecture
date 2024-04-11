import { GroupFilter } from './GroupFilter'
import { LookuparrayFilter } from './LookuparrayFilter'
import { LookupFilter } from './LookupFilter'
import { MatchFilter } from './MatchFilter'

export type FilterCategory =
      | MatchFilter
      | LookupFilter
      | LookuparrayFilter
      | GroupFilter

export type FilterType = 'match' | 'lookup' | 'lookuparray' | 'group'
