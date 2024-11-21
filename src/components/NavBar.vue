<template>
  <nav :class="props.navStyle">
    <nav-bar-item
      v-for="route in props.routes"
      :key="route.name"
      :to="route.name"
      :title="route.meta.title"
      :defaultStyle="props.navItemStyle"
    >
      <div v-if="route.meta.icon">
        <component :is="`${route.meta.icon}-icon`"></component>
      </div>
    </nav-bar-item>
  </nav>
</template>

<script setup>
// import { useRouter } from 'vue-router'
import NavBarItem from './NavBarItem.vue'

const props = defineProps(['routes', 'navStyle', 'navItemStyle'])
</script>

<style scoped>
</style>
