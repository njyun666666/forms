import { MenuListComponent } from './../../menu-list.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuListService } from "../../../../../@core/services/menu/menu-list.service";
import { MenuListModel } from '../../../../../@core/models/menu/menu-list.model';

import { MenuTypeModel } from '../../../../../@core/models/menu/menu-type.model';
import { ToastrService } from 'app/@core/services/toastr.service';
@Component({
  selector: 'ngx-menu-add-dialog',
  templateUrl: './menu-add-dialog.component.html',
  styleUrls: ['./menu-add-dialog.component.scss']
})
export class MenuAddDialogComponent implements OnInit {

  form: FormGroup;
  MenuList: Array<MenuListModel> = [];
  MenuType: Array<MenuTypeModel> = [];

  constructor(
    private dialogRef: MatDialogRef<MenuAddDialogComponent>,
    private menuListComponent: MenuListService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) {
    this.form = Data.Data;
    this.MenuList = Data.MenuList;
    this.MenuType = Data.MenuType;
  }

  ngOnInit(): void {

  }


  AddMenu() {
    const data = this.form.value;

    if (data.menuName === '' || data.url === '') {

      this.toastrService.show(null, '欄位名稱或網址為空', { status: 'danger' });
      return;
    }
    // if(this.MenuList.findIndex(x=>x.url==data.url)!=-1){
    //   Swal.fire( '新增失敗!!' , '網址重複!!' , 'error' );
    //   return;
    // }
    this.menuListComponent.AddMenuList(data).subscribe(
      (x) => {

        this.toastrService.show(null, '新增成功', { status: 'success' });
      },
      (error) => {

        this.toastrService.show(null, error, { status: 'danger' });
      });

    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }


}
