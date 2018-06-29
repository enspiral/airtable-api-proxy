import * as functions from 'firebase-functions'
import cors from 'cors'
import admin from 'firebase-admin'

import { GetPersons } from './airtable-api/persons'
import { GetVentures } from './airtable-api/ventures'
import { ProcessPayment } from './stripe'

admin.initializeApp(functions.config().firebase)
const corsHandler = cors({ origin: true })

export const updatepeople = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    GetPersons()
      .then(persons => {
        console.info('Update-Firebase-DB STARTED: <Persons>')
        admin.database().ref('/persons').set(persons)
        return persons
      })
      .then(data => {
        console.info('Update-Firebase-DB SUCCESFUL: <Persons>', data)
        return response.status(200).send({message: 'Update Persons Successful'})
      })
      .catch(err => {
        console.error('Update People ERROR: ', err)
        response.status(500)
      })
  })
})

export const updateventures = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    GetVentures()
      .then(ventures => {
        console.info('Update-Firebase-DB STARTED: <Ventures>')
        admin.database().ref('/ventures').set(ventures)
        return ventures
      })
      .then(data => {
        console.info('Update-Firebase-DB SUCCESFUL: <Ventures>', data)
        return response.status(200).send({message: 'Update Ventures Successful'})
      })
      .catch(err => {
        console.error('Update Ventures ERROR: ', err)
        response.status(500)
      })
  })
})

export const contribute = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    console.log(request.body)
    ProcessPayment(request.body)
      .then(data => {
        console.log('Contribute SUCCESS: ', data)
        return response.status(204).send()
      })
      .catch(err => {
        console.error('Contribute ERROR: ', err)
        response.status(500)
      })
  })
})
