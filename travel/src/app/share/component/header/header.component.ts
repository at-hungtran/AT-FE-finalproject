import { Component, OnInit } from '@angular/core';
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

export class HeaderComponent implements OnInit {
  isLogin = false;
  className: string;
  isOpen = false;

  constructor(private checkLoginService: CheckUserService,
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
      routerLink: '/nothing'
    },
    {
      name: 'Destination',
      routerLink: '/nothing2'
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

  get open() {
    return this.isOpen ? 'show' : 'hide';
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
