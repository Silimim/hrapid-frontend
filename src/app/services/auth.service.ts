import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokensPair, User} from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any | null>;
  public user: Observable<User | null>;
  private accessToken: string | undefined;
  private refreshToken: string | null;

  private authHost = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {
    this.refreshToken = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject(undefined);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public get accessTokenValue() {
    return this.accessToken;
  }

  login(username: string, password: number): Promise<TokensPair> {
    return new Promise((resolve, reject) => {
      this.http.post<TokensPair>(`${this.authHost}/auth`, { username: username, password: password })
        .subscribe({next: value => {
            localStorage.setItem('user', value.refresh_token);
            this.refreshToken = value.refresh_token;
            this.accessToken = value.access_token;
            this.userSubject.next(this.getUserFromToken(this.accessToken));
            resolve(value);
          },
          error: (err: HttpErrorResponse) => {
            reject(err);
          }});
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUserFromToken(jwt: string): User {
    let username;
    let email;
    let roles;
    if (jwt) {
      const parts = jwt.split('.');
      if (parts?.length === 3) {
        const payloadEncoded = parts[1];
        if (payloadEncoded) {
          try {
            const payloadDecoded = JSON.parse(atob(payloadEncoded));
            username = payloadDecoded.username;
            roles = payloadDecoded.roles;
            email = payloadDecoded.email;
          } catch (e) {}
        }
      }
    }
    return {username, email, roles};
  }

  refreshTokenFn(): Observable<HttpResponse<Object>> {
    return this.http.post(`${this.authHost}/refresh`, {}, {observe: 'response', headers: {'Authorization': `Bearer ${this.refreshToken}`}}).pipe();
  }

  updateRefreshToken(jwtRefresh: string) {
    localStorage.setItem('user', jwtRefresh);
    this.refreshToken = jwtRefresh;
  }

  updateAccessToken(jwtAccess: string) {
    this.accessToken = jwtAccess;
    this.userSubject.next(this.getUserFromToken(this.accessToken));
  }
}
