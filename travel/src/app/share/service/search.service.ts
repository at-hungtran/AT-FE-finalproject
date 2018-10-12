import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { END_POINT } from './api.registry';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class SearchService {
  category;
  constructor(private apiService: APIService) {}

  search(terms: Observable<string>, category) {
    this.category = category;
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        return this.searchEntries(term);
      }),
    );
  }

  searchEntries(terms) {
    let condition;
    if (this.category) {
      condition  = {
        name: terms,
        category: this.category
      };
    } else if (!this.category) {
      condition  = {
        name: terms,
      };
    }
    return this.apiService.post([END_POINT.search], condition);
  }
}
