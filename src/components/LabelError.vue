<template>
  <div>
    <h2 class="text-red-500">{{ error }}</h2>
  </div>
</template>

<script setup>
const error = defineModel('error')
</script>

<style>
</style>
