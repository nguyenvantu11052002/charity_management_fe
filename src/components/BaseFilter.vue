<template>
  <div class="" @click="isShowFilter = !isShowFilter">
    <div class="hover:text-pink-500 cursor-pointer flex items-center gap-2">
      <div>{{ props.label }}</div>
      <filter-icon></filter-icon>
    </div>
    <div class="relative">
      <div
        class="absolute bg-white text-black border shadow-lg gap-4 px-2 py-2"
        :class="isShowFilter ? '' : 'hidden'"
      >
        <div v-for="group in props.groupFilters" :key="group.property">
          <label class="font-bold"> {{ group.property }}</label>
          <base-check-box
            v-for="cb in group.checkboxs"
            :key="cb.label"
            :label="cb.label"
            :checkboxStyle="cb.style"
            :value="cb.value"
            v-model:data="filterData"
          >
          </base-check-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterIcon from './icons/FilterIcon.vue'
// import BaseInput from './BaseInput.vue'
import BaseCheckBox from './BaseCheckBox.vue'
import { ref } from 'vue'
const filterData = defineModel('filterData')
const props = defineProps(['groupFilters', 'label'])
const isShowFilter = ref(false)
</script>

<style>
</style>
