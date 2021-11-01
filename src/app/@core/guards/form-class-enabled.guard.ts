import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { FormAuthService } from './../services/form9s/form-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
/**
 * 檢查表單啟用
 *
 * @export
 * @class FormClassEnabledGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})

export class FormClassEnabledGuard implements CanActivate {

  constructor(
    private formAuthService: FormAuthService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      const formClass = route.paramMap.get('formClass');

      this.formAuthService.formClassEnabled(formClass).toPromise().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    });



  }

}
