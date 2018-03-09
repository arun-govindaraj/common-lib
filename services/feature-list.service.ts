import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {BaseService} from './base';
import {Service} from './util';

import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth';

import 'rxjs/add/operator/toPromise';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class FeatureListService {

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
     * Update status of FeatureList
     * @param dataObj
     * @returns {Observable<any>}
     */
      public updateFeature(fId:any,dataObj:any){
        const featureId = fId;
        const data = JSON.stringify(dataObj);
        return this.service.Call('put', this.base.FEATURE_LIST_URL+"/"+ featureId, data);

      }

  /**
   * Fetch all Feature List
   * @returns {Observable<any>}
   */
    getAllFeatureList() {
      return this.service.Call('get', this.base.FEATURE_LIST_URL);
    }

}
