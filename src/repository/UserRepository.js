import Repository from './Repository'
const resource = '/users'
export default {
  async register(payload) {
    return Repository.post(`${resource}/register`, payload).then((response) => {
      return response.data
    })
  },
  async getAllUsers(params) {
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
  async updateAvatar(id, payload) {
    return Repository.put(`${resource}/${id}/avatar`, payload).then((response) => {
      return response.data
    })
  },
  async getProfile(id) {
    return Repository.get(`${resource}/${id}/profile`).then((response) => {
      return response.data
    })
  },
  async updateProfile(id, payload) {
    return Repository.put(`${resource}/${id}/profile`, payload).then((response) => {
      return response.data
    })
  },
  async changePassword(id, payload) {
    return Repository.put(`${resource}/${id}/change-password`, payload).then((response) => {
      return response.data
    })
  },
  async getCampaignOfUser(id, params) {
    return Repository.get(`${resource}/${id}/campaigns?${params}`).then((response) => {
      return response.data
    })
  },
  async getDonationOfUser(id, params) {
    return Repository.get(`${resource}/${id}/donations?${params}`).then((response) => {
      return response.data
    })
  },
}
