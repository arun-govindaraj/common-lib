import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import {Common} from '../../shared/util/common';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private common: Common, private toastr: ToastsManager) { }

    canActivate() {
        if (this.common.getCookie('isLoggedin')) {
            return true;
        } else {
            const dom: any = document.querySelector('body');
            if (Array.from(dom.classList).indexOf('page-sidebar-closed') !== -1) {
                dom.classList.remove('page-sidebar-closed');
            }
            //this.toastr.error('Login Expired !', 'Please login again.');
            this.router.navigate(['/login']);
            return false;
        }
    }
}
