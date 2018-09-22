// import { Injectable } from '@angular/core';

// import { BehaviorSubject, Observable } from 'rxjs';
// import {shareReplay, filter, tap, map} from 'rxjs/operators';
// import {HttpClient} from '@angular/common/http';

// import { User } from '../model/user';

// export const TOKEN_NAME = 'user_token';

// export const ANONYMOUS_USER: User = {
//   id: undefined,
//   name: undefined,
//   password: undefined,
//   roles: [],
// };
// @Injectable({
//   providedIn: 'root'
// })

// export class AuthService {
//   private subject = new BehaviorSubject<User>(undefined);
//   user: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

//   isLoggedIn: Observable<boolean> = this.user.pipe(map(user => !!user.id));

//   isLoggedOut: Observable<boolean> = this.isLoggedIn.pipe(map(isLoggedIn => !isLoggedIn));

//   constructor (private http: HttpClient) {
//     http.get<User>('/api/user').pipe(
//     tap(console.log))
//     .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
//   }
//   signUp(username: string, password: string ) {
//     return this.http.post<User>('/api/signup', {username, password})
//       .pipe(shareReplay(), tap(user => this.subject.next(user)));
//   }

//   login(username:string, password:string ) {
//     return this.http.post<User>('/api/login', {username, password})
//       .pipe(shareReplay(),tap(user => this.subject.next(user)));
//   }

//   loginAsUser(username: string) {
//     return this.http.post<User>('/api/admin', {username})
//       .pipe(shareReplay(), tap(user => this.subject.next(user)));
//   }

//   logout(): Observable<any> {
//     return this.http.post('/api/logout', null)
//       .pipe(shareReplay(), tap(user => this.subject.next(ANONYMOUS_USER)));
//   }

//   getToken(): string {
//     return localStorage.getItem(TOKEN_NAME);
//   }

//   setToken(name: string): void {
//     return localStorage.setItem(TOKEN_NAME, name);
//   }
// }
