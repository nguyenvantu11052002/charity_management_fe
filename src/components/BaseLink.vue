<template>
  <div class="base-link">
    <router-link
      :to="{ name: `${to}` }"
      class="font-bold px-2 py-2 border-1 rounded-lg text-xs md:text-sm min-w-24 md:min-w-32 flex"
      :class="defaultStyle"
      >{{ title }}</router-link
    >
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    defaultStyle: {
      type: String,
    },
    activeStyle: {
      type: String,
    },
  },
}
</script>

<style>
</style>
