import { map, pipe } from 'ramda'

import { cleanAndCamelKeys, gravatarifyProfiles, mapKeyValues } from '../../utility'
import { constructFilter, flattenAndSelectJson, flattenFields, getAllRows, idToKey } from '../airtable'
import * as schema from './schemas/public-venture'

// Create data schema filter
const schemaFilter = constructFilter(schema)

// Driver code
const driverPipe = pipe(
  flattenAndSelectJson,
  map(flattenFields),
  cleanAndCamelKeys,
  gravatarifyProfiles,
  mapKeyValues(idToKey),
  schemaFilter
)

export const GetVentures = () => {
  return getAllRows('Venture', 'Website View')
    .then(ventures => driverPipe(ventures))
}
