import { chain, curry, either, ifElse, is, identity, map, pipe, replace, trim, zipObj } from 'ramda'
import { renameKeysWith } from 'ramda-adjunct'
import camelcase from 'camelcase'
import md5 from 'js-md5'
import regexEmail from 'regex-email'

// Todo: Test

// Sanitise keys and camalCasify
export const replaceNonAlphaWithSpace = replace(/( ?[^a-zA-Z\d\s:] ?)/g, ' ')
export const tidyKey = pipe(replaceNonAlphaWithSpace, trim, camelcase)
export const cleanKey = renameKeysWith(tidyKey)
export const cleanAndCamelKeys = ifElse(
  either(is(Array), is(Object)),
  pipe(cleanKey, map(a => cleanAndCamelKeys(a))),
  identity
)

// Compute gravatar url from valid email - if invalid returns {}
const isEmail = (email) => regexEmail.test(email)
export const computeGravatarUrl = email => {
  return {
    gravatarUrl: isEmail(email)
      ? `https://www.gravatar.com/avatar/${md5(email)}?s=200`
      : null
  }
}

// Make an object out of a list, with keys derived form each element
// https://github.com/ramda/ramda/wiki/Cookbook#make-an-object-out-of-a-list-with-keys-derived-form-each-element

export const objFromListWith = curry((fn, list) => chain(zipObj, map(fn))(list))
