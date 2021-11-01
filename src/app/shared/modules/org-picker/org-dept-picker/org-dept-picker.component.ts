import { FormControl } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { OrgDeptInfo } from '../../../../@core/models/organization/org-dept-info';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { OrgPickerComponent } from '../org-picker/org-picker.component';
import { OrgPickerTypeModel } from '../org-picker-model';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class OrgDeptPickerComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'ngx-org-dept-picker',
  templateUrl: './org-dept-picker.component.html',
  styleUrls: ['./org-dept-picker.component.scss']
})
export class OrgDeptPickerComponent implements OnInit, OnDestroy {




  /**單選
   * 設定值 {deptID, deptName}
   * @type {FormControl}
   * @memberof OrgDeptPickerComponent
   */
  @Input() deptControl: FormControl;
  /**單選
   * 設定值 deptID: string
   * @type {FormControl}
   * @memberof OrgDeptPickerComponent
   */
  @Input() deptIDControl: FormControl;
  /**單選
   * 設定值 deptName: string
   * @type {FormControl}
   * @memberof OrgDeptPickerComponent
   */
  @Input() deptNameControl: FormControl;



  /**
   * 設定多選=true
   *
   * @type {boolean}
   * @memberof OrgDeptPickerComponent
   */
  @Input() multiple: boolean;
  /**
   * 多選
   * 設定值 [{deptID, deptName}]
   * @type {FormControl}
   * @memberof OrgDeptPickerComponent
   */




  @Input() deptArrayControl: FormControl;
  /**
   *自訂deptID屬性名稱
   *
   * @type {string}
   * @memberof OrgDeptPickerComponent
   */
  @Input() deptIDProp: string;
  /**
   *自訂deptName屬性名稱
   *
   * @type {string}
   * @memberof OrgDeptPickerComponent
   */
  @Input() deptNameProp: string;


  /**
   * 選取後觸發並回傳
   *
   * @memberof OrgDeptPickerComponent
   */
  @Output() orgPickerCallBackEmitter = new EventEmitter<any>();



  private ngUnsubscribe = new Subject();

  pickerType: OrgPickerTypeModel = { type: 'dept', countType: 'single' };
  deptList: OrgDeptInfo[] = [];


  constructor(
    public dialog: MatDialog,
    // private orgService: OrganizationService,
  ) { }

  ngOnInit(): void {


    if (this.multiple) {
      this.pickerType.countType = 'multiple';
    }

    if (!this.deptIDProp) {
      this.deptIDProp = 'deptID';
    }

    if (!this.deptNameProp) {
      this.deptNameProp = 'deptName';
    }
    // console.log('from ngx-org-dept-picker');

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  openDialog(): void {

    this.deptList = [];


    // 單選
    if (this.pickerType.countType === 'single') {

      if (this.deptControl !== undefined && this.deptControl.value !== null) {

        this.deptList.push({ deptID: this.deptControl.value[this.deptIDProp] });

      } else if (this.deptIDControl !== undefined && this.deptIDControl.value !== null) {

        if (this.deptIDControl.value.length > 0) {
          this.deptList.push({ deptID: this.deptIDControl.value });
        }

      }

    } else {
      // 多選
      if (this.deptArrayControl !== undefined) {

        if (this.deptArrayControl.value !== undefined && this.deptArrayControl.value !== null
          && this.deptArrayControl.value.length > 0) {

          // console.log(this.deptArrayControl.value);

          const templist = this.deptArrayControl.value as Array<any>;

          templist.forEach(x => {
            this.deptList.push({ deptID: x[this.deptIDProp] });
          });

          // console.log(templist);
        }

      }
    }



    const dialogRef = this.dialog.open(OrgPickerComponent, {
      width: '80%',
      maxWidth: '600px',
      height: '80%',
      maxHeight: '600px',
      data: { pickerType: this.pickerType, data: this.deptList }
    });


    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {

        // console.log(result);

        if (result !== undefined) {

          let value = null;
          let valueNew = null;


          if (this.pickerType.countType === 'single') {
            // 單選


            if (result.length > 0) {
              value = Object.assign({}, result[0]);
              valueNew = Object.assign({}, value);
            }

            // console.log(value);

            if (this.deptControl !== undefined) {

              if (value === null) {

                this.deptControl.setValue(null);

              } else {

                const newObj = {};
                newObj[this.deptIDProp] = value.deptID;
                newObj[this.deptNameProp] = value.deptName;

                valueNew = newObj;
                this.deptControl.setValue(valueNew);
              }
            }


            if (this.deptIDControl !== undefined) {

              if (value === null) {
                this.deptIDControl.setValue(null);
              } else {
                this.deptIDControl.setValue(value.deptID);
              }
            }


            if (this.deptNameControl !== undefined) {

              if (value === null) {
                this.deptNameControl.setValue(null);
              } else {
                this.deptNameControl.setValue(value.deptName);
              }
            }


          } else {
            // 多選
            valueNew = result.map(x => {
              const newObj = {};
              newObj[this.deptIDProp] = x.deptID;
              newObj[this.deptNameProp] = x.deptName;
              return newObj;
            });


            this.deptArrayControl.setValue(valueNew);
          }




          this.orgPickerCallBackEmitter.emit(valueNew);

        }

      });
  }



}
