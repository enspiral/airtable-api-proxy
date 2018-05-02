import * as functions from 'firebase-functions';
import * as Airtable from "airtable"

export module AirtableApi {
  const base = new Airtable({apiKey: functions.config().airtable.api_key}).base(functions.config().airtable.base);

  export function GetPeople():any {
    const people = []
    base('Person').select({
        view: "Website View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        people.push(records)
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        
    }, function done(err) {
        if (err) {console.error('Error: ', err); return;}
        console.log(people)
        return people
    });
  }
  

  export function GetVentures() {
    //Todo
  }
}