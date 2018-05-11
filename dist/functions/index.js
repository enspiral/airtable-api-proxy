"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPeople = void 0;

var functions = _interopRequireWildcard(require("firebase-functions"));

var _cors = _interopRequireDefault(require("cors"));

var _people = require("./airtable-api/people");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const corsHandler = (0, _cors.default)({
  origin: true
});
const getPeople = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    (0, _people.GetPersons)().then(data => {
      console.log('Return Flattened Persons Profiles: ', data);
      return response.status(200).send(data);
    }).catch(err => {
      console.error('GetPeople Errored: ', err);
      response.status(400);
    });
  });
});
exports.getPeople = getPeople;