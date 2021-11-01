import { FormAuthService } from './../../@core/services/form9s/form-auth.service';
import { Component, OnInit } from '@angular/core';
import { OrgPickerAccountInfo } from 'app/@core/models/organization/org-account-info';
import { FormAuthEditModel, FormAuthStatusModel, FormAuthViewModel, FormSettingAuthViewModel } from 'app/@core/models/form9s/form-auth.model';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';
import { ToastrService } from 'app/@core/services/toastr.service';

@Component({
  selector: 'ngx-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss']
})
export class FormAuthComponent implements OnInit {

  uid: string;
  name: string;
  list: FormAuthViewModel[] = [];


  constructor(
    private formAuthService: FormAuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

  }




  orgEmitter(event: OrgPickerAccountInfo) {

    if (event) {
      this.name = event.name;
      this.uid = event.uid;
      this.getFormAuthSetting(event.uid);
    }

  }



  getFormAuthSetting(uid: string) {
    this.formAuthService.formAuthSetting({ uid: uid }).subscribe((data) => {
      this.list = data;
    });
  }

  update(event, form: FormSettingAuthViewModel, auth: FormAuthStatusModel) {
    // console.log(`event=${event}, formClass=${formClass}, authType=${authType}`);

    const editModel: FormAuthEditModel = {
      uid: this.uid,
      formClass: form.formClass,
      authType: auth.authType,
      status: event ? 1 : 0
    };

    this.formAuthService.formAuthEdit(editModel).subscribe((data) => {

      if (data.code === ResponseCode.success) {

        this.toastrService.show(`${form.formName} ${auth.typeName}`, '修改成功', { status: 'success' });

      } else {
        this.toastrService.show(`${form.formName} ${auth.typeName}`, '修改失敗', { status: 'danger' });
      }

    });

  }

}
