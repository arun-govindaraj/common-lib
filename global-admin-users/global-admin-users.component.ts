import {Component, OnInit, Input, Inject, ViewChild, OnDestroy, Directive, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {AuthService} from '../services/auth';
import { GlobalAdminUsersService } from '../services/global-admin-users.service';

import 'jquery';
import 'datatables.net';
declare var $: any;

@Component({
  selector: 'app-global-admin-users',
  templateUrl: './global-admin-users.component.html',
  styleUrls: ['./global-admin-users.component.css']
})
@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})

export class GlobalAdminUsersComponent implements OnInit {
  constructor(
    private GlobalAdminUsersService: GlobalAdminUsersService,
    private AuthService: AuthService,
    public router: Router,
    public toastr: ToastsManager,
    private formBuilder: FormBuilder,
    private http: Http
  ) {}

  gridData: any;
  userDetails: any;
  userId: any;
  tableWidget: any;
  isDataAvailable: boolean;
  pgChange: boolean;
  removeAdminUsers: any;
  headers: any =[
      {"key": '1',"title": '',"data":'id',"isFilterRequired": false,"isCheckbox": true},
      {"key": '2',"title": 'Name',"data":'Name',"isFilterRequired": true, "isCheckbox": false},
      {"key": '3',"title": 'Email',"data":'Email',"isFilterRequired": true,"editButton":true,"isCheckbox": false},
      {"key": '4',"title": 'Phone',"data":'Phone',"isFilterRequired": true,"isCheckbox": false},
      {"key": '5',"title": 'Address',"data":'Address',"isFilterRequired": true,"isCheckbox": false}
  ];
  options: any = {
    "searchCol": true,
    "searchGlobal": false,
    "download": true,
    "colVisibility": true,
    "pagination": true,
    "ordering": true,
    "tableInfo": false,
    "showEntries": true,
    "edit": true,
    "delete": true,
    "rowSelection": false,
    "addRow": false
  }

  ngOnInit() {
    this.gridData = {};
    this.gridData['headers'] = this.headers;
    this.gridData['options'] = this.options;
    this.getGlobalAdminUsers();
    this.pgChange = true;
  }

  refreshData(event) {
    if(event.functionRef=="editRow"){
      this.editAdminUsers(event.edit.id,event.edit);
    }else if(event.functionRef=="removeRow"){
      this.removeAdminUsers = event.remove;
    }
    // return event;
  }

  pgContentChange(){
    this.pgChange = false;
  }

  /**
   * Fetch All Admin Users
   */
  getGlobalAdminUsers() {
    var comThis = this;
    comThis.isDataAvailable = false;
    return this.GlobalAdminUsersService.getAllUsers().subscribe(
      response => {
        if (response) {
          const result = [];
          response.Users.forEach(function(value, i) {
            const gridDataObj = {};
            if(value.StatusId==1){
              gridDataObj['id'] = value.UserId;
              gridDataObj['Name'] = value.FirstName+" "+value.LastName;
              gridDataObj['Email'] = value.Email;
              gridDataObj['Phone'] = value.MobilePhone;
              var add = value.Address1!=""?value.Address1+", ":"";
              add += value.Address2!=""?value.Address2+", ":"";
              add += value.City!=""?value.City+", ":"";
              add += value.State!=""?value.State+", ":"";
              add += value.CountryCode!=""?value.CountryCode:"";
              gridDataObj['Address'] = add;
              result.push(gridDataObj);
            }
          });
          comThis.gridData['result'] = result.reverse();
          comThis.isDataAvailable = true;
        }
      },
      err => {
        if (err.status === 401) {
          this.AuthService.refreshAccessToken().subscribe(res => {
            this.getGlobalAdminUsers();
          });
        } else if (err.status === 403) {
          this.toastr.error('ERROR!', 'Permission Denied');
          this.router.navigate(['./globalAdminUsers']);
        } else {
          this.toastr.error('ERROR!', err);
        }
      }
    );
  }

  /**
   * Edit User Details from User ID
   * @param userId
   * @param UserDetail
   */
  editAdminUsers(userId, UserDetail) {
    // UserDetail = {
    //                "FirstName": "Gobinath",
    //                "Email": "gobi@gmail.com",
    //                "MobilePhone": "9876541230",
    //                "Address1": "Test address"
    //              }

    return this.GlobalAdminUsersService.updateUser(
      userId,
      UserDetail
    ).subscribe(
      response => {
        if (response) {
          this.toastr.success(`Record updated successfully.`);
          return response;
        }
      },
      err => {
        this.toastr.error('ERROR!', 'Permission Denied');
        if (err.status === 401) {
          this.AuthService.refreshAccessToken().subscribe(res => {
            this.editAdminUsers(this.userId, this.userDetails);
          });
        } else if (err.status === 403) {
          this.toastr.error('ERROR!', 'Permission Denied');
          this.router.navigate(['./globalAdminUsers']);
        }
      }
    );
  }

  handleDelete(){
    // console.log(this.removeAdminUsers);
    let userId = this.removeAdminUsers[0].id;
    let status = {
                   "StatusId": 2
                  }
    let comThis = this;
    return this.GlobalAdminUsersService.removeUser(
      userId,
      status
    ).subscribe(
      response => {
        if (response) {
          this.toastr.success(`Record updated successfully.`);
          comThis.getGlobalAdminUsers();
          // return response;
        }
      },
      err => {
        this.toastr.error('ERROR!', 'Permission Denied');
        if (err.status === 401) {
          this.AuthService.refreshAccessToken().subscribe(res => {
            this.editAdminUsers(this.userId, this.userDetails);
          });
        } else if (err.status === 403) {
          this.toastr.error('ERROR!', 'Permission Denied');
          this.router.navigate(['./globalAdminUsers']);
        }
      }
    );
  }
}
