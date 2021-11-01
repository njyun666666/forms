import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { OrgPickerDeptInfo } from '../../../../@core/models/organization/org-dept-info';
import { OrganizationService } from '../../../../@core/services/organization.service';
import { OrgPickerTypeModel } from '../org-picker-model';

@Component({
  selector: 'ngx-org-picker',
  templateUrl: './org-picker.component.html',
  styleUrls: ['./org-picker.component.scss']
})
export class OrgPickerComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();


  deptList: OrgPickerDeptInfo[] = [];
  keyword: string;
  joinSelectedList = [];
  selectedList = [];

  pickerType: OrgPickerTypeModel;


  // 單選用
  selection = new SelectionModel<any>(false, []);



  constructor(public dialogRef: MatDialogRef<OrgPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrganizationService
  ) {

  }

  ngOnInit(): void {
    this.joinSelectedList = [];
    this.selectedList = [];
    this.pickerType = this.data.pickerType;


    this.orgService.orgPickerGetDeptList()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((list) => {

        this.deptList = Object.assign([],
          list.data.map(x => {
            x.checked = false;
            return x;
          }));

        // console.log(this.data.data);

        this.joinSelectedList = this.data.data.map(x =>
          this.deptList.find(e => x.deptID === e.deptID).deptID
        );


        this.setSelectList();


      });

    // this.orgService.getDeptList();

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


  checkboxChange(checked, item) {

    // console.log(checked);
    // console.log(item);


    if (checked) {

      // // 單選
      if (this.pickerType.countType === 'single') {

        this.selection.toggle(item);
        this.deptList.forEach(x => x.checked = false);

        item.checked = true;

      }

    }

  }


  /**
   * 加入選定
   *
   * @returns
   * @memberof OrgPickerComponent
   */
  joinSelect() {

    const checkedlist = this.deptList.filter(x => x.checked).map(x => x.deptID);


    if (checkedlist.length === 0) {
      return false;
    }

    // checkedlist.forEach(x => delete x.checked);


    // 單選
    if (this.pickerType.countType === 'single') {

      this.joinSelectedList = checkedlist;

    } else {
      // 多選
      this.joinSelectedList = [...new Set(this.joinSelectedList.concat(checkedlist))];
    }


    this.setSelectList();
  }



  setSelectList() {
    const templist = this.joinSelectedList.map(x => Object.assign({}, this.deptList.find(a => a.deptID === x)));
    templist.forEach(x => delete x.checked);
    this.selectedList = templist;
  }


  delete(item) {
    const i = this.joinSelectedList.indexOf(item.deptID);
    this.joinSelectedList.splice(i, 1);
    this.setSelectList();
  }

}
