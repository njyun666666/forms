import { environment } from 'environments/environment';
import { DialogService } from './../../@core/services/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from './../../@core/services/token.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {



  isLogin: boolean = false;
  isSubmitResetPw: boolean = false;
  isResetPw: boolean = false;
  loginMessage: string = null;



  form: FormGroup = this.fb.group({
    account: ['demo', [Validators.required]],
    password: [environment.password, [Validators.required]],
  });


  resetPWForm: FormGroup = this.fb.group({
    account: ['demo', [Validators.required]],
  });


  get account() {
    return this.form.get('account') as FormControl;
  }


  get password() {
    return this.form.get('password') as FormControl;
  }


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }


  ngOnInit(): void {
    this.isLogin = false;
    this.loginMessage = null;
  }

  ngOnDestroy(): void {
  }

  onSubmit(form: FormGroup) {
    // console.log(form.value);

    if (form.valid) {

      this.isLogin = true;

      this.authService.login(form.value).subscribe((result) => {


        if (result.code === ResponseCode.success) {

          this.authService.afterLogin(result.data);

        } else {
          this.isLogin = false;
          this.loginMessage = result.message;
        }



      }, (error) => {
        this.isLogin = false;
      });

    }

  }


  needResetPw() {
    this.isResetPw = true;
  }

  onSubmitResetPw(form: FormGroup) {
    // console.log(form.value);

    this.authService.resetPw(form.value).subscribe((data) => {

      this.dialogService.text({ content: data.message });

    }, (error) => {

    });

  }

}
