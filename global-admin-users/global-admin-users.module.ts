import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BaseService } from '../services/base';
import { AuthService } from '../services/auth';
import { DataTableModule} from '../shared/components';
import { GlobalAdminUsersService } from '../services/global-admin-users.service';
import { GlobalAdminUsersRoutingModule } from './global-admin-users-routing.module';
import { GlobalAdminUsersComponent } from './global-admin-users.component';

@NgModule({
  imports: [
    CommonModule,
    GlobalAdminUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  declarations: [GlobalAdminUsersComponent],
  providers: [GlobalAdminUsersService, AuthService, BaseService]
})
export class GlobalAdminUsersModule { }
