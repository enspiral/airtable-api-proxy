import FunctionsTest from 'firebase-functions-test'

import { filterPersonsProfiles } from './index'
import testData from '../../../../example-data/airtable-persons.js'

const test = FunctionsTest()

test('filterPersonsProfiles returns correct data', t => {
  const profiles = filterPersonsProfiles(testData)
  console.log(profiles)
  t.fail()
})
