import * as t from 'io-ts'

export const Person = t.interface({
  name: t.string
})

export const Ambassador = t.interface({
  name: t.string,
  description: t.string,
  quote: t.string,
  email: t.string,
  linkedin: t.string,
  twitter: t.string,
  gravatarUrl: t.string,
  imageUrl: t.string,
  ssb: t.string,
  venture: t.string,
  ventureUrl: t.string,
  role: t.string
})

export const ArrayAmbassadors = t.interface({
  ambassadors: t.array(Ambassador)
})

export const Contributor = t.interface({
  id: t.string,
  name: t.string,
  gravatarUrl: t.string,
  quote: t.string
})

export const ArrayContributors = t.interface({
  contributors: t.array(Contributor)
})

export type IPerson = t.TypeOf<typeof Person>
export type IAmbassador = t.TypeOf<typeof Ambassador>
export type IContributor = t.TypeOf<typeof Contributor>