import { RedirectService } from './../services/redirect.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFrontEndService } from '../services/auth-front-end.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private authFrontEndService: AuthFrontEndService,
    private redirectService: RedirectService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve, reject) => {


      // 檢查前端登入
      this.authFrontEndService.checkFrontEndLogin().then((check) => {

        if (check) {
          resolve(true);

        } else {
          this.redirectService.noLoginRedirect(state.url);
          reject(false);
        }


      }).catch(() => {
        console.log('----------canActivate checkFrontEndLogin catch  reject', false);
        this.redirectService.noLoginRedirect(state.url);
        reject(false);
      });


    });

  }


}
