import * as functions from 'firebase-functions'
import Airtable from 'airtable'

export default new Airtable({
  apiKey: functions.config().airtable.api_key
}).base(functions.config().airtable.base)
