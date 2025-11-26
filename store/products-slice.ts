import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '@/data/schema';

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    addProduct(
      state,
      action: PayloadAction<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
    ) {
      const newProduct: Product = {
        ...action.payload,
        id: nanoid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.products.unshift(newProduct);
    },

    increaseStock(
      state,
      action: PayloadAction<{ id: string; amount?: number }>
    ) {
      const { id, amount = 1 } = action.payload;
      const p = state.products.find((x) => x.id === id);
      if (p) {
        p.quantity += amount;
        p.updatedAt = new Date().toISOString();
      }
    },

    decreaseStock(
      state,
      action: PayloadAction<{ id: string; amount?: number }>
    ) {
      const { id, amount = 1 } = action.payload;
      const p = state.products.find((x) => x.id === id);
      if (p) {
        p.quantity = Math.max(0, p.quantity - amount);
        p.updatedAt = new Date().toISOString();
      }
    },

    updateProduct(
      state,
      action: PayloadAction<Partial<Product> & { id: string }>
    ) {
      const { id, ...rest } = action.payload;
      const p = state.products.find((x) => x.id === id);
      if (p) {
        Object.assign(p, rest);
        p.updatedAt = new Date().toISOString();
      }
    },

    deleteProduct(state, action: PayloadAction<{ id: string }>) {
      state.products = state.products.filter((x) => x.id !== action.payload.id);
    },
  },
});

export const {
  setProducts,
  addProduct,
  increaseStock,
  decreaseStock,
  updateProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
