import Repository from './Repository'
const resource = '/comments'
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
  async update(id, payload) {
    return Repository.put(`${resource}/${id}`, payload).then((response) => {
      return response.data
    })
  },
  async delete(id) {
    return Repository.delete(`${resource}/${id}`).then((response) => {
      return response.data
    })
  },
}
