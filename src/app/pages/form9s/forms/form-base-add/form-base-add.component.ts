import { FieldName } from 'app/@core/models/field-name';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StepTypeEnum } from 'app/@core/Enum/step-type.enum';
import { ApplicantDeptModel, ApplicantModel, FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';
import { LoginInfoModel } from 'app/@core/models/login-model';
import { DialogService } from 'app/@core/services/dialog.service';
import { FormValidatorService } from 'app/@core/services/form-validator.service';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { LoadingService } from 'app/@core/services/loading.service';
import { TokenService } from 'app/@core/services/token.service';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-form-base-add',
  templateUrl: './form-base-add.component.html',
  styleUrls: ['./form-base-add.component.scss']
})
export class FormBaseAddComponent implements OnInit, OnDestroy {


  debug: boolean = !environment.production;


  deleteDraftBtnSub: Subscription;
  draftBtnSub: Subscription;
  appliacntBtnSub: Subscription;
  formData_signSub: Subscription;


  loginInfo: LoginInfoModel;

  /** 表單基本資料 */
  baseData: FormBaseDataModel;
  /** 表單資料 */
  formData: any;
  /** 簽核資料 */
  signForm: SignFormModel;

  /** 表單代號 */
  formClass: string = 'formbase';
  form: FormGroup;

  fieldNameJson: FieldName;

  /** 簽核步驟StepID*/
  stepID: number;
  /** 簽核步驟類型StepType*/
  stepType: StepTypeEnum;


  /** 申請人清單 */
  applicantList: ApplicantModel[];
  /** 申請人部門清單 */
  applicantDeptList: ApplicantDeptModel[];


  //#region 欄位權限
  edit_ApplicantID: boolean = false;
  edit_ApplicantDeptID: boolean = false;
  edit_LevelID: boolean = false;

  //#endregion


  constructor(
    public fb: FormBuilder,
    public form9sService: Form9sService,
    public loadingService: LoadingService,
    public dialogService: DialogService,
    public route: ActivatedRoute,
    public tokenService: TokenService,
    public formValidatorService: FormValidatorService,
  ) {


    this.loginInfo = this.tokenService.getInfo();


    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signForm = this.route.snapshot.data['signForm'];



    //#region 訂閱按鈕

    // 刪除草稿按鈕訂閱
    this.deleteDraftBtnSub = this.form9sService.deleteDraftBtn$.subscribe(() => {
      this.form9sService.deleteDraft(this.formData.formID);
    });

    // 草稿按鈕訂閱
    this.draftBtnSub = this.form9sService.draftBtn$.subscribe(() => {
      this.form9sService.draft(this.form);
    });

    // 送出按鈕訂閱
    this.appliacntBtnSub = this.form9sService.applicantBtn$.subscribe(() => {

      if (this.baseFormValid()) {
        this.form9sService.applicant(this.form);
      }

    });

    //#endregion


    // 簽核用 回傳表單資料
    this.formData_signSub = this.form9sService.formData_sign$.subscribe((option) => {
      // console.log('formData_sign$.subscribe');
      if (this.baseFormValid()) {
        this.form9sService.formData_sign_output$.next(this.form.value);
      }

    });




  }


  ngOnInit(): void {

  }


  ngOnDestroy(): void {
  }


  baseOnDestroy(): void {

    if (this.deleteDraftBtnSub !== undefined) {
      this.deleteDraftBtnSub.unsubscribe();
    }

    if (this.draftBtnSub !== undefined) {
      this.draftBtnSub.unsubscribe();
    }

    if (this.appliacntBtnSub !== undefined) {
      this.appliacntBtnSub.unsubscribe();
    }

    if (this.formData_signSub !== undefined) {
      this.formData_signSub.unsubscribe();
    }
  }


  /**
   * 基本設定
   */
  baseSettings() {
    // 先把選項停用
    // 表單級別
    this.form.get('levelID').disable();


    // 預設值
    this.form.get('formClass').setValue(this.formClass);
    // this.form.get('applicantDate').setValue(dayjs().format('YYYY-MM-DD'));


    // 申請人 valueChanegs
    if (this.baseData.applicant !== undefined && this.baseData.applicant !== null) {

      this.applicantList = this.baseData.applicant;


      this.form.get('applicantID').valueChanges.subscribe((val) => {

        const i = this.applicantList.findIndex(x => x.applicantID === val);
        this.form.get('applicantName').setValue(this.applicantList[i].applicantName);
        this.applicantDeptList = this.applicantList[i].depts;
        this.form.get('applicantDeptID').setValue(this.applicantDeptList[0].applicantDeptID);
      });

      this.form.get('applicantDeptID').valueChanges.subscribe((val) => {
        this.form.get('applicantDept').setValue(this.applicantDeptList.find(x => x.applicantDeptID === val).applicantDept);
      });


      // 預設申請人
      this.form.get('applicantID').setValue(this.applicantList[0].applicantID);

    }





    // #region 設定表單基本資料
    if (this.formData == null) {

      this.form.get('formID').setValue(this.baseData.formID);
      this.form.get('levelID').setValue(this.baseData.levels[0].levelID);
      this.form.get('fileGroupID').setValue(this.baseData.fileGroupID);
    }



    // 目前步驟
    this.stepID = this.baseData.stepID;
    this.stepType = this.baseData.stepType;

    if (this.signForm !== undefined && this.signForm !== null) {
      this.stepID = this.signForm.stepID;
    }

    //#endregion



    // 設定表單資料
    if (this.formData !== null) {
      this.form.patchValue(this.formData);


    }

  }


  /**
   * 驗證表單
   * @returns 結果
   */
  baseFormValid(): boolean {

    let errors: string = this.formValidatorService.valid(this.form, this.fieldNameJson);


    errors += this.formValidErrors() ? this.formValidErrors() : '';

    if (errors.length > 0) {

      this.loadingService.loading$.next(false);
      this.dialogService.text({ title: '尚有欄位未填/錯誤', content: errors });

      // console.log('false');
      return false;
    }

    // console.log('true');
    return true;
  }

  formValidErrors(): string {
    return null;
  }


}
