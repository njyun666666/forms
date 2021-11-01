import { FormAuthService } from './../services/form9s/form-auth.service';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
/**
 * 檢查草稿權限
 *
 * @export
 * @class FormDraftGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class FormDraftGuard implements CanActivate {

  constructor(
    private formAuthService: FormAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve, reject) => {

      const formID = route.queryParamMap.get('formID');

      if (formID === undefined || formID === null) {
        resolve(true);
      } else {


        this.formAuthService.draft({ formID: formID }).toPromise().then((data) => {

          resolve(true);

        }).catch(() => {
          reject(false);
        });
      }

    });

  }



}
