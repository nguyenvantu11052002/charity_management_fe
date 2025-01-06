<template>
  <div class="flex flex-col items-center pt-20 relative" v-if="!isLoading">
    <!-- <div> -->
    <base-slider></base-slider>
    <!-- </div> -->
    <section class="flex flex-col bg-pink-100 w-full items-center pb-10">
      <div class="items-center justify-center flex-col w-full h-36 flex">
        <h1 class="font-bold text-3xl text-pink-600 text-center">
          Các chiến dịch quyên góp đang diễn ra
        </h1>
        <p class="text-center">Lựa chọn chiến dịch mà bạn quan tấm</p>
      </div>
      <!-- các chiến dịch -->
      <div
        class="justify-start w-full max-w-screen-xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center px-6 md:px-2 lg:px-2"
      >
        <!-- Chiến dịch -->
        <base-card
          v-for="campaign in campaignsWithRemainingTime"
          :key="campaign.id"
          @click="onClickViewDetail(campaign.id)"
        >
          <!-- card-image -->
          <template v-slot:card-image>
            <div class="relative -z-0">
              <img :src="campaign.images[0].url" class="h-80 w-full object-cover rounded-t-md" />
              <div class="absolute top-2 right-2 px-4 py-2 text-white bg-pink-500 rounded-lg">
                {{ campaign.category.name }}
              </div>
            </div>
          </template>

          <!-- card title -->
          <template v-slot:card-title>
            <div class="px-4">
              <p class="text-lg hover:text-pink-600 font-bold line-clamp-2 min-h-16">
                {{ campaign.title }}
              </p>
            </div>
          </template>

          <!-- card-content -->
          <template v-slot:card-content>
            <div class="flex items-center justify-between flex-wrap">
              <!-- người tạo -->
              <div class="flex items-center gap-2">
                <img :src="campaign.creator.avatar" class="w-10 h-10 rounded-full" />
                <div>{{ campaign.creator.email }}</div>
              </div>

              <!-- Thời gian còn lại hoặc trạng thái -->
              <div class="bg-amber-500 rounded-lg p-1 text-white text-xs">
                {{ campaign.remainingTime.displayText }}
              </div>
            </div>

            <div class="gap-2 flex flex-col">
              <!-- số tiền quyên góp được trên tổng số tiền muc -->
              <div>
                <span class="font-bold">{{ formatCurrency(campaign.totalAmountRaised) }} đ</span>
                <span>/ {{ formatCurrency(campaign.fundraisingGoal) }} đ</span>
              </div>

              <div class="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
                <!-- Nền của thanh tiến trình -->
                <div class="absolute bg-gray-500"></div>
                <!-- Thanh tiến trình -->
                <div
                  class="absolute top-0 left-0 h-full bg-pink-500 rounded-full transition-all duration-300"
                  :style="{
                    width: (campaign.totalAmountRaised * 100) / campaign.fundraisingGoal + '%',
                  }"
                ></div>
              </div>
            </div>
            <div class="flex justify-between py-2">
              <div>
                <span>Lượt quyên góp</span>
                <div class="font-bold">{{ campaign.totalNumberDonations }}</div>
              </div>
              <div>
                <span>Đạt được</span>
                <div class="font-bold">
                  {{ Math.round((campaign.totalAmountRaised * 100) / campaign.fundraisingGoal) }}%
                </div>
              </div>
              <base-button
                :type="'button'"
                :content="'Xem chi tiết'"
                :style="' max-w-60 py-2 font-bold text-sm border-4 border-pink-500  h-10 bg-white text-pink-500  rounded-md px-4'"
              ></base-button>
            </div>
          </template>
        </base-card>
      </div>

      <div
        class="text-gray-500 flex items-center justify-center font-bold text-center h-96 bg-gray-200 col-span-3 w-full max-w-3xl"
        v-if="campaigns.length == 0"
      >
        Không có chiến dịch nào
      </div>

      <div v-else class="flex grid-cols-1 mt-4 md:col-span-2 lg: col-span-3 justify-center p-2">
        <base-button
          :type="'button'"
          @click="onClickViewMore"
          :content="'Xem thêm'"
          :style="' max-w-60 py-2 font-bold text-sm   h-10 text-white bg-pink-500  rounded-md px-4 hover:bg-pink-600'"
        ></base-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseSlider from '@/components/BaseSlider.vue'
import BaseCard from '@/components/BaseCard.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
// import { useWebSocketStore } from '@/store/webSocketStore'
import BaseButton from '@/components/BaseButton.vue'
import { useSocketStore } from '@/store/socketStore'
const campaignRepository = RepositoryFactory.get('campaigns')

const isLoading = ref(null)
const campaigns = ref([])

const currentDateTime = ref(new Date())
const router = useRouter()

const socketStore = useSocketStore()

onBeforeMount(async () => {
  console.log('OnBefore Mount')
  // HAND SHAKE
  if (!socketStore.isConnected) {
    await socketStore.connect()
  }

  await getNewStartedCampampaign()
  // Cập nhật thời gian hiện tại mỗi giây
  setInterval(() => {
    currentDateTime.value = new Date()
  }, 60000)
})

