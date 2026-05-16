import { Request } from './httpClient'

export const createBooking = async (tourId, numberOfPeople) => {
  return Request('/bookings', {
    method: 'POST',
    body: {
      tourId,
      numberOfPeople
    }
  })
}

export const getMyBookings = async () => {
  return Request('/bookings/my-bookings')
}

export default {
  createBooking,
  getMyBookings
}
