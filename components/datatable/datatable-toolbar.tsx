'use client';

import { Table } from '@tanstack/react-table';
import { X, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardAction, CardHeader } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { DataTableFacetedFilter } from './datatable-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  categories: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableToolbar<TData>({
  table,
  categories,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <CardHeader>
      <div className="flex flex-1 items-center gap-2">
        <InputGroup className="h-8 w-[150px] lg:w-[250px]">
          <InputGroupInput
            placeholder="Search..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="h-8"
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        {table.getColumn('category') && (
          <DataTableFacetedFilter
            column={table.getColumn('category')}
            title="Category"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <CardAction>
        <Button size="sm">Add Product</Button>
      </CardAction>
    </CardHeader>
  );
}
