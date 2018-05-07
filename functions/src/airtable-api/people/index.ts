import * as Functions from 'firebase-functions'
import * as Airtable from 'airtable'
import { pluck, flatten } from 'ramda'

import { ArrayOfAmbassador } from './types'

const base = new Airtable({apiKey: Functions.config().airtable.api_key}).base(Functions.config().airtable.base);

export function GetAmbassadors() {
    return new Promise((resolve, reject) => {
        GetAirtablePersons()
        .then((persons :Array<any>) => {
            // Todo: flatten fields values to be with createdTime and id
            resolve(persons)
        })
        .catch(err => {console.error('Error: ', err); reject(err);})
    })
}

function GetAirtablePersons() {
  return new Promise((resolve, reject) => {
    const airtablePersons :Array<string> = []

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
        mapPersons(airtablePersons, resolve)
    })
  })
}

// Todo: test
function mapPersons (airtablePersons, resolve) :any {
    // DL: Plucking the _rawJson here removes all meta-data except id and created-at
    const persons = pluck('_rawJson')(flatten(airtablePersons))
    resolve(persons)
}
