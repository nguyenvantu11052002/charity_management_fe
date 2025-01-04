<template>
  <div class="flex flex-col items-center gap-8 px-4 pt-32 w-full" v-if="!isLoading">
    <section class="px-2 py-2 w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-5 gap-8">
      <!-- <img
        src="https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/campaign-b077910a-58a9-493a-afd6-29cd4d796580.jpg"
        class="w-full object-contain col-span-1 lg:col-span-3"
      /> -->
      <div class="flex items-center justify-center bg-white flex-col col-span-1 lg:col-span-3">
        <div
          class="w-full h-80 border bg-gray-200 text-center flex justify-center items-center text-gray-500"
        >
          <img
            :src="currentPreviewImage.url"
            class="w-full h-full max-w-5xl lg:h-80 object-cover"
          />
        </div>
        <div class="w-full mt-2 gap-2 flex justify-center flex-wrap">
          <div
            class="w-24 h-24 cursor-pointer"
            v-for="image in campaignWithRemainingTime.images"
            :key="image"
            :class="image == currentPreviewImage ? 'border-4 border-pink-500' : ''"
            @click="currentPreviewImage = image"
          >
            <img :src="image.url" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="col-span-1 lg:col-span-2">
        <div class="flex flex-col h-full gap-4">
          <h1 class="font-bold text-xl">{{ campaign.title }}</h1>

          <div
            class="w-full flex flex-col gap-4 justify-end bg-gray-100 shadow-lg p-4 text-lg rounded-sm"
          >
            <div class="flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <img
                  :src="campaignWithRemainingTime.creator.avatar"
                  class="w-12 h-12 rounded-full"
                  v-if="campaignWithRemainingTime.creator ? true : false"
                />

                <div>{{ campaignWithRemainingTime.creator.email }}</div>
              </div>
              <div class="bg-amber-500 rounded-lg p-1 text-white">
                {{ campaignWithRemainingTime.remainingTime.displayText }}
              </div>
            </div>
            <div class="gap-2 flex flex-col">
              <div>
                <span class="font-bold"
                  >{{ formatCurrency(campaignWithRemainingTime.totalAmountRaised) }} đ</span
                >
                <span>/ {{ formatCurrency(campaignWithRemainingTime.fundraisingGoal) }} đ</span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
                <!-- Nền của thanh tiến trình -->
                <div class="absolute bg-gray-500"></div>
                <!-- Thanh tiến trình -->
                <div
                  class="absolute top-0 left-0 h-full bg-pink-500 rounded-full transition-all duration-300"
                  :style="{
                    width:
                      (campaignWithRemainingTime.totalAmountRaised * 100) /
                        campaignWithRemainingTime.fundraisingGoal +
                      '%',
                  }"
                ></div>
              </div>
            </div>
            <div class="flex justify-between py-2">
              <div>
                <span>Lượt quyên góp</span>
                <div class="font-bold">{{ campaignWithRemainingTime.totalNumberDonations }}</div>
              </div>
              <div>
                <span>Đạt được</span>
                <div class="font-bold">
                  {{
                    Math.round(
                      (campaignWithRemainingTime.totalAmountRaised * 100) /
                        campaignWithRemainingTime.fundraisingGoal
                    )
                  }}%
                </div>
              </div>
            </div>
          </div>

          <base-button
            v-if="campaign.currentStatus == 'STARTED'"
            :type="'button'"
            :content="'Quyên góp ngay'"
            :style="' max-w-60 py-2 font-bold text-sm border-4 border-pink-500  h-10 bg-white text-pink-500  rounded-md px-4'"
            @click="onClickDonateNow"
          ></base-button>
        </div>
      </div>
      <div class="col-span-1 lg:col-span-5 pt-0.5 bg-gray-300"></div>
    </section>

    <!-- section content campaign  and donations list -->
    <section class="px-2 w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-5 gap-4">
      <!-- Content -->
      <div class="campaign-infor col-span-1 lg:col-span-3">
        <div v-html="campaign.content"></div>
      </div>

      <div class="donations w-full flex flex-col gap-8 col-span-1 lg:col-span-2">
        <div class="bg-white border border-gray-100 rounded-lg shadow-lg p-4 gap-2">
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
      <div class="col-span-1 lg:col-span-5 pt-0.5 bg-gray-300"></div>
    </section>

    <!-- result -->
    <section
      class="p-2 w-full grid-cols-1 lg:grid-cols-5 max-w-screen-xl flex flex-col gap-2"
      v-if="campaign.result"
    >
      <!-- <div class="col-span-1 lg:col-span-5 pt-0.5 bg-gray-300"></div> -->
      <div class="bg-white border p-4 flex flex-col gap-4">
        <span class="font-bold text-xl text-pink-500">Kết quả</span>
        <div v-html="campaign.result.content"></div>
      </div>
    </section>

    <!-- Commment -->
    <section class="p-2 w-full grid-cols-1 lg:grid-cols-5 max-w-screen-xl flex flex-col gap-2">
      <div class="flex w-full justify-between text-xl">
        <div class="font-bold">Để lại bình luận của bạn</div>
      </div>
      <div class="flex flex-col lg:flex-row lg:items-center lg:gap-4 items-start gap-1 w-full">
        <base-input
          :placeholder="'Bình luận'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 min-w-96  px-3 mt-2 focus:outline-indigo-300'"
          v-model:data="creationComment.content"
        ></base-input>
        <base-button
          :type="'button'"
          :content="'Bình luận'"
          :style="' min-w-42 py-2  font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md p-10'"
          @click="handleCreateComment"
        ></base-button>
      </div>
      <div
        class="border border-1 min-h-[740px] p-4 gap-4 flex flex-col shadow-xl"
        v-if="comments.length > 0"
      >
        <div class="flex flex-col flex-1 gap-4">
          <div v-for="comment in comments" :key="comment.id" class="flex gap-4">
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

            <div class="flex-col" :class="currentEditComment.id === comment.id ? 'flex' : 'hidden'">
              <div class="bg-indigo-500 rounded-xl p-4 flex items-center">
                <div class="flex items-center bg-white rounded-lg p-1 gap-2">
                  <input
                    v-model="currentEditComment.content"
                    class="px-2 rounded-md h-10 w-full border"
                  />
                  <div class="" @click="onClickSaveEditComment">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-8 hover:text-pink-500 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="hover:text-pink-500 cursor-pointer px-2 font-semibold"
                @click="onClickCancelEditComment(comment)"
              >
                Hủy
              </div>
            </div>

            <div class="flex-col" :class="currentEditComment.id === comment.id ? 'hidden' : 'flex'">
              <div class="bg-indigo-500 rounded-xl p-2">
                <div class="text-white font-bold">{{ comment.user.email }}</div>
                <div class="p-1 text-white">
                  {{ comment.content }}
                </div>
              </div>
              <div class="flex text-sm gap-4 px-2">
                <div>{{ comment.createdAt }}</div>
                <div
                  class="flex gap-4 px-2 items-center font-semibold"
                  v-if="authStore.currentUser && comment.user.id === authStore.currentUser.infor.id"
                >
                  <div
                    class="hover:text-pink-500 cursor-pointer"
                    @click="onClickEditComment(comment)"
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    class="hover:text-pink-500 cursor-pointer"
                    @click="onClickDeleteComment(comment)"
                  >
                    Xóa
                  </div>
                </div>
              </div>
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
    </section>

    <!-- modal payment -->
    <section
      class="fixed z-50 left-0 right-0 top-0 bottom-0 w-full h-screen bg-black/70 flex items-center justify-center"
      :class="isPayment ? 'flex' : 'hidden'"
      @click.self="onCancleDonate"
    >
      <div class="bg-white w-screen p-8 mx-8 max-w-md flex flex-col gap-4">
        <div class="font-bold text-pink-500 text-lg text-center">Thông tin quyên góp</div>
        <div>
          <div class="font-bold">Chiến dịch</div>
          <div>{{ campaign.title }}</div>
        </div>
        <base-input
          :label="'Số tiền'"
          :type="'number'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="donation.amount"
          v-model:error="donationError.amount"
        ></base-input>
        <div class="flex gap-2">
          <input type="checkbox" :value="donation.isAnonymous" v-model="donation.isAnonymous" />
          <p>Tôi muốn ủng hộ ẩn danh</p>
        </div>
        <base-button
          :type="'button'"
          :content="'Quyên góp'"
          :style="' w-full max-w-md py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md p-10'"
          @click="handleCreateDonation"
        ></base-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import AvatarIcon from '@/components/icons/AvatarIcon.vue'
