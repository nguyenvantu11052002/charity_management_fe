<template>
  <section class="bg-pink-500 w-full h-[30vh] md:h-[40vh] relative overflow-hidden">
    <div class="absolute inset-0 transition-all duration-700 ease-in-out">
      <img
        :src="image.url"
        class="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-in-out transform hover:scale-105"
      />
      <div
        class="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col gap-8 items-center justify-end transition-all duration-700 ease-in-out"
      >
        <div
          class="max-w-md text-white text-start h-full flex flex-col justify-center transform transition-transform duration-500 ease-out"
        >
          <p class="text-pink-600 text-xl lg:text-4xl font-bold text-center">{{ props.title }}</p>
          <p class="text-white text-start text-lg transition-all duration-700 ease-in-out">
            {{ props.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps(['title', 'content'])
const image = {
  url: 'https://givewellvnbucket.s3.ap-southeast-2.amazonaws.com/slider/slider-1.jpg',
}
</script>

<style>
</style>
