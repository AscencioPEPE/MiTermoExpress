import axios from 'axios';

export const baseURL = import.meta.env.VITE_PUBLIC_API as string;

type UserInfo = {
  state?: {
    currentUser?: {
      token?: string;
    };
  };
};

const userInfo = () => {
  let data: UserInfo = {};

  if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
    data = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }

  return {
    userInfo: data?.state?.currentUser,
  };
};

const config = () => {
  const user = userInfo()?.userInfo;
  console.log('user: ', user);

  // @ts-ignore
  if (!user || !user.token) {
    return {
      headers: {
        Authorization: '',
      },
    };
  }

  return {
    headers: {
      //@ts-ignore
      Authorization: 'Bearer ' + userInfo()?.userInfo?.token,
    },
  };
};

export const apiRequest = axios.create({
  baseURL,
  headers: {
    Authorization: config().headers.Authorization,
  },
});