import BasePagination from '@/components/BasePagination.vue'
// import BaseBreadCrumb from '@/components/BaseBreadCrumb.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { computed, onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSocketStore } from '@/store/socketStore'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const route = useRoute()
const isLoading = ref(true)
const isPayment = ref(false)
const url = ref('')

const authStore = useAuthStore()

//list donations
const donations = ref([])
//create donation
const donation = ref({
  campaign: {
    id: '',
  },
  isAnonymous: false,
  amount: '',
})
const donationError = ref({
  campaign: {
    id: '',
  },
  isAnonymous: false,
  amount: '',
})

//list comments
const comments = ref([])
//create comment
const creationComment = ref({
  campaign: {
    id: '',
  },
  content: '',
})

const campaign = ref()

const campaignRepository = RepositoryFactory.get('campaigns')
const donationsRepository = RepositoryFactory.get('donations')
const commentRepository = RepositoryFactory.get('comments')

const currentPreviewImage = ref()
const currentDateTime = ref(new Date())

onBeforeMount(async () => {
  if (!socketStore.isConnected) {
    await socketStore.connect()
  }
  await getCampaignById()

  setInterval(() => {
    currentDateTime.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  socketStore.cleanSubcribe()
})

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

async function getCampaignById() {
  isLoading.value = true
  campaignRepository
    .getById(route.params.id)
    .then((response) => {
      console.log(response)
      campaign.value = response.data
      getDonationOfCampaign()
      getCommentOfCampaign()
      currentPreviewImage.value = campaign.value.images[0]
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    })
}

//logic donate
function onClickDonateNow() {
  donation.value.campaign.id = campaign.value.id
  isPayment.value = !isPayment.value
}
function onCancleDonate() {
  donation.value.amount = 10000
  isPayment.value = !isPayment.value
}
function handleCreateDonation() {
  const haveError = validateDonation()
  if (!haveError) {
    donationsRepository
      .create(donation.value)
      .then((response) => {
        console.log(response)
        const data = response.data
        const payment = data.payment
        console.log(payment.vnpUrl)
        url.value = payment.vnpUrl
        window.location.href = payment.vnpUrl
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
function validateDonation() {
  let haveError = false
  if (donation.value.amount < 10000) {
    haveError = true
    donationError.value.amount = 'Số tiền quyên góp ít nhất là 10.000đ'
  }
  return haveError
}

//logic getDonations
const donationsCurrentPage = ref(1)
const donationsPageSize = ref(10)
const donationsTotalPage = ref(1)
const donationPageParams = computed(() => {
  return `page=${donationsCurrentPage.value - 1}&pageSize=${donationsPageSize.value}`
})

watch(donationsCurrentPage, () => {
  console.log('change page')
  getDonationOfCampaign()
})

function getDonationOfCampaign() {
  let params = donationPageParams.value + '&state=ACCEPT'
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

//logic comment
function handleCreateComment() {
  creationComment.value.campaign.id = campaign.value.id
  const haveError = validateComment()
  if (!haveError) {
    commentRepository
      .create(creationComment.value)
      .then((response) => {
        console.log(response)
        creationComment.value.content = ''
        // if (commentsCurrentPage.value == 1) {
        //   comments.value = [response.data, ...comments.value]
        //   if (comments.value.length > commentsPageSize.value) {
        //     comments.value.pop()
        //   }
        // } else {
        //   getCommentOfCampaign()
        // }

        // if(comments.value.length > commentsPageSize.value){

        // }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
function validateComment() {
  let haveError = false
  if (creationComment.value.content === '' || creationComment.value.content == null) {
    haveError = true
    commentError.value.content = 'Nội dung bình luận không được để trống'
  }
  return haveError
}
const commentError = ref({})
//logic edit, delete comment
const currentEditComment = ref({})
function onClickEditComment(comment) {
  currentEditComment.value = {
    ...comment,
  }
}

function onClickDeleteComment(comment) {
  commentRepository
    .delete(comment.id)
    .then((response) => {
      console.log(response)
      getCommentOfCampaign()
    })
    .catch((err) => {
      console.log(err)
    })
}

function onClickCancelEditComment() {
  currentEditComment.value = {}
}

function onClickSaveEditComment() {
  commentRepository
    .update(currentEditComment.value.id, currentEditComment.value)
    .then((response) => {
      console.log(response)
      for (let index in comments.value) {
        if (comments.value[index].id === response.data.id) {
          comments.value[index].content = response.data.content
          break
        }
      }
      onClickCancelEditComment()
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

const campaignWithRemainingTime = computed(() => {
  if (!campaign.value) {
    return {}
  }

  if (campaign.value.currentStatus === 'SCHEDULED') {
    return {
      ...campaign.value,
      remainingTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        displayText: 'Sắp diễn ra',
      },
    }
  }
  if (campaign.value.currentStatus === 'STOPPED') {
    return {
      ...campaign.value,
      remainingTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        displayText: 'Đang tạm dừng',
      },
    }
  }
  if (campaign.value.currentStatus === 'ENDED') {
    return {
      ...campaign.value,
      remainingTime: {
        days: 0,
        hours: 0,
        minutes: 0,
        displayText: 'Đã kết thúc',
      },
    }
  }
  const endDate = new Date(`${campaign.value.endDate} ${campaign.value.endTime}:00`)
  const timeDiff = endDate - currentDateTime.value

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

  return {
    ...campaign.value,
    remainingTime: {
      days,
      hours,
      minutes,
      displayText: `Còn ${days} ngày ${hours} giờ ${minutes} phút`,
    },
  }
})

//logic websocket
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
    socketStore.subscribe(
      '/topic/campaigns/' + campaign.value.id + '/donations/ACCEPT',
      onMessageReceived
    )
    socketStore.subscribe('/topic/campaigns/' + campaign.value.id + '/comments', onMessageReceived)
  } else {
    console.log('topic subcribed')
  }
}

const onMessageReceived = (topic, response) => {
  console.log(topic)
  console.log(response)

  if (response.action === 'NEW_STATUS') {
    campaign.value.currentStatus = response.data.currentStatus
    if (response.data.result) {
      campaign.value.result = response.data.result
    }
  }
  if (response.action === 'NEW_DONATION') {
    if (campaign.value.id == response.data.campaign.id) {
      campaign.value.totalAmountRaised = response.data.campaign.totalAmountRaised
      campaign.value.totalNumberDonations = response.data.campaign.totalNumberDonations
      if (donationsCurrentPage.value == 1) {
        const newDonations = new Set()
        newDonations.add(response.data)
        for (const donation of donations.value) {
          newDonations.add(donation)
          if (newDonations.size == donationsPageSize.value) {
            break
          }
        }

        donations.value = Array.from(newDonations)
        donationsTotalPage.value =
          response.data.campaign.totalNumberDonations % donationsPageSize.value == 0
            ? response.data.campaign.totalNumberDonations / donationsPageSize.value
            : response.data.campaign.totalNumberDonations / donationsPageSize.value + 1
      } else {
        getDonationOfCampaign()
      }
    }

    //add more donation
  }
  if (response.action === 'NEW_COMMENT') {
    if (commentsCurrentPage.value == 1) {
      comments.value = [response.data, ...comments.value]
      if (comments.value.length > commentsPageSize.value) {
        comments.value.pop()
      }
      if (commentsTotalElements.value % commentsPageSize.value == 0) {
        commentsTotalPage.value += 1
      }
      commentsTotalElements.value += 1
    } else {
      getCommentOfCampaign()
    }
  }
  if (response.action === 'UPDATE_COMMENT') {
    for (let index in comments.value) {
      if (comments.value[index].id === response.data.id) {
        comments.value[index].content = response.data.content
        break
      }
    }
  }
  if (response.action === 'DELETE_COMMENT') {
    if (
      commentsTotalElements.value % commentsPageSize.value == 1 &&
      commentsCurrentPage.value > 1
    ) {
      commentsCurrentPage.value -= 1
    }
    getCommentOfCampaign()
  }
  if (response.action === 'NEW_DETAIL') {
    if (campaign.value.id == response.data.id) {
      campaign.value = response.data
      currentPreviewImage.value = campaign.value.images[0]
    }
  }
}
</script>

<style>
</style>
