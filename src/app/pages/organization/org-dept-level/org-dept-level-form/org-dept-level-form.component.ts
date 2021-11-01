import { ResponseCode } from './../../../../@core/Enum/response-code.enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrganizationService } from '../../../../@core/services/organization.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'app/@core/services/toastr.service';

@Component({
  selector: 'ngx-org-dept-level-form',
  templateUrl: './org-dept-level-form.component.html',
  styleUrls: ['./org-dept-level-form.component.scss']
})
export class OrgDeptLevelFormComponent implements OnInit {


  in_isAdd: boolean;
  in_DeptLevelID: string;

  // @Output() closeEmitter = new EventEmitter<any>();


  form: FormGroup;
  isSubmit: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<OrgDeptLevelFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    // console.log(this.data);



    this.in_isAdd = this.data === undefined ? true : false;


    this.form = this.fb.group({
      isAdd: this.fb.control(this.in_isAdd),
      deptLevelID: this.fb.control(null),
      levelName: this.fb.control(null, [Validators.required]),
      level: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required]),
    });

    if (this.data !== undefined) {
      this.form.patchValue(this.data);
    }


  }


  submit() {

    if (!this.form.valid) {
      // console.log('form.valid');
      return false;
    }

    if (this.isSubmit) { return false; }


    this.isSubmit = true;

    this.orgService.addDeptLevel(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            const title = this.in_isAdd ? '新增成功' : '修改成功';

            this.toastrService.show(null, title, { status: 'success' });
            this.close(data);


          } else {

            this.toastrService.show(null, data.message, { status: 'danger' });
          }



          this.isSubmit = false;
        },

        (error) => {
          this.isSubmit = false;
        }
      );

  }



  close(result?) {
    this.dialogRef.close(result);
    // this.router.navigate(['/pages/organization']);
  }

}