import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'app/@core/services/toastr.service';

import { MenuListModel } from '../../../../../@core/models/menu/menu-list.model';
import { MenuTypeModel } from '../../../../../@core/models/menu/menu-type.model';
import { MenuListService } from '../../../../../@core/services/menu/menu-list.service';

@Component({
  selector: 'ngx-menu-update-dialog',
  templateUrl: './menu-update-dialog.component.html',
  styleUrls: ['./menu-update-dialog.component.scss']
})
export class MenuUpdateDialogComponent implements OnInit {

  form: FormGroup;
  MenuList: Array<MenuListModel> = [];
  MenuType: Array<MenuTypeModel> = [];


  constructor(
    private dialogRef: MatDialogRef<MenuUpdateDialogComponent>,
    private menuListComponent: MenuListService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) {

    const data = Data.MenuList.find((x: { menuID: any; }) => x.menuID == Data.ID);

    this.form = new FormGroup({
      menuID: new FormControl(data.menuID),
      menuName: new FormControl(data.menuName),
      mainMenu: new FormControl(data.mainMenu.toString()),
      url: new FormControl(data.url),
      icon: new FormControl(data.icon),
      status: new FormControl(data.status.toString()),
      type: new FormControl(data.type.toString()),
      sort: new FormControl(data.sort),
    });

    this.MenuList = Data.MenuList;
    this.MenuType = Data.MenuType;
  }

  ngOnInit(): void {
  }


  UpdateMenu() {
    const data = this.form.value;


    if (data.menuName === '' || data.url === '') {

      this.toastrService.show(null, '欄位名稱或網址為空', { status: 'danger' });
      return;
    }


    if (this.MenuList.findIndex(x => x.url === data.url && x.menuID !== data.menuID) !== -1) {

      this.toastrService.show(null, '網址重複', { status: 'danger' });
      return;
    }


    this.menuListComponent.UpdateMenuList(data).subscribe(
      (x) => {

        this.toastrService.show(null, '更改成功', { status: 'success' });
      },
      (error) => {
        this.toastrService.show(null, error, { status: 'danger' });
      }
    );
    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }


}
