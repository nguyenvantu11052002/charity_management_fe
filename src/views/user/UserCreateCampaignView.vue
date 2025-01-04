<template>
  <div class="flex flex-col items-center gap-4 py-20">
    <base-banner
      :title="'Tạo chiến dịch'"
      :content="'Tạo chiến dịch mà bạn muốn thực hiện, chúng tôi sẽ xem xét và thực hiện đăng chiến dịch của bạn lên trang web của chúng tôi'"
    ></base-banner>
    <!-- <section class="flex items-center justify-center flex-col w-full py-10">
      <h1 class="font-bold text-3xl text-pink-600">Tạo chiến dịch</h1>
      <p class="text-center">
        Tạo chiến dịch mà bạn muốn thực hiện, chúng tôi sẽ xem xét và thực hiện đăng chiến dịch của
        bạn lên trang web của chúng tôi
      </p>
    </section> -->
    <section class="flex w-full max-w-screen-xl gap-4 mt-4 flex-wrap justify-center">
      <form
        class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
        @submit.prevent="handleSave()"
      >
        <section class="relative">
          <div
            v-if="isUploadingImage"
            class="absolute top-0 bottom-0 left-0 right-0 bg-black/40 flex items-center justify-center text-white"
          >
            Đang tải ảnh lên...
          </div>
          <label class="text-sm font-semibold">Ảnh chủ đề</label>
          <div class="mt-2">
            <div
              class="w-full h-96 border bg-gray-200 text-center flex justify-center items-center text-gray-500"
              v-if="campaign.images.length == 0"
            >
              Upload ảnh
            </div>
            <div
              class="w-full h-96 border bg-gray-200 text-center flex justify-center items-center text-gray-500"
              v-else
            >
              <img :src="currentPreviewImage.url" class="w-full lg:h-96 object-cover" />
            </div>
            <div class="w-full mt-2 gap-2 flex flex-wrap">
              <div
                class="w-24 h-24 cursor-pointer relative group"
                v-for="image in campaign.images"
                :key="image"
                :class="image == currentPreviewImage ? 'border-4 border-pink-500' : ''"
                @focus="isShowDelete"
              >
                <!-- <span
                  class="absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100"
                >
                </span> -->
                <button
                  class="absolute bottom-0 left-0 w-full h-1/3 bg-red-500 text-white flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                  @click="onClickDeleteImage(image)"
                >
                  Xóa
                </button>

                <!-- Nút xóa -->

                <img
                  :src="image.url"
                  class="w-full h-full object-cover"
                  @click.left="currentPreviewImage = image"
                />
              </div>
              <button
                type="button"
                class="flex text -center bg-gray-200 h-24 w-24 items-center"
                @click="addMoreImage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 w-full"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <!-- <img v-else :src="previewImage" class="w-80 h-80 object-cover" /> -->

            <input type="file" class="mt-4 hidden" ref="fileInput" @change="onFileChange" />
          </div>
        </section>
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
          :label="'Ngày dự kiến bắt đầu'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="campaign.startDate"
          v-model:error="error.startDate"
        ></base-input>
        <base-input
          :label="'Ngày dự kiến kết thúc'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="campaign.endDate"
          v-model:error="error.endDate"
        ></base-input>

        <base-select
          :mainTitle="'Danh mục'"
          :options="categories"
          :containerStyle="'flex flex-col '"
          :titleStyle="'text-sm font-semibold'"
          :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
          v-model:model="campaign.category"
        >
        </base-select>
        <div class="flex flex-col items-stretch">
          <label class="text-sm font-semibold" for="username">Nội dung</label>
          <base-button
            :type="'button'"
            :content="'Chèn tất cả ảnh vào nội dung'"
            :style="'  py-2 font-bold text-sm text-black border w-64 h-10  rounded-md'"
            @click="addImageToEdt"
          ></base-button>
          <Editor
            api-key="s8slp19bxol8ou5pyvsnvcqlul0r4ryt1fjvrsfnfuitkw7b"
            :init="{
              height: 1000,
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }"
            v-model="campaign.content"
            @Init="handleEditorInit"
          >
          </Editor>

          <span class="text-red-500 text-xs p-1">{{ error.content }}</span>
        </div>

        <base-button
          :type="'button'"
          :content="'Gửi yêu cầu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md'"
          @click="handleSave"
        ></base-button>
      </form>
    </section>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'

import Editor from '@tinymce/tinymce-vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import ImageRepository from '@/repository/ImageRepository'
import BaseBanner from '@/components/BaseBanner.vue'
// const router = useRouter()
onBeforeMount(() => {
  getAllCategories()
})

const router = useRouter()
const campaignRepository = RepositoryFactory.get('campaigns')
const categoryRepository = RepositoryFactory.get('categories')
const imageRepository = ImageRepository
const campaignImageRepository = RepositoryFactory.get('campaignImages')

const editorRef = ref()
const handleEditorInit = (evt, editor) => {
  editorRef.value = editor
}

const campaign = ref({
  id: '',
  title: '',
  images: [],
  fundraisingGoal: '',
  shortDescription: '',
  content: '',
  category: '',
  startDate: formatDate(new Date()),
  endDate: formatDate(new Date()),
  currentStatus: null,
  creator: null,
})

