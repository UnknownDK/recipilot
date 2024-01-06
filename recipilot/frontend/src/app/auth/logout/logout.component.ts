import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UserService } from 'src/app/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  private api_url: string = 'http://localhost:8000/api/';

  logout() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
    });

    this.http.post(this.api_url + 'auth/logout',
    {},
    { headers, withCredentials: true }
    ).subscribe({
      next: data => {
        this.userService.setIsLoggedIn(false);
        const redirectUrl = '/';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  ngOnInit(): void {
    this.logout();
  }


}
