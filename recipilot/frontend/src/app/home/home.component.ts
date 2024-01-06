import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor ( private http: HttpClient ){}

  ngOnInit(): void {
    this.http.get(
      'http://localhost:8000/api/me', { headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
        }
      ) ,withCredentials: true }).subscribe({
        next: data => {
          console.log(data);
        },
        error: error => {
          console.log(error);
        }
      })
  }

}
