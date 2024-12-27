<template>
  <div class="flex flex-col items-stretch">
    <label class="text-sm font-semibold" for="username">{{ props.label }}</label>
    <input
      :type="props.type"
      :class="[
        props.style ? props.style : '',
        error ? 'border-red-500' : '',
        readonly ? 'bg-gray-200 focus:outline-gray-200' : '',
      ]"
      :placeholder="props.placeholder"
      :readonly="readonly"
      :min="min ? min : ''"
      :max="props.max ? props.max : ''"
      :step="props.step ? props.step : ''"
      v-model="data"
    />
    <span class="text-red-500 text-xs p-1">{{ error }}</span>
  </div>
</template>

<script setup>
const props = defineProps(['label', 'type', 'style', 'placeholder', 'max', 'step'])

const data = defineModel('data')
const error = defineModel('error')
const readonly = defineModel('readonly')
const min = defineModel('min')
</script>

<style>
</style>
