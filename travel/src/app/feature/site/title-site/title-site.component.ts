import { Component, Input } from '@angular/core';
import { Site } from '../../../share/model/site';

@Component({
  selector: 'app-title',
  templateUrl: './title-site.component.html'
})

export class TitleComponent {
  @Input() site: Site;
}
