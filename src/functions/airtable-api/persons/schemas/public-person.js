const schema = {
  $schema: 'http://json-schema.org/schema#',
  title: 'Person',
  description:
    'Public profile information for an Enspiral Contributor or Member',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    contributorStatus: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    ventureMember: {
      type: 'object'
    },
    gravatarUrl: {
      type: 'string',
      format: 'uri'
    },
    publicProfileAirtableUrl: {
      type: 'string',
      format: 'uri'
    },
    publicName: {
      type: 'string'
    },
    publicDescription: {
      type: 'string'
    },
    publicEmail: {
      type: 'string',
      format: 'email'
    },
    publicWebsite: {
      type: 'string',
      format: 'uri'
    },
    publicLinkedIn: {
      type: 'string',
      format: 'uri'
    },
    publicTwitter: {
      type: 'string',
      format: 'uri'
    },
    isAmbassador: {
      type: 'boolean'
    }
  },
  required: ['publicName', 'publicDescription', 'gravatarUrl']
}

module.exports = schema
