import * as functions from 'firebase-functions'
import * as pino from 'pino'
import { GetAmbassadors } from './airtable-api/people'

const logger = pino()

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!")
});

export const getPeople = functions.https.onRequest((request, response) => {
  GetAmbassadors()
  .then(data => {
    response.status(200).send(data)
  })
  .catch(err => {
    logger.error(err, 'Get people error')
    response.status(400)
  })
})