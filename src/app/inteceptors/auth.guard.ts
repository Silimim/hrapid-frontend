import {CanActivateFn, Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TokensPair} from '../utils/interfaces';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.userValue;
  if (user) {
    return true;
  } else {
    try {
      const result = await lastValueFrom(authService.refreshTokenFn());
      if (result.status === 200 && result.body) {
        const tokens = result.body as TokensPair;
        authService.updateRefreshToken(tokens.refresh_token);
        authService.updateAccessToken(tokens.access_token);
        return true;
      } else {
        await router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
      }
    } catch (e) {
      await router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
};
