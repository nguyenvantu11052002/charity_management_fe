<template>
  <div class="mx-4 my-10 md:my-2 shadow-lg md:mx-10">
    <form
      class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
      @submit.prevent="handleSave()"
    >
      <!-- <label-error v-model:error="error"></label-error> -->
      <!-- <base-input
        :label="'Id'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.id"
        :readonly="'true'"
      ></base-input> -->
      <base-input
        :label="'Email'"
        :type="'email'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.email"
        v-model:error="error.email"
      ></base-input>
      <base-input
        :label="'Password'"
        :type="'password'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.password"
        v-model:error="error.password"
      ></base-input>
      <base-input
        :label="'Họ và tên đệm'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.firstName"
        v-model:error="error.firstName"
      ></base-input>
      <base-input
        :label="'Tên'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.lastName"
        v-model:error="error.lastName"
      ></base-input>
      <base-input
        :label="'Ngày sinh'"
        :type="'date'"
        :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.dob"
        v-model:error="error.dob"
      ></base-input>
      <base-input
        :label="'Điện thoại'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.phone"
        v-model:error="error.phone"
      ></base-input>
      <base-input
        :label="'Điạ chỉ'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="user.address"
        v-model:error="error.address"
      ></base-input>
      <div class="flex gap-4 md:gap-8 justify-between flex-col md:flex-row md:justify-start">
        <base-select
          :mainTitle="'Giới tính'"
          :options="['Nam', 'Nữ']"
          :containerStyle="'flex flex-col w-20'"
          :titleStyle="'text-sm font-semibold'"
          :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
          v-model:model="user.gender"
        >
        </base-select>

        <!-- <base-select
          :mainTitle="'Tài khoản bị khóa'"
          :options="['true', 'false']"
          :containerStyle="'flex flex-col w-32'"
          :titleStyle="'text-sm font-semibold'"
          :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
          v-model:model="user.locked"
        >
        </base-select> -->
        <div class="flex flex-col">
          <label class="text-sm font-semibold">Roles</label>
          <span class="text-red-500 text-xs">{{ error.roles }}</span>

          <base-check-box
            v-for="role in roles"
            :key="role.id"
            :label="role.name"
            :value="role"
            :containerStyle="'flex justify-between gap-2 w-32 '"
            :labelStyle="'text-md '"
            :checkboxStyle="'w-5 accent-indigo-500'"
            v-model:data="user.roles"
            v-model:error="error.roles"
          ></base-check-box>
        </div>
      </div>

      <base-button
        :type="'submit'"
        :content="'Lưu'"
        :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
      ></base-button>
    </form>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckBox from '@/components/BaseCheckBox.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
// const router = useRouter()
const route = useRoute()
const router = useRouter()
const userRepository = RepositoryFactory.get('users')
const roleRepository = RepositoryFactory.get('roles')
const user = ref({
  id: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  gender: 'Nam',
  address: '',
  roles: [],
})
const roles = ref({})
const error = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  address: '',
  roles: '',
})
// getUserById()
getRoles()
// async function getUserById() {
//   userRepository
//     .getById(route.params.id)
//     .then((response) => {
//       console.log(response)
//       user.value = response.data
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   console.log(route.params.id)
// }
async function getRoles() {
  roleRepository
    .getAll('')
    .then((response) => {
      console.log(response)
      roles.value = response.data.content
    })
    .catch((err) => {
      console.log(err)
    })
}

async function handleSave() {
  resetError()
  userRepository
    .create(user.value)
    .then((response) => {
      console.log(response)
      user.value = response.data
      router.replace({ name: 'admin-user-detail-route', params: { id: `${user.value.id}` } })
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.email = response.email ? response.email : error.value.email
      error.value.email = response.USER_EXISTED ? response.USER_EXISTED : error.value.email
      error.value.password = response.password ? response.password : error.value.password
      error.value.firstName = response.firstName ? response.firstName : error.value.firstName
      error.value.lastName = response.lastName ? response.lastName : error.value.lastName
      error.value.dob = response.dob ? response.dob : error.value.dob
      error.value.address = response.address ? response.address : error.value.address

      error.value.phone = response.phone ? response.phone : error.value.phone
      error.value.email = response.USER_EXISTED ? response.USER_EXISTED : error.value.email
      error.value.roles = response.roles ? response.roles : error.value.roles
    })
  console.log(route.params.id)
}
function resetError() {
  error.value.email = ''
  error.value.password = ''
  error.value.firstName = ''
  error.value.lastName = ''
  error.value.address = ''
  error.value.dob = ''
  error.value.phone = ''
  error.value.email = ''
  error.value.roles = ''
}
</script>

<style>
</style>
