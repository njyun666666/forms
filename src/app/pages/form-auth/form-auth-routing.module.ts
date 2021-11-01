import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAuthComponent } from './form-auth.component';

const routes: Routes = [{ path: '', component: FormAuthComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormAuthRoutingModule { }
