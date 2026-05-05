import { Request, createAppError } from './httpClient'

function normalizeTour(rawTour) {
  return {
    id: rawTour?.tourId ?? rawTour?.id ?? '',
    title: rawTour?.title || 'Untitled tour',
    description: rawTour?.description || 'No description provided yet.',
    location: rawTour?.location || 'Location not specified',
    price: Number(rawTour?.price ?? 0),
    imageUrl: rawTour?.imageUrl || 'https://picsum.photos/seed/explore-gambia/600/400',
     isAvailable: Boolean(rawTour?.isAvailable),
    startDate: rawTour?.startDate || null,
    endDate: rawTour?.endDate || null,
    participants: Number(rawTour?.participants ?? rawTour?.spotsRemaining ?? 0)
  }
}

export async function getTours(pageNumber = 1, pageSize = 10) {
  // Added Pagination parameters to the request URL
  const payload = await Request(`/tours?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  
  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected tours response format.', {
      statusCode: null,
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload.map(normalizeTour)
}


export async function getTourById(id) {
  if (!id) {
    throw createAppError('Tour id is required.', {
      statusCode: null,
      code: 'INVALID_INPUT'
    })
  }

  const payload = await Request(`/tours/${id}`)

  if (!payload || typeof payload !== 'object') {
    throw createAppError('Unexpected tour details response format.', {
      statusCode: null,
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return normalizeTour(payload)
}
