<template>
  <section class="bg-pink-500 w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
    <!-- ảnh vòa title -->
    <div
      v-for="sld in slider"
      :key="sld.id"
      class="absolute inset-0 transition-all duration-700 ease-in-out"
      :class="
        currentShowSlider == sld.id
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-105 pointer-events-none'
      "
    >
      <!-- ảnh -->
      <img
        :src="sld.image"
        class="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-in-out transform hover:scale-105"
      />
      <!-- title -->
      <div
        class="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col gap-8 items-center justify-end transition-all duration-700 ease-in-out"
      >
        <div
          class="max-w-md text-white text-start h-full flex flex-col justify-center transform transition-transform duration-500 ease-out"
          :class="
            currentShowSlider == sld.id ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          "
        >
          <p
            class="text-white font-bold text-xl lg:text-4xl text-start transition-all duration-700 ease-in-out"
          >
            {{ sld.title }}
          </p>
        </div>
      </div>
    </div>

    <!-- Nút chuyển ... slide -->
    <div class="flex gap-4 absolute bottom-4 w-full justify-center z-2">
      <div
        class="h-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-125"
        v-for="sld in slider"
        :key="sld.id"
        :class="
          currentShowSlider == sld.id
            ? 'bg-pink-500 scale-125 w-6'
            : 'bg-white/70 hover:bg-white w-3'
        "
        @click="currentShowSlider = sld.id"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentShowSlider = ref(1)
const slider = ref([
  {
    id: 1,
    image: 'https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slider-1.jpg',
    title: 'Kết nối gây quỹ và ủng hộ trực tuyến tiện lợi, tin cậy và minh bạch',
  },
  {
    id: 2,
    image: 'https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slider-2.jpg',
    title:
      'Mỗi đóng góp của bạn không chỉ là vật chất, mà còn là sự sẻ chia yêu thương, tạo nên những điều kỳ diệu cho cuộc sống',
  },
  {
    id: 3,
    image: 'https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slider-3.jpg',
    title:
      'Cùng nhau chung sức xây dựng những dự án ý nghĩa, mang lại nụ cười và niềm tin cho những mảnh đời bất hạnh',
  },
])

// Auto-slide functionality
const autoSlideInterval = ref(null)

const startAutoSlide = () => {
  autoSlideInterval.value = setInterval(() => {
    currentShowSlider.value = (currentShowSlider.value % slider.value.length) + 1
  }, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
