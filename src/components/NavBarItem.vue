<template>
  <div class="nav-item">
    <router-link
      :to="{ name: `${props.to}` }"
      :class="{
        'text-pink-600': route.name === to || route.meta.parent === to,
        'text-slate-800': route.name !== to && route.meta.parent !== to,
        [defaultStyle]: defaultStyle,
      }"
      ><span><slot></slot></span><span>{{ title }}</span></router-link
    >
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps(['to', 'title', 'defaultStyle'])
const route = useRoute()
</script>

<style>
</style>
