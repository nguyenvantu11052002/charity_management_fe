<template>
  <div class="flex flex-col items-center gap-8 py-20">
    <base-banner :title="'Tìm kiếm'"></base-banner>

    <section
      class="flex w-full max-w-screen-xl items-center justify-center gap-4 relative z-0 flex-col lg:flex-row"
    >
      <div class="relative flex items-center gap-4">
        <base-input
          :type="'text'"
          :style="'rounded-md border-2 border-solid w-96 h-10 px-3 mt-2 focus:outline-pink-300 '"
          :placeholder="'Tìm kiếm'"
          v-model:data="searchKeyWord"
        ></base-input>

        <base-button
          :type="'button'"
          :content="'Tìm kiếm'"
          :style="' max-w-60 py-2  font-bold text-sm border-4 border-pink-500  h-10 bg-white text-pink-500  rounded-md px-4'"
          @click="searchCampaign"
        ></base-button>
      </div>
    </section>

    <section
      class="justify-start bg-white w-full max-w-screen-xl gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center"
    >
      <base-card
        v-for="campaign in searchResult"
        :key="campaign.id"
        @click="router.push({ name: `campaign-detail-route`, params: { id: `${campaign.id}` } })"
      >
        <!-- card-image -->
        <template v-slot:card-image>
          <div class="relative">
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
              {{ toDisplayTextState(campaign.currentStatus) }}
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
        v-if="searchResult.length == 0"
      >
        Không có chiến dịch nào
      </div>
    </section>
    <section>
      <base-pagination
        v-model:currentPage="searchCurrentPage"
        v-model:totalPage="searchTotalPage"
      ></base-pagination>
    </section>
  </div>
</template>

<script setup>
import BaseBanner from '@/components/BaseBanner.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BasePagination from '@/components/BasePagination.vue'
import BaseCard from '@/components/BaseCard.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
onBeforeMount(() => {
  searchKeyWord.value = route.params.keyword
  console.log(route.params.keyword)
  searchPageSize.value = 6
  searchCurrentPage.value = 1
  searchCampaign()
})
const searchKeyWord = ref('')
const campaignRepository = RepositoryFactory.get('campaigns')

const searchPageParams = computed(() => {
  return `page=${searchCurrentPage.value - 1}&pageSize=${searchPageSize.value}`
})

const searchResult = ref([])
const searchPageSize = ref(6)
const searchTotalPage = ref(1)
const searchCurrentPage = ref(1)

watch(searchCurrentPage, () => {
  searchCampaign()
})
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

async function searchCampaign() {
  let sParams = searchPageParams.value + '&keyword=' + searchKeyWord.value
  sParams += '&status=SCHEDULED&status=STARTED&status=STOPPED&status=ENDED'
  console.log(sParams)
  campaignRepository
    .search(sParams)
    .then((response) => {
      const data = response.data
      searchTotalPage.value = data.totalPages
      searchResult.value = data.content
      console.log('Fetch success full')
    })
    .catch((err) => {
      console.log(err)
    })
}
function toDisplayTextState(state) {
  if (state === 'SCHEDULED') {
    return 'Sắp diễn ra'
  }
  if (state === 'STARTED') {
    return 'Đang diễn ra'
  }
  if (state === 'STOPPED') {
    return 'Đang tạm dừng'
  }
  if (state === 'ENDED') {
    return 'Đã kết thúc'
  }
}
</script>

<style>
</style>
