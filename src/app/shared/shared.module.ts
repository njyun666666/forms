import { PipeModule } from './modules/pipe/pipe.module';
import { OrgPickerModule } from './modules/org-picker/org-picker.module';
import { DataTablesModule } from 'angular-datatables';
import { SharedNbModule } from './modules/shared-nb/shared-nb.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from './modules/shared-material/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Html5DatetimePickerComponent } from './component/html5-datetime-picker/html5-datetime-picker.component';
import { FileComponent } from './component/file/file.component';
import { DialogComponent } from './component/dialog/dialog.component';
import { DateIsNullDirective } from './directive/date-is-null.directive';
import { FileListComponent } from './component/file-list/file-list.component';
import { StepApproverComponent } from './component/step-approver/step-approver.component';
import { FormLevelLabelDirective } from './directive/form-level-label.directive';
import { SignResultLabelDirective } from './directive/sign-result-label.directive';
import { FormResultDirective } from './directive/form-result.directive';
import { DateSetDirective } from './directive/date-set.directive';



@NgModule({
  declarations: [
    Html5DatetimePickerComponent,
    FileComponent,
    DialogComponent,
    DateIsNullDirective,
    FileListComponent,
    StepApproverComponent,
    FormLevelLabelDirective,
    SignResultLabelDirective,
    FormResultDirective,
    DateSetDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedNbModule,
    DataTablesModule
  ],
  exports: [
    Html5DatetimePickerComponent,
    SharedMaterialModule,
    SharedNbModule,
    DateIsNullDirective,
    FileComponent,
    FileListComponent,
    StepApproverComponent,
    OrgPickerModule,
    FormLevelLabelDirective,
    SignResultLabelDirective,
    FormResultDirective,
    PipeModule,
    DateSetDirective
  ]
})
export class SharedModule { }
