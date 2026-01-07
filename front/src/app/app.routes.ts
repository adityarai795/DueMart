import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { ShowallProduct } from './pages/showall-product/showall-product';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'showallproduct',
    component:ShowallProduct,
  },
  {
    path: 'cart',
    component:Cart,
  },
  {
    path: '**',
    redirectTo: '', // 👈 agar koi galat URL ho to home pe redirect
  },
];
