<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { NButton } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import { Pencil, Plus } from '@vicons/tabler'
import { CaretDown16Regular as CaretDown } from '@vicons/fluent'
import { TrashBinOutline as TrashBin } from '@vicons/ionicons5'
import type { Category } from '@/types/category.ts'
const props = defineProps({
  category: {
    type: Object as () => Category,
    required: true,
  },
  parent: {
    type: Object as () => Category,
    default: null,
  },
})
const emit = defineEmits([
  'add-sub',
  'update-category',
  'delete-category',
  'set-preview-category',
  'edit-category',
  'show-add-sub-modal',
])

const collapsed = ref(false)

// Thay thế chức năng sửa tại chỗ bằng emit để sửa trong CategoryEdit.vue
const enterEditMode = () => {
  emit('edit-category', { category: props.category })
}

// Thay thế chức năng thêm sub-category tại chỗ bằng hiển thị modal
const showAddSubModal = () => {
  emit('show-add-sub-modal', { parent: props.category })
  collapsed.value = false
}

const deleteCategory = () => {
  emit('delete-category', { parent: props.parent, id: props.category.id })
}
const handleDeleteCategory = (data: { parent: Category; newName: string }) => {
  emit('delete-category', data)
}
// Xử lý event add-sub từ các component con
const handleAddSub = (data: { parent: Category; newSubCategory: string }) => {
  emit('add-sub', data)
}

// Nếu cần xử lý update-category từ con
const handleUpdateCategory = (data: { category: Category; newName: string }) => {
  emit('update-category', data)
}

// Handle edit-category event
const handleEditCategory = (data: { category: Category }) => {
  emit('edit-category', data)
}

// Handle show-add-sub-modal event
const handleShowAddSubModal = (data: { parent: Category }) => {
  emit('show-add-sub-modal', data)
}
const showModal = ref(false)

function onPositiveClick() {
  deleteCategory()
  showModal.value = false
}

function onNegativeClick() {
  showModal.value = false
}

function handleMouseOver(category: Category) {
  emit('set-preview-category', { ...category })
}
</script>

<template>
<div class="category-item-container"
  :style="{ marginLeft: `20px`, borderLeft: collapsed ? 'none' : '1px solid #41B883' }">
  <div class="category-header" @mouseover="() => handleMouseOver(category)">
    <n-button quaternary size="tiny" @click="collapsed = !collapsed">
      <n-icon>
        <CaretDown class="caret-down" :class="[!collapsed || 'caret-collapsed']" />
      </n-icon>
    </n-button>
    <div class="display-container">
      <span @dblclick="enterEditMode" class="category-name" @click="collapsed = !collapsed">{{
        category.name
      }}</span>

      <n-button @click="enterEditMode" size="tiny" quaternary>
        <n-icon>
          <Pencil />
        </n-icon>
      </n-button>

      <n-button @click="showModal = true" size="tiny" class="appear-on-hover" style="display: none" type="error">
        <n-icon>
          <TrashBin />
        </n-icon>
      </n-button>
      <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="Dialog" content="Are you sure?"
        positive-text="Confirm" negative-text="Cancel" @positive-click="onPositiveClick"
        @negative-click="onNegativeClick" />
    </div>
  </div>

  <div v-if="category.children && category.children.length && !collapsed">
    <CategoryItem v-for="child in category.children" :key="child.id" :category="child" :parent="category"
      @add-sub="handleAddSub" @update-category="handleUpdateCategory" @delete-category="handleDeleteCategory"
      @edit-category="handleEditCategory" @show-add-sub-modal="handleShowAddSubModal"
      @mouseover="() => handleMouseOver(category.children[category.children.indexOf(child)])" />
  </div>
  <n-button @click="showAddSubModal" size="tiny" :focusable="false" v-if="!collapsed"
    :style="{ marginLeft: `20px`, marginTop: '8px' }">
    <n-icon>
      <Plus />
    </n-icon>
    New
  </n-button>
</div>
</template>

<style scoped>
.category-item-container {
  margin-top: 8px;
  /* tương đương mt-2 */
}

.category-header:hover .appear-on-hover {
  display: block !important;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  /* khoảng cách giữa các phần tử */
}

/* Container hiển thị tên và nút thêm */
.display-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Tên danh mục, cho phép double-click */
.category-name {
  cursor: pointer;
}

/* Container khi ở chế độ chỉnh sửa tên */
.edit-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Nút thêm sub */
.add-sub-button {
  margin-left: 10px;
}

/* Container input thêm sub-category */
.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  margin-left: 20px;
}

.caret-collapsed {
  transform: rotate(-90deg);
}

.caret-down {
  transition: transform 0.2s;
}
</style>
