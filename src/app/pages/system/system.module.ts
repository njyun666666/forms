import { PipeModule } from './../../shared/modules/pipe/pipe.module';
import { NbSpinnerModule } from '@nebular/theme';
import { OrgPickerModule } from './../../shared/modules/org-picker/org-picker.module';
import { SharedMaterialModule } from './../../shared/modules/shared-material/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';

import { SystemRoutingModule } from './system-routing.module';

import { DataTablesModule } from "angular-datatables";
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuAddDialogComponent } from './menu-list/dialog/menu-add-dialog/menu-add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuUpdateDialogComponent } from './menu-list/dialog/menu-update-dialog/menu-update-dialog.component';
import { MenuTypeComponent } from './menu-type/menu-type.component';
import { MenuTypeAddDialogComponent } from './menu-type/dialog/menu-type-add-dialog/menu-type-add-dialog.component';
import { MenuTypeUpdateDialogComponent } from './menu-type/dialog/menu-type-update-dialog/menu-type-update-dialog.component';
import { AuthManagementComponent } from './auth-management/auth-management.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameAddDialogComponent } from './game-info/game-add-dialog/game-add-dialog.component';

@NgModule({
  declarations: [
    SystemComponent,
    MenuListComponent,
    MenuAddDialogComponent,
    MenuUpdateDialogComponent,
    MenuTypeComponent,
    MenuTypeAddDialogComponent,
    MenuTypeUpdateDialogComponent,
    AuthManagementComponent,
    GameInfoComponent,
    GameAddDialogComponent
  ],
  imports: [
    DataTablesModule,
    CommonModule,
    SystemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    OrgPickerModule,
    NbSpinnerModule,
    PipeModule
  ]
})
export class SystemModule { }