const categories = ref([])
const error = ref({
  id: '',
  title: '',
  image: '',
  fundraisingGoal: '',
  shortDescription: '',
  content: '',
  category: '',
  startDate: '',
  endDate: '',
  currentStatus: '',
  creator: '',
})
const currentPreviewImage = ref()

const fileInput = ref('')
const onFileChange = (event) => {
  const newImage = event.target.files[0]
  console.log(newImage) // Lấy tệp đầu tiên từ input

  const img = {
    fileName: newImage.name,
    file: newImage,
    url: URL.createObjectURL(newImage),
  }

  const existingImages = campaign.value.images.filter((image) => image.fileName === img.fileName)
  if (existingImages.length > 0) {
    console.log('Image with the same name already exists:', existingImages)
  } else {
    handleUploadImage(img)
  }
}

function addMoreImage() {
  fileInput.value.click()
}

const isUploadingImage = ref(false)

function onClickDeleteImage(imageToDelete) {
  const imageDeleteId = imageToDelete.id
  campaign.value.images = campaign.value.images.filter((image) => image.id !== imageToDelete.id)
  deleteImageOfContent(imageToDelete)
  campaignImageRepository
    .delete(imageDeleteId)
    .then((response) => {
      console.log(response.data)
      currentPreviewImage.value = campaign.value.images[0]
    })
    .catch((err) => {
      console.log(err)
    })
}

function addImageToEdt() {
  console.log(campaign.value.images)
  for (const img of campaign.value.images) {
    editorRef.value.insertContent(`
      <img id="${img.id}" src="${img.url}"  />
    `)
    console.log(`
      <img id="${img.id}" src="${img.url}"  />
    `)
  }
}
function deleteImageOfContent(image) {
  const img = editorRef.value.dom.get(image.id)
  if (img) {
    img.remove()
  }
}

async function handleUploadImage(image) {
  isUploadingImage.value = true
  campaignImageRepository
    .create(image)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      imageRepository
        .upload(data.preSignedUrl, image.file)
        .then((res) => {
          console.log(res)
          campaign.value.images.push(data)
          currentPreviewImage.value = data
          // addToEdt(data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setTimeout(() => {
            isUploadingImage.value = false
          }, 1000)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

async function getAllCategories() {
  categoryRepository
    .getAll('')
    .then((response) => {
      console.log(response)
      const dataConverted = response.data.content.map((cat) => ({
        id: cat.id,
        title: cat.name,
        value: cat,
      }))
      categories.value = dataConverted
      campaign.value.category = dataConverted[0].value
    })
    .catch((err) => {
      console.log(err)
    })
}

async function handleSave() {
  resetError()
  const haveError = validateCampaign()
  console.log(haveError)
  if (!haveError) {
    campaignRepository
      .create(campaign.value)
      .then((response) => {
        console.log('Create campaign: ')
        console.log(response)
        campaign.value = response.data
        return response.data
      })
      .then((response) => {
        router.replace({
          name: 'home-route',
          // params: { id: `${campaign.value.id}` },
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function validateCampaign() {
  let haveError = false
  if (!campaign.value.title) {
    error.value.title = 'Tilte must be not null'
    haveError = true
  }
  if (!campaign.value.shortDescription) {
    error.value.shortDescription = 'ShortDescription must be not null'
    haveError = true
  }
  if (!campaign.value.content) {
    error.value.content = 'Content must be not null'
    haveError = true
  }
  if (!campaign.value.fundraisingGoal || campaign.value.fundraisingGoal <= 0) {
    error.value.fundraisingGoal = 'FundraisingGoal must be not null and greater 0'
    haveError = true
  }
  console.log(!campaign.value.startDate)
  if (!campaign.value.startDate) {
    error.value.startDate = 'Start date must be not null'

    haveError = true
  }
  if (!campaign.value.endDate) {
    error.value.endDate = 'End date must be not null'
    haveError = true
  }
  const startDate = new Date(`${campaign.value.startDate} 00:00:00`)
  const endDate = new Date(`${campaign.value.endDate} 00:00:00`)
  const currentDateTime = new Date()
  const currentDate = new Date(
    `${currentDateTime.getFullYear()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} 00:00:00`
  )
  console.log(startDate < currentDate)
  if (startDate < currentDate) {
    console.log('End date greater or equals start date')
    error.value.startDate = 'Start date must be greater or equals current date'
    haveError = true
  }
  if (endDate < startDate) {
    console.log('End date greater or equals start date')
    error.value.endDate = 'End date must be greater or equals start date'
    haveError = true
  }
  return haveError
}

function resetError() {
  error.value.id = ''
  error.value.title = ''
  error.value.image = ''
  error.value.fundraisingGoal = ''
  error.value.shortDescription = ''
  error.value.content = ''
  error.value.category = ''
  error.value.startDate = ''
  error.value.endDate = ''
  error.value.currentStatus = ''
  error.value.creator = ''
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = date.getFullYear()

  return `${year}-${month}-${day}`
}
</script>

<style>
</style>
