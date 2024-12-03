import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {Ripple} from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {NgClass, NgIf} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {AuthService} from '../../services/auth.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Router} from '@angular/router';
import {Button} from 'primeng/button';
import {TieredMenuModule} from 'primeng/tieredmenu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MenubarModule,
    Ripple,
    BadgeModule,
    NgIf,
    NgClass,
    AvatarModule,
    InputTextModule,
    ToastModule,
    Button,
    TieredMenuModule
  ],
  providers: [MessageService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  menuItems = [
    {label: 'Companies', icon: 'pi pi-fw pi-home', path: '/companies'},
    {label: 'Employees', icon: 'pi pi-fw pi-users', path: '/employees'},
    {label: 'Lists', icon: 'pi pi-fw pi-list', path: '/lists'},
  ];

  accountItems = [
    {
      label: 'Sign Out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  ];

  constructor(public authService: AuthService, public router: Router) {}
}
