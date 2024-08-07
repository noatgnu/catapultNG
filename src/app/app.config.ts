import { ApplicationConfig } from '@angular/core';
import {provideRouter, withComponentInputBinding, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {authInterceptor} from "./auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withComponentInputBinding()), provideHttpClient(withInterceptors(
      [authInterceptor]
    ))
  ]
};
