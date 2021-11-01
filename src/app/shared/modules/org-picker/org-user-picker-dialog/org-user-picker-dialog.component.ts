import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrgPickerAccountInfo, OrgPickerAccountInfoGet } from '../../../../@core/models/organization/org-account-info';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { OrgPickerTypeModel } from '../org-picker-model';
import { OrgPickerComponent } from '../org-picker/org-picker.component';

@Component({
  selector: 'ngx-org-user-picker-dialog',
  templateUrl: './org-user-picker-dialog.component.html',
  styleUrls: ['./org-user-picker-dialog.component.scss']
})
export class OrgUserPickerDialogComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();


  userList: OrgPickerAccountInfo[] = [];
  keyword: string;
  joinSelectedList: OrgPickerAccountInfo[];
  selectedList = [];

  pickerType: OrgPickerTypeModel;


  // // 單選用
  // selection = new SelectionModel<any>(false, []);



  constructor(public dialogRef: MatDialogRef<OrgPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrganizationService
  ) {

  }

  ngOnInit(): void {
    this.joinSelectedList = [];
    this.selectedList = [];
    this.pickerType = this.data.pickerType;

    const para: OrgPickerAccountInfoGet = {
      onlyDeptUser: this.pickerType.onlyDeptUser,
      whichDeptUser: this.pickerType.whichDeptUser
    };

    this.orgService.orgPickerGetUserList(para)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((list) => {

        this.userList = Object.assign([],
          list.data.map(x => {
            x.checked = false;
            return x;
          }));

        // console.log(this.userList);

        this.joinSelectedList = this.data.data.map(x => {


          const tempObj: OrgPickerAccountInfo = {
            uid: x.uid,
            deptID: x.deptID
          };

          // 沒設定部門 取主要部門
          if (!x.deptID) {
            tempObj.deptID = this.userList.find(e => x.uid === e.uid && e.main === 1).deptID;
          }

          return tempObj;
        });


        this.setSelectList();


      });

    // this.orgService.getuserList();

  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



  /**
   * 送出
   *
   * @memberof OrgPickerComponent
   */
  submit() {
    const templist = [];
    this.selectedList.forEach(x => {
      templist.push(Object.assign({}, x));
    });

    // templist.forEach(x => delete x.checked);

    this.dialogRef.close(templist);
  }

  /**
  * 取消
  *
  * @memberof OrgPickerComponent
  */
  cancel() {
    this.dialogRef.close();
  }


  listClick(item: OrgPickerAccountInfo) {

    const oldItem = Object.assign({}, item);

    // console.log(item, item.checked);
    // console.log(item.checked);


    // 單選
    if (this.pickerType.countType === 'single') {

      // this.selection.toggle(item);
      this.userList.forEach(x => x.checked = false);
      // item.checked = true;
      item.checked = !oldItem.checked;

    } else {

      item.checked = !item.checked;
    }
    // console.log(item.checked);
    // console.log(item.checked);

  }

  // checkboxChange(checked, item) {

  //   // console.log(checked);
  //   // console.log(item);


  //   if (checked) {

  //     // // 單選
  //     if (this.pickerType.countType === 'single') {

  //       this.selection.toggle(item);
  //       this.userList.forEach(x => x.checked = false);

  //       item.checked = true;

  //     }

  //   }

  // }


  /**
   * 加入選定
   *
   * @returns
   * @memberof OrgPickerComponent
   */
  joinSelect() {

    const checkedlist = this.userList.filter(x => x.checked)
      .map(x => {
        return { uid: x.uid, deptID: x.deptID };
      });


    if (checkedlist.length === 0) {
      return false;
    }

    // checkedlist.forEach(x => delete x.checked);


    // 單選
    if (this.pickerType.countType === 'single') {

      this.joinSelectedList = checkedlist;

    } else {
      // 多選

      this.joinSelectedList = this.joinSelectedList.concat(checkedlist);
      // 排除重複
      this.joinSelectedList = [...new Set(
        this.joinSelectedList.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

    }




    this.setSelectList();
  }



  setSelectList() {
    // console.log('joinSelectedList', this.joinSelectedList);

    const templist = this.joinSelectedList
      .map(x => Object.assign({},
        this.userList.find(a => {

          if (a.uid === x.uid && a.deptID === x.deptID) {
            return a;
          }

        })
      ));

    templist.forEach(x => delete x.checked);
    this.selectedList = templist;

    // console.log('selectedList', this.selectedList);
  }


  delete(item) {

    const i = this.joinSelectedList.findIndex(e => e.uid === item.uid && e.deptID === item.deptID);
    this.joinSelectedList.splice(i, 1);
    this.setSelectList();
  }


}
