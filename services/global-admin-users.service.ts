import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {BaseService} from './base';
import {Service} from './util';

import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth';

import 'rxjs/add/operator/toPromise';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class GlobalAdminUsersService {

  base: any;
  service: any;
  authService: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private toastr: ToastsManager) {

      this.base = new BaseService();
      this.service = new Service( router, http, toastr );
      this.authService = new AuthService( router, http, toastr );
  }

   /**
   * Fetch all Admin Users Call
   * @returns {Observable<any>}
   */
  getAllUsers() {
    return this.service.Call('get', this.base.ADMIN_USERS);
  }

  /**
   * Update User Details
   * @param userID
   * @param Data
   */
  updateUser(userID, Data) {
    return this.service.Call('put', this.base.ADMIN_USERS + '/' + userID, Data);
  }
  removeUser(userID, Data) {
    return this.service.Call('put', this.base.ADMIN_USERS + '/status/' + userID, Data);
  }


}
