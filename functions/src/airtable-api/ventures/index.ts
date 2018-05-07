import * as Functions from 'firebase-functions'
import * as Airtable from "airtable"

const base = new Airtable({apiKey: Functions.config().airtable.api_key}).base(Functions.config().airtable.base);

export function GetVentures() {
  //Todo
}
