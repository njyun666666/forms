import { RouterModule, Routes, CanActivateChild, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { AuthGuard } from '../@core/guards/auth.guard';
import { LoginGuard } from '../@core/guards/login.guard';
import { CheckInfoGuard } from 'app/@core/guards/check-info.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [LoginGuard],
  canActivateChild: [CheckInfoGuard],
  children: [
    {
      path: 'dashboard',
      // canActivateChild: [AuthGuard],
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule)
    },
    {
      path: 'form',
      loadChildren: () => import('./form9s/form9s.module')
        .then(m => m.Form9sModule)
    },
    {
      path: 'flowchart',
      loadChildren: () => import('./flowchart/flowchart.module')
        .then(m => m.FlowchartModule)
    },
    {
      path: 'search',
      loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
    },
    {
      path: 'form-auth',
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./form-auth/form-auth.module').then(m => m.FormAuthModule)
    },
    {
      path: 'system',
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./system/system.module')
        .then(m => m.SystemModule)
    },
    {
      path: 'organization',
      canActivateChild: [AuthGuard],
      loadChildren: () => import('./organization/organization.module')
        .then(m => m.OrganizationModule)
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'error',
      loadChildren: () => import('./other-page/error/error.module').then(m => m.ErrorModule)
    },
    {
      path: 'emply',
      loadChildren: () => import('./other-page/emply/emply.module').then(m => m.EmplyModule)
    },
    {
      path: '**',
      loadChildren: () => import('./other-page/not-found/not-found.module').then(m => m.NotFoundModule)
    },
  ],
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
