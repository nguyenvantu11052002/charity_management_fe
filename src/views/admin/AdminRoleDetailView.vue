<template>
  <div class="mx-4 my-4 md:my-2 shadow-lg md:mx-10">
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
        v-model:data="role.name"
        v-model:error="error.name"
        :readonly="isNonEdit"
      ></base-input>
      <base-button
        :type="'button'"
        :content="'Chỉnh sửa'"
        :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
        @click="isNonEdit = !isNonEdit"
        v-if="isNonEdit"
      ></base-button>
      <base-button
        v-else
        :type="'submit'"
        :content="'Lưu'"
        :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
      ></base-button>
    </form>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
// import BaseSelect from '@/components/BaseSelect.vue'
// import BaseCheckBox from '@/components/BaseCheckBox.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
// const router = useRouter()
const route = useRoute()
const roleRepository = RepositoryFactory.get('roles')
const role = ref({})
const isNonEdit = ref(true)
const error = ref({
  name: '',
})

getRoleById()
async function getRoleById() {
  roleRepository
    .getById(route.params.id)
    .then((response) => {
      console.log(response)
      role.value = response.data
    })
    .catch((err) => {
      console.log(err)
    })
  console.log(route.params.id)
}

async function handleSave() {
  resetError()
  roleRepository
    .update(route.params.id, role.value)
    .then((response) => {
      console.log(response)
      role.value = response.data
      isNonEdit.value = !isNonEdit.value
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
