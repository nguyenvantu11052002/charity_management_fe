import Repository from './Repository'
const resource = '/auth'
export default {
  async login(payload) {
    return Repository.post(`${resource}/login`, payload).then((response) => {
      return response.data
    })
  },
  refresh(refreshToken) {
    return Repository.post(`${resource}/refresh`, { refreshToken: refreshToken })
  },
  logout() {},
  async forgotPassword(payload) {
    return Repository.post(`${resource}/forgot-password`, payload).then((response) => {
      return response.data
    })
  },
  async resetPassword(payload) {
    return Repository.post(`${resource}/reset-password`, payload).then((response) => {
      return response.data
    })
  },
}
