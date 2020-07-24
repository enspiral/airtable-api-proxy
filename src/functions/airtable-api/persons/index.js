import { constructFilter, getAllRows } from '../airtable'
import * as personSchema from './schemas/public-person'

// Create data schema filter
const schemaFilter = constructFilter(personSchema)

export const GetPersons = () => {
  return getAllRows('Person', 'Website View Public Data')
    .then((rawData) => {
      return schemaFilter(rawData)
    })
    .catch(err => console.log(err))
}
