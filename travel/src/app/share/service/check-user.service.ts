import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root',
})

export class CheckUserService {
  user;

  constructor(private authGuardService: AuthGuardService) {}

  curranceIsLogin = this.authGuardService.getToken() ? true : false;
  isLogin = new BehaviorSubject(this.curranceIsLogin);

  isUserLogin(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }

  setUserInfo(user) {
    this.user = user;
  }

  getUserInfo() {
    return this.user;
  }
}
