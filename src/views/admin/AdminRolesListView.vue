<template>
  <div class="overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <base-table
        :table-name="'Tất cả Roles'"
        :page-size-options="pageSizeOptions"
        :createPageLink="'admin-create-role-route'"
        :detailPageLink="'admin-role-detail-route'"
        :table-content-style="'text-start border w-full'"
        v-model:pageSize="pageSize"
        v-model:search="search"
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
const roleRepository = RepositoryFactory.get('roles')
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
  getAllRoles()
})

const currentPage = ref(1)
const totalPage = ref(100)
const totalRecord = ref(100)

const recordProperties = ref(['id', 'Tên'])
const recordData = ref([])
async function getAllRoles() {
  let params = pageParams.value
  console.log(params)
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  roleRepository
    .getAll(params)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      totalPage.value = data.totalPages
      totalRecord.value = data.totalElements
      recordData.value = data.content
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
  getAllRoles()
})
watch(search, () => {
  currentPage.value = 1
  getAllRoles()
})
watch(pageSize, () => {
  currentPage.value = 1
  getAllRoles()
})
</script>

<style>
</style>
