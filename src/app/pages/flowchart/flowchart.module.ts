import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowchartComponent } from './flowchart.component';
import { FlowchartRoutingModule } from './flowchart-routing.module';
import { FlowchartDialogComponent } from './flowchart-dialog/flowchart-dialog.component';


@NgModule({
  declarations: [
    FlowchartComponent,
    FlowchartDialogComponent
  ],
  imports: [
    CommonModule,
    FlowchartRoutingModule,
    SharedModule
  ],
  exports: [
    FlowchartDialogComponent
  ]
})
export class FlowchartModule { }
