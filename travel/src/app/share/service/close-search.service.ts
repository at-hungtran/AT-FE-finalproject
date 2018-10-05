import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CloseSearchService {
  constructor() {}

  isClose = false;
  newIsClose = new BehaviorSubject(this.isClose);

  closeWrapSearch(isClose: boolean) {
    this.newIsClose.next(isClose);
  }
}
