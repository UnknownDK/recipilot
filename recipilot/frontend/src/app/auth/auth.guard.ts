import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';



export const authGuard = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  if (cookieService.get('isLoggedIn') === 'true') {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('login');
};