export default {
  saveUser(user) {
    localStorage.setItem('user', user)
  },
  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : ''
  },
  getUserInfor() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user).infor : ''
  },
  getAccessToken() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user).token.accessToken : ''
  },
  setAccessToken(accessToken) {
    const user = JSON.parse(localStorage.getItem('user'))
    user.token.accessToken = accessToken
    localStorage.setItem('user', user)
  },
  getRefreshToken() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user).token.refreshToken : ''
  },
  clearUser() {
    localStorage.removeItem('user')
  },
}
