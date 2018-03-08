import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Common} from '../../util/common';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    loggedInUser: string;
    constructor(private translate: TranslateService, public router: Router, private common: Common) {
        this.router.events.subscribe((val) => {
            // if (val instanceof NavigationEnd && window.innerWidth <= 992) {
            //     this.toggleSidebar();
            // }
        });
    }

    ngOnInit() {
        this.loggedInUser = localStorage.getItem('loggedInUserName');
    }

}
