import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureListRoutingModule } from './feature-list-routing.module';
import { FeatureListComponent } from './feature-list.component';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseService } from '../services/base';
import { AuthService } from '../services/auth';
import { DataTableModule} from '../shared/components';
import { FeatureListService } from '../services/feature-list.service';
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";

@NgModule({
  imports: [
    CommonModule,
    FeatureListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [FeatureListComponent],
  exports: [FeatureListComponent],
  providers: [ FeatureListService,AuthService, BaseService ]
})
export class FeatureListModule {
  static forRoot() {
    return {
      ngModule: FeatureListModule
    }
  }
 }
