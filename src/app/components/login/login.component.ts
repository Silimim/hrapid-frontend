import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastModule} from 'primeng/toast';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PasswordModule} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ToastModule,
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    PasswordModule,
    Button,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  username: FormControl = new FormControl<string>('');
  password: FormControl = new FormControl<string>('');

  loginGroup = new FormGroup({
    username: this.username,
    password: this.password
  });

  constructor(public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  login() {
    if (this.loginGroup.valid) {
      this.authService.login(this.username.value, this.password.value).then(
        () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        (err) => {
          this.messageService.add({severity:'error', summary:'Error', detail: 'Invalid credentials'});
        }
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
