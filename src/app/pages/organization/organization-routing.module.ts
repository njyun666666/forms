import { OrgTitleComponent } from './org-title/org-title.component';
import { OrgDeptLevelComponent } from './org-dept-level/org-dept-level.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared/modules/shared-material/shared-material.module';
import { OrgDeptComponent } from './org-dept/org-dept.component';

import { OrganizationComponent } from './organization.component';
import { OrgUserComponent } from './org-user/org-user.component';
import { OrgUserEditComponent } from './org-user/org-user-edit/org-user-edit.component';

const routes: Routes = [

  { path: 'tree', component: OrganizationComponent },
  { path: 'dept', component: OrgDeptComponent },
  { path: 'user', component: OrgUserComponent },
  { path: 'useredit', component: OrgUserEditComponent },
  { path: 'deptlevel', component: OrgDeptLevelComponent },
  { path: 'title', component: OrgTitleComponent },
  { path: '', redirectTo: 'tree' },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedMaterialModule
  ],
  exports: [
    RouterModule,
    SharedMaterialModule
  ]
})
export class OrganizationRoutingModule { }
