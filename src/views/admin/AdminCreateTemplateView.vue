<template>
  <div class="relative w-screen">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <form
        class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
      >
        <base-input
          :label="'Tên'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="template.name"
        ></base-input>
        <div>
          <base-input
            :label="'Thuộc tính'"
            :type="'text'"
            :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
            v-model:data="newAttribute"
          ></base-input>
          <base-button
            :type="'button'"
            @click="addAttributeTDataForm"
            :content="'Thêm thuộc tính'"
            :style="' max-w-60 min-w-60 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
          ></base-button>
        </div>
        <div class="flex gap-8">
          <div
            class="font-bold text-white px-4 py-2 relative bg-indigo-500 rounded-lg cursor-pointer hover:shadow-lg shadow-sm hover:bg-indigo-600 group"
            v-for="(val, key) in template.dataForm"
            :key="key"
          >
            <div
              class="absolute top-0 bottom-0 right-0 left-0 bg-black/50 rounded-lg text-red-500 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              @click="deleteAttributeOfDataForm(key)"
            >
              Xóa
            </div>
            <div>{{ key }}</div>
          </div>
        </div>

        <div class="flex flex-col items-stretch">
          <label class="text-sm font-semibold" for="username">Nội dung</label>

          <Editor
            api-key="ro1kh76z2gvuvctecqi2chda949fjai0uq5nqbe67v9qq9d4"
            :init="{
              height: 1000,
              toolbar_mode: 'sliding',
              plugins:
                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
              toolbar:
                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }"
            v-model="template.content"
            @Init="handleEditorInit"
          >
          </Editor>

          <!-- <span class="text-red-500 text-xs p-1">{{ error.content }}</span> -->
        </div>
        <base-button
          :type="'button'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
          @click="createTemplate"
        ></base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import Editor from '@tinymce/tinymce-vue'
import { ref } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRouter } from 'vue-router'
const notificationTemplateRepository = RepositoryFactory.get('notificationTemplates')
const editorRef = ref('')
const router = useRouter()
const handleEditorInit = (evt, editor) => {
  editorRef.value = editor
}
const template = ref({
  name: '',
  dataForm: {},
  content: '',
})
const templateError = ref({
  name: '',
  dataForm: {},
  content: '',
})
const newAttribute = ref('')

function addAttributeTDataForm() {
  // if (template.value.dataForm.hasOwnProperty(newAttribute.value)) {
  //   console.error('Thuộc tính này đã tồn tại')
  //   return
  // }
  console.log(newAttribute.value)
  if (newAttribute.value.trim() != '') {
    // Thêm thuộc tính vào dataForm
    template.value.dataForm[newAttribute.value] = '' // Khởi tạo giá trị là chuỗi rỗng
    addAttibuteToContent(newAttribute.value)
    // Xóa input sau khi thêm thuộc tính
    newAttribute.value = ''
  }
}

function deleteAttributeOfDataForm(attribute) {
  delete template.value.dataForm[attribute]
  deleteAttributeOfContent(attribute)
}

function addAttibuteToContent(attribute) {
  const attr = editorRef.value.dom.get(attribute)
  if (!attr) {
    editorRef.value.insertContent(`
      <p id="${attribute}" />{${attribute}}</p>
    `)
  }

  // console.log(editorRef.value)
  // const img = `<img src = "${url}">`
}

function deleteAttributeOfContent(attribute) {
  const attr = editorRef.value.dom.get(attribute)
  if (attr) {
    attr.remove()
  }
}

async function createTemplate() {
  clearError()
  const haveError = validateTemplate()
  if (!haveError) {
    notificationTemplateRepository
      .create({
        name: template.value.name,
        content: template.value.content,
        dataForm: JSON.stringify(template.value.dataForm),
      })
      .then((response) => {
        console.log(response)
        router.replace({
          name: 'admin-template-detail-route',
          params: { id: `${response.data.id}` },
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

function clearError() {
  templateError.value = {
    name: '',
    dataForm: {},
    content: '',
  }
}

function validateTemplate() {
  let haveError = false
  if (template.value.name === '' || template.value.name.trim() === '') {
    templateError.value.name = 'Tên không được để trống'
    haveError = true
  }

  if (template.value.content === '' || template.value.content.trim() === '') {
    templateError.value.content = 'Nội dung không được để trống'
    haveError = true
  }
  return haveError
}
</script>

<style>
</style>
