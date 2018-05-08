import * as functions from 'firebase-functions'
import * as pino from 'pino'
import * as airtable from 'airtable'
import { flatten, forEach, merge, pick, pluck, prop } from 'ramda'

const base = new airtable({apiKey: functions.config().airtable.api_key}).base(functions.config().airtable.base)
const logger = pino()

export function GetAmbassadors() {
    return new Promise((resolve, reject) => {
        GetAirtablePersons()
        .then((persons :Array<any>) => {
            // Todo: flatten fields values to be with createdTime and id
            resolve(forEach(flattenPerson,persons))
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
        filterPersonsProfiles(airtablePersons, resolve)
    })
  })
}

const getFields = prop('fields')
const getMetaData = pick(['id', 'createdTime'])

// Todo: test
function filterPersonsProfiles (airtablePersons, resolve) :any {
    // DL: Plucking the _rawJson here removes all meta-data except id and created-at
    const persons = pluck('_rawJson')(flatten(airtablePersons))
    resolve(persons)
}

// Todo: test
function flattenPerson(person) {
    const flatPerson = merge(getMetaData(person), getFields(person))
    logger.info(flatPerson, 'flattenPerson')
    return flatPerson
}