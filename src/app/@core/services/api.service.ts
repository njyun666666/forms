import { RedirectService } from './redirect.service';
import { ResponseModel } from 'app/@core/models/response.model';
import { environment } from './../../../environments/environment';
import { ResponseCode } from './../Enum/response-code.enum';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthFrontEndService } from './auth-front-end.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(
    private http: HttpClient,
    private router: Router,
    private authFrontEndService: AuthFrontEndService,
    private redirectService: RedirectService
  ) { }

  get(url: string, optionParams?: { [param: string]: any }, optionHeader?: { [header: string]: string })
    : Observable<any> {


    const headers: HttpHeaders = new HttpHeaders(optionHeader);
    // headers = this.setHeader(headers);


    const httpOptions = {
      headers,
      params: new HttpParams({ fromObject: optionParams }),
      // withCredentials: true // set cookies
    };



    return this.http.get(environment.apiUrl + url, httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(data => {
          this.checkCode(url, data?.code);
        })
      );

  }




  post(url: string, optionParams?: { [param: string]: any } | FormData, optionHeader?: { [header: string]: string })
    : Observable<any> {



    const headers: HttpHeaders = new HttpHeaders(optionHeader);
    // headers = this.setHeader(headers);

    const httpOptions = {
      headers,
      // withCredentials: true // set cookies
    };

    return this.http.post(environment.apiUrl + url, optionParams, httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(data => {
          this.checkCode(url, data);
        })
      );

  }






  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //  A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      //  The backend returned an unsuccessful response code.
      //  The response body may contain clues as to what went wrong,
      console.error(error);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:\n${error.error}`);

    }

    // alert(`Backend returned code ${error.status}`);

    //  return an observable with a user-facing error message
    return throwError(
      `Backend returned code ${error.status}`);
  }



  /**
   * 後端api callback
   *
   * @param {*} url
   * @param {*} data
   * @memberof ApiService
   */
  checkCode(url, data: ResponseModel<any>) {

    // 檢查token
    if (data?.code === ResponseCode.login_fail) {

      // 非登入頁就轉走
      if (this.router.url !== '/auth/login') {
        console.warn('token check fail');
        this.router.navigate(['/auth/logout']);
      }

    } else if (data?.code === ResponseCode.no_auth) {
      console.warn('no auth');
      //  權限不足
      // this.authFrontEndService.noAuthRedirect();
      this.redirectService.noAuthRedirect();
    }

  }


}
