import { apiRequest } from '../lib/connection';

export const listProducts = async (queryParams: string) => {
  const { data } = await apiRequest({
    url: `product?${queryParams}`, // ? DONE
    method: 'GET',
  });

  return data;
};

export const getProduct = async (productName: string) => {
  const { data } = await apiRequest({
    url: `product/${productName}`,
    method: 'GET',
  });

  return data;
};

export const createProduct = async (newProduct: any) => {
  const { data } = await apiRequest({
    url: 'product',
    method: 'POST',
    data: newProduct,
  });

  return data;
};

export const updateProduct = async (product: any, productName: string) => {
  const { data } = await apiRequest({
    url: `product?${productName}`,
    method: 'UPDATE',
    data: product,
  });

  return data;
};

export const removeProduct = async (productName: string) => {
  const { data } = await apiRequest({
    url: `product?${productName}`,
    method: 'DELETE',
  });

  return data;
};
