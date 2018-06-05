import * as functions from 'firebase-functions'
import { filter, flatten, prop, pipe, pluck } from 'ramda'
import { spreadProp } from 'ramda-adjunct'
import Airtable from 'airtable'
import Ajv from 'ajv'

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
const ajv = new Ajv({ removeAdditional: 'all', coerceTypes: true })

export const constructFilter = (schema) => (objectArray) => filter(ajv.compile(schema), objectArray)

// Queries
export const base = new Airtable({
  apiKey: functions.config().airtable.api_key
}).base(functions.config().airtable.base)

export const getAllRows = (baseName, viewName) => {
  return new Promise((resolve, reject) => {
    console.info('GetAllRows STARTED: <', baseName, '-', viewName, '>')
    const pages = []

    // DL: Name of Table in Airtable base (db)
    base(baseName)
      .select({
        // DL: Name of View of Table
        view: viewName
      })
      .eachPage(
        (page, fetchNextPage) => {
          // DL: Airtable returns paginated views - here we accumulate them into one object
          pages.push(page)
          fetchNextPage()
        },
        // DL: function to be run after the last page (its not an error handler function - but it does handle errors!)
        err => {
          if (err) {
            console.error('GetAllRows ERROR: <', baseName, '-', viewName, '>', err)
            reject(err)
          }
          console.info('GetAllRows SUCCESFUL: <', baseName, '-', viewName, '>')
          resolve(pages)
        }
      )
  })
}
