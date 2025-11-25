import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Content } from './components/content/content';
import { PurchaseCompleted } from './components/purchase-completed/purchase-completed';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: Content },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'completed', component: PurchaseCompleted },
  { path: 'product/:id', component: ProductDetail}
];
