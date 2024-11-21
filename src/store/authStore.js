import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const LocalStorageRepository = RepositoryFactory.get('localStorage')
export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref('')

  const userInStorage = LocalStorageRepository.getUser()
  if (userInStorage) {
    currentUser.value = userInStorage
  }

  watch(
    () => currentUser,
    (currentUser) => {
      if (currentUser.value !== '') {
        LocalStorageRepository.saveUser(JSON.stringify(currentUser.value))
      } else {
        LocalStorageRepository.clearUser()
      }
    },
    { deep: true },
  )

  const userInfor = computed(() => {
    return currentUser.value ? currentUser.value.infor : ''
  })

  return { currentUser, userInfor }
})
