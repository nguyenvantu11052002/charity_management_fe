<template>
  <div v-if="!isLoading" class="relative overflow-x-hidden min-h-screen w-full">
    <form class="grid grid-col-1 lg:grid-cols-5 p-10 gap-4 md:ml-64 md:mt-10 mt-20">
      <!-- campaign Images -->
      <div class="col-span-1 lg:col-span-3 gap-4">
        <div
          class="flex items-center justify-center p-10 bg-white flex-col col-span-1 lg:col-span-3"
        >
          <div
            class="w-full h-96 border bg-gray-200 text-center flex justify-center items-center text-gray-500"
          >
            <img :src="currentPreviewImage.url" class="w-full max-w-5xl lg:h-96 object-cover" />
          </div>
          <div class="w-full mt-2 gap-2 flex flex-wrap">
            <div
              class="w-24 h-24 cursor-pointer"
              v-for="image in campaign.images"
              :key="image"
              :class="image == currentPreviewImage ? 'border-4 border-pink-500' : ''"
              @click="currentPreviewImage = image"
            >
              <img :src="image.url" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      <!-- campaign detail and control -->
      <div class="bg-white border shadow-lg p-4 col-span-1 lg:col-span-2">
        <div
          class="font-bold text-lg"
          :class="[
            campaign.currentStatus === 'CREATED' ? 'text-indigo-500' : '',
            campaign.currentStatus === 'REJECTED' ? 'text-red-600' : '',
            campaign.currentStatus === 'SCHEDULED' ? 'text-pink-500' : '',
            campaign.currentStatus === 'STARTED' ? 'text-green-500' : '',
            campaign.currentStatus === 'STOPPED' ? 'text-red-500' : '',
            campaign.currentStatus === 'ENDED' ? 'text-red-500' : '',
            campaign.currentStatus === 'RESULTED' ? 'text-red-800' : '',
          ]"
        >
          {{ campaign.currentStatus }}
        </div>

        <section class="mt-4 gap-2 flex flex-col">
          <div class="flex">
            <div class="font-medium w-36">Tiêu đề:</div>
            <h2 class="text-gray-700 flex-1">{{ campaign.title }}</h2>
          </div>

          <div class="flex">
            <div class="font-medium w-36">Giới thiệu ngắn:</div>
            <p class="text-gray-600 flex-1">
              {{ campaign.shortDescription }}
            </p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Mục tiêu:</span>
            <p class="text-gray-600 flex-1">{{ campaign.fundraisingGoal }}</p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Ngày bắt đầu:</span>
            <p class="text-gray-600 flex-1">{{ campaign.startDate }}</p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Ngày kết thúc:</span>
            <p class="text-gray-600 flex-1">{{ campaign.endDate }}</p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Thời gian bắt đầu:</span>
            <p class="text-gray-600 flex-1">
              {{ campaign.startTime ? campaign.startTime : '--:--' }}
            </p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Thời gian kết thúc:</span>
            <p class="text-gray-600 flex-1">
              {{ campaign.endTime ? campaign.endTime : '--:--' }}
            </p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Người tạo:</span>
            <p class="text-gray-600 flex-1">{{ campaign.creator.email }}</p>
          </div>

          <div class="flex">
            <span class="font-medium w-36">Thời gian còn lại:</span>
            <p class="text-red-500 flex-1">{{ remainTime }}</p>
          </div>

          <div class="flex gap-4 mt-4 flex-wrap">
            <base-button
              :type="'button'"
              :content="'Chỉnh sửa'"
              :style="'  max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md p-10'"
              v-if="campaign.currentStatus != 'ENDED' && campaign.currentStatus != 'REJECTED'"
              @click="onClickEdit"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Lên lịch'"
              :style="' max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md p-10'"
              @click="onClickSchedule"
              v-if="campaign.currentStatus === 'CREATED'"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Bắt đầu ngay'"
              :style="'  max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-red-500 hover:bg-red-600 rounded-md p-10'"
              v-if="campaign.currentStatus === 'SCHEDULED'"
              @click="onClickStart"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Từ chối'"
              :style="'  max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-red-500 hover:bg-red-600 rounded-md p-10'"
              v-if="campaign.currentStatus === 'CREATED'"
              @click="onClickReject"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Tạm dừng'"
              :style="' max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-red-500 hover:bg-red-600 rounded-md p-10'"
              v-if="campaign.currentStatus === 'STARTED'"
              @click="onClickStop"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Tiếp tục'"
              :style="' max-w-44 w-full py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
              v-if="campaign.currentStatus === 'STOPPED'"
              @click="onClickReStart"
            ></base-button>
            <!-- <base-button :type="'button'" :content="'Bắt đầu'"></base-button>
              <base-button :type="'button'" :content="'Tạm dừng'"></base-button>
              <base-button :type="'button'" :content="'Bắt đầu lại'"></base-button>
              <base-button :type="'button'" :content="'Kết thúc sớm'"></base-button> -->

            <base-button
              :type="'button'"
              :content="'Thêm kết quả'"
              :style="' max-w-44 w-full  py-2 font-bold text-sm text-white h-10 bg-red-500 hover:bg-red-600 rounded-md p-10'"
              v-if="campaign.currentStatus === 'STOPPED'"
              @click="onClickAddResult"
            ></base-button>
          </div>
        </section>
      </div>

      <!-- content -->
      <div class="content col-span-1 lg:col-span-3 min-h-[400px] flex flex-col">
        <div class="bg-white p-4 flex flex-col gap-4 border shadow-lg">
          <span class="font-bold text-xl text-pink-500">Nội dung</span>
          <div v-html="campaign.content"></div>
        </div>
      </div>
      <!-- Donations -->
      <div class="flex flex-col col-span-1 lg:col-span-2 min-h-[400px]">
        <div class="bg-white border p-4 gap-4 shadow-lg">
          <div class="flex w-full justify-between text-xl">
            <div class="font-bold text-pink-500">Danh sách ủng hộ</div>
          </div>
          <div
            class="donation-list py-2 gap-8 flex flex-col min-h-[945px]"
            v-if="donations.length > 0"
          >
            <div
              class="donation-container flex flex-col bg-gray-100 p-2"
              v-for="don in donations"
              :key="don.id"
            >
              <div class="text-xs text-gray-500">{{ formatDate(don.createdAt) }}</div>
              <div class="items-center flex justify-between w-full flex-wrap gap-4 pt-2">
                <div class="flex items-center gap-2">
                  <img
                    :src="don.donor.avatar"
                    class="w-10 h-10 rounded-full"
                    v-if="!don.isAnonymous && don.donor.avatar"
                  />
                  <avatar-icon :width="'40px'" :height="'40px'" v-else></avatar-icon>

                  <div>{{ !don.isAnonymous ? don.donor.email : 'Người ủng hộ ẩn danh' }}</div>
                </div>

                <div class="p-1 font-bold text-pink-600">{{ formatCurrency(don.amount) }} đ</div>
                <div
                  class="p-1 font-bold"
                  :class="[
                    don.state == 'ACCEPT' ? 'text-green-600' : '',
                    don.state == 'PENDING' ? 'text-indigo-600' : '',
                    don.state == 'FAILED' ? 'text-red-600' : '',
                  ]"
                >
                  {{ don.state }}
                </div>
              </div>
            </div>
          </div>
          <div class="donation-list py-2 gap-8 flex flex-col min-h-[600px]" v-else>
            Chưa có khoản quyên góp nào
          </div>
          <div class="flex w-full justify-center">
            <base-pagination
              v-model:currentPage="donationsCurrentPage"
              v-model:totalPage="donationsTotalPage"
            ></base-pagination>
          </div>
        </div>
      </div>

      <!-- result -->
      <div class="col-span-1 lg:col-span-5" v-if="campaign['result']">
        <!-- <div class="col-span-1 lg:col-span-5 pt-0.5 bg-gray-300"></div> -->
        <div class="bg-white border shadow-lg p-4 flex flex-col gap-4">
          <span class="font-bold text-xl text-pink-500">Kết quả</span>
          <div v-html="campaign.result.content"></div>
        </div>
      </div>
      <!-- Commment -->
      <section class="col-span-1 lg:col-span-5 min-h-[400px]">
        <!-- <div class="col-span-1 lg:col-span-5 pt-0.5 bg-gray-300"></div> -->
        <div class="bg-white border shadow-lg p-4 flex flex-col gap-4">
          <div class="flex w-full justify-between text-xl">
            <div class="font-bold">Bình luận</div>
          </div>
          <div
            class="border border-1 min-h-[740px] p-4 gap-4 flex flex-col shadow-lg"
            v-if="comments.length > 0"
          >
            <div class="flex flex-col flex-1 gap-4">
              <div v-for="comment in comments" :key="comment.id" class="flex gap-4">
                <!-- <div class="text-xs text-gray-500">{{ comment.createdAt }}</div> -->
                <div class="flex items-center gap-2">
                  <img
                    :src="comment.user.avatar"
                    class="w-16 h-16 rounded-full"
                    v-if="comment.user.avatar"
                  />
                  <avatar-icon
                    :width="'64px'"
                    :height="'64px'"
                    class="border p-2 rounded-full"
                    v-else
                  ></avatar-icon>
                </div>
                <div class="flex-col">
                  <div class="bg-indigo-500 rounded-xl p-2">
                    <div class="text-white font-bold">{{ comment.user.email }}</div>
                    <div class="p-1 text-white">
                      {{ comment.content }}
                    </div>
                  </div>
                  <div>{{ comment.createdAt }}</div>
                </div>
              </div>
            </div>
            <div class="flex w-full justify-center">
              <base-pagination
                v-model:currentPage="commentsCurrentPage"
                v-model:totalPage="commentsTotalPage"
              ></base-pagination>
            </div>
          </div>
          <div class="border border-1 min-h-[400px] p-4 gap-4 flex flex-col" v-else>
            Không có bình luận nào
          </div>
        </div>
      </section>
    </form>
    <!-- Modal edit  -->
    <section
      class="absolute top-0 left-0 right-0 bottom-0 z-[999] bg-black/70 lg:p-52 flex items-start justify-center w-screen"
      :class="isShowModal ? 'flex' : 'hidden'"
      @click.self="cancelEdit"
    >
      <div class="bg-white w-screen p-8 mx-8">
        <base-input
          :label="'Tiêu đề'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.title"
          v-model:error="editingCampaignError.title"
        ></base-input>
        <base-input
          :label="'Mục tiêu chiến dịch'"
          :type="'number'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.fundraisingGoal"
          v-model:error="editingCampaignError.fundraisingGoal"
        ></base-input>
        <base-input
          :label="'Giới thiệu ngắn'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.shortDescription"
          v-model:error="editingCampaignError.shortDescription"
        ></base-input>

        <base-input
          :label="'Ngày dự kiến bắt đầu'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.startDate"
          v-model:error="editingCampaignError.startDate"
          v-model:readonly="isEditStartTime"
        ></base-input>
        <base-input
          :label="'Ngày dự kiến kết thúc'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.endDate"
          v-model:error="editingCampaignError.endDate"
          v-model:readonly="isEditEndTime"
        ></base-input>
        <base-input
          :label="'Thời gian bắt đầu:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.startTime"
          v-model:error="editingCampaignError.startTime"
          v-model:readonly="isEditStartTime"
        ></base-input>
        <base-input
          :label="'Thời gian kết thúc:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="editingCampaign.endTime"
          v-model:error="editingCampaignError.endTime"
          v-model:readonly="isEditEndTime"
        ></base-input>

        <div class="flex flex-col items-stretch">
          <label class="text-sm font-semibold" for="">Nội dung</label>
          <editor
            api-key="ro1kh76z2gvuvctecqi2chda949fjai0uq5nqbe67v9qq9d4"
            :init="{
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }"
            initial-value="Welcome to TinyMCE!"
            v-model="editingCampaign.content"
          />
          <span class="text-red-500 text-xs p-1">{{ editingCampaignError.content }}</span>
        </div>
        <base-button
          :type="'button'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
          @click="handleUpdateCampaign"
        ></base-button>
      </div>
    </section>
    <!-- Modal start  -->
    <section
      class="absolute z-50 left-0 right-0 top-0 bottom-0 w-screen h-screen bg-black/70 flex items-start justify-center"
      :class="isShowStartModal ? 'flex' : 'hidden'"
      @click.self="cancelStart"
    >
      <div class="bg-white w-screen p-8 mx-8">
        <base-input
          :label="'Ngày dự kiến kết thúc'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="startedCampaign.endDate"
          v-model:error="startedCampaignError.endDate"
        ></base-input>
        <base-input
          :label="'Thời gian kết thúc:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="startedCampaign.endTime"
          v-model:error="startedCampaignError.endTime"
        ></base-input>
        <base-button
          :type="'button'"
          :content="'Bắt đầu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
          @click="handleStartCampaign"
        ></base-button>
      </div>
    </section>
    <!-- Modal restart  -->
    <section
      class="absolute z-50 left-0 right-0 top-0 bottom-0 w-screen bg-black/70 lg:p-52 flex items-start justify-start"
      :class="isShowReStartModal ? 'flex' : 'hidden'"
      @click.self="cancelReStart"
    >
      <div class="bg-white w-screen p-8 mx-8">
        <base-input
          :label="'Ngày dự kiến kết thúc'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="reStartedCampaign.endDate"
          v-model:error="reStartedCampaignError.endDate"
        ></base-input>
        <base-input
          :label="'Thời gian kết thúc:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="reStartedCampaign.endTime"
          v-model:error="reStartedCampaignError.endTime"
        ></base-input>
        <base-button
          :type="'button'"
          :content="'Chạy lại'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
          @click="handleReStartCampaign"
        ></base-button>
      </div>
    </section>
    <!-- Modal schedule  -->
    <section
      class="absolute z-50 left-0 right-0 top-0 bottom-0 w-screen bg-black/70 flex items-start justify-center"
      :class="isShowScheduleModal ? 'flex' : 'hidden'"
      @click.self="cancelSchedule"
    >
      <div class="bg-white w-screen p-8 mx-8">
        <base-input
          :label="'Ngày dự kiến bắt đầu'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="scheduledCampaign.startDate"
          v-model:error="scheduledCampaignError.startDate"
        ></base-input>
        <base-input
          :label="'Ngày dự kiến kết thúc'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="scheduledCampaign.endDate"
          v-model:error="scheduledCampaignError.endDate"
        ></base-input>
        <base-input
          :label="'Thời gian bắt đầu:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="scheduledCampaign.startTime"
          v-model:error="scheduledCampaignError.startTime"
        ></base-input>
        <base-input
          :label="'Thời gian kết thúc:'"
          :type="'time'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="scheduledCampaign.endTime"
          v-model:error="scheduledCampaignError.endTime"
        ></base-input>
        <base-button
          :type="'button'"
          :content="'Lên lịch'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
          @click="handleScheduleCampaign"
        ></base-button>
      </div>
    </section>
    <!-- Modal kết thúc, thêm kết quả  -->
    <section
      class="absolute top-0 left-0 right-0 bottom-0 z-[999] bg-black/70 lg:p-52 flex items-start justify-center w-screen"
      :class="isShowResultModal ? 'flex' : 'hidden'"
      @click.self="cancelEnd"
    >
      <div class="bg-white w-screen p-8 mx-8">
        <base-input
          :label="'Địa điểm'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="creationCampaignResult.executeLocation"
          v-model:error="creationCampaignResultError.executeLocation"
        ></base-input>

        <base-input
          :label="'Ngày diễn ra'"
          :type="'date'"
          :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="creationCampaignResult.executeDate"
          v-model:error="creationCampaignResultError.executeDate"
        ></base-input>

        <div class="flex flex-col items-stretch">
          <editor
            api-key="ro1kh76z2gvuvctecqi2chda949fjai0uq5nqbe67v9qq9d4"
            :init="{
              height: 500,
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }"
            v-model="creationCampaignResult.content"
          />
          <span class="text-red-500 text-xs p-1">{{ creationCampaignResultError.content }}</span>
        </div>
        <base-button
          :type="'button'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md p-10'"
          @click="handleResultCampaign"
        ></base-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BasePagination from '@/components/BasePagination.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRoute, useRouter } from 'vue-router'
