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
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const updateProduct = async (product: any) => {
  const { data } = await apiRequest({
    url: `product/${product.sku}`,
    method: 'PUT',
    data: product,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const removeProduct = async (sku: string) => {
  const { data } = await apiRequest({
    url: `product?sku=${sku}`,
    method: 'DELETE',
  });

  return data;
};
