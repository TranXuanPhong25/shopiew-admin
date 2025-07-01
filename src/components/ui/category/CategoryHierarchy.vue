<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import type { Category } from '@/types/category.ts'
import CategoryPreview from '@/components/ui/category/CategoryPreview.vue'
import CategoryEditModal from '@/components/ui/category/CategoryEditModal.vue'
import CategoryAddSubModal from '@/components/ui/category/CategoryAddSubModal.vue'
import CategoryAddRootModal from '@/components/ui/category/CategoryAddRootModal.vue'
import { getProductCategoriesHierarchy } from '@/services/Category.service'

const categories = reactive([] as Category[])
const loading = ref(false)
const error = ref('')
const productCategoryViewing = ref<Category | null>(null)

//edit modal state
const showEditModal = ref(false)
const categoryToEdit = ref<Category | null>(null)

//sub-category modal state
const showAddSubModal = ref(false)
const parentCategoryForSub = ref<Category | null>(null)

//root category modal state
const showAddRootModal = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    const response = await getProductCategoriesHierarchy()
    categories.splice(0, categories.length, ...(response as Category[]))
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch categories'
  } finally {
    loading.value = false
  }
})

function handleChangeProductCategoryViewing(category: Category) {
  productCategoryViewing.value = category
}

const addSubCategory = ({
  parent,
  newSubCategory,
  imageUrl = '/logo.svg',
}: {
  parent: Category
  newSubCategory: string
  imageUrl?: string
}) => {
  parent.children.push({
    id: parent.id ? parent.id + 1 : Date.now(),
    name: newSubCategory,
    imageUrl: imageUrl,
    children: [],
  })
}

// Method to handle adding root category via modal
const addRootCategory = ({ name, imageUrl = '/logo.svg' }: { name: string; imageUrl?: string }) => {
  categories.push({
    id: categories.length ? categories.length + 1 : 1,
    name: name,
    children: [],
    imageUrl: imageUrl,
  })
}
const updateCategory = ({
  category,
  newName,
  newImageUrl,
}: {
  category: Category
  newName: string
  newImageUrl?: string
}) => {
  category.name = newName
  if (newImageUrl !== undefined) {
    category.imageUrl = newImageUrl
  }
}
const deleteCategory = ({ parent, id }: { parent: Category; id: number }) => {
  let index
  if (parent) {
    index = parent.children.findIndex((c) => c.id === id)
    if (index !== -1) {
      parent.children.splice(index, 1)
    }
  } else {
    index = categories.findIndex((c) => c.id === id)
    if (index !== -1) {
      categories.splice(index, 1)
    }
  }
}

// Handle edit category request
const handleEditCategory = ({ category }: { category: Category }) => {
  categoryToEdit.value = category
  showEditModal.value = true
}

// Handle show add sub-category modal
const handleShowAddSubModal = ({ parent }: { parent: Category }) => {
  parentCategoryForSub.value = parent
  showAddSubModal.value = true
}
</script>

<template>
<div class="category-hierarchy">
  <n-h1>Category Hierarchy</n-h1>
  <div v-for="category in categories" :key="category.id" :style="{ marginLeft: '-20px' }">
    <CategoryItem :category="category" @add-sub="addSubCategory" @update-category="updateCategory"
      @delete-category="deleteCategory" @edit-category="handleEditCategory" @show-add-sub-modal="handleShowAddSubModal"
      @set-preview-category="handleChangeProductCategoryViewing" />
  </div>
  <n-button class="new-root-button" dashed block @click="showAddRootModal = true">
    + New root category
  </n-button>
</div>
<CategoryPreview :category="productCategoryViewing" />

<CategoryEditModal :show="showEditModal" :category="categoryToEdit" @update:show="(v) => (showEditModal = v)"
  @update="updateCategory" />

<CategoryAddSubModal :show="showAddSubModal" :parentCategory="parentCategoryForSub"
  @update:show="(v) => (showAddSubModal = v)" @add-sub="addSubCategory" />

<CategoryAddRootModal :show="showAddRootModal" @update:show="(v) => (showAddRootModal = v)"
  @add-root="addRootCategory" />
</template>

<style scoped>
.category-hierarchy {
  flex-grow: 1;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 12px;
}

.n-button--dashed {
  border: 1px dashed #d1d5db;
  display: block;
  width: 100%;
  margin-top: 10px;
}

.new-root-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.n-h1 {
  font-weight: bold;
}
</style>
