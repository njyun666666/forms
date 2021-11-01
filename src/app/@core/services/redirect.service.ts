import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(
    private router: Router
  ) { }


  noLoginRedirect(url?: string): void {

    const extras: NavigationExtras = {
      queryParams: {
        redirectUrl: url
      }
    }

    this.router.navigate(['/auth/login'], extras);
  }


  noAuthRedirect(message?: string): void {
    const extras: NavigationExtras = {
      queryParams: {
        message: message ? message : '權限不足'
      }
    }
    this.router.navigate(['/error'], extras);
  }



  goBack(): void {
    this.router.navigate(['']);

    // if (window.history.length > 1) {
    //   this.location.back()
    // } else {
    //   this.router.navigate(['/home']);
    // }
  }


}