import Editor from '@tinymce/tinymce-vue'
import AvatarIcon from '@/components/icons/AvatarIcon.vue'
import { useSocketStore } from '@/store/socketStore'
const campaign = ref({
  id: '9c5197ed-ff00-4edc-b089-27de3420997c',
  images: [],
  title: 'Chiến dịch 1',
  shortDescription: 'gt 1',
  content: 'gt 2',
  fundraisingGoal: 10000,
  category: '',
  creator: '',
  startDate: '2024-11-28',
  endDate: '2024-11-30',
  currentStatus: 'CREATED',
})
const donations = ref([])
const comments = ref([])
const donationsCurrentPage = ref(1)
const donationsPageSize = ref(10)
const donationsTotalPage = ref(1)
const isLoading = ref(true)
const currentDateTime = ref(new Date())
const fileInput = ref('')
const currentPreviewImage = ref('')

const campaignRepository = RepositoryFactory.get('campaigns')
// const campaignImageRepository = RepositoryFactory.get("campaignImages")

const router = useRouter()
const route = useRoute()

onBeforeMount(async () => {
  if (!socketStore.isConnected) {
    await socketStore.connect()
  }
  await getCampaignById()
  setInterval(() => {
    currentDateTime.value = new Date()
  }, 1000)
})

onMounted(() => {})

