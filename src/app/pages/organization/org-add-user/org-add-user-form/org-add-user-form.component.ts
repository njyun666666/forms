import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrgDeptInfo } from 'app/@core/models/organization/org-dept-info';
import { ToastrService } from 'app/@core/services/toastr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ResponseCode } from '../../../../@core/Enum/response-code.enum';
import { OrgAccountInfo, OrgAccountStruct } from '../../../../@core/models/organization/org-account-info';
import { OrgCompanyType } from '../../../../@core/models/organization/org-company-type';
import { OrgTitle, OrgTitleGetModel } from '../../../../@core/models/organization/org-title';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { OrgEditUserStructComponent } from '../org-edit-user-struct/org-edit-user-struct.component';

@Component({
  selector: 'ngx-org-add-user-form',
  templateUrl: './org-add-user-form.component.html',
  styleUrls: ['./org-add-user-form.component.scss']
})
export class OrgAddUserFormComponent implements OnInit, OnDestroy {



  @Input() in_isAdd: boolean;
  @Input() in_dept: OrgDeptInfo;
  @Output() closeEmitter = new EventEmitter<any>();


  form: FormGroup;
  userActive: OrgAccountInfo;
  isSubmit: boolean = false;
  userStruct: OrgAccountStruct[];

  titleList: OrgTitle[];
  companyTypeList: OrgCompanyType[];

  private ngUnsubscribe = new Subject();


  get deptID(): FormControl {
    return this.form.get('deptID') as FormControl;
  }
  get deptName(): FormControl {
    return this.form.get('deptName') as FormControl;
  }



  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {


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
      uid: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      titleID: this.fb.control(null, [Validators.required]),
      employeeID: this.fb.control(null, [Validators.required]),
      deptID: this.fb.control(null, [Validators.required]),
      deptName: this.fb.control(null, [Validators.required]),
      signApprover: this.fb.control(null, [Validators.required]),
      agent: this.fb.control(null),
      companyType: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null, [Validators.required])

    });

    if (this.in_dept) {
      this.deptID.setValue(this.in_dept.deptID);
      this.deptName.setValue(this.in_dept.deptName);
    }

  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }




  addSubmit() {

    if (!this.form.valid) {
      // console.log('form.valid');
      return false;
    }

    if (this.isSubmit) { return false; }


    this.isSubmit = true;

    this.orgService.addUser(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            this.toastrService.show(null, '新增成功', { status: 'success' });

            this.closeEmitter.emit();


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

  // editStruct(userStruct?: OrgAccountStruct) {

  //   console.log(userStruct);

  //   const dialogRef = this.dialog.open(OrgEditUserStructComponent, {
  //     width: '60%',
  //     data: userStruct
  //   });

  //   dialogRef.afterClosed()
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe(result => {
  //       console.log('The dialog was closed');
  //       // this.animal = result;
  //     });



  // }



}
