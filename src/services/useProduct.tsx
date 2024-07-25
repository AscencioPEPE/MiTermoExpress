import { useQuery, useMutation } from '@tanstack/react-query';
import { createProduct, getProduct, listProducts, removeProduct, updateProduct } from '../sdk/product';
import { Product, Products } from '../types/products';
import { toast } from 'react-toastify';
import { queryClient } from '../lib/queryClient';

/**
 * Retrieve a list of products, you can added queryPArams to get filters
 */
export const useListProductQuery = ({ limit = 20, page = 1, filters = [] }) => {
  const queryString = `limit=${limit}&page=${page}${filters.length > 0 ? `&${filters.join('&')}` : ''}`;

  return useQuery<Products>({
    queryKey: ['product', queryString],
    queryFn: () => listProducts(queryString),
    refetchOnWindowFocus: false,
  });
};
/**
 * Get only one product by name
 */
export const useProductQuery = (productName: string) =>
  useQuery<Product[]>({ queryKey: ['product', productName], queryFn: () => getProduct(productName) });
/**
 * Create a new Product
 */
export const useCreateProductQuery = () =>
  useMutation({
    mutationKey: ['product'],
    mutationFn: (product: any) => createProduct(product),
    onSuccess: (data: Product) => {
      toast('Product created successfully!');
    },
    onError: () => toast('An error was ocurred, the product wasnt create!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['product'] }),
  });

/**
 * Update a product
 */
export const useUpdateProductQuery = () =>
  useMutation({
    mutationKey: ['product'],
    mutationFn: (product: any) => updateProduct(product),
    onSuccess: (data: Product) => {
      toast('Product updated successfully!');
    },
    onError: () => toast('An error was ocurred, the product wasnt update!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['product'] }),
  });
/**
 * Delete product by name
 */
export const useRemoveProductQuery = () =>
  useMutation({
    mutationKey: ['product'],
    mutationFn: (productName: string) => removeProduct(productName),
    onSuccess: (data: Product) => {
      toast('Product deleted successfully!');
    },
    onError: () => toast('An error was ocurred, the product wasnt deleted!'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['product'] }),
  });
