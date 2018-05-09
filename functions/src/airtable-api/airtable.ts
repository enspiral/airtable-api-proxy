import * as functions from 'firebase-functions'
import * as airtable from 'airtable'

export default new airtable({apiKey: functions.config().airtable.api_key}).base(functions.config().airtable.base)