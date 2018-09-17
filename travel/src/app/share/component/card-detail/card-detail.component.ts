import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html'
})

export class DetailComponent {
  @Input() article: String;
}
