<template>
  <div
    class="flex z-30 items-center md:flex-col fixed flex-row justify-between md:justify-start rounded-sm md:bottom-0 top-0 border px-4 gap-4 md:w-64 w-full shadow-lg bg-white"
  >
    <app-logo :to="'admin-home-route'" class="py-4"> </app-logo>
    <nav-bar
      :routes="adminRoutes"
      :activeRoute="activeRoute"
      :changeRoute="changeActiveRoute"
      :navStyle="'flex gap-6 flex-col '"
      :navItemStyle="'text-lg font-semibold flex gap-4 items-center hidden md:flex '"
      class="justify-center flex"
    ></nav-bar>

    <div
      class="flex w-full justify-end items-center relative md:hidden z-50"
      @click="isShowMenu = !isShowMenu"
    >
      <span class="hover:text-pink-500 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </span>
      <div
        class="flex gap-6 flex-col absolute top-20 bg-white rounded-lg px-4 py-4 shadow-lg"
        :class="isShowMenu ? 'flex' : 'hidden'"
      >
        <nav-bar
          :routes="adminRoutes"
          :changeRoute="changeActiveRoute"
          :navStyle="'flex gap-6 flex-col'"
          :navItemStyle="'text-lg font-semibold flex gap-4 items-center   '"
          class="justify-center flex"
        ></nav-bar>
        <div class="flex flex-col">
          <base-link
            :to="'user-detail-route'"
            :title="userInfor.email"
            :defaultStyle="'bg-white text-black justify-center'"
          ></base-link>
          <base-button
            @click="handleLogout"
            :content="'Đăng xuất'"
            :style="'min-w-full px-4 py-2 text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
          ></base-button>
        </div>
      </div>
    </div>
    <div class="flex-col w-full border-t border-gray-500 mt-4 hidden md:flex">
      <base-link
        :to="'user-detail-route'"
        :title="userInfor.email"
        :defaultStyle="'bg-white text-black justify-center'"
      ></base-link>
      <base-button
        @click="handleLogout"
        :content="'Đăng xuất'"
        :style="'min-w-full p-2  text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
      ></base-button>
    </div>

    <!-- <div class="gap-2 md:gap-4 lg:justify-center justify-end border-t-2 border-pink-500">

    </div> -->
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import AppLogo from './AppLogo.vue'
import NavBar from './NavBar.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'
import BaseLink from './BaseLink.vue'
import BaseButton from './BaseButton.vue'
const authStore = useAuthStore()
const { userInfor } = storeToRefs(authStore)
const router = useRouter()
const route = useRoute()
const allRoute = router.getRoutes()
const adminRoutes = allRoute
  .filter((rt) => {
    console.log(rt)
    console.log(rt.meta.title)
    return rt.meta.layout === 'admin' && rt.meta.title
  })
  .sort((a, b) => {
    return a.meta.order - b.meta.order
  })

const activeRoute = ref(route.meta.parent ? route.meta.parent : route.name)
const isShowMenu = ref(false)
function changeActiveRoute(newRoute) {
  activeRoute.value = newRoute
}
function handleLogout() {
  authStore.currentUser = ''
  console.log(authStore.currentUser)
  router.replace({ name: 'home-route' })
}
</script>

<style>
</style>
