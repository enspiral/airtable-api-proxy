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
      type: 'string'
    },
    publicProfileAirtableUrl: {
      type: 'string'
    },
    publicName: {
      type: 'string'
    },
    publicDescription: {
      type: 'string'
    },
    publicEmail: {
      type: 'string'
    },
    publicWebsite: {
      type: 'string'
    },
    publicLinkedIn: {
      type: 'string'
    },
    publicTwitter: {
      type: 'string'
    },
    isAmbassador: {
      type: 'boolean'
    }
  },
}

module.exports = schema
