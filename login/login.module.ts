import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }
