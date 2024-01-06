import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit {
  constructor(private router: Router,
    private userService: UserService,) {
      router.events.subscribe((val) => {
        this.isLoggedIn = this.userService.getIsLoggedIn();
        this.activeRoute = this.router.url;
      });
  }

  isLoggedIn: boolean = this.userService.getIsLoggedIn();
  activeRoute: string = '';
  


  ngOnInit() {
    this.activeRoute = this.router.url;
    initFlowbite();
  }

}
