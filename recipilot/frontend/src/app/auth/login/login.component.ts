import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  api_url: string = 'http://localhost:8000/api/';

  constructor(
    public router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private userService: UserService

    ) {}

  ngOnInit() {
    if (this.userService.getIsLoggedIn()){
      this.router.navigate(['/planner']);
    }

    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  login(username: string, password: string) {
    this.http.post(this.api_url + 'auth/login',
    {},
    { headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password),
      }
    ), withCredentials: true}
    ).subscribe({
      next: data => {
        this.userService.setIsLoggedIn(true);
        const redirectUrl = '/planner';

        // Redirect the user
        this.router.navigate([redirectUrl]);
        return true
      },
      error: error => {
        this.userService.setIsLoggedIn(false);

        this.loading = false;
        this.submitted = false;
        this.error = "Wrong username or password";

      }
    });
  }


    
    onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.login(this.form.controls['username']?.value, this.form.controls['password']?.value);

  }


  me() {
    this.http.get(this.api_url + 'me',
    { withCredentials: true}
    ).subscribe(res => {
      console.log(res);
    })
  }




  logout() {
    this.userService.setIsLoggedIn(false);
  }
}
