<template>
  <div class="mx-2 md:mx-10 my-10 md:my-2">
    <base-table
      :table-name="'Tất cả danh mục chiến dịch'"
      :page-size-options="pageSizeOptions"
      :createPageLink="'admin-create-category-route'"
      :detailPageLink="'admin-category-detail-route'"
      v-model:pageSize="pageSize"
      v-model:search="search"
      v-model:currentPage="currentPage"
      v-model:totalPage="totalPage"
      v-model:totalRecord="totalRecord"
      v-model:recordProperties="recordProperties"
      v-model:recordData="recordData"
    ></base-table>
  </div>
</template>

<script setup>
import BaseTable from '@/components/BaseTable.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { computed, onBeforeMount, ref, watch } from 'vue'
const categoryRepository = RepositoryFactory.get('categories')
const pageSizeOptions = [10, 20, 30]
const pageSize = ref(pageSizeOptions[0])
const search = ref('')
onBeforeMount(() => {
  getAllCategories()
})

const currentPage = ref(1)
const totalPage = ref(100)
const totalRecord = ref(100)

const recordProperties = ref(['id', 'Tên'])
const recordData = ref([])
async function getAllCategories() {
  let params = pageParams.value
  console.log(params)
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  categoryRepository
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
  getAllCategories()
})
watch(search, () => {
  currentPage.value = 1
  getAllCategories()
})
watch(pageSize, () => {
  currentPage.value = 1
  getAllCategories()
})
</script>

<style>
</style>
