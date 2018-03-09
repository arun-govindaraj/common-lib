import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from './feature-list.component';
import { AuthGuard } from '../shared/guard/auth.guard';
const routes: Routes = [
     {
       path: '',
       component: FeatureListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FeatureListRoutingModule { }
