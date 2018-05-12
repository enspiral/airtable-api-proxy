import {
  flatten,
  map,
  pluck,
  pipe
} from 'ramda'
import { spreadProp } from 'ramda-adjunct'

import { cleanAndCamelKeys } from '../../utility'
import base from '../airtable'

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')
export const filterPersonsProfiles = pipe(flatten, getRawJson)

export const flattenPersonsProfile = map(spreadProp('fields'))

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
            console.error('Airtable Request Error: ', err)
            reject(err)
          }
          console.info('GetAirtablePersos Successful: ')
          resolve(airtablePersons)
        }
      )
  })
}
