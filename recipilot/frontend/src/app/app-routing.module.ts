import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { MypageComponent } from './mypage/mypage.component';

const routes: Routes = [
  { 
    path: 'planner',
    component: BaseLayoutComponent, // base layout
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'me', component: MypageComponent },

    ]},
  { path: '',
    component: BaseLayoutComponent,
    children: [
      { path: '', component: LandingpageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
