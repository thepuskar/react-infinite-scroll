import axios, { AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'localhost:5001'
const apiKey = import.meta.env.VITE_API_KEY || 'some_random_key'

export const axiosInstance = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ApiKey: apiKey
  }

  const instance: AxiosInstance = axios.create({
    baseURL,
    headers
  })

  instance.interceptors.response.use((response) => {
    return response
  })

  return instance
}

export const getApi = async (url: string) => {
  return await axiosInstance().get(url)
}

export const postApi = async (url: string, data: any) => {
  return await axiosInstance().post(url, data)
}

export const patchApi = async (url: string, data: any) => {
  return await axiosInstance().patch(url, data)
}

export const deleteApi = async (url: string) => {
  return await axiosInstance().delete(url)
}
