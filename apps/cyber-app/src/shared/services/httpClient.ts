import axios, { AxiosError, type AxiosInstance } from 'axios'

const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || '/api'

const client: AxiosInstance = axios.create({
	baseURL: API_BASE,
	headers: {
		'Content-Type': 'application/json',
	},
})

function getAccessToken(): string | null {
	try {
		return localStorage.getItem('accessToken')
	} catch {
		return null
	}
}

client.interceptors.request.use((config) => {
	const token = getAccessToken()
	if (token) {
		config.headers = config.headers ?? {}
		config.headers['Authorization'] = `Bearer ${token}`
	}
	return config
})

client.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			try {
				localStorage.removeItem('accessToken')
			} catch {}
			// Redirect to login to obtain a fresh token
			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}
		}
		return Promise.reject(error)
	}
)

export function setAccessToken(token: string | null) {
	if (token) {
		localStorage.setItem('accessToken', token)
	} else {
		localStorage.removeItem('accessToken')
	}
}

export default client
