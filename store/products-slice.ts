import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '@/data/schema';
import initialProducts from '@/data/products.json';

export interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: (initialProducts as Product[]).map((p) => ({ ...p })),
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.products.unshift(action.payload);
      },
      prepare(payload: {
        name: string;
        quantity: number;
        category?: string;
        price?: number;
      }) {
        return {
          payload: {
            id: nanoid(),
            sku: `SKU-${Date.now().toString().slice(-6)}`,
            name: payload.name,
            category: payload.category ?? 'uncategorized',
            price: payload.price ?? 0,
            quantity: payload.quantity,
            updatedAt: new Date().toISOString(),
          } as Product,
        };
      },
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; delta: number; updatedAt?: string }>
    ) {
      const p = state.products.find((x) => x.id === action.payload.id);
      if (!p) return;
      p.quantity = Math.max(0, (p.quantity ?? 0) + action.payload.delta);
      p.updatedAt = action.payload.updatedAt ?? new Date().toISOString();
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { addProduct, updateQuantity, setProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
