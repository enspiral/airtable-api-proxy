import { map, pipe } from 'ramda'

import { cleanAndCamelKeys, gravatarifyProfiles, mapKeyValues } from '../../utility'
import { constructFilter, flattenAndSelectJson, flattenFields, getAllRows, idToKey } from '../airtable'
import * as personSchema from './schemas/public-person'

// Create data schema filter
const schemaFilter = constructFilter(personSchema)

// Driver code
const driverPipe = pipe(
  flattenAndSelectJson,
  map(flattenFields),
  cleanAndCamelKeys,
  gravatarifyProfiles,
  mapKeyValues(idToKey),
  schemaFilter
)

export const GetPersons = () => {
  return getAllRows('Person', 'Website View Public Data')
    .then(persons => driverPipe(persons))
}
