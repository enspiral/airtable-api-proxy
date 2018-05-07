import * as t from 'io-ts'

export const Person = t.interface({
  name: t.string
})

export type IPerson = t.TypeOf<typeof Person>
