import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { AuthFrontEndService } from './../services/auth-front-end.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authFrontEndService: AuthFrontEndService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 不是後端API不檢查
    if (request.url.indexOf(environment.apiUrl) !== 0) {
      return next.handle(request);
    }

    return from(this.checkLogin(request.url)).pipe(
      switchMap(check => {
        // console.log(check);

        // console.log('10--------AuthInterceptor------', check);

        if (!check) {
          this.router.navigate(['/auth/logout']);
        } else {

          return next.handle(request);
        }

      }));


  }

  /**
  * 檢查登入
  *
  * @private
  * @param {string} url
  * @returns {Promise<boolean>}
  * @memberof ApiService
  */
  private async checkLogin(url: string): Promise<boolean> {

    // console.log('--------api------checkLogin - ' + url, url.indexOf('Login/Login'));

    // api/Login/????? 不檢查
    if (url.indexOf(environment.apiUrl + 'Login') === 0) {
      return true;
    }

    // console.log('0--------AuthInterceptor------checkLogin');

    let check = false;

    const checkPromise = this.authFrontEndService.checkFrontEndLogin().then(() => {
      // console.log('1--------AuthInterceptor------checkLogin', true);
      // resolve(true);

      check = true;

    }).catch(() => {
      // console.log('1--------AuthInterceptor------checkLogin', false);
      this.router.navigate(['/auth/logout']);
      // reject(false);
      check = false;
    });


    await Promise.all([checkPromise]);

    // console.log('9--------AuthInterceptor------checkLogin', check);


    return check;
  }

}
