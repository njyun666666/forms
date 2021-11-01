import { LoadingService } from './../../../@core/services/loading.service';
import { DialogService } from './../../../@core/services/dialog.service';
import { AuthService } from './../../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrgPickerAccountInfo } from 'app/@core/models/organization/org-account-info';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';

@Component({
  selector: 'ngx-change-user',
  templateUrl: './change-user.component.html',
  styleUrls: ['./change-user.component.scss']
})
export class ChangeUserComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  }


  submit(value: OrgPickerAccountInfo) {
    console.log(value);

    if (value?.uid) {

      this.loadingService.loading$.next(true);

      this.authService.changeUser({ uid: value.uid }).subscribe((result) => {

        if (result.code === ResponseCode.success) {
          this.authService.afterLogin(result.data, true);
        } else {
          this.dialogService.text({ content: result.message });
          this.loadingService.loading$.next(false);
        }

      }, (error) => {
        this.loadingService.loading$.next(false);
      });

    }


  }

}
