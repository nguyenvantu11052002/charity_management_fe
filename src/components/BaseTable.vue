<template>
  <div class="border rounded-lg shadow-lg px-4 py-4 bg-white gap-4 flex flex-col">
    <div class="table-header flex justify-between flex-wrap">
      <label class="font-bold text-lg"> {{ props.tableName }}</label>
      <base-select
        :options="props.pageSizeOptions"
        v-model:model="pageSizeModel"
        :main-title="'Số bản ghi trên 1 trang: '"
      ></base-select>
    </div>
    <!-- End Table Header -->
    <div class="flex items-center justify-start gap-8 flex-wrap">
      <base-input
        :type="'search'"
        :placeholder="'Tìm kiếm'"
        :style="'rounded-md border-2 border-solid border-gray-300 h-10 px-3 mt-2 focus:outline-pink-300'"
        v-model:data="searchModel"
      ></base-input>

      <div v-if="props.filterLabel">
        <base-filter
          :label="props.filterLabel"
          :groupFilters="groupFilters"
          v-model:filterData="filterModel"
        ></base-filter>
      </div>
      <div>
        <base-link
          :to="props.createPageLink"
          :title="'Tạo mới'"
          :defaultStyle="'bg-indigo-500 hover:bg-indigo-600 text-white flex justify-center '"
        ></base-link>
      </div>
    </div>
    <!-- End Table Action -->
    <div class="overflow-x-auto border">
      <table class="lg:min-w-full text-start border min-w-[900px]">
        <thead class="text-start font-semibold text-lg">
          <td v-for="property in recordPropertiesModel" :key="property" class="p-4">
            {{ property }}
          </td>
        </thead>
        <tbody>
          <tr
            v-for="data in recordDataModel"
            :key="data.id"
            @click="router.push({ name: `${props.detailPageLink}`, params: { id: `${data.id}` } })"
            class="text-lg hover:text-white hover:bg-pink-500 cursor-pointer px-4"
          >
            <td v-for="(k, v) in data" :key="v" class="flex-wrap p-4">
              <div v-if="v == 'image' || v === 'avatar'">
                <img :src="k" v-if="checkImageURL(k)" class="w-20 h-20 object-contain" />
                <!--  -->
                <div v-else>N/A</div>
              </div>
              <div v-else>{{ k }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End Table content -->
    <div class="table-footer flex justify-between">
      <div class="flex gap-2">
        <base-pagination
          v-model:currentPage="currentPageModel"
          v-model:totalPage="totalPageModal"
        ></base-pagination>
      </div>
      <div>
        <span>{{ totalRecordModel }} bản ghi / {{ totalPageModal }} trang</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import BaseFilter from './BaseFilter.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import BasePagination from './BasePagination.vue'
import BaseLink from './BaseLink.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// const props = defineProps([])
// const pageSizeOptions = [10, 20, 30]
// const pageSizeModel = ref(pageSizeOptions[0])
const pageSizeModel = defineModel('pageSize')
const searchModel = defineModel('search')
const filterModel = defineModel('filterModel')
const currentPageModel = defineModel('currentPage')
// const currentPage = ref(1)
const totalPageModal = defineModel('totalPage')
// const totalPage = ref(4)
const totalRecordModel = defineModel('totalRecord')
// const totalRecord = ref(100)

const recordDataModel = defineModel('recordData')
const recordPropertiesModel = defineModel('recordProperties')
//table name
const props = defineProps([
  'tableName',
  'pageSizeOptions',
  'createPageLink',
  'detailPageLink',
  'filterLabel',
  'groupFilters',
])

const checkImageURL = (url) => {
  if (!url) return false
  const pattern = /^https?:\/\/.+\.(png|jpg|jpeg|bmp|gif|webp|svg)$/i
  console.log(url)
  console.log(pattern.test(url))
  return pattern.test(url)
}
// const tableName = 'Tất cả người dùng'
// const search = ref('')
//filter
// const filterData = ref([])
// const filterLabel = 'Lọc người dùng'
// const groupFilters = [
//   {
//     property: 'role',
//     groupStyle: '',
//     checkboxStyle: 'text-pink-500',
//     checkboxs: [
//       {
//         label: 'ROLE_ADMIN',
//         style: 'text-pink-500',
//         value: 'role,ROLE_ADMIN',
//       },
//       {
//         label: 'ROLE_USER',
//         style: 'text-pink-500',
//         value: 'role,ROLE_USER',
//       },
//     ],
//   },
//   {
//     property: 'blocked',
//     checkboxs: [
//       {
//         label: 'TRUE',
//         style: 'text-pink-500',
//         value: 'blocked,true',
//       },
//       {
//         label: 'Fasle',
//         style: 'text-pink-500',
//         value: 'blocked,false',
//       },
//     ],
//   },
// ]
//pageination
// const currentPage = ref(1)
// const totalPage = ref(4)
// const totalRecord = ref(100)
// Tabel content
// const recordProperties = ['id', 'email', 'firstName', 'lasName', 'blocked']
// const recordData = ref([
//   {
//     id: 1,
//     email: 'chauminhtran2@gmail.com',
//     firstName: 'Trần',
//     lastName: 'Minh Châu',
//     blocked: 'true',
//   },
//   {
//     id: 1,
//     email: 'chauminhtran2@gmail.com',
//     firstName: 'Trần',
//     lastName: 'Minh Châu',
//     blocked: 'true',
//   },
//   {
//     id: 1,
//     email: 'chauminhtran2@gmail.com',
//     firstName: 'Trần',
//     lastName: 'Minh Châu',
//     blocked: 'true',
//   },
// ])
</script>

<style>
</style>
