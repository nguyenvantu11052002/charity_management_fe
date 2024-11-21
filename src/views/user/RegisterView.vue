<template>
  <div class="flex flex-col items-center gap-10 relative top-36">
    <app-logo :to="'home-route'"></app-logo>
    <form
      @submit.prevent="handleRegister()"
      class="bg-white border-gray-100 shadow-lg border rounded-lg flex flex-col w-full max-w-lg p-10 justify-start gap-4"
    >
      <!-- <label-error v-model:error="error"></label-error> -->
      <base-input
        :label="'Email'"
        :type="'email'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.email"
        v-model:error="error.email"
      ></base-input>
      <base-input
        :label="'Mật khẩu'"
        :type="'password'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.password"
        v-model:error="error.password"
      ></base-input>
      <base-input
        :label="'Họ và tên đệm'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.firstName"
        v-model:error="error.firstName"
      ></base-input>
      <base-input
        :label="'Tên'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.lastName"
        v-model:error="error.lastName"
      ></base-input>
      <base-input
        :label="'Ngày sinh'"
        :type="'date'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.dob"
        v-model:error="error.dob"
      ></base-input>
      <base-input
        :label="'Điện thoại'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid border-gray-200 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="formData.phone"
        v-model:error="error.phone"
      ></base-input>

      <base-button
        :content="'Đăng ký'"
        :style="'min-w-full py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md'"
      ></base-button>
    </form>

    <div class="flex items-center gap-4">
      <span>Bạn đã có tài khoản?</span>
      <base-link
        :to="'login-route'"
        :title="'Đăng nhập'"
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
// import LabelError from '@/components/LabelError.vue'
import { ref } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRouter } from 'vue-router'
const router = useRouter()
const userRepository = RepositoryFactory.get('users')
const error = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  uncategories: '',
})
const formData = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
})

const handleRegister = () => {
  userRepository
    .register(formData.value)
    .then((response) => {
      console.log(response)
      router.replace({ name: 'home-route' })
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.email = response.email ? response.email : error.value.email
      error.value.password = response.password ? response.password : error.value.password
      error.value.firstName = response.firstName ? response.firstName : error.value.firstName
      error.value.lastName = response.lastName ? response.lastName : error.value.lastName
      error.value.dob = response.dob ? response.dob : error.value.dob
      error.value.phone = response.phone ? response.phone : error.value.phone
      error.value.email = response.USER_EXISTED ? response.USER_EXISTED : error.value.email
      // const flatError = []
      // for (const [code, message] of Object.entries(response)) {
      //   console.log(code)
      //   error.value.
      // }
      // console.log(err.response.data.errors)
    })
}
</script>

<style>
</style>
