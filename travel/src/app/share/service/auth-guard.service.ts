import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})

export class AuthGuardService {
  constructor() {}

  getToken(): string {
    return localStorage.getItem(KEY);
  }
}
