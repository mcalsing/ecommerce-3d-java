import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Content } from './components/content/content';

export const routes: Routes = [
  { path: '', component: Content },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
];
