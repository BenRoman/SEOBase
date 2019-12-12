import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeoContentBaseService {

  private  _rootApiServiceUrl: string = 'http://localhost:4241';
  private  _rootApiVersion: string = '/api/v1/';

  protected getUrl(url: string): string {
    console.log(this._rootApiServiceUrl + this._rootApiVersion + url);
    return this._rootApiServiceUrl + this._rootApiVersion + url;
  }

  constructor(protected http: HttpClient) { }
}
