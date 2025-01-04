import axios from 'axios'
import AuthenticationRepository from './AuthenticationRepository'
import LocalStorageRepository from './LocalStorageRepository'
import router from '@/router'
import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/store/authStore'
// import { useRouter } from 'vue-router'

const baseDomain = 'http://localhost:8080/'
const baseURL = `${baseDomain}api/v1`
const Repository = axios.create({
  baseURL,
})

Repository.interceptors.request.use(
  (config) => {
    const token = LocalStorageRepository.getAccessToken()
    console.log(token)
    config.headers['Content-Type'] = 'application/json'
    console.log(config.url)
    if (token && config.url !== '/auth/refresh') {
      config.headers['Authorization'] = 'Bearer ' + token // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

Repository.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    const originalConfig = error.config
    console.log(originalConfig)
    // console.log(originalConfig.url)
    if (
      originalConfig.url !== '/auth/login' &&
      error.response.status === 401 &&
      !originalConfig._retry &&
      LocalStorageRepository.getRefreshToken() !== null
    ) {
      originalConfig._retry = true
      // const authStore = useAuthStore()

      return AuthenticationRepository.refresh(LocalStorageRepository.getRefreshToken())
        .then((response) => {
          LocalStorageRepository.saveUser(JSON.stringify(response.data.data))
          return Repository(originalConfig)
        })
        .catch((err) => {
          console.log('error after retry: ' + err)
          router.replace({ name: 'login-route' })
          return Promise.reject(err)
        })
    }
    console.log(error)
    return Promise.reject(error)
  },
)

export default Repository
