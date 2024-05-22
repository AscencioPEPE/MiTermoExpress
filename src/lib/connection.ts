import axios from 'axios';

export const baseURL = import.meta.env.VITE_PUBLIC_API as string;

const userInfo = () => {
  let data = {};

  if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
    data = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  return {
    userInfo: data,
  };
};

const config = () => {
  const user = userInfo()?.userInfo;
  // @ts-ignore
  if (!user || !user.accessToken) {
    return {
      headers: {
        Authorization: '',
      },
    };
  }

  return {
    headers: {
      //@ts-ignore
      Authorization: 'Bearer ' + userInfo()?.userInfo?.accessToken,
    },
  };
};

export const apiRequest = axios.create({
  baseURL,
  headers: {
    Authorization: config().headers.Authorization,
  },
});
