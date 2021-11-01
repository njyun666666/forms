import { ResponseModel } from 'app/@core/models/response.model';
import { FormListModel } from '../../models/form9s/form/form-list.model';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FormIDModel, FormSettingModel } from '../../models/form9s/form/form-setting.model';
import { DraftListModel } from '../../models/form9s/draft.model';
import { ApproverInfoModel } from 'app/@core/models/form9s/approver-info.model';
import { ApplicantInfoModel } from 'app/@core/models/form9s/applicant-info-model';
import { BaseDataRequestModel, FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { SignAuthModel } from 'app/@core/models/form9s/sign/sign-auth.model';
import { GetSignOptionModel, SignOptionModel } from 'app/@core/models/form9s/sign/sign-option.model';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';
import { SignLogRequestModel, SignLogViewModel } from 'app/@core/models/form9s/sign/sign-log-view.model';
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { FormsViewModel } from 'app/@core/models/form9s/form/forms.viewmodel';

@Injectable({
  providedIn: 'root'
})
export class Form9sService {

  formSetting = new FormSettingModel();
  formSetting$ = new Subject<FormSettingModel>();



  /**刪除草稿按鈕訂閱 */
  deleteDraftBtn$ = new Subject();
  /**草稿按鈕訂閱 */
  draftBtn$ = new Subject();
  /**送出申請按鈕訂閱 */
  applicantBtn$ = new Subject();

  /**送出簽核按鈕訂閱 */
  signBtn$ = new Subject<SignOptionModel>();
  formData_sign: any;
  formData_sign$ = new Subject<SignOptionModel>();
  formData_sign_output$ = new Subject<any>();




  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) { }


  /**
   * 取得啟用表單清單
   */
  getForms(): Observable<FormsViewModel[]> {
    return this.apiService.post('Form/GetForms');
  }

  getFormSetting() {
    const url = 'Form/GetFormSetting';
    this.apiService.post(url).subscribe((result) => {
      this.formSetting = result.data;
      this.formSetting$.next(this.formSetting);
    });
  }
  /**
   * 取得主表 FormControl
   * @returns ' { FormControls }
   */
  formList() {
    const form = this.fb.group(new FormListModel());
    return form.controls;
  }
  /**
   * 取得基本資料
   */
  getBaseData(data: BaseDataRequestModel): Observable<FormBaseDataModel> {
    return this.apiService.post('Form/getBaseData', data);
  }
  /**
   * 刪除草稿
   */
  deleteDraft(data: FormIDModel): Observable<ResponseModel<any>> {
    return this.apiService.post('Form/DeleteDraft', data);
  }
  /**
   * 儲存草稿/送出申請
   * @param data
   * @returns
   */
  applicant(data: any): Observable<ResponseModel<any>> {
    return this.apiService.post('Form/Applicant', data);
  }
  /**
   * 取得草稿清單
   */
  getDraftList(): Observable<DraftListModel[]> {
    return this.apiService.post('Form/GetDraftList');
  }
  /**
   * 取得表單資料
   */
  getFormData(data: FormIDModel): Observable<any> {
    return this.apiService.post('Form/GetFormData', data);
  }
  /**
   * 取得待簽核表單
   */
  getApproverList(): Observable<ApproverInfoModel[]> {
    return this.apiService.post('Form/GetApproverList');
  }
  /**
   * 取得進行中表單
   */
  getApplicantFormList(): Observable<ApplicantInfoModel[]> {
    return this.apiService.post('Form/GetApplicantFormList');
  }
  /**
   * 取得簽核資料
   */
  getSignForm(data: SignAuthModel): Observable<SignFormModel> {
    return this.apiService.post(`Form/GetSignForm`, data);
  }
  /**
   * 取得簽核選項
   */
  getSignOption(data: GetSignOptionModel): Observable<SignOptionModel[]> {
    return this.apiService.post('Form/GetSignOption', data);
  }
  /**
   * 簽核
   */
  sign(data: SignFormModel): Observable<ResponseModel<any>> {
    return this.apiService.post('Form/Sign', data);
  }
  /**
   * 修改表單狀態
   */
   signSetResult(data: SignFormModel): Observable<ResponseModel<any>> {
    return this.apiService.post('Form/SignSetResult', data);
  }
  /**
   * 取得簽核紀錄
   */
  signLogList(data: SignLogRequestModel): Observable<SignLogViewModel[]> {
    return this.apiService.post('Form/SignLogList', data);
  }

}
