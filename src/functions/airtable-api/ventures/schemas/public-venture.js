const schema = {
  $schema: 'http://json-schema.org/schema#',
  title: 'Venture',
  description:
    'Public profile information for an Enspiral Venture',
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    gravatarUrl: {
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
    publicTwitter: {
      type: 'string'
    },
    publicBlog: {
      type: 'string'
    },
    publicPurpose: {
      type: 'string'
    }
  },
  required: ['publicName', 'publicDescription', 'gravatarUrl', 'publicPurpose']
}

module.exports = schema
