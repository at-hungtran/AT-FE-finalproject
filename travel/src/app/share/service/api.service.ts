import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_ROOT = environment.api_url;
@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor (private http: HttpClient) { }
  get(endpoint: string[], prams? : object): Observable<any> {
    const pram = this.query(endpoint, prams);
    return this.http.get<any>(pram)
    .pipe(map((res: Response) => this.extractData(res)));
  }

  post(endpoint: string[], body): Observable<any> {
    return this.http.post(this.query(endpoint), body)
    .pipe(map((res: Response) => this.extractData(res)))
  }

  put(endpoint: string[], body): Observable<any> {
    return this.http.put(this.query(endpoint), body)
    .pipe(map((res: Response) => this.extractData(res)))
  }

  delete(endpoint: string[]): Observable<any> {
    return this.http.delete(this.query(endpoint))
    .pipe(map((res: Response) => this.extractData(res)))
  }

  query(endpoint : string[], prams? : object) : string {
    const url = [API_ROOT, endpoint.join('/')].join('/');
    return url;
  }

  extractData(res: Response) {
    const body = res.json();
    return body;
  }
}