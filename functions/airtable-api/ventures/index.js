import Functions from 'firebase-functions'
import Airtable from "airtable"

const base = new Airtable({apiKey: Functions.config().airtable.api_key}).base(Functions.config().airtable.base);

export function GetVentures() {
  //Todo
}
