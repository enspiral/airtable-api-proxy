const schema = {
  $schema: 'http://json-schema.org/schema#',
  title: 'Person',
  description: 'Public profile information for an Enspiral Contributor or Member',
  type: 'object',
  properties: {
    id: {},
    name: {},
    contributorStatus: {},
    city: {},
    country: {},
    venture: {},
    pubilcDescription: {},
    publicEmail: {},
    publicWebsite: {},
    publicLinkedIn: {},
    publicTwitter: {},
    isAmbassador: {}
  },
  required: [
    'name',
    'publicDescription'
  ]
}

module.exports = schema
