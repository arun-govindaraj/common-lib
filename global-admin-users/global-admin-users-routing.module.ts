import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GlobalAdminUsersComponent } from './global-admin-users.component';
import { AuthGuard } from '../shared/guard/auth.guard';
// import { GridModule } from '../../shared/components';
const routes: Routes = [
     {
       path: '',
       component: GlobalAdminUsersComponent,
       // children: [{
       //   path: "adminUser",
       //   loadChildren: "../admin-user/admin-user.module#AdminUserModule",
       //   canActivate: [AuthGuard],
       //   data: {
       //     breadcrumbs: true,
       //     text: "Admin users"
       //   }
       // }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class GlobalAdminUsersRoutingModule { }
