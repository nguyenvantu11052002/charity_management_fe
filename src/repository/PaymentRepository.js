import Repository from './Repository'
const resource = '/payments'
export default {
  async ipn(path) {
    return Repository.get(`${resource}${path}`).then((response) => {
      return response.data
    })
  },
  // async getPreSignedUpload(payload) {
  //   return Repository.put(`${resource}/pre-signed-upload`, payload).then((response) => {
  //     return response.data
  //   })
  // },
  // async getById(id) {
  //   return Repository.get(`${resource}/${id}`).then((response) => {
  //     return response.data
  //   })
  // },
  // async update(id, payload) {
  //   return Repository.put(`${resource}/${id}`, payload).then((response) => {
  //     return response.data
  //   })
  // },
  // async updateStatus(id, payload) {
  //   return Repository.put(`${resource}/${id}/status`, payload).then((response) => {
  //     return response.data
  //   })
  // },
}
