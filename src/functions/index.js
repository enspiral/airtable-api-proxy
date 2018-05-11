import * as functions from 'firebase-functions'
import cors from 'cors'

import { GetPersons } from './airtable-api/people'

const corsHandler = cors({ origin: true })

export const getPeople = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    GetPersons()
      .then(data => {
        console.log('Return Flattened Persons Profiles: ', data)
        return response.status(200).send(data)
      })
      .catch(err => {
        console.error('GetPeople Errored: ', err)
        response.status(400)
      })
  })
})
