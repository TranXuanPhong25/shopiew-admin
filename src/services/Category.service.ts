import { apiClient } from '@/lib/axiosClient'
import type { Category } from '@/types/category'
import type { ProductCategoryModel } from '../types/category';
import { handleApiError } from '@/lib/apiErrorHandler';

const updateProductCategories = async (categoryData: ProductCategoryModel) => {
   try {
      const response = await apiClient.put<ProductCategoryModel>(`/product-category`, categoryData);
      return response.data;
   } catch (error) {
      throw new Error(handleApiError(error));
   }

}
const getProductCategoriesHierarchy = async (): Promise<Category[]> => {
   try {
      const response = await apiClient.get<Category[]>('/product-category/hierarchy');
      return response.data;
   } catch (error) {
      throw new Error(handleApiError(error));
   }
}

export {
   updateProductCategories,
   getProductCategoriesHierarchy
}