import { Request } from './httpClient'

const MODEM_PAY_CSS_URL = 'https://api.modempay.com/dist/main.css'
const MODEM_PAY_SCRIPT_URL = 'https://api.modempay.com/js/v1.js'

let modemPayScriptPromise = null

const compactCustomer = (customer = {}) => {
  const body = {}

  if (customer.customerName) body.customerName = customer.customerName
  if (customer.customerEmail) body.customerEmail = customer.customerEmail
  if (customer.customerPhone) body.customerPhone = customer.customerPhone

  return body
}

export const prepareModemPayInlineCheckout = async (bookingId, customer) => {
  return Request(`/api/v1/payments/bookings/${bookingId}/modempay/inline`, {
    method: 'POST',
    body: compactCustomer(customer)
  })
}

export const verifyModemPayPayment = async (transactionId) => {
  return Request('/api/v1/payments/modempay/verify', {
    method: 'POST',
    body: { transactionId }
  })
}

export const createPaymentIntent = async (bookingId) => {
  return Request(
    `/payments/bookings/${bookingId}/modempay/intent`,
    {
      method: 'POST',
      body: {
        returnUrl: 'http://localhost:5173/payment-success',
        cancelUrl: 'http://localhost:5173/payment-cancel'
      }
    }
  )
}

export const ensureModemPayAssets = () => {
  if (typeof window === 'undefined') return Promise.resolve()

  if (!document.querySelector(`link[href="${MODEM_PAY_CSS_URL}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = MODEM_PAY_CSS_URL
    document.head.appendChild(link)
  }

  if (window.ModemPayCheckout) return Promise.resolve()
  if (modemPayScriptPromise) return modemPayScriptPromise

  modemPayScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${MODEM_PAY_SCRIPT_URL}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true })
      existingScript.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = MODEM_PAY_SCRIPT_URL
    script.async = true
    script.onload = resolve
    script.onerror = () => reject(new Error('Unable to load Modem Pay checkout.'))
    document.body.appendChild(script)
  })

  return modemPayScriptPromise
}

export default {
  prepareModemPayInlineCheckout,
  verifyModemPayPayment,
  createPaymentIntent,
  ensureModemPayAssets
}
