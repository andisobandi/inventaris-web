'use client';

import React from 'react';

import { columns } from './columns';
import { DataTable } from '@/components/datatable';
import { useAppSelector } from '@/store/hooks';
import { productCategories } from '@/data/data';
import { AddProduct } from './add-product';

export default function Products() {
  const products = useAppSelector((s) => s.products.products);
  const [openAdd, setOpenAdd] = React.useState(false);

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
        columns={columns}
        extraToolbarActions={{ onAdd: () => setOpenAdd(true) }}
      />
      <AddProduct open={openAdd} onOpenChange={setOpenAdd} />
    </div>
  );
}
