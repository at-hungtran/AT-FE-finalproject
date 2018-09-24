import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  constructor() {}

  get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
