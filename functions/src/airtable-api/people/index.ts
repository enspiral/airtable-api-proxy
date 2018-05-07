import * as Functions from 'firebase-functions'
import * as Airtable from 'airtable'
import { pluck, flatten } from 'ramda'

import { Person, IPerson } from './types'

const base = new Airtable({apiKey: Functions.config().airtable.api_key}).base(Functions.config().airtable.base);

export function GetPeople() {
  return new Promise((resolve, reject) => {
    const airtablePeople :Array<string> = []
    base('Person').select({
        view: "Website View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        airtablePeople.push(records)
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
    }, function done(err) {
        if (err) {console.error('Error: ', err); reject(err);}
        mapPeople(airtablePeople, resolve)
    })
  })
}

function mapPeople (airtablePeople, resolve) :any {
    const people = pluck('_rawJson')(flatten(airtablePeople))
    resolve(people)
}