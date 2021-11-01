import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInfoGuard implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const expiresDate = new Date(2021, 9, 13);
    const info = this.tokenService.getInfo();

    // console.log(dayjs(info.date));

    if (info && info.date !== undefined && dayjs(info.date).isValid() && dayjs(info.date).isAfter(expiresDate)) {
      return true;
    }

    return new Promise((resolve, reject) => {
      this.authService.getUserInfo().toPromise().then((data) => {
        // console.log('CheckInfoGuard', data);
        this.tokenService.saveInfo(data.infoJsonString);
        resolve(true);
      }).catch(() => { reject(false); });
    });

  }

}
