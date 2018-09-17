import { Injectable } from '@angular/core';

export const TOKEN_NAME = 'user_token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor () { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(name: string): void {
    return localStorage.setItem(TOKEN_NAME, name);
  }
}
