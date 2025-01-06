<template>
  <div class="relative overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20" v-if="!isLoading">
      <div class="flex flex-col border p-4 gap-4 rounded-lg shadow-lg">
        <div class="font-bold text-xl">Thống kê nhanh</div>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between text-2xl">
            <span class="text-lg">Tổng số chiến dịch đang diễn ra</span>
            <div class="text-green-500 font-bold">{{ campaignStatistic.totalStartedCampaign }}</div>
          </div>

          <div class="flex justify-between text-2xl">
            <span class="text-lg">Tổng số khoản quyên góp thành công</span>
            <div class="text-pink-500 font-bold">{{ donationStatistic.totalAcceptDonation }}</div>
          </div>
          <div class="flex justify-between text-2xl">
            <span class="text-lg">Tổng số tiền đã được quyên góp</span>
            <div class="text-indigo-500 font-bold">
              {{ formatCurrency(donationStatistic.totalAmountRaised) }} đ
            </div>
          </div>
          <div class="flex justify-between text-2xl">
            <span class="text-lg">Tổng số tiền đã trao tặng</span>
            <div class="text-yellow-500 font-bold">
              {{ formatCurrency(donationStatistic.totalAmountDelivered) }} đ
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col border p-4 gap-4 rounded-lg shadow-lg">
        <div class="font-bold text-xl col-span-1">Các chiến dịch mới cập nhật</div>
        <div
          class="flex w-full justify-between align-middle cursor-pointer hover:bg-pink-500 p-4"
          v-for="cp in campaignStatistic.latestUpdateCampaigns"
          :key="cp.id"
          @click="router.push({ name: `admin-campaign-detail-route`, params: { id: `${cp.id}` } })"
        >
          <div class="">{{ cp.title }}</div>
          <div class="">{{ cp.currentStatus }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

const campaignRepository = RepositoryFactory.get('campaigns')
const donationsRepository = RepositoryFactory.get('donations')
const isLoading = ref(true)
const router = useRouter()
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}
onBeforeMount(async () => {
  isLoading.value = true
  await Promise.all([getCampaignStatistic(), getDonationStatistic()])
  isLoading.value = false
})

const campaignStatistic = ref()
const donationStatistic = ref()

function getCampaignStatistic() {
  campaignRepository
    .statistic()
    .then((res) => {
      console.log(res)
      campaignStatistic.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

function getDonationStatistic() {
  donationsRepository
    .statistic()
    .then((res) => {
      console.log(res)
      donationStatistic.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style>
</style>
