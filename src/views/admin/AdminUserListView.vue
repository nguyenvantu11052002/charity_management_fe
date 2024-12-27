<template>
  <div class="relative overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <base-table
        :table-name="'Tất cả người dùng'"
        :page-size-options="pageSizeOptions"
        :filterLabel="'Lọc người dùng'"
        :groupFilters="groupFilters"
        :createPageLink="'admin-create-user-route'"
        :detailPageLink="'admin-user-detail-route'"
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
const userRepository = RepositoryFactory.get('users')
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
  getAllUsers('')
})

const filterModel = ref([])
const groupFilters = [
  {
    property: 'role',
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
  'Avatar',
  'Email',
  'Họ và tên đệm',
  'Tên',
  'Ngày sinh',
  'Điện thoại',
  'Bị khóa',
])
const recordData = ref([
  // {
  //   id: 1,
  //   email: 'chauminhtran2@gmail.com',
  //   firstName: 'Trần',
  //   lastName: 'Minh Châu',
  //   blocked: 'true',
  // },
  // {
  //   id: 1,
  //   email: 'chauminhtran2@gmail.com',
  //   firstName: 'Trần',
  //   lastName: 'Minh Châu',
  //   blocked: 'true',
  // },
  // {
  //   id: 1,
  //   email: 'chauminhtran2@gmail.com',
  //   firstName: 'Trần',
  //   lastName: 'Minh Châu',
  //   blocked: 'true',
  // },
])
async function getAllUsers() {
  let params = pageParams.value
  if (searchKeyWordParams.value) {
    params += '&' + searchKeyWordParams.value
  }
  userRepository
    .getAllUsers(params)
    .then((response) => {
      console.log(response.data)
      const data = response.data
      totalPage.value = data.totalPages
      totalRecord.value = data.totalElements
      const records = data.content.map((us) => {
        return {
          id: us.id,
          avatar: us.avatar ? us.avatar : '',
          email: us.email,
          firstName: us.firstName,
          lastName: us.lastName,
          dob: us.dob,
          phone: us.phone,
          locked: us.locked,
        }
      })
      recordData.value = records
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
  getAllUsers()
})
watch(search, () => {
  currentPage.value = 1
  getAllUsers()
})
watch(pageSize, () => {
  currentPage.value = 1
  getAllUsers()
})
</script>

<style>
</style>
