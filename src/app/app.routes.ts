import { Routes } from '@angular/router';
import {authGuard} from './inteceptors/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
  }
];
