import { SharedMaterialModule } from './../../shared/modules/shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { NbThemeModule, NbCardModule, NbSpinnerModule } from '@nebular/theme';
import { OrgAddDeptComponent } from './org-add-dept/org-add-dept.component';
import { OrgEditUserStructComponent } from './org-add-user/org-edit-user-struct/org-edit-user-struct.component';
import { OrgAddUserComponent } from './org-add-user/org-add-user.component';
import { OrgPickerModule } from '../../shared/modules/org-picker/org-picker.module';
import { OrgAddDeptFormComponent } from './org-add-dept/org-add-dept-form/org-add-dept-form.component';
import { OrgAddUserFormComponent } from './org-add-user/org-add-user-form/org-add-user-form.component';
import { OrgEditUserFormComponent } from './org-add-user/org-edit-user-form/org-edit-user-form.component';
import { OrgDeptComponent } from './org-dept/org-dept.component';
import { OrgUserComponent } from './org-user/org-user.component';
import { OrgDeptLevelComponent } from './org-dept-level/org-dept-level.component';
import { OrgTitleComponent } from './org-title/org-title.component';
import { DataTablesModule } from 'angular-datatables';
import { OrgDeptLevelFormComponent } from './org-dept-level/org-dept-level-form/org-dept-level-form.component';
import { OrgTitleFormComponent } from './org-title/org-title-form/org-title-form.component';
import { OrgUserEditComponent } from './org-user/org-user-edit/org-user-edit.component';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrgAddDeptComponent,
    OrgEditUserStructComponent,
    OrgAddUserComponent,
    OrgAddDeptFormComponent,
    OrgAddUserFormComponent,
    OrgEditUserFormComponent,
    OrgDeptComponent,
    OrgUserComponent,
    OrgDeptLevelComponent,
    OrgTitleComponent,
    OrgDeptLevelFormComponent,
    OrgTitleFormComponent,
    OrgUserEditComponent,
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    NbThemeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NbCardModule,
    NbSpinnerModule,
    OrgPickerModule,
    DataTablesModule,
  ]
})
export class OrganizationModule { }
