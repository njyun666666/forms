import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'app/@core/services/toastr.service';

import { ResponseCode } from '../../../../@core/Enum/response-code.enum';
import { OrgAccountStruct } from '../../../../@core/models/organization/org-account-info';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { OrgEditUserStructComponent } from '../org-edit-user-struct/org-edit-user-struct.component';

@Component({
  selector: 'ngx-org-edit-user-form',
  templateUrl: './org-edit-user-form.component.html',
  styleUrls: ['./org-edit-user-form.component.scss']
})
export class OrgEditUserFormComponent implements OnInit, OnChanges {

  @Input() in_UID: string;
  @Output() getOrgEmitter = new EventEmitter<any>();

  form: FormGroup;
  userStructList: OrgAccountStruct[];

  isSubmit: boolean = false;



  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }


  ngOnInit(): void {


    this.form = this.fb.group({
      uid: this.fb.control(null),
      name: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      employeeID: this.fb.control(null, [Validators.required]),
      status: this.fb.control(null)

    });


  }

  ngOnChanges(): void {

    // console.log(this.in_UID);

    if (this.in_UID !== undefined) {
      this.getUserInfo(this.in_UID);
    }
  }


  getUserInfo(uid: string) {

    const para = { uid };
    this.orgService.getUserInfoStruct(para).subscribe((result) => {
      this.form.patchValue(result.data);
      this.userStructList = result.data.structList;
    });

  }



  submit() {

    if (!this.form.valid) {
      // console.log('form.valid');
      return false;
    }

    if (this.isSubmit) { return false; }


    this.isSubmit = true;

    this.orgService.editUserInfo(this.form.value)
      .subscribe(

        (data) => {
          if (data.code === ResponseCode.success) {

            this.toastrService.show(null, '修改成功', { status: 'success' });

            this.getOrgEmitter.emit();

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

  editStruct(userStruct?: OrgAccountStruct) {

    // console.log(userStruct);

    let isAdd = false;

    if (userStruct === undefined) {
      isAdd = true;
      userStruct = { uid: this.in_UID };
    }


    const dialogRef = this.dialog.open(OrgEditUserStructComponent, {
      width: '700px',
      data: { isAdd, userStruct }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        // console.log('The dialog was closed', result);

        if (result !== undefined) {
          this.userStructList = result;
          this.getOrgEmitter.emit();
        }

        // this.animal = result;
      });



  }


}
