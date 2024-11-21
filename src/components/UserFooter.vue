<template>
  <footer
    class="bg-zinc-800 flex flex-col justify-start gap-8 text-lg font-thin text-white px-4 py-4 md:px-20 lg:px-90 xl:px-96 md:py-10"
  >
    <div class="logo basis-2/5">
      <app-logo :to="'home-route'" class="text-5xl"> </app-logo>
    </div>
    <div class="flex justify-between basis-2/5">
      <div>
        <base-link
          :to="'home-route'"
          :title="'Thường Tín, Hà Nội'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md justify-start'"
        ></base-link>
        <base-link
          :to="'campaigns-route'"
          :title="'givewellvn@gmail.com'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md justify-start'"
        ></base-link>
        <base-link
          :to="'about-route'"
          :title="'0396024810'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md justify-start'"
        ></base-link>
      </div>

      <div>
        <base-link
          :to="'home-route'"
          :title="'Trang chủ'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
        <base-link
          :to="'campaigns-route'"
          :title="'Các chiến dịch'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
        <base-link
          :to="'about-route'"
          :title="'Về chúng tôi'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
      </div>

      <div>
        <base-link
          :to="'home-route'"
          :title="'Hỏi đáp'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
        <base-link
          :to="'campaigns-route'"
          :title="'Liên hệ'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
        <base-link
          :to="'about-route'"
          :title="'Chính sách bảo mật'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
        <base-link
          :to="'about-route'"
          :title="'Điều kiện và điều khoản'"
          :defaultStyle="'hover:text-pink-500 font-normal text-md'"
        ></base-link>
      </div>
    </div>
    <div class="text-center text-xs">COPYRIGHT @2024 GiveWellVn</div>
  </footer>
</template>

<script>
import AppLogo from './AppLogo.vue'
import BaseLink from './BaseLink.vue'
export default {
  components: { AppLogo, BaseLink },
}
</script>

<style>
</style>
