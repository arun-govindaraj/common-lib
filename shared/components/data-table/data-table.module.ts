import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataTableComponent } from './data-table.component';
import { Select2Module } from 'ng2-select2';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        Select2Module,
        FormsModule
    ],
    declarations: [
        DataTableComponent
    ],
    exports: [DataTableComponent],
    providers: []
})
export class DataTableModule { }
