import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrgAccountInfo, OrgPickerAccountInfo } from '../../../../@core/models/organization/org-account-info';
import { OrgPickerTypeModel } from '../org-picker-model';
import { OrgUserPickerDialogComponent } from '../org-user-picker-dialog/org-user-picker-dialog.component';

@Component({
  selector: 'ngx-org-user-picker',
  templateUrl: './org-user-picker.component.html',
  styleUrls: ['./org-user-picker.component.scss']
})
export class OrgUserPickerComponent implements OnInit, OnDestroy {

  @Input() btnText: string = '選擇人員';

  /**單選
   * 設定值 {uid, name, deptID, deptName}
   * @type {FormControl}
   */
  @Input() userControl: FormControl;

  /**單選
   * 設定值 uid: string
   * @type {FormControl}
   */
  @Input() uidControl: FormControl;

  /**單選
   * 設定值 name: string
   * @type {FormControl}
   */
  @Input() nameControl: FormControl;
  /**單選
   * 設定值 deptID: string
   * @type {FormControl}
   */
  @Input() deptIDControl: FormControl;

  /**單選
   * 設定值 deptName: string
   * @type {FormControl}
   */
  @Input() deptNameControl: FormControl;





  /**
   * 設定多選=true
   *
   * @type {boolean}
   */
  @Input() multiple: boolean;
  /**
   * 多選
   * 設定值 [{uid, name, deptID, deptName}]
   * @type {FormArray}
   */
  @Input() userFormArray: FormArray;





  /**
   * 只顯示部門員工=true
   *
   * @type {boolean}
   */
  @Input() onlyDeptUser: boolean;
  /**
   * 指定部門&子部門員工
   */
  @Input() whichDeptUser: string[];
  /**
   *自訂uid屬性名稱
   *
   * @type {string}
   * @memberof OrgDeptPickerComponent
   */
  @Input() uidProp: string;
  /**
   *自訂name屬性名稱
   *
   * @type {string}
   * @memberof OrgDeptPickerComponent
   */
  @Input() nameProp: string;
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
   */
  @Output() orgPickerCallBackEmitter = new EventEmitter<any>();




  private ngUnsubscribe = new Subject();

  pickerType: OrgPickerTypeModel = { type: 'user', countType: 'single' };
  userList: OrgPickerAccountInfo[] = [];



  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (this.multiple) {
      this.pickerType.countType = 'multiple';
    }

    if (!this.uidProp) {
      this.uidProp = 'uid';
    }

    if (!this.nameProp) {
      this.nameProp = 'name';
    }

    if (!this.deptIDProp) {
      this.deptIDProp = 'deptID';
    }

    if (!this.deptNameProp) {
      this.deptNameProp = 'deptName';
    }

    this.pickerType.onlyDeptUser = this.onlyDeptUser !== undefined ? this.onlyDeptUser : false;
    this.pickerType.whichDeptUser = this.whichDeptUser;


  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  openDialog(): void {

    this.userList = [];


    // 單選
    if (this.pickerType.countType === 'single') {

      if (this.userControl !== undefined && this.userControl.value !== null) {


        const tempObj: OrgPickerAccountInfo = {
          uid: this.userControl.value[this.uidProp],
          deptID: this.userControl.value[this.deptIDProp]
        };

        this.userList.push(tempObj);


      } else if (this.uidControl !== undefined && this.uidControl.value !== null) {

        if (this.uidControl.value.length > 0) {

          const tempObj: OrgPickerAccountInfo = {
            uid: this.uidControl.value,
            deptID: null
          };


          if (this.deptIDControl !== undefined && this.deptIDControl.value !== null) {
            tempObj.deptID = this.deptIDControl.value;
          }

          this.userList.push(tempObj);

        }

      }

    } else {

      // 多選
      if (this.userFormArray !== undefined) {

        if (this.userFormArray.value !== undefined && this.userFormArray.value !== null
          && this.userFormArray.value.length > 0) {

          const templist = this.userFormArray.value as Array<any>;

          templist.forEach(x => {
            this.userList.push({ uid: x[this.uidProp], deptID: x[this.deptIDProp] });
          });

        }

      }


    }



    const dialogRef = this.dialog.open(OrgUserPickerDialogComponent, {
      width: '90%',
      maxWidth: '800px',
      height: '90%',
      maxHeight: '800px',
      data: { pickerType: this.pickerType, data: this.userList }
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

            if (this.userControl !== undefined) {

              if (value === null) {

                this.userControl.setValue(null);

              } else {

                const newObj = {};
                newObj[this.uidProp] = value.uid;
                newObj[this.nameProp] = value.name;
                newObj[this.deptIDProp] = value.deptID;
                newObj[this.deptNameProp] = value.deptName;

                this.userControl.setValue(newObj);
              }
            }


            // uid
            if (this.uidControl !== undefined) {
              if (value === null) {
                this.uidControl.setValue(null);
              } else {
                this.uidControl.setValue(value.uid);
              }
            }

            // name
            if (this.nameControl !== undefined) {
              if (value === null) {
                this.nameControl.setValue(null);
              } else {
                this.nameControl.setValue(value.name);
              }
            }

            // deptid
            if (this.deptIDControl !== undefined) {
              if (value === null) {
                this.deptIDControl.setValue(null);
              } else {
                this.deptIDControl.setValue(value.deptID);
              }
            }

            // deptname
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
              newObj[this.uidProp] = x.uid;
              newObj[this.nameProp] = x.name;
              newObj[this.deptIDProp] = x.deptID;
              newObj[this.deptNameProp] = x.deptName;
              return newObj;
            });



            const valueNewArr: Array<any> = valueNew;


            if (this.userFormArray !== undefined) {

              this.userFormArray.clear();


              valueNewArr.forEach(x => {

                const keys = Object.keys(x);
                const tempfomrGroup: FormGroup = this.fb.group({});

                keys.forEach(k => {
                  tempfomrGroup.addControl(k, this.fb.control(x[k]));
                });

                this.userFormArray.push(tempfomrGroup);
              });

            }


            if (this.nameControl !== undefined) {
              const namearr = valueNewArr.map(x => x[this.nameProp]);
              this.nameControl.setValue(namearr.join(', '));
            }



            if (this.userFormArray !== undefined) {

              // console.log(this.userFormArray.value);
            }

          }




          this.orgPickerCallBackEmitter.emit(valueNew);

        }

      });
  }
}
