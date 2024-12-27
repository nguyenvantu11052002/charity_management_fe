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
            >
              <div class="absolute text-indigo-500 flex items-center justify-center">Chỉnh sửa</div>
            </div>

            <img
              src="https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/avatar-101.jpg"
              class="w-44 h-44 rounded-full"
            />
          </div>
          <div class="text-2xl font-semibold w-full flex justify-center">Trần Minh Châu</div>
        </div>

        <div class="flex flex-col gap-4">
          <div
            class="font-semibold hover:text-pink-500 text-lg cursor-pointer border-t-2 text-center"
            v-for="tab in tabs"
            :class="tab.id === curentTab.id ? 'text-pink-600' : 'text-black'"
            :key="tab.id"
            @click="curentTab = tab"
          >
            {{ tab.title }}
          </div>
        </div>
      </div>
      <div
        class="md:col-span-3 min-h-[500px] flex flex-col gap-4 p-4"
        :class="curentTab === tabs[0] ? 'flex' : 'hidden'"
      >
        <div class="text-2xl font-semibold">Thông tin cá nhân</div>
        <div class="bg-white w-full flex gap-4 flex-col">
          <base-input
            :label="'Email'"
            :type="'email'"
            :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          ></base-input>
          <base-input
            :label="'Họ và tên đệm'"
            :type="'text'"
            :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300 '"
          ></base-input>
          <base-input
            :label="'Tên'"
            :type="'text'"
            :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300 '"
          ></base-input>
          <base-input
            :label="'Ngày sinh'"
            :type="'date'"
            :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          ></base-input>
          <base-input
            :label="'Điện thoại'"
            :type="'text'"
            :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          ></base-input>
          <base-input
            :label="'Điạ chỉ'"
            :type="'text'"
            :style="'rounded-md border-2 border-solid  h-10 px-3 mt-2 focus:outline-pink-300'"
          ></base-input>
          <base-button
            :type="'button'"
            :content="'Chỉnh sửa'"
            :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
          ></base-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import BaseBanner from '@/components/BaseBanner.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'
const tabs = ref([
  {
    id: 1,
    title: 'Thông tin cá nhân',
  },
  {
    id: 2,
    title: 'Các chiến dịch đã tham gia',
  },
  {
    id: 3,
    title: 'Các chiến dịch của bạn',
  },
])
const curentTab = ref(tabs.value[0])
</script>

<style>
</style>
