<template>
  <div class="flex flex-col items-center gap-10 relative top-36">
    <app-logo :to="'home-route'"></app-logo>
    <form
      @submit.prevent="handleLogin()"
      class="bg-white border-gray-100 shadow-lg border rounded-lg flex flex-col w-full max-w-lg p-10 justify-start gap-4"
    >
      <base-input
        :label="'Email'"
        :type="'email'"
        :placeholder="'Email'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.email"
        v-model:error="error.email"
      ></base-input>
      <base-input
        :label="'Mật khẩu'"
        :type="'password'"
        :placeholder="'Mật khẩu'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.password"
        v-model:error="error.password"
      ></base-input>
      <div
        class="text-right text-sm font-bold w-full min-w-full mt-3 hover:text-pink-500 text-pink-400"
      >
        <router-link :to="{ name: 'forgot-password-route' }"
          ><span>Quên mật khẩu</span></router-link
        >
      </div>
      <base-button
        :content="'Đăng nhập'"
        :style="'min-w-full py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md'"
      ></base-button>
    </form>

    <div class="flex items-center gap-4">
      <span>Bạn chưa có tài khoản?</span>
      <base-link
        :to="'register-route'"
        :title="'Đăng ký ngay'"
        :defaultStyle="'bg-indigo-500 hover:bg-indigo-600 text-white flex justify-center '"
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
import { useAuthStore } from '@/store/authStore'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const authenticationRepository = RepositoryFactory.get('authentication')
const error = ref({
  email: '',
  password: '',
})
const formData = ref({
  email: '',
  password: '',
})

const { currentUser } = storeToRefs(authStore)

// const router = useRouter()

const handleLogin = () => {
  authenticationRepository
    .login(formData.value)
    .then((response) => {
      console.log(response)
      currentUser.value = response.data
      console.log(response.data.infor.roles.some((role) => role.name === 'ROLE_ADMIN'))
      if (response.data.infor.roles.some((role) => role.name === 'ROLE_ADMIN')) {
        // The user has the ROLE_ADMIN role
        router.replace({ name: 'admin-home-route' })
      } else {
        router.replace({ name: 'home-route' })
      }
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.email = response.email ? response.email : error.value.email
      error.value.email = response.BAD_CREDENTIALS ? response.BAD_CREDENTIALS : error.value.email
      error.value.password = response.password ? response.password : error.value.password
      error.value.password = response.BAD_CREDENTIALS
        ? response.BAD_CREDENTIALS
        : error.value.password

      // error.value.email = response.USER_NOT_EXISTED
      // const flatError = []
      // for (const [code, message] of Object.entries(response)) {
      //   console.log(code)
      //   flatError.push(message)
      //   error.value.email =
      // }
      // error.value = flatError[0]
      // console.log(err.response.data.errors)
    })
}
</script>

<style>
</style>
