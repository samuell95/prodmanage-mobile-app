import { create } from 'zustand'
import { api } from '../lib/api'

export interface Product {
  id: string
  category: string
  description: string
  name: string
  price: string
  stock: string
  createdAt: string
  userId: string
}

interface ProductStore {
  products: Product[]
  productInfo: Product | null
  addProduct: (product: Product) => void
  setProducts: (products: Product[]) => void
  fetchProducts: () => Promise<void>
  updateProduct: (updatedProduct: Product) => void
  removeProduct: (productId: string) => void
  setProductInfo: (product: Product) => void
  clearProductInfo: () => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  productInfo: null,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  setProducts: (products) =>
    set(() => ({
      products,
    })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    })),

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

  fetchProducts: async () => {
    try {
      const response = await api.get('/products')
      set({ products: response.data })
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  },

  setProductInfo: (product) =>
    set(() => ({
      productInfo: product,
    })),

  clearProductInfo: () =>
    set(() => ({
      productInfo: null,
    })),
}))
