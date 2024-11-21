import Repository from './Repository'
const resource = '/roles'
export default {
  async getAll(params) {
    return Repository.get(`${resource}?${params}`).then((response) => {
      return response.data
    })
  },
  async getById(id) {
    return Repository.get(`${resource}/${id}`).then((response) => {
      return response.data
    })
  },
  async update(id, payload) {
    return Repository.put(`${resource}/${id}`, payload).then((response) => {
      return response.data
    })
  },
  async create(payload) {
    return Repository.post(`${resource}`, payload).then((response) => {
      return response.data
    })
  },
  // refresh(refreshToken) {
  //   return Repository.post(`${resource}/refresh`, { refreshToken: refreshToken })
  // },
  // logout() {},
  // async forgotPassword(payload) {
  //   return Repository.post(`${resource}/forgot-password`, payload).then((response) => {
  //     return response.data
  //   })
  // },
  // async resetPassword(payload) {
  //   return Repository.post(`${resource}/reset-password`, payload).then((response) => {
  //     return response.data
  //   })
  // },
}
