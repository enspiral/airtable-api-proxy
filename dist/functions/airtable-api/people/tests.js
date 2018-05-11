"use strict";

var _firebaseFunctionsTest = _interopRequireDefault(require("firebase-functions-test"));

var _index = require("./index");

var _airtablePersons = _interopRequireDefault(require("../../../../example-data/airtable-persons.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const test = (0, _firebaseFunctionsTest.default)();
test('filterPersonsProfiles returns correct data', t => {
  const profiles = (0, _index.filterPersonsProfiles)(_airtablePersons.default);
  console.log(profiles);
  t.fail();
});