import * as pino from 'pino'
import { flatten, forEach, map, merge, pick, pluck, pipe, prop } from 'ramda'
import base from '../airtable'

const logger = pino()

// Data transforms
// Todo: test
const getFields = prop('fields')
const getMetaData = pick(['id', 'createdTime'])
const getRawJson :any = pluck('_rawJson')

const filterPersonsProfiles = pipe(
    flatten,
    getRawJson
)
const flattenPersons = map(
    merge(
        getMetaData,
        getFields
    )
)

// Driver code
export function GetPersons() {
    return GetAirtablePersons()
        .then((persons) => {
            return filterPersonsProfiles(persons)
        })
        .then((personsProfiles) => {
            return flattenPersons (personsProfiles)
        })
}

// Api Request
function GetAirtablePersons() {
    return new Promise((resolve, reject) => {
        const airtablePersons = []

        // DL: Name of Table in Airtable base (db)
        base('Person').select({

            // DL: Name of View of Table
            view: "Website View"

        // DL: Airtable returns paginated views - here we accumulate them into one object
        }).eachPage(function page(records, fetchNextPage) {
            airtablePersons.push(records)
            fetchNextPage();

        }, function done(err) {
            if (err) {console.error('Error: ', err); reject(err);}
            resolve(airtablePersons)
        })
  })
}
