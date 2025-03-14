<template>
  <div class="category-item-container" :style="{ marginLeft: `${level * 8}px` }" >
    <div class="category-header">
      <n-button quaternary size="tiny" @click="collapsed = !collapsed">
        <n-icon>
          <CaretDown class="caret-down" :class="[!collapsed || 'caret-collapsed']" />
        </n-icon>
      </n-button>
      <div v-if="editing" class="edit-container">
        <n-input
          v-model:value="editingName"
          placeholder="Sửa tên..."
          size="tiny"
          @keydown="handleEditKeyDown"
          autofocus
          @blur="confirmEdit"
        />
      </div>
      <div v-else class="display-container">
        <span @dblclick="enterEditMode" class="category-name" @click="collapsed =!collapsed">{{ category.name }}</span>

        <n-button @click="enterEditMode" size="tiny">
          <n-icon>
            <Pencil />
          </n-icon>
        </n-button>
        <n-button @click="showInput = true" size="tiny" :focusable="false">
          <n-icon>
            <Plus/>
          </n-icon>
        </n-button>
        <n-button @click="showModal=true" size="tiny" class="appear-on-hover" style="display:none" type="error">
          <n-icon>
            <TrashBin/>
          </n-icon>
        </n-button>
        <n-modal
          v-model:show="showModal"
          :mask-closable="false"
          preset="dialog"
          title="Dialog"
          content="Are you sure?"
          positive-text="Confirm"
          negative-text="Cancel"
          @positive-click="onPositiveClick"
          @negative-click="onNegativeClick"
        />
      </div>
    </div>
    <div v-if="showInput" class="input-container">
      <n-input
        v-model:value="newSubName"
        placeholder="Nhập tên Sub..."
        size="tiny"
        @keydown="handleKeyDown"
        autofocus
      />
      <n-button size="tiny" @click="confirmAddSub">OK</n-button>
      <n-button size="tiny" text @click="cancelInput">Hủy</n-button>
    </div>
    <div v-if="category.children && category.children.length && !collapsed">
      <CategoryItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :level="level + 1"
        :parent="category"
        @add-sub="handleAddSub"
        @update-category="handleUpdateCategory"
        @delete-category="handleDeleteCategory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import { Pencil ,Plus} from '@vicons/tabler'
import { CaretDown16Regular as CaretDown } from '@vicons/fluent'
import { TrashBinOutline as TrashBin } from '@vicons/ionicons5'
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  parent: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['add-sub', 'update-category'])

const collapsed = ref(true)

// State cho thêm sub-category
const showInput = ref(false)
const newSubName = ref('')

// State cho chế độ sửa tên (edit)
const editing = ref(false)
const editingName = ref(String(props.category.name))

const handleEditKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    confirmEdit()
  } else if (e.key === 'Escape') {
    cancelEdit()
  }
}

const confirmEdit = () => {
  if (editingName.value.trim() !== '') {
    // Cập nhật trực tiếp tên cho category
    // props.category.name = editingName.value.trim()
    // Nếu cần thông báo cho cha biết về update, bạn có thể emit event:
    emit('update-category', { category: props.category, newName: editingName.value.trim() })
  }
  editing.value = false
}

const cancelEdit = () => {
  editing.value = false
  editingName.value = props.category.name
}

const enterEditMode = () => {
  editing.value = true
  editingName.value = props.category.name
}

// Xử lý thêm sub-category
const addSub = () => {
  if (newSubName.value.trim() !== '') {
    emit('add-sub', { parent: props.category, newSubCategory: newSubName.value.trim() })
  }
}

const confirmAddSub = () => {
  addSub()
  collapsed.value = false;
  cancelInput()
}
const cancelInput = () => {
  showInput.value = false
  newSubName.value = ''
}
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    confirmAddSub()
  } else if (e.key === 'Escape') {
    cancelInput()
  }
}

const deleteCategory=()=>{
  emit('delete-category',{parent:props.parent,id:props.category.id})
}
const handleDeleteCategory = (data:{ parent: Category; newName: string })=>{
  emit('delete-category',data)
}
// Xử lý event add-sub từ các component con
const handleAddSub = (data: { parent: any; newSubCategory: string }) => {
  emit('add-sub', data)
}

// Nếu cần xử lý update-category từ con
const handleUpdateCategory = (data: { category: any; newName: string }) => {
  emit('update-category', data)
}
const showModal = ref(false)

function onPositiveClick() {
  deleteCategory()
  showModal.value = false
}

function onNegativeClick() {
  showModal.value = false
}

</script>

<style scoped>
.category-item-container {
  margin-top: 8px; /* tương đương mt-2 */
}
.display-container:hover .appear-on-hover{
  display: block !important;
}
.category-header {
  display: flex;
  align-items: center;
  gap: 8px; /* khoảng cách giữa các phần tử */
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
  margin-top: 4px;
}

.caret-collapsed {
  transform: rotate(-90deg);
}

.caret-down {
  transition: transform 0.2s;
}
</style>
