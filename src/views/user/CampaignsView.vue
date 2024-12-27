<template>
  <div class="flex flex-col items-center gap-8 mx-4 py-20" v-if="!isLoading">
    <section class="flex items-center justify-end flex-col w-full h-36">
      <h1 class="font-bold text-3xl text-pink-600">Các chiến dịch khuyên góp</h1>
      <p class="text-center">Lựa chọn lĩnh vực mà bạn quan tâm</p>
      <div class="flex gap-4 mt-4 flex-wrap justify-center">
        <div
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-1 border-2 rounded-lg flex items-center cursor-pointer"
          :class="
            category.id == currentCategory.id
              ? 'bg-pink-500 text-white'
              : 'border-pink-500  text-pink-500'
          "
          @click="changeCategory(category)"
        >
          {{ category.name }}
        </div>
      </div>
    </section>

    <section
      class="flex w-full max-w-screen-xl items-center justify-between gap-4 relative z-0 flex-col lg:flex-row"
    >
      <base-input
        :type="'text'"
        :style="'rounded-md border-2 border-solid w-96 h-10 px-3 mt-2 focus:outline-pink-300 '"
        :placeholder="'Tìm kiếm'"
      ></base-input>

      <div class="flex gap-4 mt-4 flex-wrap justify-center">
        <div
          v-for="state in states"
          :key="state.id"
          class="px-4 py-1 border-2 rounded-lg flex items-center cursor-pointer"
          :class="
            state.value == currentState
              ? 'bg-pink-500 text-white'
              : 'border-pink-500  text-pink-500'
          "
          @click="changeState(state)"
        >
          {{ state.title }}
        </div>
      </div>
    </section>

    <section
      class="justify-start bg-white w-full max-w-screen-xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center"
    >
      <base-card
        v-for="campaign in campaignsWithRemainingTime"
        :key="campaign.id"
        @click="router.push({ name: `campaign-detail-route`, params: { id: `${campaign.id}` } })"
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
            <p class="text-lg hover:text-pink-600 font-bold line-clamp-2">
              {{ campaign.title }}
            </p>
          </div>
        </template>
        <!-- card-content -->
        <template v-slot:card-content>
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <img :src="campaign.creator.avatar" class="w-10 h-10 rounded-full" />
              <div class="text-xs">{{ campaign.creator.email }}</div>
            </div>
            <!-- <div
              class="bg-red-500 rounded-lg p-1 text-white"
              :class="campaign.currentStatus == 'ENDED' ? 'flex' : 'hidden'"
            >
              Đã kết thúc
            </div> -->
            <div class="bg-amber-500 rounded-lg p-1 text-white text-xs">
              {{ campaign.remainingTime.displayText }}
            </div>
          </div>
          <div class="gap-2 flex flex-col">
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
      <div
        class="text-gray-500 flex items-center justify-center font-bold text-center h-96 bg-gray-200 col-span-3"
        v-if="campaigns.length == 0"
      >
        Không có chiến dịch nào
      </div>
    </section>
    <section>
      <base-pagination
        v-model:currentPage="currentPage"
        v-model:totalPage="totalPage"
      ></base-pagination>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseInput from '@/components/BaseInput.vue'
import BasePagination from '@/components/BasePagination.vue'
// import BaseFilter from '@/components/BaseFilter.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRouter } from 'vue-router'
import { useSocketStore } from '@/store/socketStore'
const categories = ref('')
const isLoading = ref(true)
const websocketState = ref('UNCONNECTED')
const currentCategory = ref('')
const campaigns = ref()
const states = [
  {
    id: '1',
    value: 'SCHEDULED',
    title: 'Sắp diễn ra',
  },
  {
    id: '2',
    value: 'STARTED',
    title: 'Đang diễn ra',
  },
  {
    id: '3',
    value: 'STOPPED',
    title: 'Đang tạm dừng',
  },
  {
    id: '4',
    value: 'ENDED',
    title: 'Đã kết thúc',
  },
]
const currentState = ref(null)

const campaignRepository = RepositoryFactory.get('campaigns')
const campaignCategoryRepository = RepositoryFactory.get('categories')

const pageSize = ref(6)
const currentPage = ref(1)

const search = ref('')
const totalPage = ref('')
const totalRecord = ref('')
const currentDateTime = ref(new Date())
const router = useRouter()

onBeforeMount(async () => {
  console.log('OnBefore Mount')
  console.log(router.currentRoute.value.fullPath)
  if (!socketStore.isConnected) {
    console.log('Conneted: ')
    console.log(!socketStore.isConnected)
    await socketStore.connect()
  }
  currentState.value = states[1].value
  await getAllCategories()

  // Cập nhật thời gian hiện tại mỗi giây
  setInterval(() => {
    currentDateTime.value = new Date()
  }, 60000)
})

onMounted(() => {
  console.log('On Mounted')
})

onUnmounted(() => {
  socketStore.cleanSubcribe()
})

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

function changeCategory(category) {
  currentCategory.value = category
  getAllCampaigns()
}

function changeState(state) {
  currentState.value = state.value
  getAllCampaigns()
}

watch(currentPage, () => {
  getAllCampaigns()
})

