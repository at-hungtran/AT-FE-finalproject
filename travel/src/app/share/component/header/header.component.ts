import { Component, OnInit, OnChanges } from '@angular/core';
import { Directive,
        HostListener,
        ElementRef,
        Renderer2 } from '@angular/core';
import { trigger,
        state,
        style,
        animate,
        transition } from '@angular/animations';

import { CheckUserService } from '../../service/check-user.service';
import { StorageService } from '../../service/storage.service';
import { APIService } from '../../service/api.service';
import { END_POINT } from '../../service/api.registry';
import { environment } from '../../../../environments/environment';

const KEY = 'token';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('popOverState', [
      state('show', style({
        transform: 'translate(0,0)',
        opacity: 1
      })),
      state('hide', style({
        transform: 'translate(-400px,0)',
        width: 0,
        opacity: 0
      })),
      transition('show => hide', animate('200ms ease-in-out')),
      transition('hide => show', animate('200ms ease-in'))
    ]),
  ]
})

export class HeaderComponent implements OnInit, OnChanges {
  isLogin = false;
  className: string;
  isOpen = false;
  token;
  user;
  avatarDefault = '../../../../assets/images/default-avt.jpg';

  constructor(private checkLoginService: CheckUserService,
              private apiService: APIService,
              private storageService: StorageService,
              private el: ElementRef,
              private renderer: Renderer2) {}

  navigateList = [
    {
      name: 'Home',
      routerLink: '/home'
    },
    {
      name: 'Site',
      routerLink: '/site'
    },
    {
      name: 'Destination',
      routerLink: '/destinations'
    }
  ];

  ngOnInit() {
    this.setToken();
    this.checkLogin();
  }

  ngOnChanges() {
    this.setUser();
  }

  checkLogin() {
    this.checkLoginService.isLogin.subscribe(value => {
      this.isLogin = value;
      this.setUser();
    });
  }

  logout() {
    this.storageService.remove(KEY);
    this.isLogin = false;
    this.apiService.getWithToken([END_POINT.auth, END_POINT.logout], this.token)
    .subscribe();
  }

  setToken() {
    this.token = this.storageService.get(KEY);
  }

  setUser() {
    if (this.token) {
      this.apiService.getWithToken([END_POINT.auth, END_POINT.me], this.token)
      .subscribe(user => {
        this.user = user;
        this.checkLoginService.setUserInfo(this.user);
      });
    }
  }

  get open() {
    return this.isOpen ? 'show' : 'hide';
  }

  fetchUrl() {
    if (this.user.avatar) {
      return environment.img_url + this.user.avatar;
    }
    return this.avatarDefault;
  }

  @HostListener('click', ['$event'])
  onclick(event) {
    if (event.target.className === 'fas fa-bars') {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }
}
