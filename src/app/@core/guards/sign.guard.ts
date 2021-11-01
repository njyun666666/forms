import { FormAuthService } from './../services/form9s/form-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignGuard implements CanActivate {

  constructor(
    private formAuthService: FormAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      const signid = Number(route.paramMap.get('signID'));
      const formID = route.queryParamMap.get('formID');

      this.formAuthService.sign({ id: signid, formID: formID }).toPromise().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });


    });
  }

}
