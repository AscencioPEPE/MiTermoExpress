import { RouteProps } from 'wouter';
import { lazy } from 'react';
import { User } from '@/src/types/user';
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

interface MainRoutesProps extends RouteProps {
  isProtected: boolean;
  role?: User['role'][];
}

export const MainRoutes: MainRoutesProps[] = [
  {
    path: '/',
    component: Home,
    isProtected: false,
  },
  {
    path: '/auth/login',
    component: AuthLogin,
    isProtected: false,
  },
  {
    path: '/auth/guest',
    component: AuthGuest,
    isProtected: false,
  },

  {
    path: '/auth/register/customer',
    component: AuthRegisterCustomer,
    isProtected: false,
  },
  {
    path: '/auth/register/admin',
    component: AuthRegisterAdmin,
    isProtected: false,
  },
  {
    path: '/products',
    component: Products,
    isProtected: false,
  },
  {
    path: '/product/:productName',
    component: ProductDetails,
    isProtected: false,
  },
  {
    path: '/cart',
    component: Cart,
    isProtected: false,
  },
  {
    path: '/success?session_id=:sessionId',
    component: Success,
    isProtected: false,
  },
  {
    path: '/failure',
    component: Failure,
    isProtected: false,
  },
  {
    path: '/foo',
    component: Products,
    isProtected: true,
    role: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
  },
];
