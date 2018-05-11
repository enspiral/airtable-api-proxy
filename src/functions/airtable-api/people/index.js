import {
  either,
  flatten,
  ifElse,
  is,
  identity,
  map,
  pluck,
  pipe,
  replace,
  trim
} from 'ramda'
import { spreadProp, renameKeysWith } from 'ramda-adjunct'
import camelcase from 'camelcase'
import base from '../airtable'

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')
export const filterPersonsProfiles = pipe(flatten, getRawJson)

export const flattenPersonsProfile = map(spreadProp('fields'))

export const replaceNonAlphaWithSpace = replace(/( ?[^a-zA-Z\d\s:]? )/g, ' ')
const tidyKey = pipe(replaceNonAlphaWithSpace, trim, camelcase)

export const cleanKey = renameKeysWith(tidyKey)

export const cleanAndCamelKeys = ifElse(
  either(is(Array), is(Object)),
  pipe(cleanKey, map(a => cleanAndCamelKeys(a))),
  identity
)

// Driver code
export function GetPersons () {
  return GetAirtablePersons()
    .then(persons => {
      return filterPersonsProfiles(persons)
    })
    .then(personsProfiles => {
      return flattenPersonsProfile(personsProfiles)
    })
    .then(flatPersonsProfiles => {
      return cleanAndCamelKeys(flatPersonsProfiles)
    })
}

// Api Request
function GetAirtablePersons () {
  return new Promise((resolve, reject) => {
    console.info('GetAirTablePersons Started')
    const airtablePersons = []

    // DL: Name of Table in Airtable base (db)
    base('Person')
      .select({
        // DL: Name of View of Table
        view: 'Website View'
      })
      .eachPage(
        (records, fetchNextPage) => {
          // DL: Airtable returns paginated views - here we accumulate them into one object
          airtablePersons.push(records)
          fetchNextPage()
        },
        err => {
          if (err) {
            console.error(message, optionalParams)(
              'Airtable Request Error: ',
              err
            )
            reject(err)
          }
          console.info('GetAirtablePersos Successful: ')
          resolve(airtablePersons)
        }
      )
  })
}
