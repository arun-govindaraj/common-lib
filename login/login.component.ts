import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import {FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthService} from '../services/auth';
// import {Common} from '../shared/util/common';
import {isBoolean} from 'util';
import {lodash} from 'lodash';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    saveLogin: boolean;
    forgatPasswordForm: FormGroup;

    constructor(public router: Router, private route: ActivatedRoute,
                public http: Http,
                public toastr: ToastsManager,
                private auth: AuthService,
                // private common: Common,
                private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        if (localStorage.getItem('saveLogin')) {
            this.email = localStorage.getItem('loggedInUserEmail');
            this.saveLogin = true;
        }

         this.forgatPasswordForm = this.formBuilder.group({
            Email: [null, Validators.required]

        });
    }

    handleCustomcheckBox(e) {
      if(e.target.checked == undefined){
        this.saveLogin = e.target.children[0].checked;
      }else{
        this.saveLogin = e.target.checked;
      }
    }

    setLoginCookie(name, value, expiration) {
      const now = new Date();
      let time = now.getTime();
      time += expiration;
      now.setTime(time);
      document.cookie =
          '' + name + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
  }

  /**
   * Login with user credentials
    */
  onLoggedin() {
        this.auth.login(this.email, this.password).subscribe(
            response => {
                this.setLoginCookie('isLoggedin', true, (1000 * 60 * 60 * 24 * 7 ));
                localStorage.setItem('loggedInUserName', response.username);
                localStorage.setItem('token', response.token);
                localStorage.setItem('refreshToken', response.refresh_token);
                localStorage.setItem('loggedInUserEmail', this.email.toLowerCase());
                localStorage.setItem('organizationId', response.organizationId);
                localStorage.setItem('roleId', response.roleid);
                if (this.saveLogin) {
                    localStorage.setItem('saveLogin', 'true');
                } else {
                    localStorage.removeItem('saveLogin');
                }
                location.href = "/globalAdminUsers";
                //debugger;
                //this.router.navigate(['']);

            },
            err => {
                var message =JSON.parse(err._body).message;

                this.toastr.error('ERROR!', message);
            }
        );
    }

    forgotPassword(ev){

            if(ev.target.parentElement.classList.contains('login-form')){
                ev.target.parentElement.nextElementSibling.classList.add('active');
                ev.target.parentElement.classList.add('inactive');

            }else{

                 ev.target.parentElement.parentElement.classList.remove('active');
                 ev.target.parentElement.parentElement.previousElementSibling.classList.remove('inactive')

            }


    }


    onForgotPassword(){
       var data = this.forgatPasswordForm.value;
       if (this.forgatPasswordForm.valid) {
        return this.auth.checkEmailValidation(data).subscribe(
            response => {
                if (response) {
                   this.toastr.success("Email has been sent");
                }
            },err => {
              if (err.status === 401) {
               this.toastr.error('ERROR!', err);

              }else {
                this.toastr.error('Invalid Email');
              }
            }
        );
       }
       else{
        this.validateAllFormFields(this.forgatPasswordForm);

       }


    }


    /**
   * Validating form
   * @param {FormGroup} formGroup
   */
   validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
