import { RedirectService } from './redirect.service';
import { ResponseModel } from 'app/@core/models/response.model';
import { TokenService } from './token.service';
import { ResponseCode } from './../Enum/response-code.enum';
import { Injectable } from '@angular/core';
import { Params, Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { ApiService } from './api.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ChangeUserModel, LoginModel, LoginViewModel, ResetPwModel } from '../models/auth/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  redirectUrlPara: Params;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private tokenService: TokenService,
    private redirectService: RedirectService,
    private route: ActivatedRoute
  ) { }

  /**
   * 登入
   */
  login(data: LoginModel): Observable<ResponseModel<LoginViewModel>> {
    return this.apiService.post('Login/Login', data);
  }

  changeUser(data: ChangeUserModel): Observable<ResponseModel<LoginViewModel>> {
    return this.apiService.post('Login/ChangeUser', data);
  }

  afterLogin(data: LoginViewModel, gohome?: boolean) {

    // set token
    this.tokenService.saveToken(data.token);
    this.tokenService.saveInfo(data.infoJsonString);

    const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');

    if (gohome) {
      location.href = '/';
    }
    else if (redirectUrl) {
      this.router.navigateByUrl(redirectUrl);

    } else {
      this.router.navigate(['/']);
    }


  }


  getUserInfo(): Observable<LoginViewModel> {
    return this.apiService.post('Login/GetInfo');
  }


  /**
   * 登出
   */
  logout(): void {
    this.tokenService.destroyToken();
    this.tokenService.destroyInfo();
    this.router.navigate(['/auth/login']);
  }

  resetPw(data: ResetPwModel): Observable<ResponseModel<any>> {
    console.log('resetPw');
    return this.apiService.post('Login/ResetPw', data);
  }



  authcheck(url: string, queryParams: Params): Promise<boolean> {

    return new Promise((resolve, reject) => {

      // console.log(url);
      // console.log(queryParams);

      let result = false;
      const api = 'Auth/Check';


      // test
      // if (!this.temp && url === '/pages/dashboard/d2') {
      //   api = 'Auth/CheckFalse';
      // }




      const params = { url, queryParams };

      this.apiService.post(api, params).toPromise().then((res) => {

        // console.log('auth check res =');
        // console.log(res);

        result = res.code === 1 ? true : false;

        // console.log('authcheck url=' + url + ' code=' + res.code);


        // no login
        switch (res.code) {

          case ResponseCode.success:
            break;

          case ResponseCode.login_fail:
            this.redirectService.noLoginRedirect(url);
            break;

          default:
            this.redirectService.noAuthRedirect();
            break;
        }

        // console.log(result);
        // return result;

        if (result) {
          resolve(true);
        } else {
          reject(false);
        }


      }).catch(() => {
        console.log('---- auth service -- call api catch');
        reject(false);
      });

      // return false;
    });

  }



}
