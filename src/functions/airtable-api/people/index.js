import { filter, flatten, map, merge, pipe, pluck, prop } from 'ramda'
import { spreadProp } from 'ramda-adjunct'
import Ajv from 'ajv'
import md5 from 'js-md5'

import { cleanAndCamelKeys } from '../../utility'
import base from '../airtable'
import * as personSchema from './schemas/public-person'

const ajv = new Ajv({ removeAdditional: 'all', coerceTypes: true })

// Data Mappers/Runtime Check
const filterPersons = ajv.compile(personSchema)
export function filterWithSchema (objectArray) {
  return filter(obj => filterPersons(obj), objectArray)
}

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')
export const filterPersonsProfiles = pipe(flatten, getRawJson)

export const flattenPersonsProfile = map(spreadProp('fields'))

// Create Gravatar url
const computeGravatarUrl = email => {
  console.log(email)
  return {
    gravatarUrl: email
      ? `https://www.gravatar.com/avatar/${md5(email)}?s=200`
      : null
  }
}
const getGravatarEmail = prop('gravatarEmail')
export const createGravatarUrl = pipe(getGravatarEmail, computeGravatarUrl)
export const gravatarifyPersons = map(person =>
  merge(createGravatarUrl(person), person)
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
    .then(cleanPersonsProfiles => {
      return gravatarifyPersons(cleanPersonsProfiles)
    })
    .then(cleanPersonsProfilesWithGravatarUrl => {
      return filterWithSchema(cleanPersonsProfilesWithGravatarUrl)
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
          console.info('GetAirtablePersons Successful: ')
          resolve(airtablePersons)
        }
      )
  })
}
