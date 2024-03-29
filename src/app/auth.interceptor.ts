import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AccountsService} from "./accounts/accounts.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountsService)

  if (accountService.token && !req.url.endsWith('/api-token-auth/')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${accountService.token}`
      }
    })
  }
  return next(req);
};
