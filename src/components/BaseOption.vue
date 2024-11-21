<template>
  <option :value="props.value">{{ props.title }}</option>
</template>

<script setup>
const props = defineProps(['title', 'value'])
// const currentSelect = defineModel('currentSelected')
</script>

<style>
</style>
