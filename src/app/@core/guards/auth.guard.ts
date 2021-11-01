import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.doCanActivate(childRoute, state);
  }


  doCanActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return new Promise((resolve, reject) => {

      const url = state.url.split('?')[0];
      const queryParams = Route.queryParams;


      this.authService.authcheck(url, queryParams).then((apiCheck) => {

        // console.log('------------apiCheck ------', apiCheck);
        resolve(apiCheck);

      }).catch(() => {
        console.log('------------apiCheck ------ catch', false);
        // this.router.navigate(['/auth/login']);
        // this.authService.noLoginRedirect(url, queryParams);
        reject(false);

      });


    });
  }


}
