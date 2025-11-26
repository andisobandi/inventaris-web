'use client';

import React from 'react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useAppDispatch } from '@/store/hooks';
import { addProduct } from '@/store/products-slice';
import { FormProduct } from './form-product';
import type { ProductFormValues } from './form-product';

interface AddProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProduct({ open, onOpenChange }: AddProductProps) {
  const dispatch = useAppDispatch();

  function onSubmit(data: ProductFormValues) {
    const payload = {
      name: data.name,
      category: data.category,
      quantity: Number(data.quantity),
      price: Number(data.price),
      sku: data.sku,
    };

    dispatch(addProduct(payload));
    onOpenChange(false);
    toast.success('Product has been created');
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>Create new product</DialogDescription>
        </DialogHeader>
        <FormProduct onSubmitData={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
