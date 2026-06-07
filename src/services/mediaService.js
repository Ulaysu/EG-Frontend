import { API_BASE_URL } from "@/config/env"
import { getToken } from "@/services/tokenService"

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/media/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`
    },
    body: formData
  })

  if (!response.ok) {
    throw new Error("Image upload failed")
  }

  const data = await response.json()

  return data.url || data.imageUrl
}