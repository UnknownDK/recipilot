import { Injectable, OnInit, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private cookieService = inject(CookieService);




  setUserName(name: string) {
    this.cookieService.set('username', name, 7, '/');
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }

  setIsLoggedIn(isLoggedIn: boolean) {
    this.cookieService.set('isLoggedIn', isLoggedIn.toString(), 7, '/');
  }

  getIsLoggedIn(): boolean {
    return this.cookieService.get('isLoggedIn') === 'true';
  }

}
