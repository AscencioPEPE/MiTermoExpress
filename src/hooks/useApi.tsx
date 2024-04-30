/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../lib/queryClient';

export const baseUrl = import.meta.env.VITE_PUBLIC_API as string;

export const userInfo = () => {
  let data = {};

  if (typeof window !== 'undefined' && localStorage.getItem('userInfo')) {
    data = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  }

  return {
    userInfo: data,
  };
};

export const config = () => {
  if (Object.keys(userInfo().userInfo).length === 0) {
    return {
      headers: {
        Authorization: '',
      },
    };
  }

  return {
    headers: {
      Authorization:
        (userInfo() as any)?.(userInfo as any)?.['tokenType'] + (userInfo() as any)?.(userInfo as any)?.['accessToken'],
    },
  };
};

export const api = async (method: string, url: string, obj = {}) => {
  try {
    switch (method) {
      case 'GET':
        const foo = await axios.get(`${baseUrl}/${url}`, config()).then((res) => res.data);

        return foo;

      case 'POST':
        return await axios.post(`${baseUrl}/${url}`, obj, config()).then((res) => res.data);

      case 'PUT':
        return await axios.put(`${baseUrl}/${url}`, obj, config()).then((res) => res.data);

      case 'PATCH':
        return await axios.patch(`${baseUrl}/${url}`, obj, config()).then((res) => res.data);

      case 'DELETE':
        return await axios.delete(`${baseUrl}/${url}`, config()).then((res) => res.data);
    }
  } catch (err: unknown) {
    const error = err as Error;
    const message = error?.message || 'Error desconocido, intente más tarde';
    if (message === 'jwt expired' && typeof window !== 'undefined') {
      localStorage.removeItem('userInfo');
      window.location.reload();
    }
    throw err;
  }
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'InfiniteScroll';

interface ApiHookParams {
  key: string[];
  method: Method;
  url: string;
  scrollMethod?: 'GET';
}

export default function useApi({ key, method, url }: ApiHookParams) {
  switch (method) {
    case 'GET':
      // eslint-disable-next-line
      const get = useQuery({
        queryKey: key,
        queryFn: () => api(method, url, {}),
        retry: 0,
        refetchOnWindowFocus: true,
      });
      return { get };

    case 'POST':
      // eslint-disable-next-line
      const post = useMutation({
        mutationFn: (obj: any) => api(method, url, obj),
        retry: 0,
        mutationKey: key,
        onMutate: async (formData) => {
          await queryClient.cancelQueries({ queryKey: key });

          const previousObj: any = queryClient.getQueryData(key);

          queryClient.setQueryData(key, () => {
            return {
              ...previousObj,
              data: [...(previousObj?.data ?? []), formData],
            };
          });
          return { previousObj };
        },
        onError: (_error, _object, context) => {
          /**
           *  If the api fail, the previous data is returned
           **/
          queryClient.setQueryData(key, context?.previousObj);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
      });
      return { post };

    case 'PUT':
      // eslint-disable-next-line
      const put = useMutation({
        mutationFn: (obj: any) => api(method, `${url}/${obj?.id}`, obj),
        retry: 0,
        mutationKey: key,
        onMutate: async (formData) => {
          const updateData = Object.fromEntries(formData.entries());

          await queryClient.cancelQueries({ queryKey: key });
          /**
           * Retrieve the old statement of all notices
           */
          const previousObj: any = queryClient.getQueryData(key);
          /**
           * Get item selected by user
           */
          const selectedObj: any = previousObj?.data?.find((item: { id: any }) => item.id === updateData.id)!;
          /**
           * Update the item with the new data
           */
          const updateSelectedObj: any = {
            ...selectedObj,
            ...updateData.data,
          };
          /**
           * Delete the item selected and concat the updated item
           */
          const allObjs = [...previousObj?.data!].filter((obj) => obj.id !== selectedObj?.id).concat(updateSelectedObj);

          queryClient.setQueryData(key, () => {
            return {
              ...previousObj,
              data: allObjs,
            };
          });

          return { previousObj };
        },
        onError: (_error, _notice, context) => {
          /**
           * If the api fail, the previous data is returned
           */
          queryClient.setQueryData(key, context?.previousObj);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { put };

    case 'PATCH':
      // eslint-disable-next-line
      const patch = useMutation({
        mutationFn: (obj: any) => {
          let data = obj;
          if (obj instanceof FormData) {
            data = Object.fromEntries(obj.entries());
          }
          return api(method, `${url}/${data?.id}`, data);
        },
        retry: 0,
        mutationKey: key,
        onMutate: async (formData) => {
          const updateData = Object.fromEntries(formData.entries());

          await queryClient.cancelQueries({ queryKey: key });
          /**
           * Retrieve the old statement of all notices
           */
          const previousObj: any = queryClient.getQueryData(key);
          /**
           * Get item selected by user
           */
          const selectedObj: any = previousObj?.data?.find((item: { id: any }) => item.id === updateData.id)!;
          /**
           * Update the item with the new data
           */
          const updateSelectedObj: any = {
            ...selectedObj,
            ...updateData.data,
          };
          /**
           * Delete the item selected and concat the updated item
           */
          const allObjs = [...previousObj?.data!].filter((obj) => obj.id !== selectedObj?.id).concat(updateSelectedObj);

          queryClient.setQueryData(key, () => {
            return {
              ...previousObj,
              data: allObjs,
            };
          });

          return { previousObj };
        },
        onError: (_error, _notice, context) => {
          /**
           * If the api fail, the previous data is returned
           */
          queryClient.setQueryData(key, context?.previousObj);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
      });

      return { patch };

    case 'DELETE':
      // eslint-disable-next-line
      const deleteObj = useMutation({
        mutationFn: (id: string) => api(method, `${url}/${id}`),
        retry: 0,
        mutationKey: key,
        onMutate: async (objectId: string) => {
          await queryClient.cancelQueries({ queryKey: key });
          /**
           * Retrieve the old statement
           */
          const previousObj: any = queryClient.getQueryData(key);
          /**
           * Eval the old data and change delete current data by id
           * and return this to react query store
           */
          queryClient.setQueryData(key, () => {
            return {
              ...previousObj,
              data: [...(previousObj?.data ?? [])].filter((obj) => obj.id !== objectId),
            };
          });
          /**
           * Storage previous data in context store
           */
          return { previousObj };
        },
        onError: (_error, _object, context) => {
          /**
           *  If the api fail, the previous data is returned
           **/
          queryClient.setQueryData(key, context?.previousObj);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
      });
      return { deleteObj };

    // case 'InfiniteScroll':
    //   // eslint-disable-next-line
    //   const infinite = useInfiniteQuery({
    //     queryKey: key,
    //     queryFn: ({ pageParam = 1 }) =>
    //       api(scrollMethod, `${url}&page=${pageParam}`),
    //     getNextPageParam: (lastPage: any, allPages) => {
    //       const maxPage = lastPage?.pages
    //       const nextPage = allPages?.length + 1

    //       return nextPage <= maxPage ? nextPage : undefined
    //     },
    //     retry: 0,
    //   })

    //   return { infinite, data: infinite.data }

    default:
      throw new Error(`Método inválido ${method}`);
  }
}
