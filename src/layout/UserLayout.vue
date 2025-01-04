<template>
  <div class="min-h-screen relative">
    <user-header></user-header>
    <slot></slot>
    <user-footer></user-footer>
  </div>
</template>

<script>
import UserFooter from '@/components/UserFooter.vue'
import UserHeader from '../components/UserHeader.vue'
export default {
  components: { UserHeader, UserFooter },
}
</script>

<style>
</style>
