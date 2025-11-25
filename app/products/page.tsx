import { columns } from './columns';
import { DataTable } from '@/components/datatable';
import products from '../../data/products.json';

export default function Products() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">Manage your products</p>
        </div>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
