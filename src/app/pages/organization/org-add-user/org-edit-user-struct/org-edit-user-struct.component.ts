import { OrgTitle, OrgTitleGetModel } from '../../../../@core/models/organization/org-title';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrgAccountStruct } from '../../../../@core/models/organization/org-account-info';
import { OrgCompanyType } from '../../../../@core/models/organization/org-company-type';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { OrgDeptInfo } from '../../../../@core/models/organization/org-dept-info';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResponseCode } from '../../../../@core/Enum/response-code.enum';

import { ToastrService } from 'app/@core/services/toastr.service';

@Component({
  selector: 'ngx-org-edit-user-struct',
  templateUrl: './org-edit-user-struct.component.html',
  styleUrls: ['./org-edit-user-struct.component.scss']
})
export class OrgEditUserStructComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();



  isAdd: boolean = true;

  form: FormGroup;
  isSubmit: boolean = false;


  deptList: OrgDeptInfo[];
  companyTypeList: OrgCompanyType[];
  titleList: OrgTitle[];

  get deptID(): FormControl {
    return this.form.get('deptID') as FormControl;
  }
  get deptName(): FormControl {
    return this.form.get('deptName') as FormControl;
  }
  get agent(): FormControl {
    return this.form.get('agent') as FormControl;
  }
  get agentName(): FormControl {
    return this.form.get('agentName') as FormControl;
  }


  constructor(
    public dialogRef: MatDialogRef<OrgEditUserStructComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {

    this.isAdd = this.data.isAdd;

    // console.log(this.data, this.isAdd);

    const titlePara: OrgTitleGetModel = {
      status: 1
    };
    this.orgService.getTitleList(titlePara).subscribe((list) => {
      this.titleList = list.data;
    });

    this.orgService.getCompanyTypeList().subscribe((list) => {
      this.companyTypeList = list.data;
    });



    this.form = this.fb.group({
      isAdd: this.fb.control(this.isAdd),
      uid: this.fb.control(null),
      oldDeptID: this.fb.control(null),
      deptID: this.fb.control(null, [Validators.required]),
      deptName: this.fb.control(null, [Validators.required]),
      main: this.fb.control(null, [Validators.required]),
      titleID: this.fb.control(null, [Validators.required]),
      signApprover: this.fb.control(null, [Validators.required]),
      agent: this.fb.control(null),
      agentName: this.fb.control(null),
      companyType: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required]),
    });


    this.form.patchValue(this.data.userStruct);

    if (!this.isAdd) {
      this.form.get('oldDeptID').setValue(this.data.userStruct.deptID);

    }

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



  submit() {

    if (!this.form.valid) {
      // console.log('form.valid');
      return false;
    }

    if (this.isSubmit) { return false; }


    this.isSubmit = true;

    this.orgService.addUserStruct(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            const title = this.isAdd ? '新增成功' : '修改成功';

            this.toastrService.show(null, title, { status: 'success' });


            this.dialogRef.close(data.data);


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







}
