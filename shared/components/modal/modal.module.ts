import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal.component';
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
        ModalComponent,
    ],
    exports: [ ModalComponent ]
})
export class ModalModule { }
