import { PipeModule } from './../pipe/pipe.module';
import { SharedMaterialModule } from './../shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgPickergDeptPipe } from './pipes/org-picker-dept.pipe';
import { OrgDeptPickerComponent } from './org-dept-picker/org-dept-picker.component';
import { OrgPickerComponent } from './org-picker/org-picker.component';
import { OrgUserPickerComponent } from './org-user-picker/org-user-picker.component';
import { OrgUserPickerDialogComponent } from './org-user-picker-dialog/org-user-picker-dialog.component';
import { OrgPickerUserPipe } from './pipes/org-picker-user.pipe';



@NgModule({
  declarations: [
    OrgPickergDeptPipe,
    OrgDeptPickerComponent,
    OrgPickerComponent,
    OrgUserPickerComponent,
    OrgUserPickerDialogComponent,
    OrgPickerUserPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    PipeModule
  ],
  exports: [
    OrgPickergDeptPipe,
    OrgDeptPickerComponent,
    OrgUserPickerComponent
  ]
})
export class OrgPickerModule { }
