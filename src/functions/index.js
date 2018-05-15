import * as functions from 'firebase-functions'
import cors from 'cors'
import admin from 'firebase-admin'

import { GetPersons } from './airtable-api/people'

admin.initializeApp(functions.config().firebase)

const corsHandler = cors({ origin: true })

export const updatepeople = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    GetPersons()
      .then(persons => {
        console.info('Update: firebase database - Persons')
        admin.database().ref('/persons').set(persons)
        return persons
      })
      .then(data => {
        console.info('Return Flattened Persons Profiles: ', data)
        return response.status(200).send({message: 'Update Persons Successful'})
      })
      .catch(err => {
        console.error('GetPeople Errored: ', err)
        response.status(500)
      })
  })
})
