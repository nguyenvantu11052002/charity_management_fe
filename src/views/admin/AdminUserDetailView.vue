<template>
  <div class="relative overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <form
        class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
        @submit.prevent="handleSave()"
      >
        <div class="flex flex-col items-center justify-center">
          <!-- <img
          class="h-48 w-48"
          src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
        /> -->
          <div class="flex flex-col items-center" :class="!isEditAvatar ? 'hidden' : ''">
            <img :src="newAvatar" class="w-48 h-48 rounded-full object-cover" v-if="newAvatar" />
            <avatar-icon :width="'192px'" :height="'192px'" v-else></avatar-icon>
            <input type="file" @change="onFileChange" class="w-full" />
            <div class="flex gap-5 w-full my-4">
              <base-button
                :type="'button'"
                :content="'Lưu'"
                :style="' max-w-64 basis-1/2 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
                @click="updateAvatar"
              ></base-button>
              <base-button
                :type="'button'"
                :content="'Hủy'"
                :style="' max-w-64 basis-1/2 py-2 font-bold text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
                @click="cancelUpdateAvatar"
                >Hủy</base-button
              >
            </div>
          </div>
          <div :class="isEditAvatar ? 'hidden' : ''">
            <img
              :src="user.avatar"
              class="w-48 h-48 rounded-full object-cover"
              v-if="user.avatar"
            />
            <avatar-icon :width="'192px'" :height="'192px'" v-else></avatar-icon>
            <base-button
              :type="'button'"
              :content="'Thêm ảnh mới'"
              :style="' max-w-64 py-2 w-full font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md my-4'"
              @click="isEditAvatar = !isEditAvatar"
              >Edit</base-button
            >
          </div>
        </div>
        <!-- <label-error v-model:error="error"></label-error> -->
        <base-input
          :label="'Id'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.id"
          :readonly="'true'"
        ></base-input>
        <base-input
          :label="'Email'"
          :type="'email'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.email"
          :readonly="'true'"
        ></base-input>
        <base-input
          :label="'Họ và tên đệm'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.firstName"
          v-model:readonly="isNonEdit"
          v-model:error="error.firstName"
        ></base-input>
        <base-input
          :label="'Tên'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.lastName"
          v-model:readonly="isNonEdit"
          v-model:error="error.lastName"
        ></base-input>
        <base-input
          :label="'Ngày sinh'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.dob"
          v-model:error="error.dob"
          v-model:readonly="isNonEdit"
        ></base-input>
        <base-input
          :label="'Điện thoại'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.phone"
          v-model:readonly="isNonEdit"
          v-model:error="error.phone"
        ></base-input>
        <base-input
          :label="'Điạ chỉ'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="user.address"
          v-model:readonly="isNonEdit"
          v-model:error="error.address"
        ></base-input>
        <div class="flex gap-4 md:gap-8 justify-between flex-col md:flex-row md:justify-start">
          <base-select
            :mainTitle="'Giới tính'"
            :options="[
              { id: 'NAM', title: 'Nam', value: 'Nam' },
              { id: 'NỮ', title: 'Nữ', value: 'Nữ' },
            ]"
            :containerStyle="'flex flex-col w-20'"
            :titleStyle="'text-sm font-semibold'"
            :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
            v-model:model="user.gender"
            v-model:disabled="isNonEdit"
          >
          </base-select>

          <base-select
            :mainTitle="'Tài khoản bị khóa'"
            :options="[
              { id: 'true', title: 'TRUE', value: 'true' },
              { id: 'false', title: 'FALSE', value: 'false' },
            ]"
            :containerStyle="'flex flex-col w-32'"
            :titleStyle="'text-sm font-semibold'"
            :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
            v-model:model="user.locked"
            v-model:disabled="isNonEdit"
          >
          </base-select>
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
              v-model:disabled="isNonEdit"
              v-model:error="error.roles"
            ></base-check-box>
          </div>
        </div>

        <base-button
          :type="'button'"
          :content="'Chỉnh sửa'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
          @click="isNonEdit = !isNonEdit"
          v-if="isNonEdit"
        ></base-button>
        <base-button
          v-else
          :type="'submit'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
        ></base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import AvatarIcon from '@/components/icons/AvatarIcon.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckBox from '@/components/BaseCheckBox.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import ImageRepository from '@/repository/ImageRepository'
// const router = useRouter()
const route = useRoute()
const userRepository = RepositoryFactory.get('users')
const roleRepository = RepositoryFactory.get('roles')
const imageRepository = ImageRepository
const user = ref({})
const roles = ref({})
const newAvatar = ref('')
const selectedFile = ref()
const isNonEdit = ref(true)
const isEditAvatar = ref(false)
const error = ref({
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  address: '',
  roles: '',
})
getUserById()
getRoles()
async function getUserById() {
  userRepository
    .getById(route.params.id)
    .then((response) => {
      console.log(response)
      user.value = response.data
      newAvatar.value = user.value.avatar ? user.value.avatar : ''
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(route.params.id)
}
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
    .update(route.params.id, user.value)
    .then((response) => {
      console.log(response)
      user.value = response.data
      isNonEdit.value = !isNonEdit.value
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.firstName = response.firstName ? response.firstName : error.value.firstName
      error.value.lastName = response.lastName ? response.lastName : error.value.lastName
      error.value.dob = response.dob ? response.dob : error.value.dob
      error.value.phone = response.phone ? response.phone : error.value.phone
      error.value.email = response.USER_EXISTED ? response.USER_EXISTED : error.value.email
      error.value.roles = response.roles ? response.roles : error.value.roles
    })
  console.log(route.params.id)
}

async function updateAvatar() {
  console.log(newAvatar.value)
  console.log(user.value.avatar)
  console.log(newAvatar.value === user.value.avatar)
  if (newAvatar.value !== user.value.avatar) {
    userRepository
      .updateAvatar(user.value.id, {
        fileNames: [selectedFile.value.name],
      })
      .then((response) => {
        console.log(response)
        imageRepository.upload(response.data.url, selectedFile.value)
        user.value.avatar = response.data.linkImage
        setTimeout(() => {
          user.value.avatar = `${response.data.linkImage}?t=${Date.now()}`
          isEditAvatar.value = !isEditAvatar.value
          newAvatar.value = user.value.avatar
          selectedFile.value = ''
        }, 800)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function cancelUpdateAvatar() {
  isEditAvatar.value = !isEditAvatar.value
  newAvatar.value = user.value.avatar
}

const onFileChange = (event) => {
  const file = event.target.files[0] // Lấy tệp đầu tiên từ input
  newAvatar.value = URL.createObjectURL(file)
  selectedFile.value = file
}
function resetError() {
  error.value.firstName = ''
  error.value.lastName = ''
  error.value.dob = ''
  error.value.phone = ''
  error.value.email = ''
  error.value.roles = ''
}
</script>

<style>
</style>
