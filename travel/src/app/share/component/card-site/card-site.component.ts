import { Component, Input } from '@angular/core';
import { Site } from '../../model/site';

@Component({
  selector: 'app-card-site',
  templateUrl: './card-site.component.html'
})

export class CardSiteComponent {
  @Input() site: Site;
}
