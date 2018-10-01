import { Component, Input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navigate-user',
  templateUrl: './navigate-user.component.html',
})
export class NavigateUserComponent {
  @Input() name;
  constructor(private active: RouterLinkActive) {}
}
