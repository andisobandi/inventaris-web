'use client';

import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';
import { setProducts } from '@/store/products-slice';
import rawProducts from '@/data/products.json';
import type { Product } from '@/data/schema';

const PERSIST_KEY = 'inventory_products_v1';

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(PERSIST_KEY);
      const parsed = raw ? (JSON.parse(raw) as Product[]) : rawProducts;
      store.dispatch(setProducts(parsed));
    } catch {
      store.dispatch(setProducts(rawProducts));
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState().products.products;
      window.localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
