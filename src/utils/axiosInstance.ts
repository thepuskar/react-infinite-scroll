import axios, { AxiosInstance } from 'axios'

// import { API_VERSION } from '@/constants';
// import { appConfig } from '@/config';
// import { authHeader } from '@/services';

const baseURL = 'https://api.hamrobazaar.com'
const apiKey = '09BECB8F84BCB7A1796AB12B98C1FB9E'

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
