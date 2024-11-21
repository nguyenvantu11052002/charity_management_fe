<template>
  <router-link
    :to="{ name: `${to}` }"
    class="bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text text-center text-3xl font-bold cursor-pointer"
    ><span>Give<span>Well</span></span>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
</style>
