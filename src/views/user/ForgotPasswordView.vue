<template>
  <div class="flex flex-col items-center gap-10 relative top-36">
    <app-logo :to="'home-route'"></app-logo>
    <form
      @submit.prevent="handleForgotPassword()"
      class="bg-white border-gray-100 shadow-lg border rounded-lg flex flex-col w-full max-w-lg p-10 justify-start gap-4"
    >
      <base-input
        :label="'Email'"
        :type="'email'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.email"
        v-model:error="error.email"
      ></base-input>
      <base-button
        :content="'Quên mật khẩu'"
        :style="'min-w-full py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md'"
      ></base-button>
    </form>

    <div class="flex items-center gap-4">
      <span>Bạn chưa có tài khoản?</span>
      <base-link
        :to="'register-route'"
        :title="'Đăng ký ngay'"
        :defaultStyle="'bg-indigo-500 hover:bg-indigo-600 text-white flex justify-center'"
      ></base-link>
    </div>
  </div>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import BaseLink from '@/components/BaseLink.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { ref } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRouter } from 'vue-router'
const router = useRouter()
const authenticationRepository = RepositoryFactory.get('authentication')
const error = ref({
  email: '',
})
const formData = ref({
  email: '',
})

// const { currentUser } = storeToRefs(authStore)

// const router = useRouter()

const handleForgotPassword = () => {
  authenticationRepository
    .forgotPassword(formData.value)
    .then((response) => {
      console.log(response)
      router.replace({ name: 'reset-password-route' })
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.email = response.email ? response.email : error.value.email
      error.value.email = response.USER_NOT_EXISTED ? response.USER_NOT_EXISTED : error.value.email
    })
}
</script>

<style>
</style>
