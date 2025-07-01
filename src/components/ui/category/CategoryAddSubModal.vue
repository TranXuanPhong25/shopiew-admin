<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import type { Category } from '@/types/category.ts'

const props = defineProps({
   show: {
      type: Boolean,
      default: false,
   },
   parentCategory: {
      type: Object as () => Category | null,
      default: null,
   },
})

const emit = defineEmits(['update:show', 'add-sub'])

const formData = ref({
   name: '',
   imageUrl: '/logo.svg', // Default image URL
})

const message = useMessage()

// Reset form when modal is opened
watch(
   () => props.show,
   (isVisible) => {
      if (isVisible) {
         formData.value.name = ''
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

   if (!props.parentCategory) {
      message.error('Không tìm thấy danh mục cha')
      return
   }

   // Emit add-sub event with parent and new sub-category data
   emit('add-sub', {
      parent: props.parentCategory,
      newSubCategory: formData.value.name.trim(),
      imageUrl: formData.value.imageUrl.trim(),
   })

   // Close the modal
   handleClose()
}
</script>

<template><n-modal style="width: 600px" class="category-add-sub-modal" :show="show" title="Thêm danh mục con"
   :mask-closable="false" @close="handleClose">
   <n-form v-if="parentCategory" label-placement="left" label-width="100px">
      <p class="parent-info">
         Thêm vào danh mục: <strong>{{ parentCategory.name }}</strong>
      </p>

      <n-form-item label="Tên danh mục">
         <n-input v-model:value="formData.name" placeholder="Nhập tên danh mục con" />
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

.parent-info {
   margin-bottom: 16px;
   padding: 8px;
   background-color: rgba(0, 0, 0, 0.03);
   border-radius: 4px;
}
</style>
