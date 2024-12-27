<template>
  <div class="flex">
    <admin-side-bar></admin-side-bar>
    <!-- <div class="overflow-x-hidden relative top-0"> -->
    <slot></slot>
    <!-- </div> -->
  </div>
</template>

<script setup>
import AdminSideBar from '@/components/AdminSideBar.vue'
</script>

<style>
</style>
