import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ThemeModule,
    SharedModule,
    ReactiveFormsModule
  ],

})
export class AuthModule { }
