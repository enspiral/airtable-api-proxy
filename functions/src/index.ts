import * as functions from 'firebase-functions';
import { GetPeople } from './airtable-api';

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const getPeople = functions.https.onRequest((request, response) => {
  GetPeople()
  .then((data) => {
    response.send(data)
  })
});