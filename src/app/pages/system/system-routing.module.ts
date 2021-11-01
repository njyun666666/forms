import { AuthManagementComponent } from './auth-management/auth-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuTypeComponent } from './menu-type/menu-type.component';
import { GameInfoComponent } from './game-info/game-info.component';

const routes: Routes = [
  { path: 'menuList', component: MenuListComponent },
  { path: 'menuType', component: MenuTypeComponent },
  { path: 'gameinfo', component: GameInfoComponent },
  { path: 'authmanagement', component: AuthManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
