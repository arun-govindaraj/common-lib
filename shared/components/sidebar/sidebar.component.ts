import {Component, OnInit, Directive} from '@angular/core';
import {Router, NavigationEnd, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../services/auth';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers:[AuthService]
})
@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})
export class SidebarComponent implements OnInit {

    sideMenu: object;
    urlmatching: string;
    activemenu: string;

    constructor(public router: Router,
                private auth: AuthService,
                private toastr: ToastsManager) {
        // this.sideMenu = preference['admin'];
        this.urlmatching = this.router.url.replace('/','');
        this.activemenu = localStorage.getItem('activeMenu');
    }

    ngOnInit() {
      this.getPreferenceMenu();
    }

    getPreferenceMenu(){
      this.auth.getPreferenceMenu().subscribe(
      response => {
        this.sideMenu = response['admin'];
      },
      err => {

        if (err.status === 401) {
          this.auth.refreshAccessToken().subscribe(
            res => {
              this.getPreferenceMenu();
            });
        }else {
          this.toastr.error('ERROR!', err);
        }

      }
      );
    }
}

