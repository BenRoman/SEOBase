import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeoContentBaseService {

  private  _rootApiServiceUrl: string = 'http://localhost:4243';
  private  _rootApiVersion: string = '/api/v1/';

  protected getUrl(url: string): string {
    return this._rootApiServiceUrl + this._rootApiVersion + url;
  }

  constructor(protected http: HttpClient) { }
}
