import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { FormInfoComponent } from './form-info/form-info.component';
import { FormSignComponent } from './form-sign/form-sign.component';
import { FormClassEnabledGuard } from './../../@core/guards/form-class-enabled.guard';
import { FormDraftGuard } from './../../@core/guards/form-draft.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAddComponent } from './form-add/form-add.component';

import { Form9sComponent } from './form9s.component';
import { FormDataResolver } from '../../@core/resolve/form-data.resolver';
import { FormBaseDataResolver } from '../../@core/resolve/form-base-data.resolver';
import { SignGuard } from 'app/@core/guards/sign.guard';
import { SignFormResolver } from 'app/@core/resolve/sign-form.resolver';
import { FormAuthGuard } from 'app/@core/guards/form-info-auth.guard';
import { FormsResolver } from 'app/@core/resolve/forms.resolver';

const routes: Routes = [
  {
    path: '',
    component: Form9sComponent,
    resolve: { list: FormsResolver }
  },
  {
    path: 'add/:formClass',
    component: FormAddComponent,
    canActivate: [FormClassEnabledGuard, FormDraftGuard],
    resolve: { baseData: FormBaseDataResolver, formData: FormDataResolver },
    data: { stepType: 0 }
  },
  {
    path: 'sign/:signID',
    component: FormSignComponent,
    canActivate: [SignGuard],
    resolve: { baseData: FormBaseDataResolver, formData: FormDataResolver, signForm: SignFormResolver }
  },
  {
    path: 'info',
    component: FormInfoComponent,
    canActivate: [FormAuthGuard],
    resolve: { baseData: FormBaseDataResolver, formData: FormDataResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Form9sRoutingModule { }
