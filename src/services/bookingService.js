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

export const getMyBookings = async () => {
  return Request('/api/v1/bookings/my-bookings')
}

export default {
  createBooking,
  getMyBookings
}
