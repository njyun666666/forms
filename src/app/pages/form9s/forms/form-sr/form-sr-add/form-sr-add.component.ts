import { FormBaseAddComponent } from './../../form-base-add/form-base-add.component';
import { FormValidatorService } from './../../../../../@core/services/form-validator.service';
import { TokenService } from './../../../../../@core/services/token.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from './../../../../../@core/services/loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import * as ClassicEditor from 'assets/packages/ckeditor5';
import * as dayjs from 'dayjs';
import { StepTypeEnum } from '../../../../../@core/Enum/step-type.enum';
import { Form9sService } from '../../../../../@core/services/form9s/form9s.service';
import { DialogService } from '../../../../../@core/services/dialog.service';
import { SRFieldNameJson, SRModel, SRTaskOwnerModel } from '../../../../../@core/models/form9s/sr/sr.model';
import { CkeditorService } from '../../../../../@core/services/ckeditor.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-form-sr-add',
  templateUrl: './form-sr-add.component.html',
  styleUrls: ['./form-sr-add.component.scss']
})
export class FormSrAddComponent extends FormBaseAddComponent implements OnInit, OnDestroy {

  formData: SRModel;


  // 修改權限
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
    public fb: FormBuilder,
    public form9sService: Form9sService,
    public loadingService: LoadingService,
    public dialogService: DialogService,
    public route: ActivatedRoute,
    public tokenService: TokenService,
    public formValidatorService: FormValidatorService,
    public ckeditorService: CkeditorService,
    public sanitizer: DomSanitizer

  ) {
    super(
      fb,
      form9sService,
      loadingService,
      dialogService,
      route,
      tokenService,
      formValidatorService
    );
  }

  ngOnInit(): void {

    /** 表單代號 */
    this.formClass = 'SR';

    this.fieldNameJson = SRFieldNameJson;




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
    this.form.get('type').disable();

    this.baseSettings();



    // 設定表單資料
    if (this.formData !== null) {

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





    // 依步驟開修改權限
    this.setEditAuth();
  }

  ngOnDestroy(): void {
    this.baseOnDestroy();
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
   * @returns 錯誤訊息
   */
  formValidErrors(): string {

    let errors: string = '';
    this.taskOwnerList_error = false;


    // 簽核步驟
    if (this.stepID === 8 || this.stepID === 11) {

      // 指定承辦人
      if (this.taskOwnerList.length === 0) {
        errors += '請指定承辦人<br>';
        this.taskOwnerList_error = true;
      }

    }


    return errors;

  }




}
