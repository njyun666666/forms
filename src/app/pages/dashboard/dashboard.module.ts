import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbCardModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DraftListComponent } from './draft-list/draft-list.component';
import { ApproverListComponent } from './approver-list/approver-list.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [DashboardComponent, DraftListComponent, ApproverListComponent, ApplicantListComponent],
  imports: [
    CommonModule,
    ThemeModule,
    DashboardRoutingModule,
    SharedModule,
    DataTablesModule
  ],
})
export class DashboardModule { }
