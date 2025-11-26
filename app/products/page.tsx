'use client';

import React from 'react';
import { toast } from 'sonner';

import { columns } from './columns';
import { DataTable } from '@/components/datatable';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { productCategories } from '@/data/data';
import { deleteProduct, updateProduct } from '@/store/products-slice';
import type { Product } from '@/data/schema';
import { AddProduct } from './add-product';
import { DeleteProduct } from './delete-product';
import type { ProductFormValues } from './form-product';
import { EditProduct } from './edit-product';

export default function Products() {
  const products = useAppSelector((s) => s.products.products);
  const dispatch = useAppDispatch();

  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDelete(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const onEdit = (data: ProductFormValues) => {
    if (!selectedProduct) return;

    dispatch(updateProduct({ id: selectedProduct.id, ...data }));
    setOpenEdit(false);
    toast.success('Product has been updated');
  };

  const confirmDelete = () => {
    if (!selectedProduct) return;

    dispatch(deleteProduct({ id: selectedProduct.id }));
    setOpenDelete(false);
    toast.success('Product has been deleted');
  };

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
        columns={columns(handleEdit, handleDelete)}
        extraToolbarActions={{ onAdd: () => setOpenAdd(true) }}
      />
      <AddProduct open={openAdd} onOpenChange={setOpenAdd} />
      <EditProduct
        open={openEdit}
        onOpenChange={setOpenEdit}
        product={selectedProduct}
        onSubmit={onEdit}
      />
      <DeleteProduct
        open={openDelete}
        onOpenChange={setOpenDelete}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name ?? ''}
      />
    </div>
  );
}
