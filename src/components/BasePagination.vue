<template>
  <div class="flex gap-2 items-center">
    <left-icon
      class="cursor-pointer hover:text-pink-500"
      @click="previous()"
      :class="currentPage === firstPage ? 'hidden' : ''"
    ></left-icon>
    <div
      v-for="page in range"
      :key="page"
      class="px-2 py-1 cursor-pointer"
      @click="currentPage = page"
      :class="page === currentPage ? 'bg-pink-500 text-white' : ''"
    >
      {{ page }}
    </div>
    <right-icon
      class="cursor-pointer hover:text-pink-500"
      :class="currentPage === lastPage || totalPage === 0 ? 'hidden' : ''"
      @click="next()"
    ></right-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import LeftIcon from './icons/LeftIcon.vue'
import RightIcon from './icons/RightIcon.vue'
const currentPage = defineModel('currentPage')
const totalPage = defineModel('totalPage')
const firstPage = computed(() => {
  return Math.min(Math.max(1, currentPage.value - 1), Math.max(totalPage.value - 2, 1))
})
const lastPage = computed(() => {
  return Math.min(totalPage.value, firstPage.value + 2)
})
const range = computed(() => {
  return Array.from({ length: lastPage.value - firstPage.value + 1 }, (_, i) => firstPage.value + i)
})

function previous() {
  currentPage.value = Math.max(firstPage.value, currentPage.value - 1)
}

function next() {
  currentPage.value = Math.min(lastPage.value, currentPage.value + 1)
}
// const amountPage = ref(100)
// const pageRange = 3
</script>

<style>
</style>
