import * as functions from 'firebase-functions'
import { GetAmbassadors } from './airtable-api/people'

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!")
});

export const getPeople = functions.https.onRequest((request, response) => {
  GetAmbassadors()
  .then((data) => {
    response.send(data)
  })
})