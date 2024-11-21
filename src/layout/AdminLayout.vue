<template>
  <div class="flex min-h-screen w-screen">
    <admin-side-bar></admin-side-bar>
    <div class="overflow-x-hidden absolute right-0 left-0 md:ml-64 md:mt-10 mt-20">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import AdminSideBar from '@/components/AdminSideBar.vue'
</script>

<style>
</style>
