import { Component, Input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
})
export class NavigateComponent {
  @Input() name: string;
  constructor(private active: RouterLinkActive) {}
}
