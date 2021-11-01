import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedMaterialModule } from '../shared/modules/shared-material/shared-material.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    SharedMaterialModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
