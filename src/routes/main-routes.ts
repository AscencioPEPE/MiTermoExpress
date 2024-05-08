import { RouteProps } from 'wouter';
import Home from '../home';
import Products from '../pages/products';
import Cart from '../pages/cart';

export const MainRoutes: RouteProps[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
  },
  {
    path: 'cart',
    component: Cart,
  },
];
