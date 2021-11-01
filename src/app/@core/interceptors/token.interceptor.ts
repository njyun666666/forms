import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // 不是後端API不檢查
    if (request.url.indexOf(environment.apiUrl) !== 0) {
      return next.handle(request);
    }

    const token = this.tokenService.getToken();
    let newRequest = request.clone();

    if (token) {
      newRequest = newRequest.clone({ setHeaders: { token: token } });
    }

    return next.handle(newRequest);
  }
}
