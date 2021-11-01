import { Observable } from 'rxjs';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { FormIDModel } from '../../models/form9s/form/form-setting.model';
import { ResponseModel } from 'app/@core/models/response.model';
import { SignAuthModel } from 'app/@core/models/form9s/sign/sign-auth.model';
import { FormAuthEditModel, FormAuthSettingReqeustModel, FormAuthViewModel } from 'app/@core/models/form9s/form-auth.model';


@Injectable({
  providedIn: 'root'
})
export class FormAuthService {

  constructor(
    private apiService: ApiService
  ) { }


  /**
   * 檢查此表單啟用D
   */
  formClassEnabled(formClass: string): Observable<ResponseModel<any>> {
    return this.apiService.get(`Form/FormClassEnabled/${formClass}`);
  }

  /**
   * 檢查草稿權限
   */
  draft(data: FormIDModel): Observable<any> {
    return this.apiService.post('Form/DraftAuth', data);
  }

  /**
   * 檢查簽核權限
   */
  sign(data: SignAuthModel): Observable<ResponseModel<any>> {
    return this.apiService.post(`Form/SignAuth`, data);
  }
  /**
   * 檢查表單讀取權限
   */
  form(data: FormIDModel): Observable<ResponseModel<any>> {
    return this.apiService.post(`Form/FormAuth`, data);
  }


  formAuthSetting(data: FormAuthSettingReqeustModel): Observable<FormAuthViewModel[]> {
    return this.apiService.post('Form/FormAuthSetting', data);
  }

  formAuthEdit(data: FormAuthEditModel): Observable<ResponseModel<any>> {
    return this.apiService.post('Form/FormAuthEdit', data);
  }

}
