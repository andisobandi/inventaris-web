'use client';

import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FormProduct } from './form-product';
import type { ProductFormValues } from './form-product';

interface EditProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any | null;
  onSubmit: (data: ProductFormValues) => void;
}

export function EditProduct({
  open,
  onOpenChange,
  product,
  onSubmit,
}: EditProductProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product details and click save.
          </DialogDescription>
        </DialogHeader>
        {product && (
          <FormProduct
            defaultValues={{
              sku: product.sku,
              name: product.name,
              category: product.category,
              quantity: product.quantity,
              price: product.price,
            }}
            onSubmitData={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
