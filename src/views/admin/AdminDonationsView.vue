<template>
  <div class="relative overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <base-table
        :table-name="'Tất cả khoản quyên góp'"
        :page-size-options="pageSizeOptions"
        :table-content-style="'text-start border min-w-full'"
        v-model:pageSize="pageSize"
        v-model:search="search"
        v-model:filterModel="filterModel"
        v-model:currentPage="currentPage"
        v-model:totalPage="totalPage"
        v-model:totalRecord="totalRecord"
        v-model:recordProperties="recordProperties"
        v-model:recordData="recordData"
      ></base-table>
    </div>
  </div>
</template>

<script setup>
import BaseTable from '@/components/BaseTable.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { computed, onBeforeMount, ref, watch } from 'vue'
const donationsRepository = RepositoryFactory.get('donations')

const pageSizeOptions = [
  {
    id: 10,
    title: 10,
    value: 10,
  },
  {
    id: 20,
    title: 20,
    value: 20,
  },
  {
    id: 30,
    title: 30,
    value: 30,
  },
]
const pageSize = ref(pageSizeOptions[0].value)
const search = ref('')
onBeforeMount(() => {
  getAllDonations()
})

const currentPage = ref(1)
const totalPage = ref(100)
const totalRecord = ref(100)

const recordProperties = ref([
  'id',
  'Số tiền',
  'Trạng thái',

  'Chiến dịch',
  'Người ủng hộ',
  'Ẩn danh',
])
const recordData = ref([])
async function getAllDonations() {
  let params = pageParams.value
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  donationsRepository.getAll(params).then((response) => {
    console.log(response.data)
    const data = response.data
    totalPage.value = data.totalPages
    totalRecord.value = data.totalElements
    console.log(response.data.content)
    const records = data.content.map((donation) => {
      return {
        id: donation.id,
        amount: donation.amount,
        state: donation.state,
        campaign: donation.campaign.title,
        donor: donation.donor.email,
        isAnonymous: donation.isAnonymous,
      }
    })
    recordData.value = records
  })
}

const pageParams = computed(() => {
  return `page=${currentPage.value - 1}&pageSize=${pageSize.value}`
})

const searchKeyWordParams = computed(() => {
  return search.value.trim() ? `searchKeyWord=${search.value}` : ''
})

watch(currentPage, () => {
  getAllDonations()
})
watch(search, () => {
  currentPage.value = 1
  getAllDonations()
})
watch(pageSize, () => {
  currentPage.value = 1
  getAllDonations()
})
</script>

<style>
</style>
