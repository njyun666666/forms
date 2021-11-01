import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'app/@core/services/toastr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ResponseCode } from '../../../../@core/Enum/response-code.enum';
import { OrgDeptInfo, OrgPickerDeptInfo } from '../../../../@core/models/organization/org-dept-info';
import { OrgDeptLevel } from '../../../../@core/models/organization/org-dept-level';
import { OrganizationService } from '../../../../@core/services/organization.service';

@Component({
  selector: 'ngx-org-add-dept-form',
  templateUrl: './org-add-dept-form.component.html',
  styleUrls: ['./org-add-dept-form.component.scss']
})
export class OrgAddDeptFormComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * 新增部門=true
   *
   * @type {boolean}
   * @memberof OrgAddDeptFormComponent
   */
  @Input() in_isAdd: boolean;
  @Input() in_DeptID: string;
  @Input() in_ParentDept: OrgDeptInfo;

  @Output() closeEmitter = new EventEmitter<any>();
  @Output() getOrgEmitter = new EventEmitter<any>();

  private ngUnsubscribe = new Subject();


  deptList: OrgDeptInfo[];
  deptLevelList: OrgDeptLevel[];
  form: FormGroup;
  deptFormIsSubmit: boolean = false;




  get parentDept(): FormControl {
    return this.form.get('parentDept') as FormControl;
  }
  get parentDeptName(): FormControl {
    return this.form.get('parentDeptName') as FormControl;
  }


  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {

    this.in_isAdd = this.in_isAdd ? true : false;

    // console.log(this.in_DeptID);


    this.orgService.getDeptLevelList(1).subscribe((list) => {
      this.deptLevelList = list.data;
    });


    // console.log(this.deptLevelList);

    // this.deptList = this.orgService.deptList;

    this.form = this.fb.group({
      isAdd: this.fb.control(this.in_isAdd),
      deptID: this.fb.control(null),
      deptName: this.fb.control(null, [Validators.required]),
      deptLevelID: this.fb.control(null, [Validators.required]),
      parentDept: this.fb.control(null),
      parentDeptName: this.fb.control(null),
      status: this.fb.control(null, [Validators.required]),
    });


    if (this.in_ParentDept !== undefined) {

      this.form.get('parentDept').setValue(this.in_ParentDept.deptID);
      this.form.get('parentDeptName').setValue(this.in_ParentDept.deptName);

    }


  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log('ngOnChanges', this.in_DeptID);

    if (!this.in_isAdd) {

      // console.log('ngOnChanges -  in_isAdd ', this.in_DeptID);
      this.getDeptInfo(this.in_DeptID);
    }


  }

  // getDeptLevel() {

  //   this.orgService.deptLevelList$
  //     .pipe(takeUntil(this.ngUnsubscribe))
  //     .subscribe((list) => {
  //       this.deptLevelList = list;
  //     });

  //   this.orgService.getDeptLevelList();

  // }



  /**
   * 取得部門資訊
   *
   * @param {string} deptID
   * @memberof OrgAddDeptFormComponent
   */
  getDeptInfo(deptID: string) {

    const para = { deptID };
    this.orgService.getDeptInfo(para)
      .subscribe((result) => {

        if (result.code === 1) {
          // console.log(result.data);

          this.form.patchValue(result.data);

        }

      });
  }

  checkParentDept($event: OrgPickerDeptInfo) {
    // console.log($event);

    if ($event.deptID === null) return false;

    if (!this.in_isAdd) {

      if (this.in_DeptID === $event.deptID) {

        this.parentDept.setValue(null);
        this.parentDeptName.setValue(null);

        this.toastrService.show(null, '不能選同部門為上層部門', { status: 'danger' });

      }
    }


  }

  addDeptSubmit() {

    if (!this.form.valid) {
      // console.log('deptForm.valid');
      return false;
    }

    if (this.deptFormIsSubmit) { return false; }


    this.deptFormIsSubmit = true;

    this.orgService.addDept(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            const title = this.in_isAdd ? '新增成功' : '修改成功';

            this.toastrService.show(null, title, { status: 'success' });


            this.closeEmitter.emit(data);

            this.getOrgEmitter.emit();

          } else {

            this.toastrService.show(null, data.message, { status: 'danger' });

          }



          this.deptFormIsSubmit = false;
        },

        (error) => {
          this.deptFormIsSubmit = false;
        }
      );

  }



}
