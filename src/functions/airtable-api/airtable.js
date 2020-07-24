import * as functions from 'firebase-functions'
import { map, filter, flatten, prop, pipe, pluck } from 'ramda'
import { spreadProp } from 'ramda-adjunct'
import Airtable from 'airtable'
import Ajv from 'ajv'
import setupAsync from 'ajv-async'

import { cleanAndCamelKeys, gravatarifyProfiles, mapKeyValues } from '../utility'


const ajv = setupAsync(new Ajv({ removeAdditional: 'all', coerceTypes: true, format: 'fast' }));

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')
export const flattenAndSelectJson = pipe(flatten, getRawJson)

export const flattenFields = spreadProp('fields')

// Assine id of object to key args: [key, value]
// Todo: Learning opportunity pair on writing this the ramda way with someone
export const idToKey = (keyValue) => {
  let newKeyValue = keyValue
  newKeyValue[0] = prop('id', keyValue[1])
  return newKeyValue
}

// Data Validation
const driverPipe = pipe(
  flattenAndSelectJson,
  map(flattenFields),
  cleanAndCamelKeys,
  gravatarifyProfiles,
  mapKeyValues(idToKey)
)

export const constructFilter = (schema) => {
  return (objectArray) => {
    return filter(ajv.compile(schema), driverPipe(objectArray))
  }
}

// Queries
export const base = new Airtable({
  apiKey: functions.config().airtable.api_key
}).base(functions.config().airtable.base)

export const getAllRows = (baseName, viewName) => {
  return new Promise((resolve, reject) => {
    console.info('GetAllRows STARTED: <', baseName, '-', viewName, '>')
    const allRecords = []

    // DL: Name of Table in Airtable base (db)
    base(baseName)
      .select({
        // DL: Name of View of Table
        view: viewName
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // DL: Airtable returns paginated views - here we accumulate them into one object
          allRecords.push(records)

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage()
        },
        function done(err) {
          if (err) {
            console.error('GetAllRows ERROR: <', baseName, '-', viewName, '>', err)
            reject(err)
          }
          console.info('GetAllRows SUCCESFUL: <', baseName, '-', viewName, '>')          
          resolve(allRecords)
        }
      )
  })
}