const pageParams = computed(() => {
  return `page=${currentPage.value - 1}&pageSize=${pageSize.value}`
})

const searchKeyWordParams = computed(() => {
  return search.value.trim() ? `searchKeyWord=${search.value}` : ''
})

const stateParams = computed(() => {
  return `state=${currentState.value}`
})

async function getAllCategories() {
  campaignCategoryRepository
    .getAll('')
    .then((response) => {
      console.log(response.data)
      const data = response.data
      categories.value = data.content
      currentCategory.value = categories.value[0]
      getAllCampaigns()
    })
    .catch((err) => {
      console.log(err)
    })
}

function getAllCampaigns() {
  let params = pageParams.value
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  console.log(currentCategory.value.id)
  params += `&categoryId=${currentCategory.value.id}`

  params += `&` + stateParams.value
  isLoading.value = true
  campaignRepository
    .getAll(params)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      totalPage.value = data.totalPages
      // totalRecord.value = data.totalElements
      totalRecord.value = data.totalElements

      campaigns.value = data.content

      console.log('Fetch success full')
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
  // console.log('At remail')
  // console.log(campaigns.value)

  return campaigns.value.map((campaign) => {
    // console.log('Campaign at remain time:', campaign)
    if (campaign.currentStatus === 'SCHEDULED') {
      return {
        ...campaign,
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          displayText: 'Sắp diễn ra',
        },
      }
    }
    if (campaign.currentStatus === 'STOPPED') {
      return {
        ...campaign,
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          displayText: 'Đang tạm dừng',
        },
      }
    }
    if (campaign.currentStatus === 'ENDED') {
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

    const endDate = new Date(`${campaign.endDate} ${campaign.endTime}:00`)
    const timeDiff = endDate - currentDateTime.value

    if (timeDiff <= 0) {
      return {
        ...campaign,
        remainingTime: {
          days: 0,
          hours: 0,
          minutes: 0,
          displayText: `Còn ${days} ngày ${hours} giờ ${minutes} phút`,
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
//
const socketStore = useSocketStore()

const canSubcribeTopic = computed(() => {
  console.log('Change Can subcribe topic')
  return socketStore.isConnected && isLoading.value == false
})

watch(canSubcribeTopic, (newvalue, oldValue) => {
  console.log('Change cansubcrie topic')
  if (newvalue == true) {
    handleSubcribe()
  } else {
    console.log('unsubcribe at watch')
    socketStore.cleanSubcribe()
    // for (const cp of campaigns.value) {
    //   socketStore.unsubscribe(`/topic/campaigns/${cp.id}`)
    //   socketStore.unsubscribe(`/topic/campaigns/${cp.id}/donations/ACCEPT`)
    // }
    // if (socketStore.subs['/topic/campaigns/' + currentState.value]) {
    //   socketStore.unsubscribe('/topic/campaigns/' + currentState.value)
    // }
  }
})

function handleSubcribe() {
  if (!socketStore.subs['/topic/campaigns/' + currentState.value]) {
    socketStore.subscribe('/topic/campaigns/' + currentState.value, onMessageReceived)
  }

  for (const cp of campaigns.value) {
    if (!socketStore.subs['/topic/campaigns/' + cp.id]) {
      socketStore.subscribe('/topic/campaigns/' + cp.id, onMessageReceived)
      socketStore.subscribe('/topic/campaigns/' + cp.id + '/donations/ACCEPT', onMessageReceived)
    } else {
      console.log('topic subcribed')
    }
  }
}

const onMessageReceived = (topic, response) => {
  console.log(topic)
  console.log(response)
  if (
    response.action === 'NEW_CAMPAIGN' &&
    currentCategory.value.id === response.data.category.id
  ) {
    console.log('In new Campaign')
    if (currentPage.value == 1) {
      const newCampaigns = []
      newCampaigns.push(response.data)
      for (const cp of campaigns.value) {
        newCampaigns.push(cp)
      }
      if (newCampaigns.length > pageSize.value) {
        const unSubcribeCampaign = newCampaigns.pop()
        if (socketStore.subs[`/topic/campaigns/${unSubcribeCampaign.id}`]) {
          socketStore.unsubscribe(`/topic/campaigns/${unSubcribeCampaign.id}`)
          socketStore.unsubscribe('/topic/campaigns/' + unSubcribeCampaign.id + '/donations/ACCEPT')
        }
      }
      campaigns.value = newCampaigns
      handleSubcribe()

      //pagination
    } else {
      for (const cp of campaigns.value) {
        socketStore.unsubscribe(`/topic/campaigns/${cp.id}`)
        socketStore.unsubscribe(`/topic/campaigns/${cp.id}/donations/ACCEPT`)
      }
      getAllCampaigns()
    }
  }

  if (response.action === 'NEW_STATUS') {
    for (const cp of campaigns.value) {
      socketStore.unsubscribe(`/topic/campaigns/${cp.id}`)
      socketStore.unsubscribe(`/topic/campaigns/${cp.id}/donations/ACCEPT`)
    }
    getAllCampaigns()
  }
  if (response.action == 'NEW_DONATION') {
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
