<template>
  <header
    class="flex fixed z-10 items-center w-full py-6 shadow-lg md:px-8 px-4 gap-4 bg-white max-h-20"
  >
    <app-logo :to="'home-route'" class="lg:basis-1/5 text-4xl basis-2/5"></app-logo>
    <nav-bar
      :routes="userRoutes"
      :activeRoute="activeRoute"
      :changeRoute="changeActiveRoute"
      :navStyle="'flex gap-8 '"
      :navItemStyle="'text-lg font-bold'"
      class="basis-3/5 justify-center hidden lg:flex"
    ></nav-bar>
    <div class="lg:basis-1/5 basis-3/5 min-w-72 hidden lg:flex">
      <div
        class="flex gap-2 md:gap-4 lg:justify-center justify-end"
        :class="userInfor ? 'hidden' : ''"
      >
        <base-link
          :to="'login-route'"
          :title="'Đăng nhập'"
          :defaultStyle="'bg-pink-500 hover:bg-pink-600 justify-center text-white '"
        ></base-link>
        <base-link
          :to="'register-route'"
          :title="'Đăng ký'"
          :defaultStyle="'bg-indigo-500 hover:bg-indigo-600 justify-center text-white '"
        ></base-link>
      </div>
      <div
        class="gap-2 md:gap-4 lg:justify-center justify-end"
        :class="userInfor ? 'flex' : 'hidden'"
      >
        <base-link
          :to="'user-detail-route'"
          :title="userInfor.email"
          :defaultStyle="'bg-white text-black justify-center'"
        ></base-link>
        <base-button
          @click="handleLogout()"
          :content="'Đăng xuất'"
          :style="' px-4 py-2 text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
        ></base-button>
      </div>
    </div>

    <div class="flex justify-end basis-3/5 lg:hidden relative" @click="isShowMenu = !isShowMenu">
      <div>
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
      </div>

      <div
        class="flex-col absolute top-14 text-center gap-4 w-full shadow-xl p-4 rounded-lg border bg-white"
        :class="isShowMenu ? 'flex' : 'hidden'"
      >
        <nav-bar
          :routes="userRoutes"
          :activeRoute="activeRoute"
          :changeRoute="changeActiveRoute"
          :navStyle="'flex gap-8 flex-col text-sm'"
          :navItemStyle="' font-bold'"
        ></nav-bar>

        <div class="lg:basis-1/5 basis-3/5">
          <div
            class="flex flex-col gap-2 md:gap-4 lg:justify-center justify-end"
            :class="userInfor ? 'hidden' : ''"
          >
            <base-link
              :to="'login-route'"
              :title="'Đăng nhập'"
              :defaultStyle="'bg-pink-500 hover:bg-pink-600 justify-center text-white '"
            ></base-link>
            <base-link
              :to="'register-route'"
              :title="'Đăng ký'"
              :defaultStyle="'bg-indigo-500 hover:bg-indigo-600 justify-center text-white '"
            ></base-link>
          </div>
          <div
            class="gap-2 md:gap-4 lg:justify-center justify-end border-t-2 border-pink-500"
            :class="userInfor ? 'flex flex-col ' : 'hidden'"
          >
            <base-link
              :to="'home-route'"
              :title="userInfor.email"
              :defaultStyle="'bg-white text-black justify-center'"
            ></base-link>
            <base-button
              @click="handleLogout()"
              :content="'Đăng xuất'"
              :style="'min-w-full px-4 py-2 text-sm text-white h-10 bg-gray-500 hover:bg-gray-600 rounded-md'"
            ></base-button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import AppLogo from './AppLogo.vue'
import NavBar from './NavBar.vue'
import { ref } from 'vue'
import BaseLink from './BaseLink.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'
import BaseButton from './BaseButton.vue'
export default {
  components: { AppLogo, NavBar, BaseLink, BaseButton },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { userInfor } = storeToRefs(authStore)
    const allRoute = router.getRoutes()
    const LocalStorageRepository = RepositoryFactory.get('localStorage')

    const userRoutes = allRoute
      .filter((rt) => {
        console.log(rt)
        console.log(rt.meta.title)
        return rt.meta.layout === 'user' && rt.meta.title
      })
      .sort((a, b) => {
        return a.meta.order - b.meta.order
      })
    const activeRoute = ref(userRoutes[0].name)
    const isShowMenu = ref(false)

    function changeActiveRoute(newRoute) {
      activeRoute.value = newRoute
    }
    function handleLogout() {
      authStore.currentUser = ''
      console.log(authStore.currentUser)
    }
    return {
      userRoutes,
      activeRoute,
      isShowMenu,
      changeActiveRoute,
      LocalStorageRepository,
      userInfor,
      handleLogout,
    }
  },
}
</script>

<style>
</style>
