import { FormBaseAddComponent } from './../../form-base-add/form-base-add.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { StepTypeEnum } from 'app/@core/Enum/step-type.enum';
import { DEMOFieldNameJson, DEMOModel } from 'app/@core/models/form9s/demo/demo.model';

@Component({
  selector: 'ngx-form-demo-add',
  templateUrl: './form-demo-add.component.html',
  styleUrls: ['./form-demo-add.component.scss']
})
export class FormDemoAddComponent extends FormBaseAddComponent implements OnInit, OnDestroy {


  /** 表單資料 */
  formData: DEMOModel;

  //#region 欄位權限
  edit_aaa: boolean = false;
  edit_bbb: boolean = false;
  //#endregion


  // constructor(

  // ) { }



  ngOnInit(): void {


    /** 表單代號 */
    this.formClass = 'DEMO';
    /** 欄位名稱 */
    this.fieldNameJson = DEMOFieldNameJson;



    this.form = this.fb.group({
      ...this.form9sService.formList(),

      // 表單專屬欄位
      aaa: this.fb.control(''),
      bbb: this.fb.control('')
    });



    // 基本設定
    this.baseSettings();

    // 依步驟開修改權限
    this.setEditAuth();

  }



  ngOnDestroy(): void {
    this.baseOnDestroy();
  }




  /**
   *依步驟開修改權限
   */
  setEditAuth() {

    // 申請表單
    if (this.stepType === StepTypeEnum.NewApplicant) {

      this.edit_ApplicantID = true;
      this.edit_ApplicantDeptID = true;
      this.edit_LevelID = true;

      this.edit_aaa = true;
      this.edit_bbb = true;


      // 表單級別
      this.form.get('levelID').enable();



      // 必填欄位
      const controls = [
        this.form.get('levelID'),
        this.form.get('aaa'),
      ];

      controls.forEach(contrls => {
        // 設定表單驗證
        contrls.setValidators([Validators.required]);
        contrls.updateValueAndValidity();

      });



    } else if (this.stepID === 13) {

      this.edit_bbb = true;

      // 必填欄位
      const controls = [
        this.form.get('bbb')
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
    return errors;
  }



}
