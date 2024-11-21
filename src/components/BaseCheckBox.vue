<template>
  <div
    :class="[
      props.containerStyle ? props.containerStyle : 'flex gap-2 items-center justify-between',
      error ? 'text-red-500' : '',
    ]"
  >
    <label :class="props.labelStyle">{{ props.label }}</label>
    <input
      type="checkbox"
      :class="[props.checkboxStyle ? props.checkboxStyle : '']"
      v-model="data"
      :disabled="disabled"
      :value="value"
    />
  </div>
</template>

<script setup>
const props = defineProps(['label', 'value', 'containerStyle', 'labelStyle', 'checkboxStyle'])
const data = defineModel('data')
const disabled = defineModel('disabled')
const error = defineModel('error')
</script>

<style>
</style>
