import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

const WS_URL = 'http://localhost:8080/api/v1/ws'
const RETRY_DELAY = 3000
const MAX_RETRIES = 6

export const useSocketStore = defineStore('websocket', () => {
  const client = ref(null)
  const subs = ref({})
  const connected = ref(false)
  const retryCount = ref(0)
  const pendingCallbacks = ref([])

  const isConnected = computed(() => connected.value)

  const resetState = () => {
    connected.value = false
    client.value = null
    retryCount.value = 0
    subs.value = {}
  }

  const handleMessage = (topic, message) => {
    try {
      const data = JSON.parse(message.body)
      subs.value[topic]?.callback(topic, data)
    } catch (err) {
      console.error('Message parsing error:', err)
    }
  }

  const connect = async () => {
    if (client.value || retryCount.value >= MAX_RETRIES) return

    try {
      const socket = new SockJS(WS_URL)
      client.value = Stomp.over(socket)
      // client.value.debug = null // Disable debug logs

      await new Promise((resolve, reject) => {
        client.value.connect(
          {},
          () => {
            connected.value = true
            retryCount.value = 0
            pendingCallbacks.value.forEach((cb) => cb())
            pendingCallbacks.value = []
            resolve()
          },
          async (error) => {
            console.error('WS error:', error)
            resetState()
            retryCount.value++

            if (retryCount.value < MAX_RETRIES) {
              setTimeout(connect, RETRY_DELAY)
            }
            reject(error)
          },
        )
      })
    } catch (err) {
      console.error('Connection error:', err)
      throw err
    }
  }

  const disconnect = async () => {
    if (!client.value) return

    Object.keys(subs.value).forEach(unsubscribe)
    client.value.disconnect()
    await Promise.all(Object.keys(subs.value).map((key) => unsubscribe(key)))

    // Ngắt kết nối client
    await new Promise((resolve) => {
      client.value.disconnect()
      client.value.onclose = () => {
        console.log('Client disconnected')
        resolve()
      }
    })
    resetState()
  }

  const subscribe = async (topic, callback) => {
    if (subs.value[topic]) return

    if (!connected.value) {
      pendingCallbacks.value.push(() => subscribe(topic, callback))
      await connect()
      return
    }

    subs.value[topic] = {
      subscription: client.value.subscribe(topic, (msg) => handleMessage(topic, msg)),
      callback,
    }
  }

  const unsubscribe = (topic) => {
    console.log('unsubcribe topic' + topic + 'at store')
    subs.value[topic]?.subscription?.unsubscribe()
    delete subs.value[topic]
  }

  const cleanSubcribe = () => {
    Object.keys(subs.value).forEach((key) => unsubscribe(key))
    console.log('All subscriptions cleared')
  }

  return {
    isConnected,
    subs,
    connect,
    disconnect,
    cleanSubcribe,
    subscribe,
    unsubscribe,
  }
})
