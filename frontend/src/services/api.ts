/**
 * Axios HTTP client — pre-configured with the backend base URL,
 * JSON content-type, and a 30-second timeout.
 *
 * Interceptors for auth tokens and global error handling will be
 * added here when business logic is implemented.
 */
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* ── Request interceptor (stub) ─────────────────────────────── */
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach auth token when authentication is implemented
    return config
  },
  (error) => Promise.reject(error),
)

/* ── Response interceptor (stub) ───────────────────────────── */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401 / 403 redirects, toast notifications, etc.
    return Promise.reject(error)
  },
)

export default apiClient
