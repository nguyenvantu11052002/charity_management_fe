import Repository from './Repository'
const resource = '/donations'
export default {
  async getAll(params) {
    return Repository.get(`${resource}?${params}`).then((response) => {
      return response.data
    })
  },
  async create(payload) {
    return Repository.post(`${resource}`, payload).then((response) => {
      return response.data
    })
  },
  async statistic() {
    return Repository.get(`${resource}/statistic`).then((response) => {
      return response.data
    })
  },
}
