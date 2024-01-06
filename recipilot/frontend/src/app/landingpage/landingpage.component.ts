import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  constructor (private router: Router,
    private userService: UserService,) {
      
    }


  ngOnInit(): void {
    if (this.userService.getIsLoggedIn()){
      this.router.navigate(['/planner']);
    }
  }
}
