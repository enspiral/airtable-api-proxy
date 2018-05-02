import * as functions from 'firebase-functions';
import { AirtableApi } from './airtable-api';

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const getPeople = functions.https.onRequest((request, response) => {
  const thing = AirtableApi.GetPeople()
  response.send(AirtableApi.GetPeople())
});