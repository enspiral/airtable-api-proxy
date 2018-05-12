import { either, ifElse, is, identity, map, pipe, replace, trim } from 'ramda'
import { renameKeysWith } from 'ramda-adjunct'
import camelcase from 'camelcase'

// Todo: Test

export const replaceNonAlphaWithSpace = replace(/( ?[^a-zA-Z\d\s:] ?)/g, ' ')
export const tidyKey = pipe(replaceNonAlphaWithSpace, trim, camelcase)

export const cleanKey = renameKeysWith(tidyKey)

export const cleanAndCamelKeys = ifElse(
  either(is(Array), is(Object)),
  pipe(cleanKey, map(a => cleanAndCamelKeys(a))),
  identity
)
