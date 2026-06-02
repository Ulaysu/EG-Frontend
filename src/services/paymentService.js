import { Request } from './httpClient'

const buildPaymentReturnUrls = (bookingId) => {
  const origin = typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:5173'

  return {
    successUrl: `${origin}/payment/success?bookingId=${encodeURIComponent(bookingId)}&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/payment/cancel?bookingId=${encodeURIComponent(bookingId)}`
  }
}

export const createStripeCheckoutSession = async (bookingId, urls = buildPaymentReturnUrls(bookingId)) => {
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
