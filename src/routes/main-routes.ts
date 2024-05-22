import { RouteProps } from 'wouter';
import { lazy } from 'react';
// import AuthLogin from '../pages/auth/auth-login';

const Home = lazy(() => import('../home'));
const Products = lazy(() => import('../pages/products'));
const ProductDetails = lazy(() => import('../pages/products/product-details'));
const Cart = lazy(() => import('../pages/cart'));
const AuthGuest = lazy(() => import('../pages/auth/auth-guest'));
const AuthLogin = lazy(() => import('../pages/auth/auth-login'));
const AuthRegisterCustomer = lazy(() => import('../pages/auth/auth-register'));
const AuthRegisterAdmin = lazy(() => import('../pages/auth/auth-register-admin'));
const Failure = lazy(() => import('../pages/transaction/Failure'));
const Success = lazy(() => import('../pages/transaction/Success'));

export const MainRoutes: RouteProps[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/auth/login',
    component: AuthLogin,
  },
  {
    path: '/auth/guest',
    component: AuthGuest,
  },

  {
    path: '/auth/register/customer',
    component: AuthRegisterCustomer,
  },
  {
    path: '/auth/register/admin',
    component: AuthRegisterAdmin,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/product/:productName',
    component: ProductDetails,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/success?session_id=:sessionId',
    component: Success,
  },
  {
    path: '/failure',
    component: Failure,
  },
];
