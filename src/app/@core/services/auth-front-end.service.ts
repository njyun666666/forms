import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFrontEndService {

  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) { }

  checkFrontEndLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      // 檢查cookies
      if (this.checkToken()) {
        resolve(true);
      } else {
        reject(false);
      }

    });
  }

  checkToken(): boolean {
    const token = this.tokenService.getToken();
    return token !== undefined && token != null && token.length > 0;
  }


  noAuthRedirect(): void {
    this.router.navigate(['/noauth']);
  }

}
