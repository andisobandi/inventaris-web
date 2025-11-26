'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { productCategories } from '@/data/data';

const productSchema = z.object({
  sku: z.string().min(1, 'Product SKU is required'),
  name: z.string().min(1, 'Product name is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  category: z.string().min(1, 'Please select category'),
  price: z.number().min(1, 'Price must be greater than 0'),
});

export type ProductFormValues = z.infer<typeof productSchema>;

type FormProductProps = {
  onSubmitData: (data: ProductFormValues) => void;
};

export function FormProduct({ onSubmitData }: FormProductProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: '',
      name: '',
      quantity: 0,
      category: '',
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    onSubmitData(data);
  };

  return (
    <React.Fragment>
      <form id="form-product" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="sku"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>SKU</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter SKU"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter product name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    className="min-w-[120px]"
                  >
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>

                  <SelectContent position="item-aligned">
                    {productCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  step={1}
                  inputMode="numeric"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Quantity"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Price"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" form="form-product" disabled={!isValid}>
          Submit
        </Button>
      </DialogFooter>
    </React.Fragment>
  );
}
