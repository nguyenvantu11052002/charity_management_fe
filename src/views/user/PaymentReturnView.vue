<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
      <div class="text-center">
        <svg
          v-if="isSuccess"
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h2 :class="['mt-4 text-2xl font-bold', isSuccess ? 'text-green-800' : 'text-red-800']">
          {{ isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại' }}
        </h2>

        <div class="mt-4 space-y-2 w-full" v-if="isSuccess">
          <div class="bg-gray-50 p-3 rounded-md flex flex-col items-start gap-4">
            <div class="text-sm text-gray-600 flex justify-between w-full">
              <div class="font-semibold min-w-20 text-start">Ngân hàng:</div>
              <div>{{ paymentInfor?.vnp_BankCode || 'Không có thông tin' }}</div>
            </div>
            <div class="text-sm text-gray-600 flex justify-between w-full">
              <div class="font-semibold min-w-20 text-start">Số tiền:</div>
              <div>{{ paymentInfor?.vnp_Amount / 100 || 'Không có thông tin' }}</div>
            </div>

            <div class="text-sm text-gray-600 flex justify-between w-full">
              <div class="font-semibold min-w-20 text-start">Ngày thanh toán:</div>
              <div>{{ paymentInfor?.vnp_PayDate || 'Không có thông tin' }}</div>
            </div>
            <div class="text-sm text-gray-600 flex flex-col justify-between w-full">
              <div class="font-semibold min-w-20 text-start">Ghi chú:</div>
              <div class="text-start">
                {{ paymentInfor?.vnp_OrderInfo || 'Không có thông tin' }}
              </div>
            </div>
          </div>
        </div>

        <div v-else class="mt-4 bg-red-50 p-3 rounded-md">
          <p class="text-sm text-red-700">
            Thanh toán không thành công. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.
          </p>
        </div>

        <div class="mt-6 flex space-x-4 justify-center">
          <button
            @click="goToHomePage"
            :class="[
              'px-6 py-2 rounded-md transition-colors',
              isSuccess
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-red-500 text-white hover:bg-red-600',
            ]"
          >
            {{ isSuccess ? 'Về trang chủ' : 'Thử lại' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const paymentInfor = ref()
// const paymentRepository = RepositoryFactory.get('payments')
// const ipnInfor = ref()
const isSuccess = ref()
const isLoading = ref(true)
onBeforeMount(() => {
  paymentInfor.value = route.query
  if (paymentInfor.value.vnp_ResponseCode === '00') {
    isSuccess.value = true
  } else {
    isSuccess.value = false
  }
  isLoading.value = false
})

// function ipnRequest() {
//   paymentRepository
//     .ipn(route.fullPath)
//     .then((response) => {
//       ipnInfor.value = response
//       if (ipnInfor.value.code === '00') {
//         isSuccess.value = true
//       }
//     })
//     .catch((err) => {
//       err
//     })
// }

function goToHomePage() {
  router.push('/')
}
</script>

<style>
</style>
