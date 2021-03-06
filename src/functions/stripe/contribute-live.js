import * as functions from 'firebase-functions'
import stripePackage from 'stripe'

const stripe = stripePackage(functions.config().stripe.prod)

export const ProcessPaymentLive = (payload) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create({
      amount: parseInt(payload.amount),
      currency: 'NZD',
      source: payload.token.id,
      receipt_email: payload.email,
      description: 'Contribution to Enspiral',
      metadata: {
        name: payload.name,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName
      }
    }, function (err, charge) {
      if (err) {
        reject(err)
      }
      resolve(charge)
    })
  })
}
