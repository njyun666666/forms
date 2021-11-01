import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from './../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Form9sRoutingModule } from './form9s-routing.module';
import { Form9sComponent } from './form9s.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormAddComponent } from './form-add/form-add.component';
import { SharedMaterialModule } from '../../shared/modules/shared-material/shared-material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormButtonComponent } from './component/form-button/form-button.component';
import { FormHeaderComponent } from './component/form-header/form-header.component';
import { FormSrAddComponent } from './forms/form-sr/form-sr-add/form-sr-add.component';
import { FormSignComponent } from './form-sign/form-sign.component';
import { FormInfoComponent } from './form-info/form-info.component';
import { FormContentComponent } from './component/form-content/form-content.component';
import { NbTabsetModule } from '@nebular/theme';
import { FormSignAddComponent } from './forms/form-sign-add/form-sign-add.component';
import { FormButtonSignComponent } from './component/form-button-sign/form-button-sign.component';
import { SignLogListComponent } from './component/sign-log-list/sign-log-list.component';
import { FormResultDisplayComponent } from './component/form-result-display/form-result-display.component';


@NgModule({
  declarations: [
    Form9sComponent,
    FormSrAddComponent,
    FormAddComponent,
    FormButtonComponent,
    FormHeaderComponent,
    FormSignComponent,
    FormInfoComponent,
    FormContentComponent,
    FormSignAddComponent,
    FormButtonSignComponent,
    SignLogListComponent,
    FormResultDisplayComponent
  ],
  imports: [
    CommonModule,
    Form9sRoutingModule,
    ThemeModule,
    NbTabsetModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    CKEditorModule,
    SharedModule,
    DataTablesModule
  ]
})
export class Form9sModule { }
