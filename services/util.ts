import {Injectable} from '@angular/core';
import { BaseService } from './base';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {AuthService} from './auth';

import {Observable} from 'rxjs/Rx';

@Injectable()
export class Service {

  base: any;
  authService: any;
  constructor(public router: Router, public http: Http, public toastr: ToastsManager) {
    this.base = new BaseService();
    this.authService = new AuthService( router, http, toastr );
  }

  /**
   * Genric function for all web service calls
   * @param method
   * @param url
   * @param data
   * @returns {Observable<any>}
   * @constructor
   */
  Call(method: any, url: any, data: any) {

    const Url = url;
    const Method = method;
    const Data = data;
    const Options = this.getHeaders();

    switch (Method) {

      case 'post': {
        return this.http
          .post(Url, Data, Options)
          .map(res => {
            return res.json();
          }).share();
      }

      case 'get': {
        return this.http
          .get(Url, Options)
          .map(res => {
            return res.json();
          }).share();
      }

      case 'put': {
        return this.http
          .put(Url, Data, Options)
          .map(res => {
            return res;
          }).share();
      }

      // case 'delete': {
      //   return this.http
      //     .delete(Url, Options)
      //     .map(res => {
      //       return res.json();
      //     }).share();
      // }

      case 'delete': {

        const token = this.authService.getAccessToken();
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token });

        return this.http
          .delete(Url, new RequestOptions({
             headers: headers,
             body: Data
          }))
          .map(res => {
            return res.json();
          }).share();
      }

      default: {
        //statements;
        break;
      }
    }
  }

  /**
   * Get header with token for all service calls
   * @returns Header Object
   */
  getHeaders() {
    const token = this.authService.getAccessToken();
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + token });
    return new RequestOptions({headers: headers});
  }

}
