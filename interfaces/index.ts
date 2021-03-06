// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type tweet = {
  id: number
  created_at: Date
  tweet?: string
  sentiment_score: number
  lang: number
}
