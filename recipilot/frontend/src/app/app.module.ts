import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { SearchComponent } from './search/search.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './auth/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './auth/logout/logout.component';
import { MypageComponent } from './mypage/mypage.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgOptimizedImage } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    SearchComponent,
    LandingpageComponent,
    LoginComponent,
    LogoutComponent,
    MypageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
