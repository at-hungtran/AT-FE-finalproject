import { Component, Input, OnChanges } from '@angular/core';
import { Destination } from '../../model/destination';

@Component({
  selector: 'app-card-destination',
  templateUrl: './card-destination.component.html'
})

export class CardComponent implements OnChanges {
  @Input() destination: Destination;
  imgafetchUrl;

  url = 'http://localhost:3000/uploads/';

  ngOnChanges() {
    console.log(this.destination.listPictures);
    this.fetchUrl();
  }

  fetchUrl() {
    console.log(this.destination.listPictures[0]);
    this.imgafetchUrl = this.url + this.destination.listPictures[0].name;
  }
}
