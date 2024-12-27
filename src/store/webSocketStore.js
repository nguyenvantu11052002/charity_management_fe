// // src/services/websocketService.js

// import SockJS from 'sockjs-client'
// import Stomp from 'webstomp-client'

// const WebSocketService = {
//   stompClient: null,

//   connect(campaignId, onMessageReceived) {
//     const socket = new SockJS('http://localhost:8080/api/v1/ws') // Đường dẫn đến SockJS endpoint
//     this.stompClient = Stomp.over(socket)

//     this.stompClient.connect(
//       {},
//       (frame) => {
//         console.log('Connected: ' + frame)

//         // Đăng ký nhận các tin nhắn từ campaign
//         this.stompClient.subscribe(`/topic/campaigns/${campaignId}`, (message) => {
//           onMessageReceived(JSON.parse(message.body)) // Xử lý tin nhắn nhận được
//         })
//       },
//       (error) => {
//         console.error('WebSocket error: ', error)
//       },
//     )
//   },

//   disconnect() {
//     if (this.stompClient) {
//       this.stompClient.disconnect()
//       console.log('Disconnected')
//     }
//   },
// }

// export default WebSocketService
// src/stores/websocketStore.js

import { defineStore } from 'pinia'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export const useWebSocketStore = defineStore('websocket', {
  state: () => ({
    stompClient: null,
    subscriptions: {},
  }),

  actions: {
    isConnected() {
      return this.stompClient
    },

    connect(onConnected, onError) {
      if (this.stompClient) return // Nếu đã kết nối, không kết nối lại

      console.log('NEW CONNECTED')
      const socket = new SockJS('http://localhost:8080/api/v1/ws') // Đường dẫn WebSocket
      this.stompClient = Stomp.over(socket)

      this.stompClient.connect(
        {},
        (frame) => {
          console.log('Connected to WebSocket:', frame)
          if (onConnected) onConnected()
        },
        (error) => {
          console.error('WebSocket error:', error)
          if (onError) onError(error)
        },
      )
    },

    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect(() => {
          console.log('Disconnected from WebSocket')
        })
        this.stompClient = null
        this.subscriptions = {}
      }
    },

    subscribe(topic, callback) {
      if (!this.stompClient || !this.stompClient.connected) {
        console.warn('WebSocket is not connected. Connecting now...')
        this.connect(() => {
          console.log('WebSocket connected. Subscribing to topic...')
        })
      }

      // Kiểm tra nếu đã subscribe
      if (this.subscriptions[topic]) {
        console.warn(`Already subscribed to topic: ${topic}`)
        return
      }

      const subscription = this.stompClient.subscribe(topic, (message) => {
        callback(topic, JSON.parse(message.body)) // Xử lý tin nhắn
      })

      this.subscriptions[topic] = subscription
      console.log(`Subscribed to topic: ${topic}`)
    },

    unsubscribe(topic) {
      if (!this.stompClient || !this.subscriptions[topic]) {
        console.warn(`Not subscribed to topic: ${topic}`)
        return
      }

      this.subscriptions[topic].unsubscribe()
      delete this.subscriptions[topic]
      console.log(`Unsubscribed from topic: ${topic}`)
    },
  },
})
