<script setup lang="ts">
import { ref } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'

defineProps({
   show: {
      type: Boolean,
      default: false,
   },
})

const emit = defineEmits(['update:show', 'add-root'])

const formData = ref({
   name: '',
   imageUrl: '/logo.svg', // Default image URL
})

const message = useMessage()

// Reset form when modal is opened
const handleClose = () => {
   formData.value = {
      name: '',
      imageUrl: '/logo.svg',
   }
   emit('update:show', false)
}

// Submit the form
const handleSubmit = () => {
   if (!formData.value.name.trim()) {
      message.error('Tên danh mục không được để trống')
      return
   }

   // Emit add-root event with new category data
   emit('add-root', {
      name: formData.value.name.trim(),
      imageUrl: formData.value.imageUrl.trim(),
   })

   // Reset form and close modal
   handleClose()
}
</script>

<template><n-modal size="medium" :show="show" preset="card" title="Thêm danh mục gốc" :mask-closable="false" @close="handleClose">
   <n-form label-placement="left" label-width="100px">
      <n-form-item label="Tên danh mục">
         <n-input v-model:value="formData.name" placeholder="Nhập tên danh mục gốc" />
      </n-form-item>

      <n-form-item label="Ảnh">
         <n-input v-model:value="formData.imageUrl" placeholder="URL ảnh danh mục" />
      </n-form-item>

      <div class="action-buttons">
         <n-button @click="handleClose">Hủy</n-button>
         <n-button type="primary" @click="handleSubmit">Thêm</n-button>
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
