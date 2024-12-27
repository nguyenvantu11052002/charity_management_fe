<template>
  <div class="overflow-x-hidden min-h-screen w-full">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <form
        class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
        @submit.prevent="handleSave()"
      >
        <base-input
          :label="'Id'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="role.id"
          :readonly="'true'"
        ></base-input>
        <base-input
          :label="'Tên'"
          :type="'name'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:error="error.name"
          v-model:data="role.name"
        ></base-input>
        <base-button
          :type="'submit'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
        ></base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
// import BaseSelect from '@/components/BaseSelect.vue'
// import BaseCheckBox from '@/components/BaseCheckBox.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
// const router = useRouter()
const route = useRoute()
const router = useRouter()
const roleRepository = RepositoryFactory.get('roles')
const role = ref({
  name: '',
})
const error = ref({
  id: '',
  name: '',
})

async function handleSave() {
  resetError()
  roleRepository
    .create(role.value)
    .then((response) => {
      console.log(response)
      role.value = response.data
      router.replace({ name: 'admin-role-detail-route', params: { id: `${role.value.id}` } })
    })
    .catch((err) => {
      const response = err.response.data.errors
      console.log(response)
      error.value.name = response.name ? response.name : error.value.name
    })
  console.log(route.params.id)
}
function resetError() {
  error.value.name = ''
}
</script>

<style>
</style>
