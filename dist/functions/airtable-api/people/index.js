"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPersons = GetPersons;
exports.flattenPersonsProfile = exports.filterPersonsProfiles = void 0;

var _ramda = require("ramda");

var _ramdaAdjunct = require("ramda-adjunct");

var _airtable = _interopRequireDefault(require("../airtable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Data transforms
// Todo: test
const getRawJson = (0, _ramda.pluck)('_rawJson');
const filterPersonsProfiles = (0, _ramda.pipe)(_ramda.flatten, getRawJson);
exports.filterPersonsProfiles = filterPersonsProfiles;
const flattenPersonsProfile = (0, _ramda.map)((0, _ramdaAdjunct.spreadProp)('fields')); // Driver code

exports.flattenPersonsProfile = flattenPersonsProfile;

function GetPersons() {
  return GetAirtablePersons().then(persons => {
    return filterPersonsProfiles(persons);
  }).then(personsProfiles => {
    return flattenPersonsProfile(personsProfiles);
  });
} // Api Request


function GetAirtablePersons() {
  return new Promise((resolve, reject) => {
    console.log('GetAirTablePersons Started');
    const airtablePersons = []; // DL: Name of Table in Airtable base (db)

    (0, _airtable.default)('Person').select({
      // DL: Name of View of Table
      view: "Website View" // DL: Airtable returns paginated views - here we accumulate them into one object

    }).eachPage((records, fetchNextPage) => {
      airtablePersons.push(records);
      fetchNextPage();
    }, err => {
      if (err) {
        console.log('Airtable Request Error: ', err);
        reject(err);
      }

      console.log('GetAirtablePersos Successful: ', airtablePersons);
      resolve(airtablePersons);
    });
  });
}