import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  navigateList = [
    {
      name: 'home',
      routerLink: '/home'
    },
    {
      name: 'search',
      routerLink: '/search'
    }
  ];
}
