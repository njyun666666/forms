import { OrgPickerModule } from './../../shared/modules/org-picker/org-picker.module';
import { SharedMaterialModule } from './../../shared/modules/shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormAuthRoutingModule } from './form-auth-routing.module';
import { FormAuthComponent } from './form-auth.component';


@NgModule({
  declarations: [
    FormAuthComponent
  ],
  imports: [
    CommonModule,
    FormAuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class FormAuthModule { }
