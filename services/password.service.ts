import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {BaseService} from './base';

import 'rxjs/add/operator/toPromise';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {Service} from './util';

@Injectable()
export class PasswordService {

    base: any;
    service: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private http: Http,
                private toastr: ToastsManager) {

        this.base = new BaseService();
        this.service = new Service( router, http, toastr );
    }

  /**
   * Reset Password by Calling auth Service
   * @param dataObj
   * @returns {Observable<any>}
   */
    public resetPassword(dataObj: any) {

      const data = JSON.stringify(dataObj);
      const Email = JSON.stringify(dataObj.Email);
      return this.service.Call('post', this.base.UPDATE_PASSWORD, data);
    }


    /**
     * Reset Password by Calling auth Service
     * @param dataObj
     * @returns {Observable<any>}
     */
      public getResetCode(dataObj: any) {
        debugger;
        const data = JSON.stringify(dataObj);

        return this.service.Call('post', this.base.REQUEST_RESET_CODE, data);
      }


}
