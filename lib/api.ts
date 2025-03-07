// Base API URL - change this to your backend server URL
const API_BASE_URL = "http://localhost:3001/api"

// Generic fetch function with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Complaint APIs
export async function submitComplaint(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: "POST",
    body: formData,
    // Don't set Content-Type header when using FormData
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit complaint")
  }

  return data
}

export async function trackComplaint(complaintId: string) {
  return fetchAPI(`/complaints/track/${complaintId}`)
}

export async function getAllComplaints() {
  return fetchAPI("/complaints")
}

export async function updateComplaintStatus(complaintId: string, status: string) {
  return fetchAPI(`/complaints/${complaintId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  })
}

// Feedback APIs
export async function submitFeedback(feedbackData: {
  customer_name: string
  email: string
  rating: number
  comments: string
}) {
  return fetchAPI("/feedback", {
    method: "POST",
    body: JSON.stringify(feedbackData),
  })
}

export async function getAllFeedback() {
  return fetchAPI("/feedback")
}

// Admin APIs
export async function adminLogin(credentials: { username: string; password: string }) {
  return fetchAPI("/admin/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  })
}

// Test API connection
export async function testConnection() {
  return fetchAPI("/test")
}

