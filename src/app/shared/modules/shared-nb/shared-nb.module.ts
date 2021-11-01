import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbSpinnerModule, NbTooltipModule } from '@nebular/theme';

const modules = [
  NbButtonModule,
  NbSpinnerModule,
  NbTooltipModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class SharedNbModule { }
