import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'app/@core/services/token.service';
import { AuthService } from '../../@core/services/auth.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,

  ) { }

  ngOnInit(): void {
    // this.authService.logout();
    this.tokenService.destroyToken();
    this.tokenService.destroyInfo();
    this.router.navigate(['/auth/login']);
  }

}
