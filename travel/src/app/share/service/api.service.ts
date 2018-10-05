import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_ROOT = environment.api_url;
@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor (private http: HttpClient) {}

  get(endpoint: string[], prams?: object): Observable<any> {
    const pram = this.query(endpoint, prams);
    return this.http.get<any>(pram);
  }

  post(endpoint: string[], body): Observable<any> {
    const url = this.query(endpoint);
    return this.http.post(url, body);
  }

  getWithToken(endpoint: string[], token): Observable<any> {
    const url = this.query(endpoint);
    const headers = new HttpHeaders().set('x-access-token', token);
    return this.http.get(url, {headers});
  }

  handleError(error?: any): Promise<any> {
    if (!error) {
      return Promise.reject({});
    }
  }

  put(endpoint: string[], body): Observable<any> {
    return this.http.put(this.query(endpoint), body);
    //.pipe(map((res: Response) => this.extractData(res)));
  }

  delete(endpoint: string[], prams?: object): Observable<any> {
    const pram = this.query(endpoint, prams);
    return this.http.delete<any>(pram);
    //.pipe(map((res: Response) => this.extractData(res)));
  }

  query(endpoint: string[], prams?: object): string {
    const url = [API_ROOT, endpoint.join('/'), prams].join('/');
    return url;
  }

  extractData(res: Response) {
    const body = res.json();
    return body;
  }
}
