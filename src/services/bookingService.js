import { Request } from './httpClient'

export const createBooking = async (tourId, numberOfPeople) => {
  return Request('/api/v1/bookings', {
    method: 'POST',
    body: {
      tourId,
      numberOfPeople
    }
  })
}

export default {
  createBooking
}
