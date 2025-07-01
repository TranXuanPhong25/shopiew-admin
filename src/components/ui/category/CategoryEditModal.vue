<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import type { Category } from '@/types/category.ts'

const props = defineProps({
   show: {
      type: Boolean,
      default: false,
   },
   category: {
      type: Object as () => Category | null,
      default: null,
   },
})

const emit = defineEmits(['update:show', 'update'])

const formData = ref({
   name: '',
   imageUrl: '',
})

const message = useMessage()

// Watch for changes in the category prop to update form data
watch(
   () => props.category,
   (newCategory) => {
      if (newCategory) {
         formData.value.name = newCategory.name
         formData.value.imageUrl = newCategory.imageUrl || ''
      }
   },
   { immediate: true },
)

// Close the modal
const handleClose = () => {
   emit('update:show', false)
}

// Submit the form
const handleSubmit = () => {
   if (!formData.value.name.trim()) {
      message.error('Tên danh mục không được để trống')
      return
   }

   if (!props.category) {
      message.error('Không tìm thấy danh mục')
      return
   }

   // Emit update event with category and updated data
   emit('update', {
      category: props.category,
      newName: formData.value.name.trim(),
      newImageUrl: formData.value.imageUrl.trim(),
   })

   // Close the modal
   handleClose()
}
</script>

<template><n-modal :show="show" preset="card" title="Chỉnh sửa danh mục" :mask-closable="false" @close="handleClose">
   <n-form v-if="category" label-placement="left" label-width="100px">
      <n-form-item label="Tên danh mục">
         <n-input v-model:value="formData.name" placeholder="Nhập tên danh mục" />
      </n-form-item>
      <n-form-item label="Ảnh">
         <n-input v-model:value="formData.imageUrl" placeholder="URL ảnh danh mục" />
      </n-form-item>
      <div class="action-buttons">
         <n-button @click="handleClose">Hủy</n-button>
         <n-button type="primary" @click="handleSubmit">Lưu</n-button>
      </div>
   </n-form>
</n-modal></template>

<style scoped>
.action-buttons {
   display: flex;
   justify-content: flex-end;
   gap: 12px;
   margin-top: 16px;
}
</style>
