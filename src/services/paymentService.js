import { Request } from './httpClient'

const buildPaymentReturnUrls = () => {
  const origin = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:5173'

  return {
    successUrl: `${origin}/payment-success`,
    cancelUrl: `${origin}/payment-cancel`
  }
}

export const createStripeCheckoutSession = async (bookingId, urls = buildPaymentReturnUrls()) => {
  return Request(`/api/v1/payments/bookings/${bookingId}/stripe/checkout`, {
    method: 'POST',
    body: {
      successUrl: urls.successUrl,
      cancelUrl: urls.cancelUrl
    }
  })
}

export default {
  createStripeCheckoutSession
}
