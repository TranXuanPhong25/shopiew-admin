export type Category = {
  id: number
  name: string
  imageUrl: string
  children: Category[]
}
export type ProductCategoryModel = {
  productCategories: Category[],
  deletedProductCategoryIds: number[],
}
