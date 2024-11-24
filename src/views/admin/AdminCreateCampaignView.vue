<template>
  <div class="mx-4 my-10 md:my-2 shadow-lg md:mx-10">
    <form
      class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
      @submit.prevent="handleSave()"
    >
      <div>
        <label class="text-sm font-semibold">Ảnh chủ đề</label>
        <div class="mt-2">
          <div
            class="w-64 h-64 border bg-gray-200 text-center flex justify-center items-center text-gray-500"
            v-if="!previewImage"
          >
            Vui lòng chọn ảnh
          </div>
          <img v-else :src="previewImage" class="w-80 h-80 object-cover" />
          <input type="file" @change="onFileChange" class="mt-4" />
        </div>
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
      {{ campaign.startTime }}
      <base-input
        :label="'Ngày dự kiến kết thúc'"
        :type="'date'"
        :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
        :min="'2024-11-18'"
        v-model:data="campaign.endTime"
        v-model:error="error.endTime"
      ></base-input>
      {{ campaign.endTime }}
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
  startTime: formatDate(new Date()),
  endTime: formatDate(new Date()),
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
const previewImage = ref()

const onFileChange = (event) => {
  const file = event.target.files[0] // Lấy tệp đầu tiên từ input
  previewImage.value = URL.createObjectURL(file)
  campaign.value.image = file
  console.log(previewImage.value)
}

async function handleSave() {
  resetError()
  campaignRepository
    .create({
      title: campaign.value.title,
      image: campaign.value.image,
      fundraisingGoal: campaign.value.fundraisingGoal,
      shortDescription: campaign.value.shortDescription,
      content: campaign.value.content,
      category: campaign.value.category,
      startTime: formatDateTime(campaign.value.startTime),
      endTime: formatDateTime(campaign.value.endTime),
      currentStatus: campaign.value.currentStatus,
      creator: campaign.value.creator,
    })
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
      error.value.title = response.title
      error.value.image = response.image
      error.value.fundraisingGoal = response.fundraisingGoal
      error.value.shortDescription = response.shortDescription
      error.value.content = response.content
      error.value.category = response.category
      error.value.startTime = response.startTime
      error.value.endTime = response.endTime
      error.value.currentStatus = response.currentStatus
      error.value.creator = response.creator
      error.value.startTime = response.CAMPAIGN_START_TIME_INVALID
      error.value.endTime = response.CAMPAIGN_END_TIME_INVALID
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

function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
function formatDateTime(date) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = d.getFullYear()
  // const hours = String(d.getHours()).padStart(2, '0')
  // const minutes = String(d.getMinutes()).padStart(2, '0')
  // const seconds = String(d.getSeconds()).padStart(2, '0')
  return `${day}/${month}/${year} 00:00:00`
}
</script>

<style>
</style>
