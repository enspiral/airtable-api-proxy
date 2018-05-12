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
    yourBioIntroduction: {},
    personalTaglineOriginStory: {},
    publicWebsite: {},
    whatAreYourAspirationsWithinTheEnspiralNetwork: {},
    country: {},
    enspiralEmail: {},
    preferredEmail: {},
    showEmailOnWebsite: {},
    venture: {},
    linkedIn: {},
    showLinkedInOnWebsite: {},
    twitter: {},
    showTwitterOnWebsite: {},
    isAmbassador: {}
  },
  required: [
    'name',
    'preferredEmail',
    'personalTaglineOriginStory'
  ]
}

module.exports = schema
