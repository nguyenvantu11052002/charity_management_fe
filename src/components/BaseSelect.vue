<template>
  <div :class="containerStyle ? containerStyle : 'flex items-center gap-2'">
    <label v-if="props.mainTitle" :class="titleStyle">{{ props.mainTitle }}</label>
    <select
      v-model="model"
      :class="[selectStyle ? selectStyle : '', disabled ? 'bg-slate-300' : '']"
      :disabled="disabled"
    >
      <base-option
        v-for="op in options"
        :key="op.id"
        :title="op.title"
        :value="op.value"
        :selected="model === op"
      >
      </base-option>
    </select>
    <label v-if="props.secondaryTitle">{{ props.secondaryTitle }}</label>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import BaseOption from './BaseOption.vue'
const props = defineProps([
  'mainTitle',
  'secondaryTitle',
  'titleStyle',
  'selectStyle',
  'containerStyle',
])
const model = defineModel('model')

const disabled = defineModel('disabled')
const options = defineModel('options')
// const options = [10, 20, 30]
// const firtTitle = 'Số bản ghi 1 trang: '
// const secondTitle = ''
// const pageSize = ref(options[0])
</script>

<style>
</style>
