import { FormValidatorService } from './../../../../../@core/services/form-validator.service';
import { TokenService } from './../../../../../@core/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from './../../../../../@core/services/loading.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import * as ClassicEditor from 'assets/packages/ckeditor5';
import * as dayjs from 'dayjs';
import { StepTypeEnum } from '../../../../../@core/Enum/step-type.enum';
import { Form9sService } from '../../../../../@core/services/form9s/form9s.service';
import { MatDialog } from '@angular/material/dialog';
import { ResponseCode } from '../../../../../@core/Enum/response-code.enum';
import { DialogService } from '../../../../../@core/services/dialog.service';
import { SRFieldNameJson, SRModel, SRTaskOwnerModel } from '../../../../../@core/models/form9s/sr/sr.model';
import { CkeditorService } from '../../../../../@core/services/ckeditor.service';
import { environment } from 'environments/environment';
import { ApplicantDeptModel, ApplicantModel, FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { DomSanitizer } from '@angular/platform-browser';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';
import { LoginInfoModel } from 'app/@core/models/login-model';

@Component({
  selector: 'ngx-form-sr-add',
  templateUrl: './form-sr-add.component.html',
  styleUrls: ['./form-sr-add.component.scss']
})
export class FormSrAddComponent implements OnInit, OnDestroy {

  debug: boolean = !environment.production;

  deleteDraftBtnSub: Subscription;
  draftBtnSub: Subscription;
  appliacntBtnSub: Subscription;
  formData_signSub: Subscription;


  loginInfo: LoginInfoModel;

  baseData: FormBaseDataModel;
  formData: SRModel;
  signForm: SignFormModel;

  formClass: string = 'SR';
  form: FormGroup;

  /** 簽核步驟StepID*/
  stepID: number;
  /** 簽核步驟類型StepType*/
  stepType: StepTypeEnum;


  applicantList: ApplicantModel[];
  applicantDeptList: ApplicantDeptModel[];


  // 修改權限
  edit_ApplicantID: boolean = false;
  edit_ApplicantDeptID: boolean = false;
  edit_LevelID: boolean = false;
  edit_Type: boolean = false;
  edit_Other: boolean = false;
  edit_Subject: boolean = false;
  edit_Content: boolean = false;
  edit_WorkDay: boolean = false;
  edit_TestDay: boolean = false;
  edit_EstStartDate: boolean = false;
  edit_EstEndDate: boolean = false;
  edit_OnlineDate: boolean = false;
  edit_RealStartDate: boolean = false;
  // edit_havePhone: boolean = false;
  edit_ExpectedDate: boolean = false;
  edit_TaskOwnerList: boolean = false;
  edit_TaskOwnerList_Check: boolean = false;
  edit_TaskOwner: boolean = false;



  taskOwnerList_error: boolean = false;




  get ApplicantID(): FormControl {
    return this.form.get('applicantID') as FormControl;
  }
  get Subject(): FormControl {
    return this.form.get('subject') as FormControl;
  }
  get Content(): FormControl {
    return this.form.get('content') as FormControl;
  }

  get taskOwnerList(): FormArray {
    return this.form.get('taskOwnerList') as FormArray;
  }

  // ckeditor
  public editor = ClassicEditor;
  ckeditorConfig = this.ckeditorService.confiig();


  // 需求說明 html
  contentHTML;




  constructor(
    private fb: FormBuilder,
    private form9sService: Form9sService,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private ckeditorService: CkeditorService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    private formValidatorService: FormValidatorService
  ) { }

  ngOnInit(): void {

    this.loginInfo = this.tokenService.getInfo();


    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signForm = this.route.snapshot.data['signForm'];
    // console.log(this.formData);

    this.form = this.fb.group({
      ...this.form9sService.formList(),

      type: this.fb.control(1),
      other: this.fb.control(null),
      subject: this.fb.control(null),
      content: this.fb.control(null),
      onlineDate: this.fb.control(null),
      // havePhone: this.fb.control(0),
      expectedDate: this.fb.control(null),
      taskOwnerList: this.fb.array([])
    });


    // 先把選項停用
    this.form.get('levelID').disable();
    this.form.get('type').disable();
    // this.form.get('havePhone').disable();




    // 預設值
    this.form.get('formClass').setValue(this.formClass);
    this.form.get('applicantDate').setValue(dayjs().format('YYYY-MM-DD'));


    // 申請人 valueChanegs
    if (this.baseData.applicant !== undefined && this.baseData.applicant !== null) {

      this.applicantList = this.baseData.applicant;
      this.ApplicantID.setValue(this.applicantList[0].applicantID);


      this.form.get('applicantID').valueChanges.subscribe((val) => {
        const i = this.applicantList.findIndex(x => x.applicantID === val);
        this.form.get('applicantName').setValue(this.applicantList[i].applicantName);
        this.applicantDeptList = this.applicantList[i].depts;
        this.form.get('applicantDeptID').setValue(this.applicantDeptList[0].applicantDeptID);
      });

      this.form.get('applicantDeptID').valueChanges.subscribe((val) => {
        this.form.get('applicantDept').setValue(this.applicantDeptList.find(x => x.applicantDeptID === val).applicantDept);
      });

    }



    // 設定表單基本資料
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
    // end 設定表單基本資料




    // 設定表單資料
    if (this.formData !== null) {
      this.form.patchValue(this.formData);

      // this.form9sService.fileGroupID$.next(this.formData.fileGroupID);

      // 日期另外設定
      if (dayjs(this.formData.expectedDate).isValid()) {
        this.form.get('expectedDate').setValue(dayjs(this.formData.expectedDate).format('YYYY-MM-DD'));
      }

      // 需求內容
      this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(this.formData.content);


      // 設定承辦人
      this.formData.taskOwnerList.forEach(x => {
        x.estStartDate = dayjs(x.estStartDate).isValid() ? dayjs(x.estStartDate).format('YYYY-MM-DD') : null;
        x.estEndDate = dayjs(x.estEndDate).isValid() ? dayjs(x.estEndDate).format('YYYY-MM-DD') : null;
        x.realStartDate = dayjs(x.realStartDate).isValid() ? dayjs(x.realStartDate).format('YYYY-MM-DD') : null;
        this.addTaskOwnerFormGroup(x);
      });


    }



    // 依步驟開修改權限
    this.setEditAuth();




    // 刪除草稿按鈕訂閱
    this.deleteDraftBtnSub = this.form9sService.deleteDraftBtn$.subscribe(() => {
      this.deleteDraft();
    });
    // 草稿按鈕訂閱
    this.draftBtnSub = this.form9sService.draftBtn$.subscribe(() => {
      this.draft();
    });
    // 送出按鈕訂閱
    this.appliacntBtnSub = this.form9sService.applicantBtn$.subscribe(() => {
      this.applicant();
    });


    // 簽核用 回傳表單資料
    this.formData_signSub = this.form9sService.formData_sign$.subscribe((option) => {
      // console.log('formData_sign$.subscribe');
      if (this.formValid()) {
        this.form9sService.formData_sign_output$.next(this.form.value);
      }

    });



    // 專案類型
    this.form.get('type').valueChanges.subscribe((val) => {

      if (val === 5) {
        this.form.get('other').enable();
        this.form.get('other').setValidators([Validators.required]);
        this.form.get('other').updateValueAndValidity();
      } else {
        this.form.get('other').setValue('');
        this.form.get('other').disable();
        this.form.get('other').clearValidators();
        this.form.get('other').updateValueAndValidity();
      }

    });





  }

  ngOnDestroy(): void {

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
   * 新增承辦人FormGroup
   */
  addTaskOwnerFormGroup(data?: SRTaskOwnerModel) {

    const ownerForm = this.fb.group({
      id: [null],
      uid: [null, [Validators.required]],
      name: [null],
      workDay: [null],
      testDay: [null],
      estStartDate: [null],
      estEndDate: [null],
      realStartDate: [null]
    });

    ownerForm.patchValue(data);


    if (this.stepID === 8) {
    }
    else if (this.stepID === 7 && data.uid === this.loginInfo.uid) {


      // 必填欄位
      const controls = [
        ownerForm.get('workDay'),
        ownerForm.get('testDay'),
        ownerForm.get('estStartDate'),
        ownerForm.get('estEndDate'),
        ownerForm.get('realStartDate'),
        // this.form.get('havePhone'),
      ];

      controls.forEach(contrls => {
        // 設定表單驗證
        contrls.setValidators([Validators.required]);
        contrls.updateValueAndValidity();

      });


    }
    else if (this.stepID === 11) {


    } else {
      ownerForm.disable();
    }

    this.taskOwnerList.push(ownerForm);

    // console.log(this.taskOwnerList);

  }

  deleteTaskOwnerFormGroup(i: number) {
    this.taskOwnerList.removeAt(i);
  }



  /**
   *依步驟開修改權限
   *
   */
  setEditAuth() {

    // 申請表單
    if (this.stepType === StepTypeEnum.NewApplicant) {

      this.edit_ApplicantID = true;
      this.edit_ApplicantDeptID = true;
      this.edit_LevelID = true;
      this.edit_Type = true;
      this.edit_Other = true;
      this.edit_Subject = true;
      this.edit_Content = true;
      // this.edit_havePhone = true;
      this.edit_ExpectedDate = true;

      this.form.get('levelID').enable();
      this.form.get('type').enable();
      // this.form.get('havePhone').enable();

      // 必填欄位
      const controls = [
        this.form.get('applicantID'),
        this.form.get('applicantDeptID'),
        this.form.get('levelID'),
        this.form.get('type'),
        this.form.get('subject'),
        this.form.get('content'),
        // this.form.get('havePhone'),
      ];

      controls.forEach(contrls => {
        // 設定表單驗證
        contrls.setValidators([Validators.required]);
        contrls.updateValueAndValidity();

      });

      this.form.get('content').addValidators([Validators.maxLength(2000)]);
      this.form.get('content').updateValueAndValidity();


    } else if (this.stepID === 8) {
      // 技術方主管分派任務

      this.edit_TaskOwnerList = true;


      if (this.taskOwnerList.length === 0) {
        this.addTaskOwnerFormGroup();
      }

    } else if (this.stepID === 7) {
      // 技術開發
      this.edit_TaskOwner = true;

    } else if (this.stepID === 11) {
      // 技術主管確認功能開發完成

      this.edit_TaskOwnerList = true;
      this.edit_TaskOwnerList_Check = true;

    } else if (this.stepID === 4) {
      // 需求方安排QA測試並驗收

      this.edit_OnlineDate = true;

      // 必填欄位
      const controls = [
        this.form.get('onlineDate'),
      ];

      controls.forEach(contrls => {
        // 設定表單驗證
        contrls.setValidators([Validators.required]);
        contrls.updateValueAndValidity();

      });
    }


  }


  /**
   * 驗證表單
   * @returns 結果
   */
  formValid(): boolean {

    let errors: string = this.formValidatorService.valid(this.form, SRFieldNameJson);
    this.taskOwnerList_error = false;




    // 簽核步驟
    if (this.stepID === 8 || this.stepID === 11) {

      // 指定承辦人
      if (this.taskOwnerList.length === 0) {
        errors += '請指定承辦人<br>';
        this.taskOwnerList_error = true;
      }

    }






    if (errors.length > 0) {

      this.loadingService.loading$.next(false);
      this.dialogService.text({ title: '尚有欄位未填/錯誤', content: errors });

      return false;
    }
    // this.loadingService.loading$.next(false);

    // return false;
    return true;
  }


  /**
   * 刪除草稿
   */
  deleteDraft() {
    this.loadingService.loading$.next(true);

    this.form9sService.deleteDraft({ formID: this.formData.formID }).subscribe((data) => {

      if (data.code === ResponseCode.success) {

        this.dialogService.goHome({ content: '已刪除草稿' });

      } else {

        this.dialogService.text({ content: data.message });
        this.loadingService.loading$.next(false);
      }

    });

  }

  /**
   * 草稿
   */
  draft() {
    // console.log('sr draft');

    this.loadingService.loading$.next(true);

    // 設定為草稿
    this.form.get('status').setValue(0);

    this.form9sService.applicant(this.form.value).subscribe((data) => {

      if (data.code === ResponseCode.success) {

        this.dialogService.goHome({ content: '已儲存草稿' });

      } else {

        this.dialogService.text({ content: data.message });
        this.loadingService.loading$.next(false);
      }

    });


  }
  /**
    * 送出申請
    */
  applicant() {
    // console.log('sr applicant');



    if (!this.formValid()) {
      return false;
    }



    this.loadingService.loading$.next(true);



    // 設定為正式申請表單
    this.form.get('status').setValue(1);

    this.form9sService.applicant(this.form.value).subscribe((data) => {

      if (data.code === ResponseCode.success) {

        this.dialogService.goHome({ content: '已送出申請' });

      } else {

        this.dialogService.text({ content: data.message });
        this.loadingService.loading$.next(false);
      }

    });

  }





}
