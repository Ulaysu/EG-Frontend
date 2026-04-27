import { request, createAppError } from './httpClient'

function normalizeTour(rawTour) {
  return {
    id: rawTour?.tourId ?? '',
    title: rawTour?.title || 'Untitled tour',
    description: rawTour?.description || 'No description provided yet.',
    location: rawTour?.location || 'Location not specified',
    price: Number(rawTour?.price ?? 0),
    imageUrl: rawTour?.imageUrl || 'https://picsum.photos/seed/explore-gambia/600/400',
    isAvailable: Boolean(rawTour?.isAvailable)
  }
}

export async function getTours() {
  const payload = await request('/api/v1/tours')

  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected tours response format.', {
      statusCode: null,
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload.map(normalizeTour)
}
