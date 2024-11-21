<template>
  <div class="mx-4 my-10 md:my-2 shadow-lg md:mx-10">
    <form
      class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
      @submit.prevent="handleSave()"
    >
      <div class="flex flex-col items-center justify-center">
        <avatar-icon :width="'100px'" :height="'100px'"></avatar-icon>
        <img src="" />
        <input type="file" @change="onFileChange" />
      </div>
      <base-input
        :label="'Tiêu đề'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="campaign.title"
        v-model:error="error.title"
      ></base-input>
      <base-input
        :label="'Mục tiêu chiến dịch'"
        :type="'number'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="campaign.fundraisingGoal"
        v-model:error="error.fundraisingGoal"
      ></base-input>
      <base-input
        :label="'Giới thiệu ngắn'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="campaign.shortDescription"
        v-model:error="error.shortDescription"
      ></base-input>
      <base-input
        :label="'Nội dung'"
        :type="'text'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="campaign.content"
        v-model:error="error.content"
      ></base-input>
      <base-input
        :label="'Ngày dự kiến bắt đầu'"
        :type="'date'"
        :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="campaign.startTime"
        v-model:error="error.startTime"
      ></base-input>
      <base-input
        :label="'Ngày dự kiến kết thúc'"
        :type="'date'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        :min="'2024-11-18'"
        v-model:data="campaign.endTime"
        v-model:error="error.endTime"
      ></base-input>
      <!-- <div class="flex gap-4 md:gap-8 justify-between flex-col md:flex-row md:justify-start">
        <base-select
          :mainTitle="'Giới tính'"
          :options="['Nam', 'Nữ']"
          :containerStyle="'flex flex-col w-20'"
          :titleStyle="'text-sm font-semibold'"
          :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
          v-model:model="user.gender"
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
            v-model:error="error.roles"
          ></base-check-box>
        </div>
      </div> -->

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
import AvatarIcon from '@/components/icons/AvatarIcon.vue'
// import BaseCheckBox from '@/components/BaseCheckBox.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
// const router = useRouter()
const route = useRoute()
const router = useRouter()
const campaignRepository = RepositoryFactory.get('campaigns')

const campaign = ref({
  id: '',
  title: '',
  image: '',
  fundraisingGoal: '',
  shortDescription: '',
  content: '',
  category: '',
  startTime: '',
  endTime: '',
  currentStatus: '',
  creator: '',
})
const error = ref({
  id: '',
  title: '',
  images: '',
  fundraisingGoal: '',
  shortDescription: '',
  content: '',
  category: '',
  startTime: '',
  endTime: '',
  currentStatus: '',
  creator: '',
})

// getUserById()
// getRoles()
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
// async function getRoles() {
//   roleRepository
//     .getAll('')
//     .then((response) => {
//       console.log(response)
//       roles.value = response.data.content
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }

// function onFileChange(e) {
//       var files = e.target.files || e.dataTransfer.files;
//       if (!files.length)
//         return;
//       createImage(files[0]);
// }
// function  createImage(file) {
//       var image = new Image();
//       var reader = new FileReader();

//       reader.onload = (e) => {
//         vm.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
// }

async function handleSave() {
  resetError()
  campaignRepository
    .create(campaign.value)
    .then((response) => {
      console.log(response)
      campaign.value = response.data
      router.replace({
        name: 'admin-campaign-detail-route',
        params: { id: `${campaign.value.id}` },
      })
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
    })
  console.log(route.params.id)
}
function resetError() {
  error.value.id = ''
  error.value.title = ''
  error.value.images = ''
  error.value.fundraisingGoal = ''
  error.value.shortDescription = ''
  error.value.content = ''
  error.value.category = ''
  error.value.startTime = ''
  error.value.endTime = ''
  error.value.currentStatus = ''
  error.value.creator = ''
}
</script>

<style>
</style>
