import {Component, OnInit, Input, Inject, ViewChild, OnDestroy, Directive, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http, Headers} from '@angular/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

import {AuthService} from '../services/auth';
import { FeatureListService } from '../services/feature-list.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.scss']
})
@Directive({
    selector: '[routerLinkActive]',
    exportAs: 'routerLinkActive'
})

export class FeatureListComponent implements OnInit {

  constructor(private FeatureListService: FeatureListService,
    private AuthService: AuthService,
    public router: Router,
    public toastr: ToastsManager,
    private formBuilder: FormBuilder,
    private http: Http,
    private _loadingBar: SlimLoadingBarService){}

  gridData: any;
  isDataAvailable: boolean;
  headers: any =[
      {"key": '1',"title": '',"data":'id',"isFilterRequired": false, "class":"hidden"},
      {"key": '2',"title": 'Feature',"data":'Feature',"isFilterRequired": true, "editButton":false,"width":"auto"},
      {"key": '3',"title": 'Descritpion',"data":'Descritpion',"isFilterRequired": true,},
      {"key": '4',"title": 'Feature Code',"data":'Feature Code',"isFilterRequired": true,},
      {"key": '5',"title": 'Status',"data":'Status',"isFilterRequired": false,"onchange":true,"ref":"id","width":"100px"}
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
  // @Input()
  // onDataTable : EventEmitter<any> = new EventEmitter() ;

  ngOnInit() {
    this.gridData = {};
    this.gridData['headers'] = this.headers;
    this.gridData['options'] = this.options;
    this.getAllFeatureList();
  }

  refreshData(event) {
    console.log('Name: ' + event.id );
    if(event.functionRef === "onchange"){
      this.putChangeActiveInactive(event);
    }
  }

 //Get All available Feature List
  getAllFeatureList() {
    var comThis = this;
    this.isDataAvailable = false;
    comThis._loadingBar.start();
    return this.FeatureListService.getAllFeatureList().subscribe(
      response => {
        if (response) {
          const result = [];
          response.Features.forEach(function(value, i) {
              const gridDataObj = {};
              gridDataObj['id'] = value.FeatureId;
              gridDataObj['Feature'] = value.Feature;
              gridDataObj['Descritpion'] = value.Description;
              gridDataObj['Feature Code'] = value.FeatureCode;
              gridDataObj['Status'] = value.StatusId == 1? true: false;
              result.push(gridDataObj);
          });
          comThis.gridData['result'] = result.reverse();
          comThis.isDataAvailable = true;
          comThis._loadingBar.complete();
        }
      },
      err => {
        if (err.status === 401) {
          this.AuthService.refreshAccessToken().subscribe(res => {
          this.getAllFeatureList();

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

  putChangeActiveInactive(event) {
    var comThis = this;
    var statusPayload = {};
    statusPayload["StatusId"] = event.status?1:2;
    return this.FeatureListService.updateFeature(event.id, statusPayload).subscribe(
      response => {
        debugger;
        if (response) {
          debugger;
          if(response.status === 200){
            this.toastr.success("Status Updated SuccessFully!");
            comThis.getAllFeatureList();
          }

        }
      },
      err => {
        if (err.status === 401) {
          this.AuthService.refreshAccessToken().subscribe(res => {
            this.getAllFeatureList();
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

}
