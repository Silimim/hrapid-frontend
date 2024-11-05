import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {TokensPair} from '../utils/interfaces';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.accessTokenValue;
  if (accessToken && req.headers.get('Authorization') === null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if ([401].includes(err.status)) {
        return handleError(req, next);
      }
      return throwError(err);
    })
  );
};

const handleError = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshTokenFn().pipe(
      switchMap((data: any) => {
        isRefreshing = false;

        let body: TokensPair = data.body;

        authService.updateRefreshToken(body.refresh_token);
        authService.updateAccessToken(body.access_token);
        refreshTokenSubject.next(body.refresh_token);

        return next(addTokenHeader(request));
      }),
      catchError((err) => {
        isRefreshing = false;

        authService.logout();
        return throwError(err);
      })
    );
  }
  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(() => next(addTokenHeader(request)))
  );
}

const addTokenHeader = (request: HttpRequest<any>) => {
  const authService = inject(AuthService);
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.accessTokenValue}`
    }
  });
}
