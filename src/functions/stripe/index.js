import * as functions from 'firebase-functions'
import stripePackage from 'stripe'

// TODO: Swap between test and prod stripe api keys
// Context: firebase doesn't give us an easy way of detecting whether we are in a local test mode or deployed production mode - so manual switch for now :(
// const stripe = stripePackage(functions.config().stripe.test)
const stripe = stripePackage(functions.config().stripe.prod)

export const ProcessPayment = (payload) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create({
      amount: parseInt(payload.amount),
      currency: 'NZD',
      source: payload.token.id,
      receipt_email: payload.email,
      description: 'Contribution to Enspiral',
      metadata: {
        name: payload.name,
        email: payload.email
      }
    }, function (err, charge) {
      if (err) {
        reject(err)
      }
      resolve(charge)
    })
  })
}
