<template>
  <div class="category-hierarchy">
    <h2 class="title">Category Hierarchy</h2>
    <div v-for="category in categories" :key="category.id">
      <CategoryItem :category="category" @add-sub="addSubCategory" @update-category="updateCategory" @delete-category="deleteCategory"/>
    </div>
    <n-button
      class="new-root-button"
      dashed block
      @click="showInput = true"
      v-if="!showInput">
      + Thêm mới (Danh mục gốc)
    </n-button>
    <div v-if="showInput" class="new-root-input">
      <n-input
        v-model:value="newRootCategory"
        placeholder="Nhập tên Sub..."
        size="tiny"
        @keydown="handleKeyDown"
        autofocus
      />
      <n-button size="tiny" @click="confirmAddRoot">OK</n-button>
      <n-button size="tiny" text @click="cancelInput">Hủy</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import { Category } from '@/types/category.ts'
const showInput = ref(false)
const newRootCategory = ref<string>('')

const categories = reactive([
  {
    id: 1,
    name: 'Danh mục gốc 1',
    children: [
      { id: 11, name: 'Sub 1', children: [] },
      { id: 12, name: 'Sub 2', children: [] },
    ],
  },
  {
    id: 2,
    name: 'Danh mục gốc 2',
    children: [],
  },
])

let idCounter = 100 // Counter for unique IDs

const addSubCategory = ({ parent, newSubCategory }:{parent:Category, newSubCategory:string}) => {
  parent.children.push({
    id: ++idCounter,
    name: newSubCategory,
    children: [],
  })
}

const confirmAddRoot = () => {
  if (newRootCategory.value.trim() !== '') {
    categories.push({
      id: ++idCounter,
      name: newRootCategory.value.trim(),
      children: [],
    })
  }
  cancelInput()
}

const cancelInput = () => {
  showInput.value = false
  newRootCategory.value = ''
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    confirmAddRoot()
  } else if (e.key === 'Escape') {
    cancelInput()
  }
}
const updateCategory = ({category,newName}:{category:Category,newName:string})=>{
  category.name = newName
}
const deleteCategory = ({parent,id}:{parent:Category,id:number})=>{
  let index
  if(parent){
    index = parent.children.findIndex((c)=>c.id === id)
    if(index !== -1){
      parent.children.splice(index,1)
    }
  }else{
    index = categories.findIndex((c)=>c.id === id)
    if(index !== -1){
      categories.splice(index,1)
    }
  }

}
</script>

<style scoped>
.category-hierarchy {
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
}

.title {
  font-size: 1.125rem; /* text-lg */
  font-weight: 600; /* font-semibold */
  margin-bottom: 16px; /* mb-4 */
}

/* Tùy chỉnh style cho n-button dạng dashed & block */
.n-button--dashed {
  border: 1px dashed #d1d5db; /* ví dụ border màu xám */
  display: block;
  width: 100%;
  margin-top: 10px;
}

/* Style vùng chứa input cho danh mục gốc mới */
.new-root-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Ví dụ style cho n-input nếu cần thêm */
.n-input {
  /* Thêm các style tùy chỉnh nếu cần */
}
</style>
