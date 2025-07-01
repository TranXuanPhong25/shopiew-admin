<template>
  <div class="category-preview flex items-center justify-center">
    <template v-if="category">
      <h2>{{ category.name }}</h2>
      <NImage
        :src="category.imageUrl"
        :alt="category.name"
        width="100%"
        height="200px"
        G
        fit="cover"
      />
    </template>
    <template v-else>
      <p>Hover a category to view details</p>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { NImage } from 'naive-ui'
import type { Category } from '@/types/category'
defineProps({
  category: {
    type: Object as () => Category | null,
    required: false,
    default: null,
  },
})
</script>
<style scoped>
.category-preview {
  flex-direction: column;
  gap: 16px;
  width: 300px;
  padding: 32px;
}
</style>
