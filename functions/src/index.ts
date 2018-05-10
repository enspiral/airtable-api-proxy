import * as functions from 'firebase-functions'
import * as pino from 'pino'
import { GetPersons } from './airtable-api/people'

const logger = pino()

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!")
})

export const getPeople = functions.https.onRequest((request, response) => {
  GetPersons()
  .then((data) => {
    response.send(data)
  }).catch((err) => {
    logger.error(err)
  })
})