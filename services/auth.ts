import {Injectable} from '@angular/core';
import {BaseService} from './base';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Service} from './util';

// import {Service} from './util';

@Injectable()
export class AuthService {

  base: any;
  accessToken: any;

  // service: any;
  constructor(public router: Router, public http: Http, public toastr: ToastsManager) {
    this.base = new BaseService();
    // this.service = new Service( router, http, toastr );
    this.accessToken = localStorage.getItem('token');
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {any}
   */
  login(email: string, password: string): any {

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    const data = JSON.stringify({'email': email.toLowerCase(), 'password': password});

    return this.http
      .post(this.base.LOGIN_URL, data, options)
      .map(res => {
        return res.json();
      }).share();
  }

  /**
   * Get current access token
   * @returns {string}
   */
  getAccessToken() {
    return localStorage.getItem('token');
  }

  /**
   * Get new access token by using refresh token
   * @returns {Observable<any>}
   */
  refreshAccessToken() {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    const refresh_token = localStorage.getItem('refreshToken');
    const data = {'refreshToken': refresh_token};
    return this.http
      .post(this.base.GET_ACCESS_TOKEN_URL, data, options)
      .map(res => {
        let result = res.json();
        localStorage.setItem('token', result.accessToken);
        //return this.accessToken = result.accessToken;
        return res.json();
      });

    // return this.service.Call('post', this.base.GET_ACCESS_TOKEN_URL, data);
  }

  /**
   * Create User Password
   * @returns {Observable<any>}
   * @param {string} password
   * @param {string} activationCode
   * @returns {string } PasswordDigest
   */
   
    createUserPassword(data) {
      return this.http.put(this.base.CREATE_USER_PASSWORD,data).map(res=>{
        return res.json();
     });
    }


   /**
   * Check Email validate for Forgot Password
   * @param {string} email
   * @returns {Observable<any>}
   */
    public checkEmailValidation(data) {

      const headers = new Headers({'Content-Type': 'application/json'});
      const options = new RequestOptions({headers: headers});
      const token = localStorage.getItem('token');
      data["authToken"] = token;
      return this.http
        .post(this.base.CHECK_USER_MAIL, data, options)
        .map(res => {
          let result = res.json();
          return res.json();
        });
      }


  /**
   * Get Preference data for menu
   *
   */
    public getPreferenceMenu() {
        var data={};
        const headers = new Headers({'Content-Type': 'application/json',"Authorization":"Bearer "+localStorage.getItem('token')});
        const options = new RequestOptions({headers: headers});
         return this.http
          .get(this.base.GET_PEREFERENCE_MENU,options)
          .map(res => {
            return res.json();
          }).share();

    }

}
