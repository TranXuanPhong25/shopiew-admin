import { apiClient } from '@/lib/axiosClient'
import { Category } from '@/models/category'
import { handleApiError } from '@/lib/apiErrorHandler';

export class CategoryService {
   async getProductCategoriesHierarchy(): Promise<Category[]> {
      try {
         const response = await apiClient.get<Category[]>('/product-category/hierarchy');
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async updateProductCategories(categoryData: Category): Promise<Category> {
      try {
         const response = await apiClient.put<Category>(`/product-category`, categoryData);
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async deleteProductCategory(categoryId: number): Promise<void> {
      try {
         await apiClient.delete(`/product-category/${categoryId}`);
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async createProductCategory(categoryData: Category, parentId: number | null = null): Promise<Category> {
      try {
         const response = await apiClient.post<Category>(`/product-category`, { ...categoryData, parentId });
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }




}