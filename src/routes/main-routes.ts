import { RouteProps } from 'wouter';
import Home from '../home';
import Products from '../pages/products';

export const MainRoutes: RouteProps[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: 'products',
    component: Products,
  },
];
