import {Routes} from '@angular/router';
import {authGuard} from './inteceptors/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CompaniesComponent} from './components/companies/companies.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: '',
    title: 'Home',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'companies',
        title: 'Companies',
        component: CompaniesComponent,
        canActivate: [authGuard]
      }
    ]
  }
];