onUnmounted(() => {
  socketStore.cleanSubcribe()
})

async function getCampaignById() {
  isLoading.value = true
  campaignRepository
    .getById(route.params.id)
    .then((response) => {
      campaign.value = response.data
      getDonationsOfCampaign()
      getCommentOfCampaign()
      currentPreviewImage.value = campaign.value.images[0]
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

//logic get donations
const donationPageParams = computed(() => {
  return `page=${donationsCurrentPage.value - 1}&pageSize=${donationsPageSize.value}`
})
watch(donationsCurrentPage, () => {
  console.log('change page')
  getDonationsOfCampaign()
})

function getDonationsOfCampaign() {
  let params = donationPageParams.value
  campaignRepository
    .getDonationOfCampaign(route.params.id, params)
    .then((response) => {
      donations.value = response.data.content
      donationsTotalPage.value = response.data.totalPages
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
}

//logic getComments
const commentsCurrentPage = ref(1)
const commentsTotalElements = ref(0)
const commentsPageSize = ref(6)
const commentsTotalPage = ref(1)
const commentPageParams = computed(() => {
  return `page=${commentsCurrentPage.value - 1}&pageSize=${commentsPageSize.value}`
})
watch(commentPageParams, () => {
  console.log('change page comment')
  getCommentOfCampaign()
})
function getCommentOfCampaign() {
  let params = commentPageParams.value
  campaignRepository
    .getCommentOfCampaign(route.params.id, params)
    .then((response) => {
      comments.value = response.data.content
      commentsTotalElements.value = response.data.totalElements
      commentsTotalPage.value = response.data.totalPages
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
}

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}
function formatDate(dateStr) {
  const date = new Date(dateStr)

  // Format theo yêu cầu HH:mm:ss dd/MM/yyyy
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(
    2,
    '0'
  )}:${String(date.getSeconds()).padStart(2, '0')} ${String(date.getDate()).padStart(
    2,
    '0'
  )}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

// Edit campaign logic
const editingCampaign = ref({
  title: '',
  shortDescription: '',
  content: '',
  fundraisingGoal: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
})
const editingCampaignError = ref({
  title: '',
  shortDescription: '',
  content: '',
  fundraisingGoal: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
})
const isShowModal = ref(false)
function onClickEdit() {
  editingCampaign.value = {
    image: campaign.value.image,
    title: campaign.value.title,
    shortDescription: campaign.value.shortDescription,
    content: campaign.value.content,
    fundraisingGoal: campaign.value.fundraisingGoal,
    startDate: campaign.value.startDate,
    endDate: campaign.value.endDate,
    startTime: campaign.value.startTime,
    endTime: campaign.value.endTime,
  }
  isShowModal.value = !isShowModal.value
}
function cancelEdit() {
  // editingCampaign.value = ''
  isShowModal.value = !isShowModal.value
  resetEditingCampaignError()
}

// function onClickUpload() {
//   console.log(fileInput)
//   fileInput.value.click()
// }

// function handleFileChange(event) {
//   const file = event.target.files[0]
//   selectedFile.value = file
//   previewImage.value = URL.createObjectURL(file)
// }
function resetEditingCampaignError() {
  editingCampaignError.value.title = ''
  editingCampaignError.value.shortDescription = ''
  editingCampaignError.value.content = ''
  editingCampaignError.value.fundraisingGoal = ''
  editingCampaignError.value.startDate = ''
  editingCampaignError.value.endDate = ''
  editingCampaignError.value.startTime = ''
  editingCampaignError.value.endTime = ''
}

function validateEditCampaign() {
  let haveError = false
  if (!editingCampaign.value.title) {
    editingCampaignError.value.title = 'Tilte must be not null'
    haveError = true
  }
  if (!editingCampaign.value.shortDescription) {
    editingCampaignError.value.shortDescription = 'ShortDescription must be not null'
    haveError = true
  }
  if (!editingCampaign.value.content) {
    editingCampaignError.value.content = 'Content must be not null'
    haveError = true
  }
  if (!editingCampaign.value.fundraisingGoal || editingCampaign.value.fundraisingGoal <= 0) {
    editingCampaignError.value.fundraisingGoal = 'FundraisingGoal must be not null and greater 0'
    haveError = true
  }
  if (!editingCampaign.value.startDate) {
    editingCampaignError.value.startDate = 'Start date must be not null'
    haveError = true
  }
  if (!editingCampaign.value.endDate) {
    editingCampaignError.value.endDate = 'End date must be not null'
    haveError = true
  }
  if (!editingCampaign.value.startTime && campaign.value.currentStatus != 'CREATED') {
    editingCampaignError.value.startTime = 'Start time must be not null'
    haveError = true
  }
  if (!editingCampaign.value.endTime && campaign.value.currentStatus != 'CREATED') {
    editingCampaignError.value.endTime = 'End time must be not null'
    haveError = true
  }
  const startDate = new Date(`${editingCampaign.value.startDate} 00:00:00`)
  const endDate = new Date(`${editingCampaign.value.endDate} 00:00:00`)
  const currentDateTime = new Date()
  const currentDate = new Date(
    `${currentDateTime.getFullYear()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} 00:00:00`
  )

  if (startDate < currentDate && !isEditStartTime.value) {
    console.log('End date greater or equals start date')
    editingCampaignError.value.startDate = 'Start date must be greater or equals current date'
    haveError = true
  }
  if (endDate < startDate && !isEditEndTime.value) {
    console.log('End date greater or equals start date')
    editingCampaignError.value.endDate = 'End date must be greater or equals start date'
    haveError = true
  }
  console.log(`startDate: ${startDate}`)
  console.log(`endDate: ${endDate}`)
  console.log(`currentDate: ${currentDate}`)
  // console.log(`startDateTime: ${startDateTime}`)
  // console.log(`endDateTime: ${endDateTime}`)
  console.log(`currentDateTime: ${currentDateTime}`)
  if (campaign.value.currentStatus != 'CREATED') {
    const startDateTime = new Date(
      `${editingCampaign.value.startDate} ${editingCampaign.value.startTime}`
    )
    const endDateTime = new Date(
      `${editingCampaign.value.endDate} ${editingCampaign.value.endTime}`
    )
    if (startDateTime <= currentDateTime && !isEditStartTime.value) {
      console.log('Start time greater current time')
      editingCampaignError.value.startTime = 'Start time must be greater current time '
      haveError = true
    }
    if (endDateTime <= startDateTime && !isEditEndTime.value) {
      console.log('End time greater start time')
      editingCampaignError.value.endTime = 'End time must greater start time'
      haveError = true
    }
  }

  return haveError
}

const isEditStartTime = computed(() => {
  if (campaign.value.currentStatus === 'CREATED') return false
  if (campaign.value.currentStatus === 'SCHEDULED') return false
  return true
})

const isEditEndTime = computed(() => {
  if (campaign.value.currentStatus === 'ENDED') return true
  if (campaign.value.currentStatus === 'RESULTED') return true
  return false
})
//updatecampaign logic call api
function handleUpdateCampaign() {
  resetEditingCampaignError()
  const err = validateEditCampaign()
  if (!err) {
    campaignRepository
      .update(campaign.value.id, editingCampaign.value)
      .then((response) => {
        console.log(response)
        campaign.value = response.data
        cancelEdit()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// schedule campaign api
const scheduledCampaign = ref({
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  currentStatus: '',
})
const scheduledCampaignError = ref({
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  currentStatus: '',
})
const isShowScheduleModal = ref(false)
function onClickSchedule() {
  scheduledCampaign.value = {
    startDate: campaign.value.startDate,
    endDate: campaign.value.endDate,
    startTime: campaign.value.startTime,
    endTime: campaign.value.endTime,
    currentStatus: 'SCHEDULED',
  }
  isShowScheduleModal.value = !isShowScheduleModal.value
}
function cancelSchedule() {
  // editingCampaign.value = ''
  isShowScheduleModal.value = !isShowScheduleModal.value
  resetScheduleCampaignError()
}

function resetScheduleCampaignError() {
  scheduledCampaignError.value.currentStatus = ''
  scheduledCampaignError.value.startDate = ''
  scheduledCampaignError.value.endDate = ''
  scheduledCampaignError.value.startTime = ''
  scheduledCampaignError.value.endTime = ''
}

function handleScheduleCampaign() {
  resetScheduleCampaignError()
  const err = validateScheduleCampaign()
  if (!err) {
    console.log('Before call ' + scheduledCampaign.value.endDate)
    campaignRepository
      .schedule(campaign.value.id, scheduledCampaign.value)
      .then((response) => {
        console.log(response)
        campaign.value = response.data
        cancelSchedule()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function validateScheduleCampaign() {
  let haveError = false
  if (!scheduledCampaign.value.startTime) {
    scheduledCampaignError.value.startTime = 'Start time must be not null'
    haveError = true
  }
  if (!scheduledCampaign.value.endTime) {
    scheduledCampaignError.value.endTime = 'End time must be not null'
    haveError = true
  }
  const startDate = new Date(`${scheduledCampaign.value.startDate} 00:00:00`)
  const endDate = new Date(`${scheduledCampaign.value.endDate} 00:00:00`)
  const currentDateTime = new Date()
  const currentDate = new Date(
    `${currentDateTime.getFullYear()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} 00:00:00`
  )
  const startDateTime = new Date(
    `${scheduledCampaign.value.startDate} ${scheduledCampaign.value.startTime}`
  )
  const endDateTime = new Date(
    `${scheduledCampaign.value.endDate} ${scheduledCampaign.value.endTime}`
  )
  if (startDate < currentDate && !isEditStartTime.value) {
    console.log('End date greater or equals start date')
    scheduledCampaignError.value.startDate = 'Start date must be greater or equals current date'
    haveError = true
  }
  if (endDate < startDate && !isEditEndTime.value) {
    console.log('End date greater or equals start date')
    scheduledCampaignError.value.endDate = 'End date must be greater or equals start date'
    haveError = true
  }
  console.log(`startDate: ${startDate}`)
  console.log(`endDate: ${endDate}`)
  console.log(`currentDate: ${currentDate}`)
  console.log(`startDateTime: ${startDateTime}`)
  console.log(`endDateTime: ${endDateTime}`)
  console.log(`currentDateTime: ${currentDateTime}`)

  if (startDateTime <= currentDateTime) {
    console.log('Start time greater current time')
    scheduledCampaignError.value.startTime = 'Start time must be greater current time '
    haveError = true
  }
  if (endDateTime <= startDateTime) {
    console.log('End time greater start time')
    scheduledCampaignError.value.endTime = 'End time must greater start time'
    haveError = true
  }
  return haveError
}

//Reject campaign
function onClickReject() {
  handleRejectCampaign()
}
function handleRejectCampaign() {
  campaignRepository
    .updateStatus(campaign.value.id, {
      status: 'REJECTED',
    })
    .then((response) => {
      console.log(response)
      campaign.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

//Start campaign
const startedCampaign = ref({
  endDate: '',
  endTime: '',
  currentStatus: '',
})
const startedCampaignError = ref({
  endDate: '',
  endTime: '',
  currentStatus: '',
})
const isShowStartModal = ref(false)
function onClickStart() {
  startedCampaign.value = {
    endDate: campaign.value.endDate,
    endTime: campaign.value.endTime,
    currentStatus: 'STARTED',
  }
  isShowStartModal.value = !isShowStartModal.value
}
function cancelStart() {
  isShowStartModal.value = !isShowStartModal.value
  reseStartCampaignError()
}

function reseStartCampaignError() {
  startedCampaignError.value.currentStatus = ''
  startedCampaignError.value.endDate = ''
  startedCampaignError.value.endTime = ''
}

function handleStartCampaign() {
  reseStartCampaignError()
  const err = validateStartCampaign()
  if (!err) {
    console.log('Before call ' + startedCampaign.value.endDate)
    campaignRepository
      .start(campaign.value.id, startedCampaign.value)
      .then((response) => {
        console.log(response)
        campaign.value = response.data
        cancelStart()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function validateStartCampaign() {
  let haveError = false
  if (!startedCampaign.value.endTime) {
    startedCampaignError.value.endTime = 'End time must be not null'
    haveError = true
  }
  const endDate = new Date(`${scheduledCampaign.value.endDate} 00:00:00`)
  const currentDateTime = new Date()
  const currentDate = new Date(
    `${currentDateTime.getFullYear()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} 00:00:00`
  )
  const endDateTime = new Date(
    `${startedCampaign.value.endDate} ${scheduledCampaign.value.endTime}`
  )
  if (endDate < currentDate) {
    console.log('End date greater or equals current date')
    startedCampaignError.value.endDate = 'End date must be greater or equals current date'
    haveError = true
  }

  if (endDateTime <= currentDateTime) {
    console.log('End time greater start time')
    startedCampaignError.value.endTime = 'End time must greater current time'
    haveError = true
  }
  return haveError
}

//Stop campaign
function onClickStop() {
  handleStopCampaign()
}
function handleStopCampaign() {
  campaignRepository
    .stop(campaign.value.id)
    .then((response) => {
      console.log(response)
      campaign.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

//Restart campaign
const reStartedCampaign = ref({
  endDate: '',
  endTime: '',
  currentStatus: '',
})
const reStartedCampaignError = ref({
  endDate: '',
  endTime: '',
  currentStatus: '',
})
const isShowReStartModal = ref(false)
function onClickReStart() {
  reStartedCampaign.value = {
    endDate: campaign.value.endDate,
    endTime: campaign.value.endTime,
    currentStatus: 'STARTED',
  }
  isShowReStartModal.value = !isShowReStartModal.value
}
function cancelReStart() {
  isShowReStartModal.value = !isShowReStartModal.value
  reseReStartCampaignError()
}

function reseReStartCampaignError() {
  reStartedCampaignError.value.currentStatus = ''
  reStartedCampaignError.value.endDate = ''
  reStartedCampaignError.value.endTime = ''
}

function handleReStartCampaign() {
  reseReStartCampaignError()
  const err = validateReStartCampaign()
  if (!err) {
    console.log('Before call ' + reStartedCampaign.value.endDate)
    campaignRepository
      .reStart(campaign.value.id, reStartedCampaign.value)
      .then((response) => {
        console.log(response)
        campaign.value = response.data
        cancelReStart()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function validateReStartCampaign() {
  let haveError = false
  if (!reStartedCampaign.value.endTime) {
    reStartedCampaignError.value.endTime = 'End time must be not null'
    haveError = true
  }
  const endDate = new Date(`${reStartedCampaign.value.endDate} 00:00:00`)
  const currentDateTime = new Date()
  const currentDate = new Date(
    `${currentDateTime.getFullYear()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getDate()} 00:00:00`
  )
  const endDateTime = new Date(
    `${reStartedCampaign.value.endDate} ${reStartedCampaign.value.endTime}`
  )
  if (endDate < currentDate) {
    console.log('End date greater or equals current date')
    reStartedCampaign.value.endDate = 'End date must be greater or equals current date'
    haveError = true
  }

  if (endDateTime <= currentDateTime) {
    console.log('End time greater start time')
    reStartedCampaignError.value.endTime = 'End time must greater current time'
    haveError = true
  }
  return haveError
}

// add result campaign logic

const creationCampaignResult = ref({
  images: [],
  executeLocation: '',
  executeDate: '',
  content: '',
})
const creationCampaignResultError = ref({
  images: [],
  executeLocation: '',
  executeDate: '',
  content: '',
})
const isShowResultModal = ref(false)
function onClickAddResult() {
  isShowResultModal.value = !isShowResultModal.value
}
function cancelEnd() {
  creationCampaignResult.value = {
    executeLocation: '',
    executeDate: '',
    content: '',
  }
  isShowResultModal.value = !isShowResultModal.value
  resetResultCampaignError()
}
function resetResultCampaignError() {
  creationCampaignResultError.value = {
    executeLocation: '',
    executeDate: '',
    content: '',
  }
}
function validateResultCampaign() {
  let haveError = false

  return haveError
}

function handleResultCampaign() {
  campaignRepository
    .addResult(campaign.value.id, creationCampaignResult.value)
    .then((response) => {
      console.log(response.data)
      campaign.value = response.data
      cancelEnd()
    })
    .then((err) => {
      console.log(err)
    })
}

const remainTime = computed(() => {
  if (campaign.value.currentStatus === 'STARTED') {
    const endDateTime = new Date(`${campaign.value.endDate} ${campaign.value.endTime}:00`)
    const differenceMs = Math.max(0, endDateTime - currentDateTime.value) // Không để âm

    // Quy đổi sang giờ, phút, và giây
    const hours = Math.floor(differenceMs / (1000 * 60 * 60))
    const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((differenceMs % (1000 * 60)) / 1000)

    // Định dạng giờ, phút, giây với ít nhất 2 chữ số
    const pad = (num) => String(num).padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }
  return '--:--'
})

const socketStore = useSocketStore()

const canSubcribeTopic = computed(() => {
  console.log('Change Can subcribe topic')
  return socketStore.isConnected && isLoading.value == false
})

watch(canSubcribeTopic, (newvalue, oldValue) => {
  console.log('Change cansubcrie topic')
  if (newvalue) {
    handleSubcribe()
  }
})

function handleSubcribe() {
  if (!socketStore.subs['/topic/campaigns/' + campaign.value.id]) {
    socketStore.subscribe('/topic/campaigns/' + campaign.value.id, onMessageReceived)
    socketStore.subscribe('/topic/campaigns/' + campaign.value.id + '/comments', onMessageReceived)
    socketStore.subscribe(
      '/topic/campaigns/' + campaign.value.id + '/donations/ACCEPT',
      onMessageReceived
    )
    socketStore.subscribe(
      '/topic/campaigns/' + campaign.value.id + '/donations/PENDING',
      onMessageReceived
    )
    socketStore.subscribe(
      '/topic/campaigns/' + campaign.value.id + '/donations/FAILED',
      onMessageReceived
    )
  } else {
    console.log('topic subcribed')
  }
}

const onMessageReceived = (topic, response) => {
  console.log(topic)
  console.log(response)

  if (response.action === 'NEW_STATUS') {
    campaign.value.currentStatus = response.data
  }
  if (response.action === 'NEW_DONATION') {
    if (campaign.value.id == response.data.campaign.id) {
      campaign.value.totalAmountRaised = response.data.campaign.totalAmountRaised
      campaign.value.totalNumberDonations = response.data.campaign.totalNumberDonations
      if (donationsCurrentPage.value == 1) {
        if (response.data.state == 'PENDING') {
          const newDonations = new Set()
          newDonations.add(response.data)
          for (const donation of donations.value) {
            newDonations.add(donation)
            if (newDonations.size == donationsPageSize.value) {
              break
            }
          }
          donations.value = Array.from(newDonations)
          console.log('Donations ')
          console.log(donations.value)
          donationsTotalPage.value =
            response.data.campaign.totalNumberDonations % donationsPageSize.value == 0
              ? response.data.campaign.totalNumberDonations / donationsPageSize.value
              : response.data.campaign.totalNumberDonations / donationsPageSize.value + 1
        } else {
          for (let donation of donations.value) {
            if (donation.id == response.data.id) {
              for (let attr in donation) {
                donation[attr] = response.data[attr]
              }
              console.log('Donations ')
              console.log(donations.value)
              break
            }
          }
        }
      } else {
        getDonationsOfCampaign()
      }
    }

    //add more donation
  }
  if (response.action === 'NEW_COMMENT') {
    console.log('At new comment')
    if (commentsCurrentPage.value == 1) {
      comments.value = [response.data, ...comments.value]
      if (comments.value.length > commentsPageSize.value) {
        comments.value.pop()
      }

      commentsTotalElements.value += 1
      commentsTotalPage.value = Math.round(commentsTotalElements.value / commentsPageSize.value)
      if (commentsTotalElements.value % commentsPageSize.value != 0) {
        commentsTotalPage.value += 1
      }
    }
  }

  if (response.action == 'NEW_DETAIL') {
    if (campaign.value.id == response.data.id) {
      campaign.value = response.data
    }
  }
}
</script>
