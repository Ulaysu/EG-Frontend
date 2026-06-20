import { Request, createAppError } from './httpClient'

export async function getDashboardStats() {
  const payload = await Request('/admin/dashboard')

  if (!payload || typeof payload !== 'object') {
    throw createAppError('Unexpected dashboard response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function getRecentBookings() {
  const payload = await Request(
    '/admin/bookings?sortBy=bookingdate&isAscending=false&pageNumber=1&pageSize=5'
  )

  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected bookings response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function getPaymentSummary() {
  const payload = await Request('/admin/payments/summary')

  if (!payload || typeof payload !== 'object') {
    throw createAppError('Unexpected payment summary response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function getRecentPayments() {
  const payload = await Request(
    '/admin/payments?pageNumber=1&pageSize=5&sortBy=paymentdate&isAscending=false'
  )

  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected payments response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function getUsers() {
  const payload = await Request('/admin/users')

  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected users response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function getUserById(id) {
  if (!id) {
    throw createAppError('User id is required.', {
      code: 'INVALID_INPUT'
    })
  }

  const payload = await Request(`/admin/users/${id}`)

  if (!payload || typeof payload !== 'object') {
    throw createAppError('Unexpected user response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function updateUserStatus(id, isActive) {
  if (!id) {
    throw createAppError('User id is required.', {
      code: 'INVALID_INPUT'
    })
  }

  const payload = await Request(`/admin/users/${id}/status`, {
    method: 'PUT',
    body: {
      isActive
    }
  })

  return payload
}

export async function getTours() {
  const payload = await Request('/admin/tours')

  if (!Array.isArray(payload)) {
    throw createAppError('Unexpected tours response format.', {
      code: 'INVALID_RESPONSE',
      cause: payload
    })
  }

  return payload
}

export async function softDeleteTour(id) {
  if (!id) {
    throw createAppError('Tour id is required.', {
      code: 'INVALID_INPUT'
    })
  }

  return await Request(`/admin/tours/${id}/delete`, {
    method: 'PATCH'
  })
}

export async function restoreTour(id) {
  if (!id) {
    throw createAppError('Tour id is required.', {
      code: 'INVALID_INPUT'
    })
  }

  return await Request(`/admin/tours/${id}/restore`, {
    method: 'PATCH'
  })
}

export async function getBookings(filters = {}) {
  const params = new URLSearchParams(filters)

  return await Request(`/admin/bookings?${params.toString()}`)
}

export async function getPayments(filters = {}) {
  const params = new URLSearchParams(filters)

  return await Request(`/admin/payments?${params.toString()}`)
}