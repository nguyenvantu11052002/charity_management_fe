import Repository from './Repository'
const resource = '/campaigns'
export default {
  async getAll(params) {
    return Repository.get(`${resource}?${params}`).then((response) => {
      return response.data
    })
  },
  async search(params) {
    return Repository.get(`${resource}/search?${params}`).then((response) => {
      return response.data
    })
  },
  async create(payload) {
    return Repository.post(`${resource}`, payload).then((response) => {
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
  async schedule(id, payload) {
    return Repository.put(`${resource}/${id}/schedule`, payload).then((response) => {
      return response.data
    })
  },
  async reject(id) {
    return Repository.put(`${resource}/${id}/reject`).then((response) => {
      return response.data
    })
  },
  async start(id, payload) {
    return Repository.put(`${resource}/${id}/start`, payload).then((response) => {
      return response.data
    })
  },
  async reStart(id, payload) {
    return Repository.put(`${resource}/${id}/restart`, payload).then((response) => {
      return response.data
    })
  },
  async stop(id) {
    return Repository.put(`${resource}/${id}/stop`).then((response) => {
      return response.data
    })
  },
  async addResult(id, payload) {
    return Repository.put(`${resource}/${id}/result`, payload).then((response) => {
      return response.data
    })
  },
  async getDonationOfCampaign(id, params) {
    return Repository.get(`${resource}/${id}/donations?${params}`).then((response) => {
      return response.data
    })
  },
  async getCommentOfCampaign(id, params) {
    return Repository.get(`${resource}/${id}/comments?${params}`).then((response) => {
      return response.data
    })
  },
  async getNewestCampaign() {
    return Repository.get(`${resource}/newest`).then((response) => {
      return response.data
    })
  },
  async statistic() {
    return Repository.get(`${resource}/statistic`).then((response) => {
      return response.data
    })
  },
}
