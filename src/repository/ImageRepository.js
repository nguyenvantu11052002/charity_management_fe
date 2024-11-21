// import Repository from './Repository'
// const resource = '/images'
import axios from 'axios'
export default {
  // async getPreSigned(payload) {
  //   return Repository.post(`${resource}`, payload).then((response) => {
  //     return response.data
  //   })
  // },
  async upload(presignUrl, file) {
    try {
      // PUT yêu cầu file trực tiếp
      const response = await axios.put(presignUrl, file, {
        headers: {
          'Content-Type': file.type, // Đảm bảo gửi đúng loại MIME của tệp
        },
      })
      console.log('Upload successful:', response)
    } catch (error) {
      console.error('Upload failed:', error.response || error.message)
    }
  },
}
