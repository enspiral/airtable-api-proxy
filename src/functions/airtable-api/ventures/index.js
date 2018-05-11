import * as functions from 'firebase-functions'
import Airtable from 'airtable'

const base = new Airtable({ apiKey: functions.config().airtable.api_key }).base(
  functions.config().airtable.base
)

export function GetVentures () {
  // Todo
}