onMounted(() => {})
onUnmounted(() => {
  socketStore.cleanSubcribe()
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}
// CONNECT SOCKET
// LAY DANH SACH CAMPAIGN
//
async function getNewStartedCampampaign() {
  isLoading.value = true
  campaignRepository
    .getAll(`page=0&pageSize=3&state=STARTED`)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      // totalRecord.value = data.totalElements
      console.log('Fetch success full')
      campaigns.value = data.content

      // isLoading.value = false
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => (isLoading.value = false))
}

const campaignsWithRemainingTime = computed(() => {
  if (!campaigns.value || campaigns.value.length === 0) {
    return []
  }
  return campaigns.value.map((campaign) => {
    // console.log('Campaign at remain time:', campaign.value)
    const endDate = new Date(`${campaign.endDate} ${campaign.endTime}:00`)
    const timeDiff = endDate - currentDateTime.value

    if (timeDiff <= 0) {
      return {
        ...campaign,
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          displayText: 'Đã kết thúc',
        },
      }
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

    return {
      ...campaign,
      remainingTime: {
        days,
        hours,
        minutes,
        displayText: `Còn ${days} ngày ${hours} giờ ${minutes} phút`,
      },
    }
  })
})

function onClickViewMore() {
  router.push({ name: `campaigns-route` })
}

function onClickViewDetail(campaignId) {
  router.push({ name: `campaign-detail-route`, params: { id: campaignId } })
}

const canSubcribeTopic = computed(() => {
  console.log('Change Can subcribe topic')
  return socketStore.isConnected && isLoading.value == false
})

//cansubcribe topic
// null => false => fetch data thành công => isLoading = false, isconnected = true => true
watch(canSubcribeTopic, (newvalue, oldValue) => {
  console.log('Change cansubcrie topic')
  if (newvalue) {
    handleSubcribe()
  }
})

function handleSubcribe() {
  if (!socketStore.subs['/topic/campaigns/STARTED']) {
    //có campaign nào chuyển đổi từ trạng thái khác sang started không
    socketStore.subscribe('/topic/campaigns/STARTED', onMessageReceived)
  }

  for (const cp of campaigns.value) {
    // kiểm tra trạng thái subcribe đến topic này hay chưa
    if (!socketStore.subs['/topic/campaigns/' + cp.id]) {
      //topic/campaigns/{id} => theo dõi thay đổi thông tin của 1 campaign
      // action => NEW DETAIL
      //theo dõi trạng thại
      // action NEW STATUS started => '/topic/campaigns/1 => action: NEW_STATUS, data
      socketStore.subscribe('/topic/campaigns/' + cp.id, onMessageReceived)
      //topic/campaings/{id}/donations/ACCEPT => theo dõi các khoản quyên góp đã được thanh toán hay trạng thái accept
      socketStore.subscribe('/topic/campaigns/' + cp.id + '/donations/ACCEPT', onMessageReceived)
    } else {
      console.log('topic subcribed')
    }
  }
}

// Xử lý dữ liệu mới của websocket khi server gửi sự kiện mới
const onMessageReceived = (topic, response) => {
  console.log(topic)
  console.log(response)

  if (response.action === 'NEW_CAMPAIGN') {
    console.log('In new Campaign')
    const newCampaigns = []
    newCampaigns.push(response.data)
    for (const cp of campaigns.value) {
      newCampaigns.push(cp)
    }
    if (newCampaigns.length > 3) {
      const unSubcribeCampaign = newCampaigns.pop()
      if (socketStore.subs[`/topic/campaigns/${unSubcribeCampaign.id}`]) {
        socketStore.unsubscribe(`/topic/campaigns/${unSubcribeCampaign.id}`)
        socketStore.unsubscribe(`/topic/campaigns/${unSubcribeCampaign.id}/donations/ACCEPT`)
      }
    }
    campaigns.value = newCampaigns
    handleSubcribe()
  }

  if (response.action === 'NEW_STATUS') {
    for (const cp of campaigns.value) {
      socketStore.unsubscribe(`/topic/campaigns/${cp.id}`)
      socketStore.unsubscribe(`/topic/campaigns/${cp.id}/donations/ACCEPT`)
    }
    getNewStartedCampampaign()
  }
  if (response.action === 'NEW_DONATION') {
    const campaignId = topic.split('/')[3]
    for (const campaign of campaigns.value) {
      if (campaign.id == campaignId) {
        console.log('find campaign' + campaign)
        campaign.totalAmountRaised = response.data.campaign.totalAmountRaised
        campaign.totalNumberDonations = response.data.campaign.totalNumberDonations
        break
      }
      console.log(topic.split('/'))
    }
  }

  if (response.action == 'NEW_DETAIL') {
    const campaignId = topic.split('/')[3]
    for (const campaign of campaigns.value) {
      if (campaign.id == campaignId) {
        for (let attr in campaign) {
          console.log(attr)
          console.log(campaign[attr])
          console.log(response.data[attr])
          campaign[attr] = response.data[attr]
        }
        break
      }
      console.log(topic.split('/'))
    }
  }
}
</script>

<style>
</style>
