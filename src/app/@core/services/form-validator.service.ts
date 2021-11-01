import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FieldName } from '../models/field-name';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }


  valid(form: FormGroup, fieldNameJson?: FieldName): string {
    let errors: string = '';


    if (!form.valid) {

      const controls = form.controls;

      for (const name in controls) {

        if (controls[name].invalid) {
          // console.log(name, controls[name]);

          if (controls[name] instanceof FormControl) {

            // 取得欄位名稱
            let fieldName = fieldNameJson[name] !== undefined ? fieldNameJson[name] : name;
            fieldName = `<span class="text-danger fw-bold">${fieldName}</span>`;

            // 寫入錯誤訊息
            if (controls[name].errors['required']) {
              errors += `請輸入${fieldName}`;

            } else if (controls[name].errors['maxlength']) {
              errors += `${fieldName}超過長度，最多 ${controls[name].errors.maxlength.requiredLength} 字`;

            } else if (controls[name].errors['minlength']) {
              errors += `${fieldName}最少 ${controls[name].errors.minlength.requiredLength} 字`;

            } else {
              errors += fieldName;
            }
            errors += '<br>';



            controls[name].markAsTouched();

            // console.log(controls[name]);

          } else if (controls[name] instanceof FormArray) {

            // errors += this.getFieldName(name) + '<br>';
            // controls[name].markAsTouched();

            // console.log(controls[name]);


            const formArray = controls[name] as FormArray;

            formArray.controls.forEach(formGroup => {

              if (formGroup instanceof FormGroup) {
                errors += this.valid(formGroup as FormGroup, fieldNameJson);
              }

            });

          }
        }

      }

    }

    return errors;
  }

}
