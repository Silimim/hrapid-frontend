import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {Ripple} from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {NgClass, NgIf} from '@angular/common';
import {AvatarModule} from 'primeng/avatar';
import {InputTextModule} from 'primeng/inputtext';
import {AuthService} from '../../services/auth.service';

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
    InputTextModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  menuItems = [
    {label: 'Companies', icon: 'pi pi-fw pi-home', routerLink: '/companies'},
    {label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: '/employees'},
    {label: 'Lists', icon: 'pi pi-fw pi-list', routerLink: '/lists'},
  ]

  constructor(public authService: AuthService) {
  }
}
