"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetVentures = GetVentures;

var functions = _interopRequireWildcard(require("firebase-functions"));

var _airtable = _interopRequireDefault(require("airtable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const base = new _airtable.default({
  apiKey: functions.config().airtable.api_key
}).base(functions.config().airtable.base);

function GetVentures() {//Todo
}