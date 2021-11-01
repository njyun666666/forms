import { FormAuthService } from './../services/form9s/form-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormAuthGuard implements CanActivate {

  constructor(
    private formAuthService: FormAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      const formID = route.queryParamMap.get('formID');

      this.formAuthService.form({ formID: formID }).toPromise().then((data) => {

        resolve(true);

      }).catch(() => {
        reject(false);
      });

    });
  }

}
