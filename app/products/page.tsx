'use client';

import React from 'react';
import { toast } from 'sonner';

import { columns } from './columns';
import { DataTable } from '@/components/datatable';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { productCategories } from '@/data/data';
import { deleteProduct } from '@/store/products-slice';
import type { Product } from '@/data/schema';
import { AddProduct } from './add-product';
import { DeleteProduct } from './delete-product';

export default function Products() {
  const products = useAppSelector((s) => s.products.products);
  const dispatch = useAppDispatch();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  function confirmDelete() {
    if (!selectedProduct) return;

    dispatch(deleteProduct({ id: selectedProduct.id }));
    setOpenDelete(false);
    toast.success('Product has been deleted');
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">Manage your products</p>
        </div>
      </div>
      <DataTable
        data={products}
        categories={productCategories}
        columns={columns(handleDelete)}
        extraToolbarActions={{ onAdd: () => setOpenAdd(true) }}
      />
      <AddProduct open={openAdd} onOpenChange={setOpenAdd} />
      <DeleteProduct
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name ?? ''}
      />
    </div>
  );
}
