import { filter, map, merge, pipe, prop } from 'ramda'
import Ajv from 'ajv'

import { cleanAndCamelKeys, computeGravatarUrl } from '../../utility'
import { base, flattenAndSelectJson, flattenFields } from '../airtable'
import * as personSchema from './schemas/public-person'

const ajv = new Ajv({ removeAdditional: 'all', coerceTypes: true })

// Data Sanitisers & Runtime Check
const filterPersons = ajv.compile(personSchema)

export const filterWithSchema = (objectArray) => filter(filterPersons, objectArray)

// Create Gravatar url
const getGravatarEmail = prop('gravatarEmail')
const createGravatarUrl = pipe(getGravatarEmail, computeGravatarUrl)

export const gravatarifyPersons = map(person => {
  return merge(createGravatarUrl(person), person)
})

// Driver code
const driverPipe = pipe(
  flattenAndSelectJson,
  map(flattenFields),
  cleanAndCamelKeys,
  gravatarifyPersons,
  filterWithSchema
)

export const GetPersons = () => {
  return GetAirtablePersons()
    .then(persons => driverPipe(persons))
}

// Api Request
const GetAirtablePersons = () => {
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
