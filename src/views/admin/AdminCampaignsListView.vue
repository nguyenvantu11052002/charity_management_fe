<template>
  <div class="relative overflow-x-hidden">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <base-table
        :table-name="'Tất cả chiến dịch'"
        :page-size-options="pageSizeOptions"
        :filterLabel="'Lọc chiến dịch'"
        :groupFilters="groupFilters"
        :createPageLink="'admin-create-campaign-route'"
        :detailPageLink="'admin-campaign-detail-route'"
        :table-content-style="' text-start border w-[2000px]'"
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
const campaignRepository = RepositoryFactory.get('campaigns')
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
  getAllCampaigns('')
})

const filterModel = ref([])
const groupFilters = [
  {
    property: 'category',
    groupStyle: '',
    checkboxStyle: 'text-pink-500',
    checkboxs: [
      {
        label: 'ROLE_ADMIN',
        style: 'text-pink-500',
        value: 'role,ROLE_ADMIN',
      },
      {
        label: 'ROLE_USER',
        style: 'text-pink-500',
        value: 'role,ROLE_USER',
      },
    ],
  },
  {
    property: 'Bị khóa',
    checkboxs: [
      {
        label: 'TRUE',
        style: 'text-pink-500',
        value: 'locked,true',
      },
      {
        label: 'FALSE',
        style: 'text-pink-500',
        value: 'locked,false',
      },
    ],
  },
]

const currentPage = ref(1)
const totalPage = ref(100)
const totalRecord = ref(100)

const recordProperties = ref([
  'id',
  'Ảnh chủ đề',
  'Tiêu đề',
  'Mục tiêu',
  'Người tạo',
  'Ngày dự kiến bắt đầu',
  'Ngày dự kiến kết thúc ',
  'Trạng thái',
])
const recordData = ref([{}])
async function getAllCampaigns() {
  let params = pageParams.value
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  campaignRepository
    .getAll(params)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      totalPage.value = data.totalPages
      totalRecord.value = data.totalElements
      recordData.value = data.content.map((cp) => {
        return {
          id: cp.id,
          image: cp.images[0].url,
          title: cp.title,
          fundraisingGoal: cp.fundraisingGoal,
          creator: cp.creator,
          startDate: cp.startDate,
          endDate: cp.endDate,
          currentStatus: cp.currentStatus,
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const pageParams = computed(() => {
  return `page=${currentPage.value - 1}&pageSize=${pageSize.value}`
})

const searchKeyWordParams = computed(() => {
  return search.value.trim() ? `searchKeyWord=${search.value}` : ''
})

watch(currentPage, () => {
  getAllCampaigns()
})
watch(search, () => {
  currentPage.value = 1
  getAllCampaigns()
})
watch(pageSize, () => {
  currentPage.value = 1
  getAllCampaigns()
})
</script>

<style>
</style>
