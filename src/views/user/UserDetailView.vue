<template>
  <div class="flex flex-col items-center gap-4 py-20">
    <base-banner :title="'Chi tiết người dùng'"></base-banner>
    <section class="content grid col-span-1 md:grid-cols-4 w-full max-w-7xl gap-8">
      <div class="flex flex-col col-span-1 w-full gap-8">
        <!-- avatar -->
        <div class="flex flex-col items-center gap-4">
          <div class="relative group cursor-pointer">
            <div
              class="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              @click="inputImage.click"
            >
              <div class="absolute text-indigo-500 flex items-center justify-center">Chỉnh sửa</div>
            </div>

            <img :src="user.avatar" class="w-44 h-44 rounded-full" />
          </div>
          <div class="text-2xl font-semibold w-full flex justify-center">
            {{ user.firstName + ' ' + user.lastName }}
          </div>
          <input type="file" class="hidden" ref="inputImage" @change="onFileChange" />
        </div>
        <!-- tabs -->
        <div class="flex flex-col gap-4">
          <div
            class="font-semibold hover:text-pink-500 text-lg cursor-pointer border-t-2 text-center p-4"
            v-for="tab in tabs"
            :class="tab.id === currentTab.id ? 'text-pink-600' : 'text-black'"
            :key="tab.id"
            @click="currentTab = tab"
          >
            {{ tab.title }}
          </div>
        </div>
        <base-button
          @click="handleLogout()"
          :content="'Đăng xuất'"
          :style="'min-w-full px-4 py-2 text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
        ></base-button>
      </div>

      <!-- update infor and changepassword tab -->
      <div
        class="md:col-span-3 min-h-[500px] flex flex-col gap-8 p-4"
        :class="currentTab === tabs[0] ? 'flex' : 'hidden'"
      >
        <!-- update infor -->
        <div class="relative">
          <div
            class="absolute bg-black/40 top-0 bottom-0 left-0 right-0"
            :class="isUpdatingInfor ? 'flex' : 'hidden'"
          >
            Đang lưu...
          </div>
          <div class="text-2xl font-semibold pb-6">Thông tin cá nhân</div>
          <div class="bg-white w-full flex gap-4 flex-col">
            <base-input
              :label="'Id'"
              :type="'text'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.id"
              :readonly="'true'"
            ></base-input>
            <base-input
              :label="'Email'"
              :type="'email'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.email"
              :readonly="'true'"
            ></base-input>
            <base-input
              :label="'Họ và tên đệm'"
              :type="'text'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.firstName"
              v-model:error="error.firstName"
              :readonly="'true'"
            ></base-input>
            <base-input
              :label="'Tên'"
              :type="'text'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.lastName"
              v-model:error="error.lastName"
              :readonly="'true'"
            ></base-input>
            <base-input
              :label="'Ngày sinh'"
              :type="'date'"
              :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.dob"
              v-model:error="error.dob"
              :readonly="'true'"
            ></base-input>
            <base-select
              :mainTitle="'Giới tính'"
              :options="[
                { id: 'NAM', title: 'Nam', value: 'Nam' },
                { id: 'NỮ', title: 'Nữ', value: 'Nữ' },
              ]"
              :containerStyle="'flex flex-col w-24'"
              :disabled="true"
              :titleStyle="'text-sm font-semibold'"
              :selectStyle="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300 items-fit'"
              v-model:model="user.gender"
            >
            </base-select>
            <base-input
              :label="'Điện thoại'"
              :type="'text'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.phone"
              v-model:readonly="isNonEditingInfor"
              v-model:error="error.phone"
            ></base-input>

            <base-input
              :label="'Điạ chỉ'"
              :type="'text'"
              :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="user.address"
              v-model:error="error.address"
              v-model:readonly="isNonEditingInfor"
            ></base-input>

            <base-button
              :type="'button'"
              :content="'Chỉnh sửa'"
              v-if="isNonEditingInfor"
              :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
              @click="isNonEditingInfor = !isNonEditingInfor"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Lưu'"
              v-else
              :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
              @click="updateProfile()"
            ></base-button>
          </div>
        </div>

        <!-- change password -->
        <div class="relative border-t-2">
          <div
            class="absolute bg-black/40 top-0 bottom-0 left-0 right-0"
            :class="isUpdatingPassword ? 'flex' : 'hidden'"
          >
            Đang lưu...
          </div>
          <div class="text-2xl font-semibold pb-6">Đổi mật khẩu</div>
          <div class="bg-white w-full flex gap-4 flex-col">
            <base-input
              :label="'Mật khẩu hiện tại'"
              :type="'password'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="changePassworData.oldPassword"
              v-model:error="changePasswordError.oldPassword"
              v-model:readonly="isNonEditingPassword"
            ></base-input>
            <base-input
              :label="'Mật khẩu mới'"
              :type="'password'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="changePassworData.newPassword"
              v-model:error="changePasswordError.newPassword"
              v-model:readonly="isNonEditingPassword"
            ></base-input>
            <base-input
              :label="'Nhập lại mật khẩu mới'"
              :type="'password'"
              :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
              v-model:data="changePassworData.repeatNewPassword"
              v-model:error="changePasswordError.repeatNewPassword"
              v-model:readonly="isNonEditingPassword"
            ></base-input>
            <base-button
              :type="'button'"
              :content="'Thay đổi mật khẩu'"
              v-if="isNonEditingPassword"
              :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-pink-500 hover:bg-pink-600 rounded-md'"
              @click="isNonEditingPassword = !isNonEditingPassword"
            ></base-button>
            <base-button
              :type="'button'"
              :content="'Lưu'"
              v-else
              :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
              @click="handleChangePassword()"
            ></base-button>
          </div>
        </div>
      </div>

      <!-- campaigns of user -->
      <div
        class="md:col-span-3 min-h-[500px] flex flex-col gap-8 p-4"
        :class="currentTab === tabs[1] ? 'flex' : 'hidden'"
      >
        <div class="text-2xl font-semibold pb-6">Các chiến dịch của bạn</div>
        <section
          class="justify-start bg-white w-full gap-6 grid grid-cols-1 md:grid-cols-2 items-center"
        >
          <base-card
            v-for="campaign in campaigns"
            :key="campaign.id"
            @click="
              router.push({ name: `campaign-detail-route`, params: { id: `${campaign.id}` } })
            "
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
                  {{ campaign.currentStatus }}
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
            v-model:currentPage="campaignCurrentPage"
            v-model:totalPage="campaignTotalPage"
          ></base-pagination>
        </section>
      </div>

      <!-- donations of user -->
      <div
        class="md:col-span-3 min-h-[500px] flex flex-col p-4"
        :class="currentTab === tabs[2] ? 'flex' : 'hidden'"
      >
        <div class="text-2xl font-semibold pb-1">Các khoản quyên góp của bạn</div>
        <div class="flex flex-col gap-4">
          <div class="w-full flex flex-col" v-for="donation in donations" :key="donation.id">
            <div class="text-xs font-bold p-1">{{ donation.createdAt }}</div>
            <div class="bg-gray-200 p-2 flex rounded-lg flex-col">
              <div class="text-lg font-bold text-pink-600">
                {{ donation.isAnonymous ? 'Khoản quyên góp ẩn danh' : 'Khoản quyên góp công khai' }}
              </div>
              <div class="flex gap-2">
                <div class="text-black font-bold">Mã:</div>
                <div>{{ donation.id }}</div>
              </div>
              <div class="flex gap-2">
                <div class="text-black font-bold">Số tiền:</div>
                <div>{{ formatCurrency(donation.amount) }} đ</div>
              </div>
              <div class="flex gap-2">
                <div class="text-black font-bold">Quyên góp cho:</div>
                <div>{{ donation.campaign.title }}</div>
              </div>
              <div class="flex gap-2">
                <div class="text-black font-bold">Trạng thái:</div>
                <div
                  :class="[
                    donation.state === 'FAILED' ? 'text-red-600' : '',
                    donation.state === 'PENDING' ? 'text-indigo-600' : '',
                    donation.state === 'ACCEPT' ? 'text-green-600' : '',
                  ]"
                >
                  {{ donation.state }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <section class="pt-10">
          <base-pagination
            v-model:currentPage="donationCurrentPage"
            v-model:totalPage="donationTotalPage"
          ></base-pagination>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseBanner from '@/components/BaseBanner.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useAuthStore } from '@/store/authStore'
import ImageRepository from '@/repository/ImageRepository'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/BaseCard.vue'
import BasePagination from '@/components/BasePagination.vue'
import LocalStorageRepository from '@/repository/LocalStorageRepository'
const router = useRouter()
const authStore = useAuthStore()
const user = ref({})
const newAvatar = ref({})
const error = ref({
  firstName: '',
  lastName: '',
  dob: '',
  phone: '',
  address: '',
})

onBeforeMount(() => {
  user.value = authStore.currentUser.infor
  currentTab.value = tabs.value[0]
  // console.log(user.value.id)
})
const userRepository = RepositoryFactory.get('users')
const imageRepository = ImageRepository
const tabs = ref([
  {
    id: 1,
    title: 'Thông tin cá nhân',
  },
  {
    id: 2,
    title: 'Các chiến dịch của bạn',
  },
  {
    id: 3,
    title: 'Các khoản quyên góp',
  },
])
const currentTab = ref()
watch(currentTab, (newValue) => {
  if (newValue.id === tabs.value[0].id) {
    getProfile()
  } else if (newValue.id === tabs.value[1].id) {
    getCampaignOfUser()
  } else if (newValue.id === tabs.value[2].id) {
    getDonationsOfUser()
  } else {
    console.log('else')
  }
})

const inputImage = ref('')

async function getProfile() {
  userRepository
    .getProfile(user.value.id)
    .then((response) => {
      console.log(response)
      user.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const onFileChange = (evt) => {
  const newFile = evt.target.files[0]
  newAvatar.value = {
    file: newFile,
    fileName: newFile.name,
    url: URL.createObjectURL(newFile),
  }
  user.value.avatar = newAvatar.value.url
  updateAvatar()
  console.log(newAvatar.value)
}

//logic update profile
const isNonEditingInfor = ref(true)
const isUpdatingInfor = ref(false)
function updateAvatar() {
  userRepository
    .updateAvatar(user.value.id, newAvatar.value)
    .then((response) => {
      const data = response.data
      console.log(response)
      newAvatar.value.url = data.url
      imageRepository
        .upload(data.preSignedUrl, newAvatar.value.file)
        .then((res) => {
          console.log(res)
          user.value.avatar = newAvatar.value.url
          // addToEdt(data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    })
    .catch((err) => {
      console.log(err)
    })
}
function updateProfile() {
  isUpdatingInfor.value = true
  userRepository
    .getProfile(user.value.id, user.value)
    .then((response) => {
      user.value = response.data
      isNonEditingInfor.value = !isNonEditingInfor.value
    })
    .then((err) => {
      console.log(err)
    })
    .finally(() => {
      isUpdatingInfor.value = false
    })
}

const isUpdatingPassword = ref(false)
const isNonEditingPassword = ref(true)
const changePassworData = ref({
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
})
const changePasswordError = ref({
  oldPassword: '',
  newPassword: '',
  repeatNewPassword: '',
})
function handleChangePassword() {
  isUpdatingPassword.value = true
  userRepository
    .changePassword(user.value.id, changePassworData.value)
    .then((response) => {
      console.log(response)
      //process logout
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isUpdatingPassword.value = false
    })
}

//logic get ampaign of user
const campaigns = ref([])
const campaignPageSize = ref(6)
const campaignCurrentPage = ref(1)
const campaignTotalPage = ref(1)
watch(campaignCurrentPage, () => {
  getCampaignOfUser()
})
const campaignPageParams = computed(() => {
  return `page=${campaignCurrentPage.value - 1}&pageSize=${campaignPageSize.value}`
})
function getCampaignOfUser() {
  userRepository
    .getCampaignOfUser(user.value.id, campaignPageParams.value)
    .then((response) => {
      console.log(response)
      campaigns.value = response.data.content
      campaignTotalPage.value = response.data.totalPages
    })
    .catch((err) => {
      console.log(err)
    })
}
function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

// logic get donations of user
const donations = ref([])
const donationPageSize = ref(10)
const donationCurrentPage = ref(1)
const donationTotalPage = ref(1)
watch(donationCurrentPage, () => {
  getDonationsOfUser()
})
const donationPageParams = computed(() => {
  return `page=${donationCurrentPage.value - 1}&pageSize=${donationPageSize.value}`
})

function getDonationsOfUser() {
  userRepository
    .getDonationOfUser(user.value.id, donationPageParams.value)
    .then((response) => {
      donations.value = response.data.content
      donationTotalPage.value = response.data.totalPages
    })
    .catch((err) => {
      console.log(err)
    })
}

function handleLogout() {
  authStore.currentUser = ''
  console.log(authStore.currentUser)
  router.replace({ name: 'home-route' })
}
</script>

<style>
</style>
