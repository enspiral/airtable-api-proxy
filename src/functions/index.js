import * as functions from 'firebase-functions'
import cors from 'cors'
import admin from 'firebase-admin'

import { GetPersons } from './airtable-api/persons'
import { GetVentures } from './airtable-api/ventures'
import { ProcessPaymentLive } from './stripe/contribute-live'
import { ProcessPaymentTest } from './stripe/contribute-test'


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
        return response.status(500).send({error: err})
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
        return response.status(500).send({error: err})
      })
  })
})

export const contributelive = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    console.log(request.body)
    ProcessPaymentLive(request.body)
      .then(data => {
        console.log('Contribute Live SUCCESS: ', data)
        return response.status(204).send({dataProcessed: data})
      })
      .catch(err => {
        console.error('Contribute Live ERROR: ', err)
        return response.status(500).send({error: err})
      })
  })
})

export const contributetest = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    console.log(request.body)
    ProcessPaymentTest(request.body)
      .then(data => {
        console.log('Contribute Test SUCCESS: ', data)
        return response.status(204).send({dataProcessed: data})
      })
      .catch(err => {
        console.error('Contribute Test ERROR: ', err)
        return response.status(500).send({error: err})
      })
  })
})
