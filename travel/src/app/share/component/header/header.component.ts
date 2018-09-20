import { Component, OnInit } from '@angular/core';
import { CheckUserService } from '../../service/check-user.service';
import { StorageService } from '../../service/storage.service';

const KEY = 'token';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  isLogin = false;

  constructor(private checkLoginService: CheckUserService,
              private storageService: StorageService) {}

  navigateList = [
    {
      name: 'home',
      routerLink: '/home'
    },
    {
      name: 'site',
      routerLink: '/site'
    },
    {
      name: 'search',
      routerLink: '/search'
    }
  ];

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.checkLoginService.isLogin.subscribe(value => {
      this.isLogin = value;
    });
  }

  logout() {
    this.storageService.remove(KEY);
    this.isLogin = false;
  }
}
