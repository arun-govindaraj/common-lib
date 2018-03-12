import { Component, OnInit, Directive, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Common} from '../../util/common';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthService} from '../../../services/auth';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers:[AuthService]
})
@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})
export class HeaderComponent implements OnInit {

    loggedInUser: string;
    mainmenu: object;
    urlmatching: string;
    isDataAvailable: boolean;
    activeParent: boolean;
    subMenu:object;
    selected :any;

    // @Input()
    // menuData: any ;
    // @Output()
    // menuValues: EventEmitter<any> = new EventEmitter() ;

    constructor(private translate: TranslateService, public router: Router,
     private common: Common,private auth: AuthService,private toastr: ToastsManager) {
        this.router.events.subscribe((val) => {
            // if (val instanceof NavigationEnd, RouterLinkActive && window.innerWidth <= 992) {
            //     this.toggleSidebar();
            // }
        });
        if(localStorage.getItem('activeMenu')==''||localStorage.getItem('activeMenu')==undefined){
          localStorage.setItem('activeMenu','globaloperations');
          localStorage.setItem('activeMenuText','Global Operations');
        }
    }

    ngOnInit() {
        this.loggedInUser = localStorage.getItem('loggedInUserName');
        // this.mainmenu = preference['admin'];
        this.getPreferenceMenu();
        this.urlmatching = this.router.url.replace('/','');
    }

    myFunction(){
      document.getElementById("myDropdown").classList.toggle("show");
      //document.getElementById("myDropdown1").classList.toggle("show");
    }

    onLoggedout(v) {
      if(v=="logout"){
        const dom: any = document.querySelector('body');
        if (Array.from(dom.classList).indexOf('page-sidebar-closed') !== -1) {
            dom.classList.remove('page-sidebar-closed');
        }
        this.common.deleteCookie('isLoggedin');
        this.router.navigate(['/login']);
      }
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    activeMenu(menu){
      localStorage.setItem('activeMenu',menu.srcElement.title);
      localStorage.setItem('activeMenuText',menu.srcElement.text);
      // this.router.config[0]._loadedConfig.routes[0].data.text = menu.srcElement.text;
    }

    getPreferenceMenu(){
        this.auth.getPreferenceMenu().subscribe(
        response => {
          this.mainmenu=response["admin"];
          this.subMenu = response["admin"][4].submenu;
          this.isDataAvailable = true;
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


    isActive(position) {
      return this.selected === position;
    };


    loadChildMenu(position){

        this.selected = position;
        this.subMenu = this.mainmenu[position].submenu;
    }


}

