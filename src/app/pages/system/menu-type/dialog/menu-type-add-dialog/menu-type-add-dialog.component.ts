import { MenuTypeComponent } from './../../menu-type.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuTypeService } from "../../../../../@core/services/menu/menu-type.service";
import { MenuTypeModel } from '../../../../../@core/models/menu/menu-type.model';
import { ToastrService } from 'app/@core/services/toastr.service';

@Component({
  selector: 'ngx-menu-add-dialog',
  templateUrl: './menu-type-add-dialog.component.html',
  styleUrls: ['./menu-type-add-dialog.component.scss']
})
export class MenuTypeAddDialogComponent implements OnInit {

  form: FormGroup;
  MenuType: Array<MenuTypeModel> = [];
  constructor(
    private dialogRef: MatDialogRef<MenuTypeAddDialogComponent>,
    private menuTypeService: MenuTypeService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public Data: any,
  ) {
    this.form = Data.Data;
    this.MenuType = Data.MenuType;
  }

  ngOnInit(): void {

  }


  AddMenuType() {

    const data = this.form.value;

    if (data.typeName === '') {

      this.toastrService.show(null, '欄位類型名稱為空', { status: 'danger' });
      return;
    }


    this.menuTypeService.AddMenuType(data).subscribe(
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
