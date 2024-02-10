import { LoadingService } from './../../../../@core/services/loading.service';
import { DialogService } from './../../../../@core/services/dialog.service';
import { Subscription } from 'rxjs';
import { Form9sService } from 'app/@core/services/form9s/form9s.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBaseDataModel } from 'app/@core/models/form9s/form/form-base-data.model';
import { FormListModel } from 'app/@core/models/form9s/form/form-list.model';
import { environment } from 'environments/environment';
import { SignResultType } from 'app/@core/Enum/sign-result-type.enum';
import { ResponseCode } from 'app/@core/Enum/response-code.enum';
import { SignFormModel } from 'app/@core/models/form9s/sign/sign-form.model';
import { SignOptionModel } from 'app/@core/models/form9s/sign/sign-option.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormValidatorService } from 'app/@core/services/form-validator.service';
import { FieldName } from 'app/@core/models/field-name';

@Component({
  selector: 'ngx-form-sign-add',
  templateUrl: './form-sign-add.component.html',
  styleUrls: ['./form-sign-add.component.scss']
})
export class FormSignAddComponent implements OnInit, OnDestroy {

  debug: boolean = !environment.production;

  baseData: FormBaseDataModel;
  formData: FormListModel;
  signForm: SignFormModel;

  signBtnSub: Subscription;
  formData_sign_outputSub: Subscription;

  form: FormGroup;
  fieldNameJson: FieldName = {
    signContent: '簽核意見'
  };

  stepDescriptionHTML;

  get signContent(): FormControl {
    return this.form.get('signContent') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private form9sService: Form9sService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer,
    private formValidatorService: FormValidatorService
  ) { }

  ngOnInit(): void {

    this.baseData = this.route.snapshot.data['baseData'];
    this.formData = this.route.snapshot.data['formData'];
    this.signForm = this.route.snapshot.data['signForm'];

    this.stepDescriptionHTML = this.sanitizer.bypassSecurityTrustHtml(this.signForm.stepDescription);


    this.form = this.fb.group(new SignFormModel());
    this.form.patchValue(this.signForm);
    this.signContent.addValidators([Validators.maxLength(1000)]);
    this.signContent.updateValueAndValidity();
    this.form.updateValueAndValidity();

    this.signBtnSub = this.form9sService.signBtn$.subscribe((option) => {
      this.submit(option);
    });




  }


  ngOnDestroy(): void {

    if (this.signBtnSub !== undefined) {
      this.signBtnSub.unsubscribe();
    }

    if (this.formData_sign_outputSub !== undefined) {
      this.formData_sign_outputSub.unsubscribe();
    }

  }


  /**
   * 點簽核按鈕
   */
  submit(option: SignOptionModel) {
    // console.log(option);

    if (this.formData_sign_outputSub !== undefined) {
      this.formData_sign_outputSub.unsubscribe();
    }


    this.loadingService.loading$.next(true);


    // 同意才修改表單資料
    if (option.resultID === SignResultType.agree) {


      // 取得表單資料
      this.formData_sign_outputSub = this.form9sService.formData_sign_output$.subscribe((formData_sign) => {

        this.formData_sign_outputSub.unsubscribe();
        this.form.get('formData').setValue(formData_sign);

        this.doSign(option);
      });



      // call formData_sign
      this.form9sService.formData_sign$.next(option);



    } else {

      this.doSign(option);

    }




  }

  /**
   * 進行簽核
   */
  doSign(option: SignOptionModel) {


    const signContent = this.signContent.value == null ? '' : this.signContent.value.trim();

    // 駁回
    if (option.resultID === SignResultType.reject) {

      if (signContent.length === 0) {
        this.signContent.markAsTouched();
        this.signContent.setErrors({ 'required': true });
        this.dialogService.text({ content: '駁回請填寫<span class="text-danger fw-bold">簽核意見</span>' });

        this.loadingService.loading$.next(false);
        return false;
      }

    }


    this.signContent.setValue(signContent);
    this.form.get('signOptionID').setValue(option.id);
    this.form.get('signOption').setValue(option.text);
    this.form.get('signResultID').setValue(option.resultID);
    this.form.get('status').setValue(1);


    const errors = this.formValidatorService.valid(this.form, this.fieldNameJson);


    if (errors.length > 0) {

      this.loadingService.loading$.next(false);
      this.dialogService.text({ title: '尚有欄位未填/錯誤', content: errors });

      return false;
    }



    // call sign api
    this.form9sService.sign(this.form.value).subscribe((data) => {


      if (data.code === ResponseCode.success) {

        this.dialogService.goHome({ content: '已送出' });

      } else {

        this.loadingService.loading$.next(false);
        this.dialogService.text({ content: data.message });
      }



    }, (error) => {
      this.loadingService.loading$.next(false);
      this.dialogService.text({ content: error });
    });


  }



}
