import * as functions from 'firebase-functions'
import { flatten, pipe, pluck } from 'ramda'
import { spreadProp } from 'ramda-adjunct'
import Airtable from 'airtable'

export const base = new Airtable({
  apiKey: functions.config().airtable.api_key
}).base(functions.config().airtable.base)

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')
export const flattenAndSelectJson = pipe(flatten, getRawJson)

export const flattenFields = spreadProp('fields')
