import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'app/@core/services/toastr.service';

import { MenuTypeModel } from '../../../../../@core/models/menu/menu-type.model';
import { MenuTypeService } from '../../../../../@core/services/menu/menu-type.service';

@Component({
  selector: 'ngx-menu-update-dialog',
  templateUrl: './menu-type-update-dialog.component.html',
  styleUrls: ['./menu-type-update-dialog.component.scss']
})
export class MenuTypeUpdateDialogComponent implements OnInit {

  form: FormGroup;
  MenuType: Array<MenuTypeModel> = [];


  constructor(
    private dialogRef: MatDialogRef<MenuTypeUpdateDialogComponent>,
    private menuTypeService: MenuTypeService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) {


    const data = Data.MenuType.find((x: { typeID: any; }) => x.typeID == Data.ID);

    this.form = new FormGroup({
      typeID: new FormControl(data.typeID),
      typeName: new FormControl(data.typeName),
      status: new FormControl(data.status.toString()),
    });

    this.MenuType = Data.MenuType;
  }

  ngOnInit(): void {
  }



  UpdateMenuType() {

    const data = this.form.value;


    if (data.typeName === '') {
      this.toastrService.show(null, '選單種類名稱為空', { status: 'danger' });
      return;
    }


    this.menuTypeService.UpdateMenuType(data).subscribe(
      (x) => {
        this.toastrService.show(null, '修改成功', { status: 'success' });
      },
      (error) => {
        this.toastrService.show(null, data.message, { status: 'danger' });
      }
    );


    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }


}
