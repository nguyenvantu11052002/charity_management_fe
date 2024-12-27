import Repository from './Repository'
const resource = '/campaign-images'
export default {
  // async getAll(params) {
  //   return Repository.get(`${resource}?${params}`).then((response) => {
  //     return response.data
  //   })
  // },
  async create(payload) {
    return Repository.post(`${resource}`, payload).then((response) => {
      return response.data
    })
  },
  async delete(id) {
    return Repository.delete(`${resource}/${id}`).then((response) => {
      return response.data
    })
  },
}
