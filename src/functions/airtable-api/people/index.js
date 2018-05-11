import { flatten, map, pick, pluck, pipe, prop } from 'ramda'
import { spreadProp } from 'ramda-adjunct'
import base from '../airtable'

// Data transforms
// Todo: test
const getRawJson = pluck('_rawJson')

export const filterPersonsProfiles = pipe(
    flatten,
    getRawJson
)
export const flattenPersonsProfile = map(
    spreadProp('fields')
)

// Driver code
export function GetPersons() {
    return GetAirtablePersons()
        .then((persons) => {          
            return filterPersonsProfiles(persons)
        })
        .then((personsProfiles) => {
            return flattenPersonsProfile (personsProfiles)
        })
}

// Api Request
function GetAirtablePersons() {
    return new Promise((resolve, reject) => {
        console.log('GetAirTablePersons Started')        
        const airtablePersons = []

        // DL: Name of Table in Airtable base (db)
        base('Person').select({

            // DL: Name of View of Table
            view: "Website View"

        // DL: Airtable returns paginated views - here we accumulate them into one object
        }).eachPage((records, fetchNextPage) => {
            airtablePersons.push(records)
            fetchNextPage();

        }, (err) => {
            if (err) {console.log('Airtable Request Error: ', err); reject(err);}
            console.log('GetAirtablePersos Successful: ', airtablePersons)            
            resolve(airtablePersons)
        })
  })
}
