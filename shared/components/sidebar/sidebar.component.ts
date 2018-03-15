import {Component, OnInit, Directive} from '@angular/core';
import {Router, NavigationEnd, RouterLinkActive} from '@angular/router';
import * as preference from '../../../../localService/preference.json';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})
export class SidebarComponent implements OnInit {

    sideMenu: object;
    urlmatching: string;
    activemenu: string;

    constructor(public router: Router) {
        this.sideMenu = preference['admin'];
        this.urlmatching = this.router.url.replace('/','');
        this.activemenu = localStorage.getItem('activeMenu');
    }

    ngOnInit() {
    }

}
