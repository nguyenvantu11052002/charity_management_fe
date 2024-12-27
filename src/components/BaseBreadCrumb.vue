<template>
  <div class="h-36 bg-blue-50 text-black">
    {{ router.currentRoute.value.fullPath }}
    {{ router.currentRoute.value }}
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style>
</style>
