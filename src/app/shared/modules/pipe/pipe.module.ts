import { SortPipe } from './sort.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { ReplacePipe } from './replace.pipe';



@NgModule({
  declarations: [
    SortPipe,
    FilterPipe,
    ReplacePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortPipe,
    FilterPipe,
    ReplacePipe
  ]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
