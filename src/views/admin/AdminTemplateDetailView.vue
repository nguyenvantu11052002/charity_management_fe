<template>
  <div class="relative w-screen">
    <div class="flex p-10 gap-8 flex-col md:ml-64 md:mt-10 mt-20">
      <form
        class="bg-white border-gray-200 shadow-lg border rounded-lg flex flex-col w-full p-10 justify-start gap-4"
      >
        <base-input
          :label="'ID'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="template.id"
          v-model:error="templateError.id"
          :readonly="true"
        ></base-input>
        <base-input
          :label="'Tên'"
          :type="'text'"
          :style="'rounded-md border-2 border-solid h-10 px-3 mt-2 focus:outline-pink-300'"
          v-model:data="template.name"
          v-model:error="templateError.name"
          v-model:readonly="isNonEditTemplate"
        ></base-input>
        <div :class="isNonEditTemplate ? 'hidden' : 'flex  flex-col'">
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
        <div class="flex gap-4 items-center">
          <div>Thuộc tính</div>
          <div
            class="font-bold text-white px-4 py-2 relative bg-indigo-500 rounded-lg cursor-pointer hover:shadow-lg shadow-sm hover:bg-indigo-600 group"
            v-for="(val, key) in template.dataForm"
            :key="key"
          >
            <div
              :class="isNonEditTemplate ? 'hidden' : 'flex  flex-col'"
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
            api-key="s8slp19bxol8ou5pyvsnvcqlul0r4ryt1fjvrsfnfuitkw7b"
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
          v-if="isNonEditTemplate"
          :type="'button'"
          :content="'Chỉnh sửa'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
          @click="onClickEdit"
        ></base-button>
        <base-button
          v-if="!isNonEditTemplate"
          :type="'button'"
          :content="'Hủy'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-indigo-500 hover:bg-indigo-600 rounded-md'"
          @click="onClickCancelEdit"
        ></base-button>
        <base-button
          v-if="!isNonEditTemplate"
          :type="'button'"
          :content="'Lưu'"
          :style="' max-w-64 py-2 font-bold text-sm text-white h-10 bg-green-500 hover:bg-green-600 rounded-md'"
          @click="onClickSave"
        ></base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import Editor from '@tinymce/tinymce-vue'
import { onBeforeMount, ref } from 'vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
import { useRoute } from 'vue-router'
const notificationTemplateRepository = RepositoryFactory.get('notificationTemplates')
const editorRef = ref('')
const route = useRoute()
const handleEditorInit = (evt, editor) => {
  editorRef.value = editor
  editorRef.value.getBody().setAttribute('contenteditable', false)
}
const template = ref({
  id: '',
  name: '',
  dataForm: {},
  content: '',
})
const templateError = ref({
  id: '',
  name: '',
  dataForm: {},
  content: '',
})

const newAttribute = ref('')
onBeforeMount(() => {
  getTemplateById()
})

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
}

function deleteAttributeOfContent(attribute) {
  const attr = editorRef.value.dom.get(attribute)
  if (attr) {
    attr.remove()
  }
}

const isNonEditTemplate = ref(true)
function onClickEdit() {
  isNonEditTemplate.value = false
  editorRef.value.getBody().setAttribute('contenteditable', true)
}
function onClickCancelEdit() {
  isNonEditTemplate.value = true
  editorRef.value.getBody().setAttribute('contenteditable', false)
  getTemplateById()
}
function onClickSave() {
  updateTemplate()
}

async function updateTemplate() {
  clearError()
  const haveError = validateTemplate()
  if (!haveError) {
    notificationTemplateRepository
      .update(template.value.id, {
        name: template.value.name,
        content: template.value.content,
        dataForm: JSON.stringify(template.value.dataForm),
      })
      .then((response) => {
        console.log(response)
        template.value = response.data
        template.value.dataForm = JSON.parse(response.data.dataForm)
        isNonEditTemplate.value = true
        onClickCancelEdit()
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

async function getTemplateById() {
  notificationTemplateRepository
    .getById(route.params.id)
    .then((response) => {
      console.log(response)
      template.value.name = response.data.name
      template.value.id = response.data.id
      template.value.content = response.data.content
      template.value.dataForm = JSON.parse(response.data.dataForm)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style>
</style>
