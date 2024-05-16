import { RouteProps } from 'wouter';
import Home from '../home';
import Products from '../pages/products';
import { AuthGuest } from '../pages/auth/auth-guest';
import { AuthLogin } from '../pages/auth/auth-login';
import { AuthRegister } from '../pages/auth/auth-register';
import Cart from '../pages/cart';
import { Failed, Success } from '../pages/transaction/status';

// TODO: Do lazy load routes

export const MainRoutes: RouteProps[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth/guest',
    component: AuthGuest,
  },
  {
    path: '/auth/login',
    component: AuthLogin,
  },
  {
    path: '/auth/register',
    component: AuthRegister,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/success',
    component: Success,
  },
  {
    path: '/failure',
    component: Failed,
  },
];
